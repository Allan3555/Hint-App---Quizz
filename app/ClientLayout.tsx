"use client"

import { useEffect } from "react"
import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

function RedirectHandler() {
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      // Get the current hostname
      const hostname = window.location.hostname
      // Get the current path
      const path = window.location.pathname

      // Define the main domain (adjust as needed)
      const mainDomain = "lplinhadodestino.vercel.app"
      const allowedDomains = ["localhost", "127.0.0.1", mainDomain]

      // If not on the main domain and not on the root path
      if (!allowedDomains.some((domain) => hostname.includes(domain)) && path !== "/") {
        // Redirect to the root path
        window.location.href = "/"
      }
    }
  }, [])

  return null
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={inter.className}>
        <RedirectHandler />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <main className="min-h-screen flex flex-col items-center justify-center">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
