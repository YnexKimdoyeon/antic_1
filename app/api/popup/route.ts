import { NextResponse } from "next/server"
import { kvGet, kvSet, isKvConfigured } from "@/lib/kv"
import { defaultPopupConfig, type PopupConfig } from "@/lib/popup-config"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "antic123"
const KV_KEY = "popup-config"

export async function GET() {
  const stored = await kvGet(KV_KEY)
  if (stored) {
    try {
      const config: PopupConfig = JSON.parse(stored)
      return NextResponse.json({ ...config, kvConfigured: true })
    } catch {
      // invalid JSON, fall through to default
    }
  }

  return NextResponse.json({
    ...defaultPopupConfig,
    kvConfigured: isKvConfigured(),
  })
}

export async function POST(request: Request) {
  // Validate admin password
  const auth = request.headers.get("authorization")
  if (auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json(
      { error: "인증이 필요합니다." },
      { status: 401 }
    )
  }

  if (!isKvConfigured()) {
    return NextResponse.json(
      {
        error: "KV_NOT_CONFIGURED",
        message:
          "Vercel KV가 설정되지 않았습니다. Vercel 대시보드에서 KV 데이터베이스를 생성하고 프로젝트에 연결해주세요.",
      },
      { status: 500 }
    )
  }

  try {
    const config: PopupConfig = await request.json()

    // Validate config
    if (typeof config.enabled !== "boolean") {
      return NextResponse.json(
        { error: "잘못된 데이터 형식입니다." },
        { status: 400 }
      )
    }

    const saved = await kvSet(KV_KEY, JSON.stringify(config))

    if (saved) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { error: "저장에 실패했습니다." },
      { status: 500 }
    )
  } catch {
    return NextResponse.json(
      { error: "잘못된 요청입니다." },
      { status: 400 }
    )
  }
}
