import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"

import type { Metadata } from "next"

<!-- ================================
     Robots 규칙 (Google/Naver 최신 권장)
================================ -->
<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1">

/* ================================
     Canonical (대표 URL)
================================  */
<link rel="canonical" href="https://www.untactsave.com/">


/* ================================
   Metadata
================================ */
export const metadata: Metadata = {
  title: "바로팩토리 | 안전하고 빠른 상품권 거래 플랫폼, 신뢰할 수 있는 금융 서비스",
  description:
    "바로팩토리는 안전하고 빠른 상품권 거래를 위한 상품권 거래 플랫폼입니다. 비대면 환경에서도 신뢰할 수 있는 거래 구조로 상품권 매입·판매 및 관련 금융 서비스를 편리하게 이용할 수 있도록 지원합니다.",

   /* ================================
     소유확인
================================  */
  verification: {
    google: "2b6cVESGBmMKqKKVYBtbbHz53tLPmT5SPGecFfdRibk",
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
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  openGraph: {
    type: "website",
    siteName: "바로팩토리",
    title: "바로팩토리 | 안전하고 빠른 상품권 거래 플랫폼, 신뢰할 수 있는 금융 서비스",
    description:
      "바로팩토리는 안전한 시스템 기반으로 상품권 거래를 빠르고 편리하게 지원하는 상품권 거래 플랫폼입니다.",
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
    title: "바로팩토리 | 안전하고 빠른 상품권 거래 플랫폼",
    description:
      "바로팩토리는 안전하고 빠른 상품권 거래를 지원하는 상품권 거래 플랫폼입니다.",
    images: ["https://i.postimg.cc/cHJ5mmFh/Kakao-Talk-20251205-155118100.png"],
  },

  other: {
    keywords:
      "바로팩토리, 바로팩토리 상품권, 바로팩토리 상품권거래, 바로팩토리 상품권플랫폼, 바로팩토리 상품권거래사이트, 바로팩토리 안전한거래, 바로팩토리 빠른거래, 바로팩토리 비대면거래, 바로팩토리 금융서비스, 바로팩토리 신뢰거래, 바로팩토리 모바일상품권, 바로팩토리 온라인상품권, 바로팩토리 상품권매매, 바로팩토리 상품권구매, 바로팩토리 상품권판매, 바로팩토리 상품권현금화, 바로팩토리 기프트카드, 바로팩토리 문화상품권, 바로팩토리 백화점상품권, 바로팩토리 안전플랫폼, 바로팩토리 거래시스템, 바로팩토리 정식플랫폼, 바로팩토리 공식사이트, 바로팩토리 전자상품권, 바로팩토리 실시간거래, 바로팩토리 간편거래, 바로팩토리 빠른정산, 바로팩토리 신뢰시스템, 바로팩토리 보안거래, 바로팩토리 안전결제, 바로팩토리 금융플랫폼, 바로팩토리 비대면금융, 바로팩토리 상품권유통, 바로팩토리 상품권중개, 바로팩토리 온라인거래, 바로팩토리 안전서비스, 바로팩토리 거래전문, 바로팩토리 간편결제, 바로팩토리 상품권전문, 바로팩토리 안정성, 바로팩토리 신뢰도, 바로팩토리 거래플랫폼, 바로팩토리 금융거래, 바로팩토리 합법플랫폼, 바로팩토리 정식거래, 바로팩토리 비대면플랫폼, 바로팩토리 상품권서비스, 바로팩토리 빠른처리, 바로팩토리 안전운영, 바로팩토리 신뢰금융, 바로팩토리 상품권솔루션, 바로팩토리 디지털상품권, 바로팩토리 모바일거래, 바로팩토리 온라인금융, 바로팩토리 상품권시스템, 바로팩토리 거래서비스, 바로팩토리 플랫폼서비스, 바로팩토리 공식플랫폼, 바로팩토리 상품권전용, 바로팩토리 안전구조, 바로팩토리 금융신뢰, 바로팩토리 상품권관리, 바로팩토리 거래환경, 바로팩토리 안정적거래, 바로팩토리 비대면서비스, 바로팩토리 신속거래, 바로팩토리 상품권유통플랫폼, 바로팩토리 금융안전, 바로팩토리 상품권전문플랫폼, 바로팩토리 신뢰플랫폼
",
    classification:
      "상품권 거래 플랫폼, 상품권 매입, 상품권 판매",
    "theme-color": "#ffffff",
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/mstile-144x144.png",
    "article:tag":
      "바로팩토리, 상품권 거래 플랫폼, 상품권 거래, 상품권 매입, 상품권 판매",
  },
}

/* ================================
   RootLayout
================================ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.untactsave.com/#website",
        url: "https://www.untactsave.com/",
        name: "바로팩토리",
        inLanguage: "ko-KR",
      },
      {
        "@type": "Organization",
        "@id": "https://www.untactsave.com/#organization",
        name: "바로팩토리",
        url: "https://www.untactsave.com/",
        sameAs: ["https://www.untactsave.com/"],
      },
    ],
  }

  return (
    <html lang="ko">
      <head>
        <link rel="manifest" href="/site.webmanifest" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FN5QFFJFMV"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FN5QFFJFMV');
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
