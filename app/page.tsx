"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  CreditCard,
  TrendingUp,
  MessageSquare,
  Gamepad2,
  Zap,
  Headphones,
  Gift,
  Ticket,
  ArrowUpRight,
  Shield,
  Clock,
  Award,
} from "lucide-react"

const links = [
  {
    icon: CreditCard,
    title: "휴대폰 신용카드 재테크",
    description: "스마트한 금융 솔루션",
    url: "https://www.gk119.com/",
  },
  {
    icon: TrendingUp,
    title: "중고폰 시세 보러가기",
    description: "실시간 시세 확인",
    url: "https://docs.google.com/spreadsheets/d/14qL5oUmkoiaaHiFlcHfOjLArLRMB31XDADxKJnZEKLM/edit?gid=0#gid=0",
  },
  {
    icon: MessageSquare,
    title: "중고폰 상담 판매하기",
    description: "전문 상담원과 거래",
    url: "https://open.kakao.com/o/gI5DwjVe",
  },
  {
    icon: Gamepad2,
    title: "게임기 판매하기",
    description: "게임기 빠른 판매",
    url: "https://open.kakao.com/o/sfbDn3Cf",
  },
  {
    icon: Zap,
    title: "상품권 자동 판매하기",
    description: "즉시 자동 거래",
    url: "https://tkoulet.shop/",
  },
  {
    icon: Headphones,
    title: "상품권 상담 판매하기",
    description: "1:1 맞춤 상담",
    url: "https://open.kakao.com/o/gI5DwjVe",
  },
  {
    icon: Gift,
    title: "상품권 구매하기",
    description: "다양한 상품권 구매",
    url: "https://smartstore.naver.com/nowtkoutlet/category/ALL?cp=1",
  },
  {
    icon: Ticket,
    title: "기프티콘 구매하기",
    description: "모바일 기프티콘",
    url: "https://smartstore.naver.com/newworldcon",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/5">
      <div className="mx-auto max-w-[720px] px-4 py-8 sm:px-6 sm:py-12">
        <header className="mb-8 sm:mb-12 text-center">
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-primary backdrop-blur-sm border border-primary/20">
            <Award className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>신뢰할 수 있는 거래 플랫폼</span>
          </div>

          <h1 className="mb-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
            상품권 거래 플랫폼
          </h1>

          <p className="mb-4 sm:mb-6 text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground px-2">
            안전하고 빠른 상품권 거래
            <br />
            <span className="text-sm sm:text-base">신뢰할 수 있는 금융 서비스</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              </div>
              <span className="font-medium">안전거래</span>
            </div>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-secondary/10">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-secondary" />
              </div>
              <span className="font-medium">빠른정산</span>
            </div>
            <div className="h-4 w-px bg-border hidden sm:block" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-accent/10">
                <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent" />
              </div>
              <span className="font-medium">최고시세</span>
            </div>
          </div>
        </header>

        <nav className="mb-12 sm:mb-16 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {links.map((link, index) => {
            const Icon = link.icon
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-transform active:scale-[0.97]"
              >
                <Card className="group h-full overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm shadow-md transition-all hover:scale-[1.02] hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
                  <CardContent className="flex h-full flex-col items-center gap-3 p-5 sm:p-6 text-center">
                    <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary transition-all group-hover:from-primary group-hover:to-secondary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:scale-110">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1.5 sm:mb-2 font-bold text-sm sm:text-base text-card-foreground leading-tight">
                        {link.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground/80 leading-snug">{link.description}</p>
                    </div>
                    <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground/50 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
                  </CardContent>
                </Card>
              </a>
            )
          })}
        </nav>

        <footer className="text-center">
          <p className="text-xs sm:text-sm text-muted-foreground/70">© 2025 상품권 거래 플랫폼. All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
}
