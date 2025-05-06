"use client"

import type React from "react"
import Webcam from "react-webcam"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, Camera, Upload, Loader2, RefreshCw, X } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface PalmUploadProps {
  onImageCapture: (file: File) => void
  onNext: () => void
  onPrev: () => void
}

export default function PalmUpload({ onImageCapture, onNext, onPrev }: PalmUploadProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [useFrontCamera, setUseFrontCamera] = useState(false) // Default to back camera
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const analyzeCanvasRef = useRef<HTMLCanvasElement>(null)
  const [animationFrame, setAnimationFrame] = useState(0)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const webcamRef = useRef<Webcam>(null)
  const [showWebcam, setShowWebcam] = useState(false)

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        setCapturedImage(imageSrc)
        // Converter base64 para File
        fetch(imageSrc)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], "palm-photo.jpg", { type: "image/jpeg" })
            onImageCapture(file)
          })
        setShowWebcam(false)
      }
    }
  }

  // Função para lidar com upload de arquivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | null) => {
    if (!e) return

    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setCapturedImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
      onImageCapture(file)
    }
  }

  const handleCameraClick = () => {
    setShowWebcam(true)
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleNext = () => {
    if (capturedImage) {
      setIsAnalyzing(true)
    }
  }

  // Palm analysis animation
  useEffect(() => {
    if (!isAnalyzing || !analyzeCanvasRef.current || !capturedImage) return

    const canvas = analyzeCanvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = document.createElement("img")
    img.crossOrigin = "anonymous"
    img.src = capturedImage

    img.onload = () => {
      // Set canvas dimensions to match the image
      canvas.width = img.width
      canvas.height = img.height

      // Animation frames
      let frame = 0
      const totalFrames = 120 // 6 seconds at 20fps

      const animate = () => {
        if (frame >= totalFrames) {
          onNext()
          return
        }

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw the image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        // Apply filters based on animation progress
        const progress = frame / totalFrames

        if (progress < 0.3) {
          // Initial scanning effect
          ctx.fillStyle = `rgba(255, 255, 255, ${0.3 * Math.sin(progress * 10)})`
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        // Draw palm lines that appear gradually
        if (progress > 0.2) {
          const lineOpacity = Math.min(1, (progress - 0.2) * 3)

          // Heart line (curved across upper palm)
          ctx.beginPath()
          ctx.strokeStyle = `rgba(233, 30, 99, ${lineOpacity})`
          ctx.lineWidth = 3
          ctx.moveTo(canvas.width * 0.2, canvas.height * 0.35)
          ctx.bezierCurveTo(
            canvas.width * 0.4,
            canvas.height * 0.32,
            canvas.width * 0.6,
            canvas.height * 0.3,
            canvas.width * 0.8,
            canvas.height * 0.35,
          )
          ctx.stroke()

          // Life line (curved around thumb)
          if (progress > 0.3) {
            const lifeLineOpacity = Math.min(1, (progress - 0.3) * 3)
            ctx.beginPath()
            ctx.strokeStyle = `rgba(76, 175, 80, ${lifeLineOpacity})`
            ctx.lineWidth = 3
            ctx.moveTo(canvas.width * 0.3, canvas.height * 0.2)
            ctx.bezierCurveTo(
              canvas.width * 0.25,
              canvas.height * 0.4,
              canvas.width * 0.2,
              canvas.height * 0.6,
              canvas.width * 0.25,
              canvas.height * 0.8,
            )
            ctx.stroke()
          }

          // Head line (horizontal across middle palm)
          if (progress > 0.4) {
            const headLineOpacity = Math.min(1, (progress - 0.4) * 3)
            ctx.beginPath()
            ctx.strokeStyle = `rgba(33, 150, 243, ${headLineOpacity})`
            ctx.lineWidth = 3
            ctx.moveTo(canvas.width * 0.2, canvas.height * 0.45)
            ctx.bezierCurveTo(
              canvas.width * 0.4,
              canvas.height * 0.47,
              canvas.width * 0.6,
              canvas.height * 0.48,
              canvas.width * 0.8,
              canvas.height * 0.45,
            )
            ctx.stroke()
          }

          // Fate line (vertical through center of palm)
          if (progress > 0.5) {
            const fateLineOpacity = Math.min(1, (progress - 0.5) * 3)
            ctx.beginPath()
            ctx.strokeStyle = `rgba(156, 39, 176, ${fateLineOpacity})`
            ctx.lineWidth = 3
            ctx.moveTo(canvas.width * 0.5, canvas.height * 0.3)
            ctx.bezierCurveTo(
              canvas.width * 0.5,
              canvas.height * 0.4,
              canvas.width * 0.5,
              canvas.height * 0.6,
              canvas.width * 0.5,
              canvas.height * 0.8,
            )
            ctx.stroke()
          }
        }

        // Add glowing points at key intersections
        if (progress > 0.6) {
          const pointOpacity = Math.min(1, (progress - 0.6) * 3)
          const pointSize = 5 + 3 * Math.sin(frame * 0.1)

          // Heart-Head intersection
          ctx.beginPath()
          ctx.fillStyle = `rgba(255, 64, 129, ${pointOpacity})`
          ctx.arc(canvas.width * 0.5, canvas.height * 0.4, pointSize, 0, Math.PI * 2)
          ctx.fill()

          // Life-Fate intersection
          ctx.beginPath()
          ctx.fillStyle = `rgba(0, 200, 83, ${pointOpacity})`
          ctx.arc(canvas.width * 0.4, canvas.height * 0.6, pointSize, 0, Math.PI * 2)
          ctx.fill()
        }

        // Final "completion" effect
        if (progress > 0.8) {
          const finalOpacity = Math.min(0.3, (progress - 0.8) * 1.5)
          ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        frame++
        setAnimationFrame(frame)
        requestAnimationFrame(animate)
      }

      animate()
    }
  }, [isAnalyzing, capturedImage, onNext])

  return (
    <div className="flex flex-col gap-6 py-4">
      <button
        onClick={onPrev}
        className="flex items-center text-muted-foreground hover:text-foreground transition-colors self-start"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Voltar
      </button>

      <h2 className="text-xl font-bold text-center">Tire uma foto da sua palma direita conforme instruído</h2>

      <p className="text-center text-muted-foreground">
        Agora vamos enviar uma foto diretamente a divindade celestial da palma da sua mão para obter essas respostas e
        viver o verdadeiro amor que merece.
      </p>

      <p className="text-center">
        Envie uma foto clicando no botão abaixo, e em poucos segundos você receberá a melhor notícia da sua vida!
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 bg-green-50">
          <div className="text-center mb-2 text-green-600 font-medium">Correto</div>
          <div className="relative h-40">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9Zaj7OuCw8BdpgCy2cH513nQurMk5h.png"
              alt="Exemplo correto de foto da palma"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-red-50">
          <div className="text-center mb-2 text-red-600 font-medium">Errado</div>
          <div className="relative h-40">
            <Image
              src="/placeholder.svg?height=200&width=200"
              alt="Exemplo incorreto de foto da palma"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <Dialog open={showWebcam} onOpenChange={setShowWebcam}>
        <DialogContent className="sm:max-w-[800px] p-0">
          <div className="bg-black rounded-lg">
            <div className="relative h-[500px] w-full">
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="absolute inset-0 w-full h-full object-contain rounded-lg"
                mirrored={false}
                videoConstraints={{
                  facingMode: useFrontCamera ? "user" : "environment",
                  width: { ideal: 1280 },
                  height: { ideal: 720 },
                }}
              />

              {/* Palm overlay guide image */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Image
                  src="/images/palm-center.png"
                  alt="Palm position guide"
                  width={400}
                  height={400}
                  className="opacity-60 object-contain"
                />
              </div>

              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setUseFrontCamera(!useFrontCamera)}
                  className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
                <Button
                  onClick={() => setShowWebcam(false)}
                  variant="outline"
                  className="bg-white/70 hover:bg-white/90"
                  size="lg"
                >
                  <X className="h-5 w-5 mr-1" />
                  Cancelar
                </Button>
                <Button onClick={handleCapture} className="bg-primary/90 hover:bg-primary" size="lg">
                  <Camera className="h-5 w-5 mr-1" />
                  Capturar
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {capturedImage ? (
        <div className="border rounded-lg p-4 relative">
          {isAnalyzing ? (
            <div className="relative h-64 w-full">
              <canvas ref={analyzeCanvasRef} className="absolute inset-0 w-full h-full object-contain rounded-lg" />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="bg-black/70 text-white px-4 py-2 rounded-full flex items-center">
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Analisando linhas da palma... {Math.round((animationFrame / 120) * 100)}%
                </div>
              </div>
            </div>
          ) : (
            <div className="relative h-64 w-full">
              <Image
                src={capturedImage || "/placeholder.svg"}
                alt="Foto da palma capturada"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Input for file upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e)}
            className="hidden"
            ref={fileInputRef}
          />

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleCameraClick}
              className="w-full transition-all duration-300 hover:scale-[1.02]"
              size="lg"
            >
              <Camera className="mr-2 h-5 w-5" />
              Tirar foto
            </Button>

            <Button
              onClick={handleUploadClick}
              variant="outline"
              className="w-full transition-all duration-300 hover:scale-[1.02]"
              size="lg"
            >
              <Upload className="mr-2 h-5 w-5" />
              Enviar foto
            </Button>
          </div>

          {cameraError && <div className="text-red-500 text-center text-sm mt-2">{cameraError}</div>}
        </>
      )}

      {capturedImage && !isAnalyzing && (
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => {
              setCapturedImage(null)
            }}
            variant="outline"
            className="transition-all duration-300 hover:scale-[1.02]"
          >
            <Camera className="mr-2 h-5 w-5" />
            Nova foto
          </Button>

          <Button onClick={handleNext} className="transition-all duration-300 hover:scale-[1.02]">
            Analisar palma
          </Button>
        </div>
      )}

      <p className="text-xs text-center text-muted-foreground mt-4">
        Nenhum dado biométrico é coletado. Todos os processos de reconhecimento são realizados no seu dispositivo.
      </p>
    </div>
  )
}
