"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useEffect } from "react"

interface RelationshipStatusProps {
  selectedStatus: string
  onSelect: (status: string) => void
  onNext: () => void
  onPrev: () => void
}

export default function RelationshipStatus({ selectedStatus, onSelect, onNext, onPrev }: RelationshipStatusProps) {
  const statuses = [
    { id: "solteiro", label: "Solteiro(a)", emoji: "🌟" },
    { id: "namorando", label: "Namorando", emoji: "💑" },
    { id: "casado", label: "Casado(a)", emoji: "💍" },
    { id: "divorciado", label: "Divorciado(a)", emoji: "💔" },
    { id: "viuvo", label: "Viúvo(a)", emoji: "🕊️" },
  ]

  // Efeito para avançar automaticamente quando uma opção é selecionada
  useEffect(() => {
    if (selectedStatus) {
      const timer = setTimeout(() => {
        onNext()
      }, 500) // Pequeno delay para mostrar a seleção
      return () => clearTimeout(timer)
    }
  }, [selectedStatus, onNext])

  const handleSelect = (status: string) => {
    onSelect(status)
    // O avanço automático será feito pelo useEffect
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

      <h2 className="text-xl font-bold text-center">
        Para as divindades te conhecerem melhor, nos fale seu status de relacionamento atual:
      </h2>

      <div className="grid gap-4 mt-2">
        {statuses.map((status) => (
          <div
            key={status.id}
            className={`option-card ${selectedStatus === status.id ? "selected" : ""}`}
            onClick={() => handleSelect(status.id)}
          >
            <div className="flex items-center justify-between">
              <span>
                {status.emoji} {status.label}
              </span>
              {selectedStatus === status.id && <div className="h-4 w-4 rounded-full bg-primary"></div>}
            </div>
          </div>
        ))}
      </div>

      <Button onClick={onNext} className="w-full mt-4" disabled={!selectedStatus}>
        Continuar
      </Button>
    </div>
  )
}
