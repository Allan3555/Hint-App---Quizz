"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ChevronLeft, CalendarIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, isValid, parse } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BirthDateProps {
  selectedDate: string
  onSelect: (date: string) => void
  onNext: () => void
  onPrev: () => void
}

export default function BirthDate({ selectedDate, onSelect, onNext, onPrev }: BirthDateProps) {
  // Função auxiliar para converter string de data para objeto Date sem problemas de fuso horário
  const parseStringToDate = (dateString: string): Date | undefined => {
    if (!dateString) return undefined

    // Para evitar problemas de fuso horário, não use diretamente new Date(dateString)
    const [year, month, day] = dateString.split("-").map(Number)
    // Mês em JavaScript é 0-indexed, por isso o -1 no mês
    return new Date(year, month - 1, day, 12, 0, 0)
  }

  const [date, setDate] = useState<Date | undefined>(parseStringToDate(selectedDate))
  const [dateInput, setDateInput] = useState(
    selectedDate ? format(parseStringToDate(selectedDate) as Date, "dd/MM/yyyy") : "",
  )
  const [error, setError] = useState("")

  useEffect(() => {
    if (selectedDate) {
      setDateInput(format(parseStringToDate(selectedDate) as Date, "dd/MM/yyyy"))
    }
  }, [selectedDate])

  const handleDateInputChange = (value: string) => {
    setDateInput(value)
    setError("")

    if (value.length === 10) {
      try {
        const parsedDate = parse(value, "dd/MM/yyyy", new Date())
        if (isValid(parsedDate)) {
          const today = new Date()
          let age = today.getFullYear() - parsedDate.getFullYear()
          const m = today.getMonth() - parsedDate.getMonth()
          if (m < 0 || (m === 0 && today.getDate() < parsedDate.getDate())) {
            age--
          }

          if (parsedDate > today) {
            setError("A data não pode ser no futuro")
            return
          }

          // Alterado de 16 para 15 conforme solicitado
          if (age < 15) {
            setError("Você precisa ter pelo menos 15 anos para continuar")
            return
          }

          setDate(parsedDate)

          // Extract day, month, year directly from the parsed date
          const day = parsedDate.getDate()
          const month = parsedDate.getMonth() + 1
          const year = parsedDate.getFullYear()

          // Create date string in YYYY-MM-DD format without timezone conversion
          const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
          onSelect(formattedDate)
        } else {
          setError("Data inválida")
        }
      } catch (e) {
        setError("Formato inválido. Use DD/MM/AAAA")
      }
    }
  }

  const handleCalendarSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      setDateInput(format(selectedDate, "dd/MM/yyyy"))

      // Verificação de idade ao selecionar no calendário
      const today = new Date()
      let age = today.getFullYear() - selectedDate.getFullYear()
      const m = today.getMonth() - selectedDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < selectedDate.getDate())) {
        age--
      }

      // Alterado de 16 para 15 conforme solicitado
      if (age < 15) {
        setError("Você precisa ter pelo menos 15 anos para continuar")
        return
      }

      // Extract day, month, year directly from the selected date
      const day = selectedDate.getDate()
      const month = selectedDate.getMonth() + 1
      const year = selectedDate.getFullYear()

      // Create date string in YYYY-MM-DD format without timezone conversion
      const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`
      onSelect(formattedDate)

      setError("")
    }
  }

  const handleNext = () => {
    if (selectedDate) {
      onNext()
    }
  }

  // Format input as user types
  const formatDateInput = (input: string) => {
    // Remove non-digits
    const digits = input.replace(/\D/g, "")

    // Add slashes as user types
    let formatted = ""
    if (digits.length > 0) {
      formatted += digits.substring(0, Math.min(2, digits.length))
    }
    if (digits.length > 2) {
      formatted += "/" + digits.substring(2, Math.min(4, digits.length))
    }
    if (digits.length > 4) {
      formatted += "/" + digits.substring(4, Math.min(8, digits.length))
    }

    return formatted
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDateInput(e.target.value)
    setDateInput(formatted)

    if (formatted.length === 10) {
      handleDateInputChange(formatted)
    } else {
      setError("")
    }
  }

  return (
    <div className="flex flex-col gap-6 py-4">
      <button
        onClick={onPrev}
        className="flex items-center text-muted-foreground hover:text-foreground transition-colors self-start"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Voltar
      </button>

      <h2 className="text-xl font-bold text-center">Qual é a sua data de nascimento?</h2>

      <p className="text-center text-muted-foreground">
        Sua data de nascimento revela seus principais traços de personalidade, necessidades e desejos.
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="birthdate">Data de Nascimento</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                id="birthdate"
                placeholder="DD/MM/AAAA"
                value={dateInput}
                onChange={handleInputChange}
                className={`pr-10 ${error ? "border-red-500" : ""}`}
                maxLength={10}
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="h-10 w-10">
                  <CalendarIcon className="h-4 w-4" />
                  <span className="sr-only">Abrir calendário</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <div className="flex flex-col space-y-4 p-2">
                  {/* Seletores de ano e mês */}
                  <div className="flex justify-between items-center px-1">
                    <Select
                      value={date ? date.getFullYear().toString() : new Date().getFullYear().toString()}
                      onValueChange={(year) => {
                        if (date) {
                          const newDate = new Date(date)
                          newDate.setFullYear(Number.parseInt(year))
                          handleCalendarSelect(newDate)
                        } else {
                          const newDate = new Date()
                          newDate.setFullYear(Number.parseInt(year))
                          handleCalendarSelect(newDate)
                        }
                      }}
                    >
                      <SelectTrigger className="w-[110px] h-8">
                        <SelectValue placeholder="Ano" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {Array.from({ length: 84 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={date ? (date.getMonth() + 1).toString() : (new Date().getMonth() + 1).toString()}
                      onValueChange={(month) => {
                        if (date) {
                          const newDate = new Date(date)
                          newDate.setMonth(Number.parseInt(month) - 1)
                          handleCalendarSelect(newDate)
                        } else {
                          const newDate = new Date()
                          newDate.setMonth(Number.parseInt(month) - 1)
                          handleCalendarSelect(newDate)
                        }
                      }}
                    >
                      <SelectTrigger className="w-[110px] h-8">
                        <SelectValue placeholder="Mês" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Janeiro</SelectItem>
                        <SelectItem value="2">Fevereiro</SelectItem>
                        <SelectItem value="3">Março</SelectItem>
                        <SelectItem value="4">Abril</SelectItem>
                        <SelectItem value="5">Maio</SelectItem>
                        <SelectItem value="6">Junho</SelectItem>
                        <SelectItem value="7">Julho</SelectItem>
                        <SelectItem value="8">Agosto</SelectItem>
                        <SelectItem value="9">Setembro</SelectItem>
                        <SelectItem value="10">Outubro</SelectItem>
                        <SelectItem value="11">Novembro</SelectItem>
                        <SelectItem value="12">Dezembro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Calendário padrão */}
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleCalendarSelect}
                    disabled={{ after: new Date() }}
                    locale={ptBR}
                    initialFocus
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <span className="font-medium">{error}</span>
            </p>
          )}
        </div>
      </div>

      <Button
        onClick={handleNext}
        className="w-full mt-4 transition-all duration-300 hover:scale-[1.02]"
        disabled={!selectedDate || error !== ""}
      >
        Continuar
      </Button>
    </div>
  )
}
