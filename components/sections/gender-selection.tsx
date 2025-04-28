"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface GenderSelectionProps {
  selectedGender: string
  onSelect: (gender: string) => void
  onNext: () => void
  onPrev: () => void
}

export default function GenderSelection({ selectedGender, onSelect, onNext, onPrev }: GenderSelectionProps) {
  const genders = [
    { id: "masculino", label: "Masculino" },
    { id: "feminino", label: "Feminino" },
    { id: "outros", label: "Outros" },
  ]

  const handleNext = () => {
    if (selectedGender) {
      onNext()
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

      <h2 className="text-xl font-bold text-center">Qual é o seu gênero?</h2>

      <p className="text-center text-muted-foreground">
        Na Quiromancia no foco amoroso, é necessário saber o gênero para ter êxito na conquista desejada.
      </p>

      <div className="grid gap-4 mt-2">
        {genders.map((gender) => (
          <div
            key={gender.id}
            className={`option-card ${selectedGender === gender.id ? "selected" : ""}`}
            onClick={() => onSelect(gender.id)}
          >
            <div className="flex items-center justify-between">
              <span>{gender.label}</span>
              {selectedGender === gender.id && <div className="h-4 w-4 rounded-full bg-primary"></div>}
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleNext} className="w-full mt-4" disabled={!selectedGender}>
        Continuar
      </Button>
    </div>
  )
}
