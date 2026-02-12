"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"

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
  goldMarket: GoldMarketItem[]
  usdKrw: UsdKrw | null
  timestamp: number
}

function ChangeIndicator({ change }: { change: PriceChange | null }) {
  if (!change) return null

  const isDown = change.direction === "down"
  const isUp = change.direction === "up"
  const color = isUp
    ? "text-red-500"
    : isDown
      ? "text-blue-500"
      : "text-muted-foreground"

  const arrow = isUp ? "▲" : isDown ? "▼" : ""

  return (
    <p className={`text-[10px] sm:text-xs mt-0.5 ${color}`}>
      <span>{change.rate}</span>
      <span className="ml-1">
        {arrow} {change.amount.toLocaleString("ko-KR")}
      </span>
    </p>
  )
}

export function GoldPriceTable() {
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

  const today = new Date()
  const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`

  if (loading) {
    return (
      <Card className="mb-6 sm:mb-8 overflow-hidden border-border/50 shadow-lg">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-amber-600 to-orange-500 px-4 py-3 sm:px-6 sm:py-4">
            <div className="h-6 w-32 rounded bg-white/20 animate-pulse" />
          </div>
          <div className="p-4 space-y-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 rounded bg-muted animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data?.goldMarket?.length) return null

  return (
    <Card className="mb-6 sm:mb-8 overflow-hidden border-border/50 shadow-lg">
      <CardContent className="p-0">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-500 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between">
          <h2 className="text-base sm:text-xl font-bold text-white">
            오늘의 시세
          </h2>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm text-white/80">{dateStr}</span>
            <button
              onClick={() => fetchPrices(true)}
              className="text-white/70 hover:text-white transition-colors p-1"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${refreshing ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* 테이블 헤더 */}
        <div className="grid grid-cols-[1fr_1fr_1fr] bg-neutral-800 text-white">
          <div className="px-3 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium">
            종류
          </div>
          <div className="px-2 py-2 sm:px-5 sm:py-3 text-center">
            <p className="text-xs sm:text-sm font-medium">내가 살 때</p>
            <p className="text-[9px] sm:text-[11px] text-neutral-400 font-bold">
              (VAT포함)
            </p>
          </div>
          <div className="px-2 py-2 sm:px-5 sm:py-3 text-center">
            <p className="text-xs sm:text-sm font-medium">내가 팔 때</p>
            <p className="text-[9px] sm:text-[11px] text-neutral-400 font-bold">
              (금방금방 앱 기준)
            </p>
          </div>
        </div>

        {/* 테이블 바디 */}
        <div className="divide-y divide-border">
          {data.goldMarket.map((item) => (
            <div
              key={item.nameEn}
              className="grid grid-cols-[1fr_1fr_1fr] items-center hover:bg-muted/30 transition-colors"
            >
              {/* 종류 */}
              <div className="px-3 py-3 sm:px-5 sm:py-4">
                <p className="text-xs sm:text-base font-semibold text-foreground leading-tight">
                  {item.name}
                </p>
                <p className="text-[9px] sm:text-xs text-muted-foreground mt-0.5">
                  {item.nameEn}
                </p>
              </div>

              {/* 내가 살 때 */}
              <div className="px-2 py-3 sm:px-5 sm:py-4 text-center">
                {item.buyPrice ? (
                  <>
                    <p className="text-sm sm:text-lg font-bold text-foreground tabular-nums">
                      {item.buyPrice.toLocaleString("ko-KR")}
                      <span className="text-[10px] sm:text-xs font-normal text-muted-foreground">
                        원
                      </span>
                    </p>
                    <ChangeIndicator change={item.buyChange} />
                  </>
                ) : (
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                    제품시세적용
                  </p>
                )}
              </div>

              {/* 내가 팔 때 */}
              <div className="px-2 py-3 sm:px-5 sm:py-4 text-center">
                <p className="text-sm sm:text-lg font-bold text-foreground tabular-nums">
                  {item.sellPrice.toLocaleString("ko-KR")}
                  <span className="text-[10px] sm:text-xs font-normal text-muted-foreground">
                    원
                  </span>
                </p>
                <ChangeIndicator change={item.sellChange} />
                {item.note && (
                  <p className="text-[9px] sm:text-[11px] text-muted-foreground mt-0.5">
                    {item.note}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* 달러 환율 */}
          {data.usdKrw && (
            <div className="grid grid-cols-[1fr_1fr_1fr] items-center hover:bg-muted/30 transition-colors bg-blue-50/50 dark:bg-blue-950/20">
              <div className="px-3 py-3 sm:px-5 sm:py-4">
                <p className="text-xs sm:text-base font-semibold text-foreground leading-tight">
                  달러 환율
                </p>
                <p className="text-[9px] sm:text-xs text-muted-foreground mt-0.5">
                  USD/KRW
                </p>
              </div>
              <div className="px-2 py-3 sm:px-5 sm:py-4 text-center">
                <p className="text-sm sm:text-lg font-bold text-foreground tabular-nums">
                  {data.usdKrw.buyPrice.toLocaleString("ko-KR")}
                  <span className="text-[10px] sm:text-xs font-normal text-muted-foreground">
                    원
                  </span>
                </p>
              </div>
              <div className="px-2 py-3 sm:px-5 sm:py-4 text-center">
                <p className="text-sm sm:text-lg font-bold text-foreground tabular-nums">
                  {data.usdKrw.sellPrice.toLocaleString("ko-KR")}
                  <span className="text-[10px] sm:text-xs font-normal text-muted-foreground">
                    원
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 푸터 */}
        <div className="px-3 py-2 sm:px-5 sm:py-2.5 border-t border-border/30 bg-muted/20">
          <p className="text-[8px] sm:text-[10px] text-muted-foreground/60 text-right">
            출처: 한국금거래소 · 3.75g(1돈) 기준 · 60초마다 자동 갱신
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
