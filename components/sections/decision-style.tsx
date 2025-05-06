"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useEffect } from "react"

interface DecisionStyleProps {
  selectedStyle: string
  onSelect: (style: string) => void
  onNext: () => void
  onPrev: () => void
}

export default function DecisionStyle({ selectedStyle, onSelect, onNext, onPrev }: DecisionStyleProps) {
  const styles = [
    { id: "emotivo", label: "Emotiva (uso mais o coração)", emoji: "❤️" },
    { id: "racional", label: "Racional (uso a lógica)", emoji: "🧠" },
    { id: "ambos", label: "Ambos", emoji: "✨" },
  ]

  // Efeito para avançar automaticamente quando uma opção é selecionada
  useEffect(() => {
    if (selectedStyle) {
      const timer = setTimeout(() => {
        onNext()
      }, 500) // Pequeno delay para mostrar a seleção
      return () => clearTimeout(timer)
    }
  }, [selectedStyle, onNext])

  const handleSelect = (style: string) => {
    onSelect(style)
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
        Você costuma mais ser emotiva(o) ou racional nas tomadas de decisão?
      </h2>

      <div className="grid gap-4 mt-2">
        {styles.map((style) => (
          <div
            key={style.id}
            className={`option-card ${selectedStyle === style.id ? "selected" : ""}`}
            onClick={() => handleSelect(style.id)}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="text-xl">{style.emoji}</span>
                <span>{style.label}</span>
              </span>
              {selectedStyle === style.id && <div className="h-4 w-4 rounded-full bg-primary"></div>}
            </div>
          </div>
        ))}
      </div>

      <Button onClick={onNext} className="w-full mt-4" disabled={!selectedStyle}>
        Continuar
      </Button>
    </div>
  )
}
