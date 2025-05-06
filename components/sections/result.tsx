"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ResultProps {
  onSubmit: (email: string) => void
  onPrev: () => void
}

export default function Result({ onSubmit, onPrev }: ResultProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showEmailForm, setShowEmailForm] = useState(true)

  // Background animation for the email form
  useEffect(() => {
    if (!canvasRef.current || !showEmailForm) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Create mystical symbols
    const symbols = [
      "♈",
      "♉",
      "♊",
      "♋",
      "♌",
      "♍",
      "♎",
      "♏",
      "♐",
      "♑",
      "♒",
      "♓", // Zodiac
      "☽",
      "☾",
      "☿",
      "♀",
      "♁",
      "♂",
      "♃",
      "♄",
      "♅",
      "♆",
      "♇", // Planets
      "✧",
      "✦",
      "★",
      "☆",
      "✫",
      "✬",
      "✭",
      "✮",
      "✯",
      "✰", // Stars
      "◆",
      "◇",
      "◈",
      "◉",
      "◊",
      "○",
      "◌",
      "◍",
      "◎",
      "●", // Geometric
    ]

    // Create floating elements
    const floatingElements = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 10 + Math.random() * 20,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      speed: 0.2 + Math.random() * 0.5,
      angle: Math.random() * Math.PI * 2,
      rotation: (Math.random() - 0.5) * 0.02,
      opacity: 0.1 + Math.random() * 0.3,
      hue: Math.floor(Math.random() * 360),
    }))

    // Create palm lines
    const palmLines = [
      {
        // Heart line
        points: [
          { x: 0.2, y: 0.35 },
          { x: 0.4, y: 0.32 },
          { x: 0.6, y: 0.3 },
          { x: 0.8, y: 0.35 },
        ],
        color: "rgba(233, 30, 99, 0.3)",
        width: 2,
      },
      {
        // Life line
        points: [
          { x: 0.3, y: 0.2 },
          { x: 0.25, y: 0.4 },
          { x: 0.2, y: 0.6 },
          { x: 0.25, y: 0.8 },
        ],
        color: "rgba(76, 175, 80, 0.3)",
        width: 2,
      },
      {
        // Head line
        points: [
          { x: 0.2, y: 0.45 },
          { x: 0.4, y: 0.47 },
          { x: 0.6, y: 0.48 },
          { x: 0.8, y: 0.45 },
        ],
        color: "rgba(33, 150, 243, 0.3)",
        width: 2,
      },
      {
        // Fate line
        points: [
          { x: 0.5, y: 0.3 },
          { x: 0.5, y: 0.4 },
          { x: 0.5, y: 0.6 },
          { x: 0.5, y: 0.8 },
        ],
        color: "rgba(156, 39, 176, 0.3)",
        width: 2,
      },
    ]

    // Animation loop
    let animationFrame: number
    let time = 0

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw a subtle gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
      )
      gradient.addColorStop(0, "rgba(255, 255, 255, 0)")
      gradient.addColorStop(1, "rgba(255, 240, 255, 0.05)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw palm lines
      palmLines.forEach((line) => {
        ctx.beginPath()
        ctx.strokeStyle = line.color
        ctx.lineWidth = line.width

        // Scale points to canvas size
        const scaledPoints = line.points.map((p) => ({
          x: p.x * canvas.width,
          y: p.y * canvas.height,
        }))

        ctx.moveTo(scaledPoints[0].x, scaledPoints[0].y)

        // Draw a bezier curve through the points
        for (let i = 1; i < scaledPoints.length; i += 3) {
          if (i + 2 < scaledPoints.length) {
            ctx.bezierCurveTo(
              scaledPoints[i].x,
              scaledPoints[i].y,
              scaledPoints[i + 1].x,
              scaledPoints[i + 1].y,
              scaledPoints[i + 2].x,
              scaledPoints[i + 2].y,
            )
          }
        }

        ctx.stroke()
      })

      // Draw floating elements
      floatingElements.forEach((element) => {
        // Update position
        element.x += Math.cos(element.angle) * element.speed
        element.y += Math.sin(element.angle) * element.speed
        element.angle += element.rotation

        // Wrap around edges
        if (element.x < -element.size) element.x = canvas.width + element.size
        if (element.x > canvas.width + element.size) element.x = -element.size
        if (element.y < -element.size) element.y = canvas.height + element.size
        if (element.y > canvas.height + element.size) element.y = -element.size

        // Pulsating opacity
        const pulsingOpacity = element.opacity + Math.sin(time * 2) * 0.1

        // Draw symbol
        ctx.font = `${element.size}px serif`
        ctx.fillStyle = `hsla(${element.hue}, 70%, 60%, ${pulsingOpacity})`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(element.symbol, element.x, element.y)
      })

      // Draw connecting lines between nearby elements
      ctx.strokeStyle = "rgba(180, 180, 220, 0.1)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < floatingElements.length; i++) {
        const el1 = floatingElements[i]
        for (let j = i + 1; j < floatingElements.length; j++) {
          const el2 = floatingElements[j]
          const dx = el1.x - el2.x
          const dy = el1.y - el2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(el1.x, el1.y)
            ctx.lineTo(el2.x, el2.y)
            ctx.stroke()
          }
        }
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [showEmailForm])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitting(true)
      // Submit email and redirect directly to sales page
      onSubmit(email)
    }
  }

  return (
    <div className="flex flex-col gap-6 py-4 relative">
      <button
        onClick={onPrev}
        className="flex items-center text-muted-foreground hover:text-foreground transition-colors self-start"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Voltar
      </button>

      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">
          Uau, os astros analisaram sua palma e estão ansiosos por você!
        </h2>
        <p className="text-lg">Isso é uma ótima notícia!</p>
      </div>

      {showEmailForm && (
        <>
          <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />

          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 opacity-50" />

              <div className="relative z-10">
                <h3 className="text-xl font-bold text-center mb-2">Insira seu e-mail para sua quiromancia</h3>
                <p className="text-center text-muted-foreground mb-6">
                  Enviaremos sua análise completa para o e-mail fornecido.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full transition-all duration-300 hover:scale-[1.02]"
                    disabled={!email || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-pulse mr-2">✨</span>
                        Processando...
                      </>
                    ) : (
                      "Receber minha quiromancia"
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Ao continuar, você concorda com nossos
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
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
