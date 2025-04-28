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
    { id: "amor", label: "Amor e Relacionamento" },
    { id: "saude", label: "Saúde e Vitalidade" },
    { id: "carreira", label: "Carreira e Destino" },
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
        {aspects.map((aspect) => {
          const isSelected = selectedAspect === aspect.id
          const bgColor = isSelected
            ? aspect.id === "amor"
              ? "bg-blue-100"
              : aspect.id === "saude"
                ? "bg-blue-100"
                : "bg-blue-500"
            : "bg-blue-50"

          const textColor = isSelected && aspect.id === "carreira" ? "text-white" : ""

          return (
            <div
              key={aspect.id}
              className={`rounded-lg p-4 cursor-pointer transition-all duration-300 ${bgColor} ${textColor}`}
              onClick={() => onSelect(aspect.id)}
            >
              <div className="text-center py-2">{aspect.label}</div>
            </div>
          )
        })}
      </div>

      <Button
        onClick={handleNext}
        className="w-full mt-4 transition-all duration-300 hover:scale-[1.02]"
        disabled={!selectedAspect}
      >
        Continuar
      </Button>
    </div>
  )
}
