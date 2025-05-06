"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useEffect } from "react"

interface ElementSelectionProps {
  selectedElement: string
  onSelect: (element: string) => void
  onNext: () => void
  onPrev: () => void
}

export default function ElementSelection({ selectedElement, onSelect, onNext, onPrev }: ElementSelectionProps) {
  const elements = [
    { id: "terra", label: "Terra" },
    { id: "fogo", label: "Fogo" },
    { id: "ar", label: "Ar" },
    { id: "agua", label: "Água" },
  ]

  // Efeito para avançar automaticamente quando uma opção é selecionada
  useEffect(() => {
    if (selectedElement) {
      const timer = setTimeout(() => {
        onNext()
      }, 500) // Pequeno delay para mostrar a seleção
      return () => clearTimeout(timer)
    }
  }, [selectedElement, onNext])

  const handleSelect = (element: string) => {
    onSelect(element)
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

      <h2 className="text-xl font-bold text-center">Qual elemento mais representa você?</h2>

      <div className="grid grid-cols-2 gap-4 mt-2">
        {elements.map((element) => (
          <div
            key={element.id}
            className={`option-card ${selectedElement === element.id ? "selected" : ""}`}
            onClick={() => handleSelect(element.id)}
          >
            <div className="flex flex-col items-center justify-center p-2">
              <span className="text-3xl mb-2">
                {element.id === "terra" && "🌍"}
                {element.id === "fogo" && "🔥"}
                {element.id === "ar" && "💨"}
                {element.id === "agua" && "💧"}
              </span>
              <span>{element.label}</span>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={onNext} className="w-full mt-4" disabled={!selectedElement}>
        Continuar
      </Button>
    </div>
  )
}
