"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"

interface PalmistryInfoProps {
  onNext: () => void
  onPrev: () => void
}

export default function PalmistryInfo({ onNext, onPrev }: PalmistryInfoProps) {
  return (
    <div className="flex flex-col gap-6 py-4">
      <button
        onClick={onPrev}
        className="flex items-center text-muted-foreground hover:text-foreground transition-colors self-start"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Voltar
      </button>

      <div className="relative w-full h-64">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EeMmyftf5TQUN2qA9ssFKAESgLxpXv.png"
          alt="Palma com pontos de quiromancia destacados"
          fill
          className="object-contain"
        />
      </div>

      <p className="text-center text-lg font-medium">
        Suas palmas contêm um forte poder astral de conexão com as divindades amorosas.
      </p>

      <Button onClick={onNext} className="w-full mt-4">
        Continuar
      </Button>
    </div>
  )
}
