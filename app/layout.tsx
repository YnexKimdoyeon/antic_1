import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"

import type { Metadata } from "next"

/* ================================
   Metadata
================================ */
export const metadata: Metadata = {
  title: "바로팩토리 | 안전하고 빠른 상품권 거래 플랫폼, 신뢰할 수 있는 금융 서비스",
  description:
    "바로팩토리는 안전하고 빠른 상품권 거래를 위한 상품권 거래 플랫폼입니다. 비대면 환경에서도 신뢰할 수 있는 거래 구조로 상품권 매입·판매 및 관련 금융 서비스를 편리하게 이용할 수 있도록 지원합니다.",

  verification: {
    google: "6XnGijBG6ODBwR5FCBUmBD_pPXlBG7ueJIHCVIxRklM",
    other: {
      "naver-site-verification": "0bc0131748a50b4b67714572cbc28af2d4f01ae6",
    },
  },

  alternates: {
    canonical: "https://www.untactsave.com/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  openGraph: {
    type: "website",
    siteName: "바로팩토리",
    title: "바로팩토리 | 안전하고 빠른 상품권 거래 플랫폼",
    description:
      "안전한 시스템 기반의 상품권 거래 플랫폼 바로팩토리",
    url: "https://www.untactsave.com/",
    locale: "ko_KR",
    images: [
      {
        url: "https://i.postimg.cc/cHJ5mmFh/Kakao-Talk-20251205-155118100.png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "바로팩토리",
    description: "안전하고 빠른 상품권 거래 플랫폼",
    images: ["https://i.postimg.cc/cHJ5mmFh/Kakao-Talk-20251205-155118100.png"],
  },

  other: {
    keywords:
      "바로팩토리, 상품권 거래, 상품권 매입, 상품권 판매, 기프티콘",
    "theme-color": "#ffffff",
  },
}

/* ================================
   RootLayout (단 1개!)
================================ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.untactsave.com/",
    name: "바로팩토리",
  }

  return (
    <html lang="ko">
      <head>
        {/* manifest */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VLGWTWQCCY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VLGWTWQCCY');
          `}
        </Script>
      </head>

      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
