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
  Award,
  MessageCircle,
  Send,
  Phone,
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
    title: "상품권 시세 보러가기",
    description: "실시간 시세 확인",
    url: "https://www.jjtk1123.com/general-1-1",
  },
  {
    icon: MessageSquare,
    title: "중고폰 시세 보러가기",
    description: "실시간 시세 확인",
    url: "https://www.jjtk1123.com/general-1",
  },
  {
    icon: Gamepad2,
    title: "게임기/금 시세보기",
    description: "오늘의 매입/판매 시세보기",
    url: "https://www.jjtk1123.com/single-project",
  },
  {
    icon: Zap,
    title: "상품권 자동 판매하기",
    description: "즉시 자동 거래",
    url: "https://tkoulet.shop/",
  },
  {
    icon: Headphones,
    title: "상품권 구매하기",
    description: "다양한 상품권 구매",
    url: "https://smartstore.naver.com/bbalkangkon",
  },
  {
    icon: Gift,
    title: "기프티콘 구매하기",
    description: "모바일 기프티콘",
    url: "https://smartstore.naver.com/newworldcon",
  },
  {
    icon: Ticket,
    title: "그 외 상담하러가기",
    description: "추가 한도 문의하기",
    url: "https://open.kakao.com/o/gyYwsy7e",
  },
]

const messengers = [
  {
    name: "채널톡",
    subtitle: "즉시상담가능",
    icon: MessageSquare,
    url: "https://barogo777.channel.io/home",
    color: "hover:bg-blue-500",
  },
  {
    name: "카카오톡",
    subtitle: "",
    icon: MessageCircle,
    url: "http://qr.kakao.com/talk/WF3_yuXjyE49OM9BlOCD1jsJ5j0-",
    color: "hover:bg-yellow-500",
  },
  {
    name: "오픈카톡",
    subtitle: "",
    icon: MessageCircle,
    url: "https://open.kakao.com/o/s5cYioVh",
    color: "hover:bg-yellow-400",
  },
  {
    name: "라인",
    subtitle: "",
    icon: MessageCircle,
    url: "https://line.me/ti/p/XFXtrmSuWH",
    color: "hover:bg-green-500",
  },
  {
    name: "텔레그램",
    subtitle: "",
    icon: Send,
    url: "https://t.me/barogo777",
    color: "hover:bg-sky-500",
  },
  {
    name: "전화상담",
    subtitle: "",
    icon: Phone,
    url: "tel:010.5782.5248",
    color: "hover:bg-emerald-500",
  },
]

export default function Home() {
  return (
    <>
      {/* 🔵 채널톡 반짝이는 파란 테두리 효과 */}
      <style jsx global>{`
        @keyframes shine {
          0% {
            border-color: #3b82f6;
            box-shadow: 0 0 5px #3b82f6;
          }
          50% {
            border-color: #60a5fa;
            box-shadow: 0 0 15px #60a5fa;
          }
          100% {
            border-color: #3b82f6;
            box-shadow: 0 0 5px #3b82f6;
          }
        }
        .animate-shine {
          animation: shine 2s infinite ease-in-out;
        }
      `}</style>

      <main className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-secondary/5">
        <div className="mx-auto max-w-[1200px] px-3 py-6 sm:px-6 sm:py-12 md:px-8">
          <header className="mb-6 sm:mb-12 text-center">
            <div className="mb-3 sm:mb-6 inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-primary/10 px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-sm font-medium text-primary backdrop-blur-sm border border-primary/20">
              <Award className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>신뢰할 수 있는 거래 플랫폼</span>
            </div>

            <h1 className="mb-2 sm:mb-3 text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text px-2">
              상품권 거래 플랫폼
            </h1>

            <p className="mb-4 sm:mb-6 text-pretty text-sm sm:text-lg leading-relaxed text-muted-foreground px-4">
              안전하고 빠른 상품권 거래
              <br />
              <span className="text-xs sm:text-base">신뢰할 수 있는 금융 서비스</span>
            </p>

            <Card className="mb-6 sm:mb-8 mx-auto max-w-3xl overflow-hidden border-border/50 bg-gradient-to-br from-card/95 via-card/90 to-accent/5 backdrop-blur-sm shadow-lg">
              <CardContent className="p-4 sm:p-6 md:p-8">
                <div className="mb-3 sm:mb-4 flex items-center justify-center gap-2">
                  <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                    바로가기 메신저
                  </h2>
                </div>

                <p className="text-[10px] sm:text-xs text-muted-foreground/70 mb-4 sm:mb-6 px-2">
                  메신저 이용시 접속이 안되면 다른 메신저를 이용해주세요.
                </p>

                <div className="flex flex-wrap items-start justify-center gap-3 sm:gap-4 md:gap-5">
                  {messengers.map((messenger, index) => {
                    const Icon = messenger.icon
                    return (
                      <a
                        key={index}
                        href={messenger.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-1.5 sm:gap-2 min-w-[70px] sm:min-w-[80px]"
                      >
                        <div
                          className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-background/80 backdrop-blur-sm border-2 border-border/50 transition-all duration-300 group-hover:scale-110 group-hover:border-transparent group-hover:text-white group-hover:shadow-xl ${messenger.color} ${
                            messenger.name === "채널톡" ? "animate-shine" : ""
                          }`}
                        >
                          <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2} />
                        </div>
                        <div className="text-center min-h-[32px] sm:min-h-[36px] flex flex-col justify-start">
                          <span className="block text-[10px] sm:text-xs font-medium text-foreground/80 group-hover:text-foreground transition-colors leading-tight">
                            {messenger.name}
                          </span>
                          {messenger.subtitle && (
                            <span className="block text-[9px] sm:text-[10px] text-muted-foreground/60 leading-tight max-w-[70px] sm:max-w-[80px] mt-0.5">
                              {messenger.subtitle}
                            </span>
                          )}
                        </div>
                      </a>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </header>

          <nav className="mb-8 sm:mb-16 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
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
                    <CardContent className="flex h-full flex-col items-center gap-2 sm:gap-3 p-4 sm:p-6 text-center">
                      <div className="flex h-12 w-12 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary transition-all group-hover:from-primary group-hover:to-secondary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:scale-110">
                        <Icon className="h-5 w-5 sm:h-7 sm:w-7" strokeWidth={2.5} />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1 sm:mb-2 font-bold text-xs sm:text-base text-card-foreground leading-tight">
                          {link.title}
                        </h3>
                        <p className="text-[10px] sm:text-sm text-muted-foreground/80 leading-snug">
                          {link.description}
                        </p>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-muted-foreground/50 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
                    </CardContent>
                  </Card>
                </a>
              )
            })}
          </nav>

          <footer className="text-center px-2">
            <p className="text-[10px] sm:text-sm text-muted-foreground/70">
              © 2025 상품권 거래 플랫폼. All rights reserved.
            </p>
          </footer>
        </div>
      </main>
    </>
  )
}
