"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { getColorHex } from "@/lib/utils"

interface PersonalizedMessageProps {
  zodiacSign: string
  element: string
  favoriteColor: string
  onNext: () => void
  onPrev: () => void
}

export default function PersonalizedMessage({
  zodiacSign,
  element,
  favoriteColor,
  onNext,
  onPrev,
}: PersonalizedMessageProps) {
  const colorHex = getColorHex(favoriteColor)

  return (
    <div className="flex flex-col gap-6 py-4">
      <button
        onClick={onPrev}
        className="flex items-center text-muted-foreground hover:text-foreground transition-colors self-start"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Voltar
      </button>

      <div className="p-6 rounded-lg border" style={{ borderColor: colorHex, backgroundColor: `${colorHex}10` }}>
        <p className="text-lg text-center">
          Com base nos seus dados, as divindades dizem que conforme o signo <strong>{zodiacSign}</strong>, elemento{" "}
          <strong>{element}</strong> e cor favorita, existe uma chance de <strong>72%</strong> de seu grande amor estar
          apenas esperando uma atitude sua… E elas irão entregar esse elemento que falta para conquistar tudo o que você
          sempre quis no amor, siga adiante para descobrir.
        </p>
      </div>

      <Button onClick={onNext} className="w-full mt-4" style={{ backgroundColor: colorHex }}>
        Quero descobrir!
      </Button>
    </div>
  )
}
