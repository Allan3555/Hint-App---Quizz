"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface LoveAspectProps {
  selectedAspect: string
  onSelect: (aspect: string) => void
  onNext: () => void
  onPrev: () => void
}

export default function LoveAspect({ selectedAspect, onSelect, onNext, onPrev }: LoveAspectProps) {
  const aspects = [
    { id: "amor", label: "Amor e Relacionamento", available: true, emoji: "❤️" }, //Added emoji
    { id: "saude", label: "Saúde e Vitalidade", available: false, emoji: "💪" }, //Added emoji
    { id: "carreira", label: "Carreira e Destino", available: false, emoji: "💼" }, //Added emoji
  ]

  const handleNext = () => {
    if (selectedAspect) {
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

      <h2 className="text-xl font-bold text-center">
        Em quais aspectos da sua vida você deseja obter insights através da quiromancia?
      </h2>

      <div className="grid gap-4 mt-2">
        {aspects.map((aspect) => (
          <div
            key={aspect.id}
            className={`option-card ${!aspect.available ? 'cursor-not-allowed opacity-60' : ''} ${selectedAspect === aspect.id ? "selected" : ""}`}
            onClick={() => aspect.available && onSelect(aspect.id)}
          >
            <div className="flex items-center justify-between">
              <span>{aspect.emoji} {aspect.label}</span> {/* Added emoji display */}
              {!aspect.available ? (
                <span className="text-sm text-muted-foreground">Em breve</span>
              ) : selectedAspect === aspect.id && (
                <div className="h-4 w-4 rounded-full bg-primary"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleNext} className="w-full mt-4" disabled={!selectedAspect}>
        Continuar
      </Button>
    </div>
  )
}
