"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  CircleDollarSign,
  Gem,
} from "lucide-react"

interface CryptoItem {
  name: string
  symbol: string
  price: number
  changeRate: number
  changePrice: number
  change: string
}

interface MetalItem {
  name: string
  price: number
  unit: string
}

interface PriceChange {
  rate: string
  amount: number
  direction: string
}

interface GoldMarketItem {
  name: string
  nameEn: string
  buyPrice: number | null
  buyChange: PriceChange | null
  sellPrice: number
  sellChange: PriceChange | null
  note: string | null
}

interface UsdKrw {
  rate: number
  buyPrice: number
  sellPrice: number
}

interface PriceData {
  crypto: CryptoItem[]
  metals: MetalItem[]
  goldMarket: GoldMarketItem[]
  usdKrw: UsdKrw | null
  timestamp: number
}

function MiniChangeIndicator({ change }: { change: PriceChange | null }) {
  if (!change) return null
  const isDown = change.direction === "down"
  const isUp = change.direction === "up"
  const color = isUp ? "text-red-500" : isDown ? "text-blue-500" : "text-muted-foreground"
  const arrow = isUp ? "▲" : isDown ? "▼" : ""
  return (
    <span className={`text-[8px] sm:text-[10px] ${color} ml-1`}>
      {arrow}{change.amount.toLocaleString("ko-KR")}
    </span>
  )
}

function formatKRW(value: number): string {
  if (value >= 1_000_000) {
    return value.toLocaleString("ko-KR")
  }
  if (value >= 1) {
    return value.toLocaleString("ko-KR")
  }
  return value.toFixed(2)
}

const cryptoIcons: Record<string, string> = {
  BTC: "₿",
  ETH: "Ξ",
  XRP: "✕",
  USDT: "$",
  SOL: "◎",
  DOGE: "Ð",
}

export function PriceTicker() {
  const [data, setData] = useState<PriceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchPrices = useCallback(async (isManual = false) => {
    if (isManual) setRefreshing(true)
    try {
      const res = await fetch("/api/prices")
      if (res.ok) {
        const json = await res.json()
        setData(json)
      }
    } catch {
      // 조용히 실패
    } finally {
      setLoading(false)
      if (isManual) setTimeout(() => setRefreshing(false), 500)
    }
  }, [])

  useEffect(() => {
    fetchPrices()
    const interval = setInterval(() => fetchPrices(), 60_000)
    return () => clearInterval(interval)
  }, [fetchPrices])

  if (loading) {
    return (
      <div className="mb-6 sm:mb-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {[0, 1].map((i) => (
          <Card
            key={i}
            className="border-border/50 bg-card/80 backdrop-blur-sm shadow-md"
          >
            <CardContent className="p-4 sm:p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-6 w-40 rounded bg-muted" />
                {[0, 1, 2, 3].map((j) => (
                  <div key={j} className="flex justify-between">
                    <div className="h-4 w-24 rounded bg-muted" />
                    <div className="h-4 w-28 rounded bg-muted" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="mb-6 sm:mb-8 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
      {/* 암호화폐 시세 */}
      <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm shadow-md">
        <CardContent className="p-0">
          <div className="flex items-center justify-between border-b border-border/30 px-4 py-3 sm:px-5 sm:py-3.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10">
            <div className="flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                암호화폐 시세
              </h3>
            </div>
            <button
              onClick={() => fetchPrices(true)}
              className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] sm:text-xs text-muted-foreground hover:bg-muted/50 transition-colors"
            >
              <RefreshCw
                className={`h-3 w-3 ${refreshing ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">새로고침</span>
            </button>
          </div>

          {/* 테이블 헤더 */}
          <div className="flex items-center justify-between px-4 py-1.5 sm:px-5 text-[9px] sm:text-[11px] text-muted-foreground/60 border-b border-border/20">
            <span>코인</span>
            <div className="flex items-center gap-4 sm:gap-8">
              <span className="w-24 sm:w-32 text-right">현재가(KRW)</span>
              <span className="w-16 sm:w-20 text-right">변동률</span>
            </div>
          </div>

          <div className="divide-y divide-border/20">
            {data.crypto.map((coin) => {
              const isUp = coin.change === "RISE"
              const isDown = coin.change === "FALL"
              const color = isUp
                ? "text-red-500"
                : isDown
                  ? "text-blue-500"
                  : "text-muted-foreground"

              return (
                <div
                  key={coin.symbol}
                  className="flex items-center justify-between px-4 py-2.5 sm:px-5 sm:py-3 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 text-xs sm:text-sm font-bold text-orange-600 dark:text-orange-400">
                      {cryptoIcons[coin.symbol] || coin.symbol[0]}
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-foreground leading-tight">
                        {coin.name}
                      </p>
                      <p className="text-[9px] sm:text-[11px] text-muted-foreground/60">
                        {coin.symbol}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-6">
                    <span
                      className={`w-24 sm:w-32 text-right text-xs sm:text-sm font-bold tabular-nums ${color}`}
                    >
                      ₩{formatKRW(coin.price)}
                    </span>
                    <span
                      className={`flex w-16 sm:w-20 items-center justify-end gap-0.5 text-[10px] sm:text-xs font-semibold tabular-nums ${color}`}
                    >
                      {isUp && <TrendingUp className="h-3 w-3" />}
                      {isDown && <TrendingDown className="h-3 w-3" />}
                      {isUp ? "+" : ""}
                      {coin.changeRate.toFixed(2)}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="px-4 py-1.5 sm:px-5 border-t border-border/20">
            <p className="text-[8px] sm:text-[10px] text-muted-foreground/40 text-right">
              출처: Upbit · 60초마다 자동 갱신
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 귀금속 시세 */}
      <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm shadow-md">
        <CardContent className="p-0">
          <div className="flex items-center justify-between border-b border-border/30 px-4 py-3 sm:px-5 sm:py-3.5 bg-gradient-to-r from-amber-600 to-orange-500">
            <div className="flex items-center gap-2">
              <Gem className="h-4 w-4 sm:h-5 sm:w-5 text-white/90" />
              <h3 className="text-sm sm:text-base font-bold text-white">
                귀금속 시세
              </h3>
            </div>
            <span className="text-[10px] sm:text-xs text-white/70">
              3.75g(1돈) 기준
            </span>
          </div>

          {/* 테이블 헤더 */}
          <div className="grid grid-cols-[1fr_1fr_1fr] bg-neutral-800 text-white">
            <div className="px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-medium">
              종류
            </div>
            <div className="px-2 py-1.5 sm:px-4 sm:py-2 text-center">
              <p className="text-[10px] sm:text-xs font-medium">살 때</p>
            </div>
            <div className="px-2 py-1.5 sm:px-4 sm:py-2 text-center">
              <p className="text-[10px] sm:text-xs font-medium">팔 때</p>
            </div>
          </div>

          {data.goldMarket?.length ? (
            <div className="divide-y divide-border/20">
              {data.goldMarket.map((item) => (
                <div
                  key={item.nameEn}
                  className="grid grid-cols-[1fr_1fr_1fr] items-center hover:bg-muted/30 transition-colors"
                >
                  <div className="px-3 py-2 sm:px-4 sm:py-2.5">
                    <p className="text-[10px] sm:text-xs font-semibold text-foreground leading-tight">
                      {item.name}
                    </p>
                    <p className="text-[8px] sm:text-[10px] text-muted-foreground/60">
                      {item.nameEn}
                    </p>
                  </div>
                  <div className="px-2 py-2 sm:px-4 sm:py-2.5 text-center">
                    {item.buyPrice ? (
                      <div>
                        <span className="text-[10px] sm:text-xs font-bold text-foreground tabular-nums">
                          {item.buyPrice.toLocaleString("ko-KR")}
                        </span>
                        <MiniChangeIndicator change={item.buyChange} />
                      </div>
                    ) : (
                      <span className="text-[9px] sm:text-[10px] text-muted-foreground">
                        제품시세
                      </span>
                    )}
                  </div>
                  <div className="px-2 py-2 sm:px-4 sm:py-2.5 text-center">
                    <div>
                      <span className="text-[10px] sm:text-xs font-bold text-foreground tabular-nums">
                        {item.sellPrice.toLocaleString("ko-KR")}
                      </span>
                      <MiniChangeIndicator change={item.sellChange} />
                    </div>
                  </div>
                </div>
              ))}

              {/* 달러 환율 */}
              {data.usdKrw && (
                <div className="grid grid-cols-[1fr_1fr_1fr] items-center hover:bg-muted/30 transition-colors bg-blue-50/50 dark:bg-blue-950/20">
                  <div className="px-3 py-2 sm:px-4 sm:py-2.5">
                    <p className="text-[10px] sm:text-xs font-semibold text-foreground leading-tight">
                      달러 환율
                    </p>
                    <p className="text-[8px] sm:text-[10px] text-muted-foreground/60">
                      USD/KRW
                    </p>
                  </div>
                  <div className="px-2 py-2 sm:px-4 sm:py-2.5 text-center">
                    <span className="text-[10px] sm:text-xs font-bold text-foreground tabular-nums">
                      {data.usdKrw.buyPrice.toLocaleString("ko-KR")}
                    </span>
                  </div>
                  <div className="px-2 py-2 sm:px-4 sm:py-2.5 text-center">
                    <span className="text-[10px] sm:text-xs font-bold text-foreground tabular-nums">
                      {data.usdKrw.sellPrice.toLocaleString("ko-KR")}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-muted-foreground">
              시세 데이터를 불러오는 중...
            </div>
          )}

          <div className="px-3 py-1.5 sm:px-4 border-t border-border/20">
            <p className="text-[7px] sm:text-[9px] text-muted-foreground/40 text-right">
              출처: 한국금거래소 · 60초마다 자동 갱신
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
