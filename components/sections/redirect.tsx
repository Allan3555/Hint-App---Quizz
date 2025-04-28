"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export default function Redirect() {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Replace with your actual sales page URL
          window.location.href = "https://example.com/sales-page"
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-8">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />

      <h2 className="text-2xl font-bold text-center">Preparando sua análise completa...</h2>

      <p className="text-center text-muted-foreground">Você será redirecionado em {countdown} segundos...</p>
    </div>
  )
}
