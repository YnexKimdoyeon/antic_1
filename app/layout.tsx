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
<link rel="canonical" href="https://www.untactsave.com">


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
      "바로티켓, 티켓아울렛, 소액결제현금화, 신용카드현금화, 휴대폰현금화, 휴대폰결제현금화, 소액결제정책, 소액결제미납, 소액결제, 휴대폰결제, 컨텐츠이용료, 신용카드, 배터리카드, 다모음, 모빌리언스카드, 쿠팡결제, 쿠팡나중결제, 토스후불결제, 토스결제, 하이브리드카드, 햇살론카드, 소액결제현금화방법, 소액결제현금화사이트, 소액결제현금화비교, 소액결제현금화업체, 소액결제현금화수수료, 소액결제현금화순위, 소액결제현금화차단해제, 소액결제현금화모바일, 소액결제현금화문의, 소액결제현금화신청, 빠른소액결제현금화, 소액결제현금화가능여부, 당일소액결제현금화, 안전한소액결제현금화, 소액결제한도해제, 소액결제차단해제, 소액결제승인, 소액결제이용내역, 소액결제우회결제, 소액결제우회방법, 소액결제수수료, 소액결제정책위반, 소액결제미납대처, 소액결제미납해결, 소액결제미납상담, 휴대폰소액결제현금화, 휴대폰결제한도, 휴대폰결제해제, 휴대폰결제우회, 휴대폰결제장애, 휴대폰결제사용, 휴대폰결제인증, 휴대폰결제문제, 휴대폰결제방법, 휴대폰결제차단, 휴대폰결제수수료, 신용카드현금화방법, 신용카드현금화비교, 신용카드현금화수수료, 신용카드현금화업체, 카드현금화, 카드깡, 카드결제현금화, 카드한도현금화, 카드승인현금화, 카드결제대납, 모바일소액결제, 모바일결제현금화, 모바일결제수수료, 모바일컨텐츠결제, 컨텐츠이용료결제, 컨텐츠이용료미납, 컨텐츠이용료현금화, 쿠팡결제차단, 쿠팡나중결제현금화, 토스결제문제, 토스결제현금화, 토스후불결제현금화, 페이코결제현금화, 카카오페이현금화, 네이버페이현금화, 배터리카드현금화, 다모음현금화, 모빌리언스현금화, 모빌리언스결제, 하이브리드카드결제, 하이브리드카드현금화, 간편결제현금화, 간편결제한도, 소액대출대안서비스, 소액대출우회, 미납대처방법, 온라인결제현금화, 결제수단현금화, 후불결제현금화, 체크카드현금화, 선불카드현금화, 캐시비현금화, 기프트카드현금화, 선불폰결제현금화, 유심결제현금화, kt결제현금화, skt결제현금화, lg유플러스결제현금화, 알뜰폰결제현금화, 핸드폰결제현금화, 핸드폰현금화업체, 핸드폰현금화비교, 비대면현금화, 24시간현금화, 즉시현금화, 실시간현금화순위, 현금화업체검증, 현금화수수료비교, 현금화사이트추천, 현금화업체평가, 현금화업체안전도,상품권매입, 온라인상품권매입, 모바일상품권매입, 온누리상품권매입, 문화상품권매입, 해피머니상품권매입, 컬쳐랜드상품권매입, 구글기프트카드매입, 아이튠즈기프트카드매입, 도서상품권매입, 기프트카드매입, 즉시상품권매입, 급매상품권, 상품권현금화, 문화상품권현금화, 해피머니현금화, 컬쳐캐시매입, 상품권매입업체, 상품권매입비교, 상품권매입수수료, 상품권매입24시, 상품권매입추천, 안전한상품권매입, 네이버페이상품권매입, 카카오페이상품권매입, 구글플레이기프트카드매입, 스팀기프트카드매입, 게임쿠폰매입, 상품권시세조회, 상품권매입시세, 상품권즉시매입, 상품권전환, 상품권대리매입, 온라인상품권현금화, 편의점상품권매입, 상품권충전금매입, 상품권코드매입, 상품권실시간매입, 상품권매입센터, 상품권매입점검증, 신규상품권매입, 중고상품권매입, 선불카드매입, 교환권매입, 배달상품권매입, 포인트상품권매입, e쿠폰매입, 모바일상품권즉시매입",
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
