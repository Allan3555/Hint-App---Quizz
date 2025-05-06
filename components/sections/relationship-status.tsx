"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useState, useEffect } from "react"

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

  // Estado para rastrear se uma nova seleção foi feita nesta renderização
  const [newSelection, setNewSelection] = useState(false)

  // Efeito para avançar automaticamente apenas quando uma nova seleção é feita
  useEffect(() => {
    if (newSelection && selectedStatus) {
      const timer = setTimeout(() => {
        onNext()
        setNewSelection(false) // Resetar após avançar
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [newSelection, selectedStatus, onNext])

  const handleSelect = (status: string) => {
    // Só considerar como nova seleção se for diferente da atual
    if (status !== selectedStatus) {
      onSelect(status)
      setNewSelection(true) // Marcar que uma nova seleção foi feita
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
