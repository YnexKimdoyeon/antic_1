import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"

// app/layout.tsx (또는 app/layout.ts)
import type { Metadata } from "next";

export const metadata: Metadata = {
  // ================================
  // 메타 제목 / 설명
  // ================================
  title: "바로팩토리 | 안전하고 빠른 상품권 거래 플랫폼, 신뢰할 수 있는 금융 서비스",
  description:
    "바로팩토리는 안전하고 빠른 상품권 거래를 위한 상품권 거래 플랫폼입니다. 비대면 환경에서도 신뢰할 수 있는 거래 구조로 상품권 매입·판매 및 관련 금융 서비스를 편리하게 이용할 수 있도록 지원합니다.",

  // ================================
  // 기본 인증 (네이버 / 구글)
  // ================================
  verification: {
    google: "6XnGijBG6ODBwR5FCBUmBD_pPXlBG7ueJIHCVIxRklM",
    other: {
      "naver-site-verification" content="0bc0131748a50b4b67714572cbc28af2d4f01ae6",
    },
  },

  // ================================
  // Canonical (대표 URL)
  // ================================
  alternates: {
    canonical: "https://www.untactsave.com/",
  },

  // ================================
  // Robots 규칙 (Google / Naver / Bing / Daum / 기타)
  // ================================
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

  // ================================
  // 파비콘 / 아이콘
  // ================================
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },

  // ================================
  // Open Graph (SNS 최적화)
  // ================================
  openGraph: {
    type: "website",
    siteName: "바로팩토리",
    title: "바로팩토리 | 안전하고 빠른 상품권 거래 플랫폼, 신뢰할 수 있는 금융 서비스",
    description:
      "바로팩토리는 안전한 시스템 기반으로 상품권 거래를 빠르고 편리하게 지원하는 상품권 거래 플랫폼입니다. 신뢰할 수 있는 금융 서비스 구조로 안정적인 거래 환경을 제공합니다.",
    url: "https://www.untactsave.com/",
    locale: "ko_KR",
    images: [
      {
        url: "https://i.postimg.cc/cHJ5mmFh/Kakao-Talk-20251205-155118100.png",
      },
    ],
  },

  // ================================
  // Twitter Cards
  // ================================
  twitter: {
    card: "summary_large_image",
    title: "바로팩토리 | 안전하고 빠른 상품권 거래 플랫폼, 신뢰할 수 있는 금융 서비스",
    description:
      "바로팩토리는 안전하고 빠른 상품권 거래를 지원하는 상품권 거래 플랫폼입니다. 신뢰할 수 있는 금융 서비스 구조로 안정적인 거래 환경을 제공합니다.",
    images: ["https://i.postimg.cc/cHJ5mmFh/Kakao-Talk-20251205-155118100.png"],
  },

  // ================================
  // 기타 meta 태그들 (keywords, classification, bot들, theme-color 등)
  // Next Metadata에서 직접 필드가 없어서 other로 유지
  // ================================
  other: {
    // keywords / classification
    keywords:
      "바로팩토리, 바로팩토리 상품권, 바로팩토리 상품권거래, 바로팩토리 상품권플랫폼, 상품권 거래 플랫폼, 안전한 상품권 거래, 빠른 상품권 거래, 모바일상품권, 기프티콘 거래, 상품권 매입, 상품권 판매, 상품권 시세, 비대면 거래, 신뢰할 수 있는 금융 서비스",
    classification:
      "상품권 거래 플랫폼, 상품권 매입, 상품권 판매, 기프티콘, 모바일상품권, 실시간 시세, 자동 거래, 고객지원, 공지사항",

    // 원본 robots 세부값을 최대한 동일하게 유지
    robots: "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    googlebot:
      "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    naverbot: "index,follow",
    yeti: "index,follow",
    bingbot:
      "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    daumoa: "index,follow",

    // theme / ms tile
    "theme-color": "#ffffff",
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/mstile-144x144.png",

    // Article Tags (중복 meta로 여러 개가 필요하니 layout에서 head에 직접 넣는 게 가장 정확하지만,
    // metadata other에서는 1개 값만 가능해서, 여기서는 CSV 형태로 보존)
    "article:tag":
      "바로팩토리, 상품권 거래 플랫폼, 상품권 거래, 상품권 매입, 상품권 판매, 기프티콘, 모바일상품권, 실시간 시세, 자동 거래, 비대면 거래",
  },
};

// -------------------------------
// JSON-LD는 metadata로 못 넣습니다.
// 아래처럼 <head>에 script로 직접 삽입하세요.
// -------------------------------

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.untactsave.com/#website",
        url: "https://www.untactsave.com/",
        name: "바로팩토리",
        description:
          "상품권 거래 플랫폼. 안전하고 빠른 상품권 거래, 신뢰할 수 있는 금융 서비스",
        inLanguage: "ko-KR",
      },
      {
        "@type": "Organization",
        "@id": "https://www.untactsave.com/#organization",
        name: "바로팩토리",
        url: "https://www.untactsave.com/",
        description:
          "바로팩토리는 안전하고 빠른 상품권 거래를 지원하는 상품권 거래 플랫폼으로, 신뢰할 수 있는 금융 서비스 구조를 제공합니다.",
        sameAs: ["https://www.untactsave.com/"],
      },
      {
        "@type": "ItemList",
        "@id": "https://www.untactsave.com/#services",
        name: "바로팩토리 주요 서비스",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "Service",
              name: "상품권 거래",
              serviceType: "상품권 거래 플랫폼",
              provider: { "@id": "https://www.untactsave.com/#organization" },
              url: "https://www.untactsave.com/",
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "Service",
              name: "실시간 시세 확인",
              serviceType: "시세 정보 제공",
              provider: { "@id": "https://www.untactsave.com/#organization" },
              url: "https://www.untactsave.com/",
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "Service",
              name: "자동 거래 지원",
              serviceType: "자동 판매/거래",
              provider: { "@id": "https://www.untactsave.com/#organization" },
              url: "https://www.untactsave.com/",
            },
          },
          {
            "@type": "ListItem",
            position: 4,
            item: {
              "@type": "Service",
              name: "고객지원/상담",
              serviceType: "문의 및 안내",
              provider: { "@id": "https://www.untactsave.com/#organization" },
              url: "https://www.untactsave.com/",
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="ko">
      <head>
        {/* manifest (원본 유지) */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* JSON-LD 삽입 */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Google tag (gtag.js) */}
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
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
