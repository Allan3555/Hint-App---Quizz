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

interface BirthDateProps {
  selectedDate: string
  onSelect: (date: string) => void
  onNext: () => void
  onPrev: () => void
}

export default function BirthDate({ selectedDate, onSelect, onNext, onPrev }: BirthDateProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDate ? new Date(selectedDate) : undefined)
  const [dateInput, setDateInput] = useState(selectedDate ? format(new Date(selectedDate), "dd/MM/yyyy") : "")
  const [error, setError] = useState("")

  useEffect(() => {
    if (selectedDate) {
      setDateInput(format(new Date(selectedDate), "dd/MM/yyyy"))
    }
  }, [selectedDate])

  const handleDateInputChange = (value: string) => {
    setDateInput(value)
    setError("")

    if (value.length === 10) {
      try {
        const parsedDate = parse(value, "dd/MM/yyyy", new Date())
        if (isValid(parsedDate)) {
          if (parsedDate > new Date()) {
            setError("A data não pode ser no futuro")
            return
          }
          setDate(parsedDate)
          onSelect(parsedDate.toISOString().split("T")[0])
        } else {
          setError("Data inválida")
        }
      } catch (e) {
        setError("Formato inválido. Use DD/MM/AAAA")
      }
    }
  }

  const handleCalendarSelect = (date: Date | undefined) => {
    setDate(date)
    if (date) {
      setDateInput(format(date, "dd/MM/yyyy"))
      onSelect(date.toISOString().split("T")[0])
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
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleCalendarSelect}
                  disabled={{ after: new Date() }}
                  locale={ptBR}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>

      <Button
        onClick={handleNext}
        className="w-full mt-4 transition-all duration-300 hover:scale-[1.02]"
        disabled={!selectedDate}
      >
        Continuar
      </Button>
    </div>
  )
}
