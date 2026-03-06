import { NextResponse } from "next/server"

// Vercel 서버리스 함수를 한국 리전에서 실행
export const runtime = "edge"
export const preferredRegion = "icn1"

// 서버 캐시 (60초)
let cachedData: Record<string, unknown> | null = null
let lastFetchTime = 0
const CACHE_MS = 60_000

// 한국금거래소 JSON API 응답 타입
interface KGXPriceEntry {
  date: string
  s_pure: number   // 순금 살 때
  p_pure: number   // 순금 팔 때
  s_18k: number    // 18K 살 때
  p_18k: number    // 18K 팔 때
  s_14k: number    // 14K 살 때
  p_14k: number    // 14K 팔 때
  s_white: number  // 백금 살 때
  p_white: number  // 백금 팔 때
  s_silver: number // 은 살 때
  p_silver: number // 은 팔 때
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

function calcChange(
  current: number,
  previous: number | undefined
): PriceChange | null {
  if (previous === undefined || previous === 0) return null
  const amount = current - previous
  const rate = ((amount / previous) * 100).toFixed(2)
  const direction = amount > 0 ? "up" : amount < 0 ? "down" : "same"
  return {
    rate: `${amount > 0 ? "+" : ""}${rate}%`,
    amount,
    direction,
  }
}

// 한국금거래소 공식 API 호출
async function fetchKoreanGoldExchangeAPI(): Promise<KGXPriceEntry[] | null> {
  try {
    const today = new Date()
    const oneMonthAgo = new Date(today)
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

    const fmt = (d: Date) =>
      `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`

    const res = await fetch(
      "https://www.koreagoldx.co.kr/api/price/chart/list",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          "Referer": "https://www.koreagoldx.co.kr/",
        },
        body: JSON.stringify({
          srchDt: "1M",
          type: "Au",
          dataDateStart: fmt(oneMonthAgo),
          dataDateEnd: fmt(today),
        }),
      }
    )

    if (!res.ok) return null
    const data = await res.json()
    return data.list as KGXPriceEntry[]
  } catch {
    return null
  }
}

export async function GET() {
  const now = Date.now()
  if (cachedData && now - lastFetchTime < CACHE_MS) {
    return NextResponse.json(cachedData)
  }

  try {
    // 병렬로 API 호출
    const [upbitRes, rateRes, kgxResult] = await Promise.allSettled([
      fetch(
        "https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH,KRW-XRP,KRW-USDT,KRW-SOL,KRW-DOGE",
        { cache: "no-store" }
      ),
      fetch("https://api.exchangerate-api.com/v4/latest/USD", {
        cache: "no-store",
      }),
      fetchKoreanGoldExchangeAPI(),
    ])

    // ── 암호화폐 처리 ──
    const cryptoMap: Record<string, string> = {
      "KRW-BTC": "비트코인",
      "KRW-ETH": "이더리움",
      "KRW-XRP": "리플",
      "KRW-USDT": "테더",
      "KRW-SOL": "솔라나",
      "KRW-DOGE": "도지코인",
    }
    const symbolMap: Record<string, string> = {
      "KRW-BTC": "BTC",
      "KRW-ETH": "ETH",
      "KRW-XRP": "XRP",
      "KRW-USDT": "USDT",
      "KRW-SOL": "SOL",
      "KRW-DOGE": "DOGE",
    }

    let crypto: Array<{
      name: string
      symbol: string
      price: number
      changeRate: number
      changePrice: number
      change: string
    }> = []

    if (upbitRes.status === "fulfilled" && upbitRes.value.ok) {
      const upbitData = await upbitRes.value.json()
      crypto = upbitData.map(
        (item: {
          market: string
          trade_price: number
          signed_change_rate: number
          signed_change_price: number
          change: string
        }) => ({
          name: cryptoMap[item.market] || item.market,
          symbol: symbolMap[item.market] || item.market,
          price: item.trade_price,
          changeRate: item.signed_change_rate * 100,
          changePrice: item.signed_change_price,
          change: item.change,
        })
      )
    }

    // ── 한국금거래소 시세 처리 ──
    let goldMarket: GoldMarketItem[] = []
    let metals: Array<{ name: string; price: number; unit: string }> = []

    if (kgxResult.status === "fulfilled" && kgxResult.value?.length) {
      const list = kgxResult.value
      const latest = list[0]

      // 전일 대비 변동 계산: 오늘과 다른 날짜의 첫 번째 항목 찾기
      const todayDate = latest.date.split(" ")[0]
      const prevEntry = list.find(
        (item) => item.date.split(" ")[0] !== todayDate
      )

      goldMarket = [
        {
          name: "순금시세",
          nameEn: "Gold24k-3.75g",
          buyPrice: latest.s_pure,
          buyChange: calcChange(latest.s_pure, prevEntry?.s_pure),
          sellPrice: latest.p_pure,
          sellChange: calcChange(latest.p_pure, prevEntry?.p_pure),
          note: null,
        },
        {
          name: "18K 금시세",
          nameEn: "Gold18k-3.75g",
          buyPrice: null, // 제품시세적용
          buyChange: null,
          sellPrice: latest.p_18k,
          sellChange: calcChange(latest.p_18k, prevEntry?.p_18k),
          note: null,
        },
        {
          name: "14K 금시세",
          nameEn: "Gold14k-3.75g",
          buyPrice: null, // 제품시세적용
          buyChange: null,
          sellPrice: latest.p_14k,
          sellChange: calcChange(latest.p_14k, prevEntry?.p_14k),
          note: null,
        },
        {
          name: "백금시세",
          nameEn: "Platinum-3.75g",
          buyPrice: latest.s_white,
          buyChange: calcChange(latest.s_white, prevEntry?.s_white),
          sellPrice: latest.p_white,
          sellChange: calcChange(latest.p_white, prevEntry?.p_white),
          note: "(자사백금바기준)",
        },
        {
          name: "은시세",
          nameEn: "Silver-3.75g",
          buyPrice: latest.s_silver,
          buyChange: calcChange(latest.s_silver, prevEntry?.s_silver),
          sellPrice: latest.p_silver,
          sellChange: calcChange(latest.p_silver, prevEntry?.p_silver),
          note: "(자사실버바기준)",
        },
      ]

      // 기존 귀금속 카드용 데이터 (1g 기준)
      metals = [
        {
          name: "금 24K",
          price: Math.round(latest.s_pure / 3.75),
          unit: "g",
        },
        {
          name: "금 18K",
          price: Math.round(latest.s_18k / 3.75),
          unit: "g",
        },
        {
          name: "금 14K",
          price: Math.round(latest.s_14k / 3.75),
          unit: "g",
        },
        {
          name: "은",
          price: Math.round(latest.s_silver / 3.75),
          unit: "g",
        },
        {
          name: "백금",
          price: Math.round(latest.s_white / 3.75),
          unit: "g",
        },
      ]
    }

    // ── 달러 환율 처리 ──
    let usdKrwData: {
      rate: number
      buyPrice: number
      sellPrice: number
    } | null = null

    if (rateRes.status === "fulfilled" && rateRes.value.ok) {
      const rateData = await rateRes.value.json()
      const usdToKrw: number = rateData.rates?.KRW || 1457
      usdKrwData = {
        rate: Math.round(usdToKrw),
        buyPrice: Math.round(usdToKrw * 1.0175),
        sellPrice: Math.round(usdToKrw * 0.9825),
      }
    }

    const result = {
      crypto,
      metals,
      goldMarket,
      usdKrw: usdKrwData,
      timestamp: now,
    }

    cachedData = result
    lastFetchTime = now

    return NextResponse.json(result)
  } catch {
    if (cachedData) {
      return NextResponse.json(cachedData)
    }
    return NextResponse.json(
      { error: "시세 정보를 가져올 수 없습니다." },
      { status: 500 }
    )
  }
}
