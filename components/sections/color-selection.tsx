"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface ColorSelectionProps {
  selectedColor: string
  onSelect: (color: string) => void
  onNext: () => void
  onPrev: () => void
}

export default function ColorSelection({ selectedColor, onSelect, onNext, onPrev }: ColorSelectionProps) {
  const colors = [
    { id: "Vermelho", label: "Vermelho", hex: "#FF5555" },
    { id: "Amarelo", label: "Amarelo", hex: "#FFD700" },
    { id: "Azul", label: "Azul", hex: "#5555FF" },
    { id: "Laranja", label: "Laranja", hex: "#FFA500" },
    { id: "Verde", label: "Verde", hex: "#55AA55" },
    { id: "Roxo", label: "Roxo", hex: "#8A2BE2" },
  ]

  const handleNext = () => {
    if (selectedColor) {
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

      <h2 className="text-xl font-bold text-center">Qual cor você mais gosta?</h2>

      <div className="grid grid-cols-2 gap-4 mt-2">
        {colors.map((color) => (
          <div
            key={color.id}
            className={`option-card ${selectedColor === color.id ? "selected" : ""}`}
            onClick={() => onSelect(color.id)}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color.hex }}></div>
              <span>{color.label}</span>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleNext} className="w-full mt-4" disabled={!selectedColor}>
        Continuar
      </Button>
    </div>
  )
}
