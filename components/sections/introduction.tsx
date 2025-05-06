"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Clock, Scan, UserRound, Shield, Lock, CheckCircle } from "lucide-react"

interface IntroductionProps {
  onNext: () => void
}

export default function Introduction({ onNext }: IntroductionProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="relative w-full h-64">
        <Image
          src="/images/hand-pt.webp"
          alt="Palma da mão com linhas coloridas indicando aspectos da vida"
          fill
          className="object-contain"
        />
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-primary">Encontre sua felicidade</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">com previsões altamente personalizadas</p>
      </div>

      <div className="grid grid-cols-3 gap-3 w-full">
        <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
          <Clock className="h-5 w-5 text-primary mb-1" />
          <span className="text-xs text-center">Quiz de 1 minuto</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
          <Scan className="h-5 w-5 text-primary mb-1" />
          <span className="text-xs text-center">Escaneo de palma</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
          <UserRound className="h-5 w-5 text-primary mb-1" />
          <span className="text-xs text-center">Guia personalizada</span>
        </div>
      </div>

      <Button
        onClick={onNext}
        className="w-full mt-4 btn-hover-effect transition-all duration-300 hover:scale-[1.02]"
        size="lg"
      >
        Vamos começar
      </Button>

      {/* Seção de segurança */}
      <div className="flex items-center justify-center gap-3 mt-2 border-t pt-3 w-full">
        <div className="flex items-center text-green-600">
          <Lock className="h-4 w-4 mr-1" />
          <span className="text-xs">Criptografado</span>
        </div>
        <div className="flex items-center text-green-600">
          <Shield className="h-4 w-4 mr-1" />
          <span className="text-xs">Seguro</span>
        </div>
        <div className="flex items-center text-green-600">
          <CheckCircle className="h-4 w-4 mr-1" />
          <span className="text-xs">Privado</span>
        </div>
      </div>

      <p className="text-xs text-center text-muted-foreground mt-1">
        Suas respostas são protegidas e criptografadas ponto a ponto.
      </p>

      <p className="text-xs text-center text-muted-foreground mt-2">
        Para fins de entretenimento apenas. Ao continuar, você concorda com nossos
        <a href="#" className="text-primary hover:underline">
          {" "}
          Termos e Condições
        </a>{" "}
        e
        <a href="#" className="text-primary hover:underline">
          {" "}
          Política de Privacidade
        </a>
        .
      </p>
    </div>
  )
}
