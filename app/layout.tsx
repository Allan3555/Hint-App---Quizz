import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"
import Script from "next/script"

export const metadata: Metadata = {
  title: "Linha do Destino - Descubra os Segredos do Amor",
  description:
    "Descubra os segredos do amor através da quiromancia. Faça nosso quiz rápido e receba uma análise personalizada da sua palma da mão.",
  keywords: "quiromancia, amor, relacionamento, palma da mão, destino, astrologia",
  generator: "v0.dev",
  openGraph: {
    title: "Linha do Destino - Descubra os Segredos do Amor",
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
  return (
    <>
      {/* Meta Pixel Code */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '665809572911012');
          fbq('track', 'PageView');
        `}
      </Script>

      {/* Facebook Pixel noscript - usando dangerouslySetInnerHTML para evitar problemas de parsing */}
      <Script id="facebook-pixel-noscript" strategy="afterInteractive">
        {`
          if (typeof document !== 'undefined') {
            var noscript = document.createElement('noscript');
            var img = document.createElement('img');
            img.height = 1;
            img.width = 1;
            img.style.display = 'none';
            img.src = 'https://www.facebook.com/tr?id=665809572911012&ev=PageView&noscript=1';
            noscript.appendChild(img);
            
            // Adicionar ao body quando o DOM estiver pronto
            if (document.body) {
              document.body.appendChild(noscript);
            } else {
              document.addEventListener('DOMContentLoaded', function() {
                document.body.appendChild(noscript);
              });
            }
          }
        `}
      </Script>

      {/* UTMify Script */}
      <Script
        id="utmify"
        src="https://cdn.utmify.com.br/scripts/utms/latest.js"
        data-utmify-prevent-xcod-sck=""
        data-utmify-prevent-subids=""
        strategy="afterInteractive"
      />

      {/* Microsoft Clarity */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "rhfks21lxg");
        `}
      </Script>

      <ClientLayout>{children}</ClientLayout>
    </>
  )
}


import './globals.css'