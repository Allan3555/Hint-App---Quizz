import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: "Quiz de Quiromancia - Descubra os Segredos do Amor",
  description:
    "Descubra os segredos do amor através da quiromancia. Faça nosso quiz rápido e receba uma análise personalizada da sua palma da mão.",
  keywords: "quiromancia, amor, relacionamento, palma da mão, destino, astrologia",
  generator: "v0.dev",
  openGraph: {
    title: "Quiz de Quiromancia - Descubra os Segredos do Amor",
    description:
      "Descubra os segredos do amor através da quiromancia. Faça nosso quiz rápido e receba uma análise personalizada.",
    images: ["/images/palm-center.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'