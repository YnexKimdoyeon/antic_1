"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  Lock,
  Save,
  Eye,
  EyeOff,
  ImageIcon,
  Link2,
  Type,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  LogOut,
  Database,
} from "lucide-react"
import type { PopupConfig } from "@/lib/popup-config"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const [config, setConfig] = useState<PopupConfig>({
    enabled: false,
    imageUrl: "",
    linkUrl: "",
    title: "",
    description: "",
  })

  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error" | "info"
    text: string
  } | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [kvConfigured, setKvConfigured] = useState(false)

  // 세션 복원
  useEffect(() => {
    const savedAuth = sessionStorage.getItem("admin-auth")
    if (savedAuth) {
      setIsAuthenticated(true)
      loadConfig(savedAuth)
    }
  }, [])

  // 로그인
  const handleLogin = async () => {
    if (!password.trim()) return
    setIsLoggingIn(true)
    setLoginError("")

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        sessionStorage.setItem("admin-auth", password)
        setIsAuthenticated(true)
        loadConfig(password)
      } else {
        const data = await res.json()
        setLoginError(data.error || "로그인에 실패했습니다.")
      }
    } catch {
      setLoginError("서버에 연결할 수 없습니다.")
    }

    setIsLoggingIn(false)
  }

  // 로그아웃
  const handleLogout = () => {
    sessionStorage.removeItem("admin-auth")
    setIsAuthenticated(false)
    setPassword("")
  }

  // 설정 불러오기
  const loadConfig = async (authPassword: string) => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/popup")
      const data = await res.json()
      const { kvConfigured: kv, ...popupConfig } = data
      setConfig(popupConfig)
      setKvConfigured(kv)
    } catch {
      setMessage({ type: "error", text: "설정을 불러올 수 없습니다." })
    }
    setIsLoading(false)
  }

  // 저장
  const handleSave = async () => {
    const authPassword = sessionStorage.getItem("admin-auth")
    if (!authPassword) return

    setIsSaving(true)
    setMessage(null)

    try {
      const res = await fetch("/api/popup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authPassword}`,
        },
        body: JSON.stringify(config),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage({ type: "success", text: "저장되었습니다!" })
      } else if (data.error === "KV_NOT_CONFIGURED") {
        setMessage({
          type: "error",
          text: "Vercel KV가 설정되지 않았습니다. 아래 가이드를 참고해주세요.",
        })
      } else {
        setMessage({
          type: "error",
          text: data.message || data.error || "저장에 실패했습니다.",
        })
      }
    } catch {
      setMessage({ type: "error", text: "서버에 연결할 수 없습니다." })
    }

    setIsSaving(false)
  }

  // 설정 변경
  const updateConfig = (key: keyof PopupConfig, value: string | boolean) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  // 로그인 화면
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <Card className="w-full max-w-sm shadow-xl border-0">
          <CardContent className="p-8">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Lock className="h-7 w-7 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">관리자 로그인</h1>
              <p className="mt-1 text-sm text-gray-500">
                팝업을 관리하려면 비밀번호를 입력하세요
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setLoginError("")
                }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className={loginError ? "border-red-400" : ""}
                autoFocus
              />
              {loginError && (
                <p className="flex items-center gap-1.5 text-sm text-red-500">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {loginError}
                </p>
              )}
              <Button
                onClick={handleLogin}
                className="w-full"
                disabled={isLoggingIn || !password.trim()}
              >
                {isLoggingIn ? "로그인 중..." : "로그인"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // 관리자 패널
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* 헤더 */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <h1 className="text-xl font-bold text-gray-900">팝업 관리</h1>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => (window.location.href = "/")}
            >
              사이트 보기
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="mr-1.5 h-4 w-4" />
              로그아웃
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* KV 상태 */}
        <div
          className={`mb-6 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm ${
            kvConfigured
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-amber-200 bg-amber-50 text-amber-700"
          }`}
        >
          <Database className="h-4 w-4" />
          {kvConfigured ? (
            <span>Vercel KV 연결됨 - 팝업을 동적으로 관리할 수 있습니다.</span>
          ) : (
            <span>
              Vercel KV 미설정 - 아래 가이드를 참고하여 설정하면 동적으로 팝업을
              관리할 수 있습니다.
            </span>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* 설정 폼 */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h2 className="mb-6 text-lg font-semibold text-gray-900">
                팝업 설정
              </h2>

              {isLoading ? (
                <div className="flex h-40 items-center justify-center text-gray-400">
                  불러오는 중...
                </div>
              ) : (
                <div className="space-y-5">
                  {/* 활성화 토글 */}
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-900">
                        팝업 활성화
                      </Label>
                      <p className="mt-0.5 text-xs text-gray-500">
                        활성화하면 사이트 방문 시 팝업이 표시됩니다
                      </p>
                    </div>
                    <Switch
                      checked={config.enabled}
                      onCheckedChange={(checked) =>
                        updateConfig("enabled", checked)
                      }
                    />
                  </div>

                  {/* 이미지 URL */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                      <ImageIcon className="h-3.5 w-3.5" />
                      이미지 URL
                    </Label>
                    <Input
                      placeholder="https://example.com/popup-image.jpg"
                      value={config.imageUrl}
                      onChange={(e) =>
                        updateConfig("imageUrl", e.target.value)
                      }
                    />
                    <p className="text-xs text-gray-400">
                      이미지 호스팅 서비스(postimg.cc, imgur 등)에 업로드 후
                      링크를 붙여넣으세요
                    </p>
                  </div>

                  {/* 이미지 미리보기 */}
                  {config.imageUrl && (
                    <div className="overflow-hidden rounded-lg border bg-gray-50">
                      <img
                        src={config.imageUrl}
                        alt="미리보기"
                        className="w-full object-cover"
                        style={{ maxHeight: "200px" }}
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).style.display = "none"
                        }}
                      />
                    </div>
                  )}

                  {/* 링크 URL */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                      <Link2 className="h-3.5 w-3.5" />
                      링크 URL
                    </Label>
                    <Input
                      placeholder="https://example.com"
                      value={config.linkUrl}
                      onChange={(e) =>
                        updateConfig("linkUrl", e.target.value)
                      }
                    />
                    <p className="text-xs text-gray-400">
                      이미지 클릭 시 이동할 URL (선택사항)
                    </p>
                  </div>

                  {/* 제목 */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                      <Type className="h-3.5 w-3.5" />
                      제목
                    </Label>
                    <Input
                      placeholder="공지사항"
                      value={config.title}
                      onChange={(e) =>
                        updateConfig("title", e.target.value)
                      }
                    />
                  </div>

                  {/* 설명 */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
                      <FileText className="h-3.5 w-3.5" />
                      설명
                    </Label>
                    <Textarea
                      placeholder="팝업에 표시할 내용을 입력하세요"
                      value={config.description}
                      onChange={(e) =>
                        updateConfig("description", e.target.value)
                      }
                      rows={3}
                    />
                  </div>

                  {/* 알림 메시지 */}
                  {message && (
                    <div
                      className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm ${
                        message.type === "success"
                          ? "border-green-200 bg-green-50 text-green-700"
                          : message.type === "error"
                            ? "border-red-200 bg-red-50 text-red-700"
                            : "border-blue-200 bg-blue-50 text-blue-700"
                      }`}
                    >
                      {message.type === "success" ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                      ) : (
                        <AlertCircle className="h-4 w-4 shrink-0" />
                      )}
                      {message.text}
                    </div>
                  )}

                  {/* 버튼 */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex-1"
                    >
                      <Save className="mr-1.5 h-4 w-4" />
                      {isSaving ? "저장 중..." : "저장하기"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      {showPreview ? (
                        <EyeOff className="mr-1.5 h-4 w-4" />
                      ) : (
                        <Eye className="mr-1.5 h-4 w-4" />
                      )}
                      미리보기
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 미리보기 + 가이드 */}
          <div className="space-y-6">
            {/* 팝업 미리보기 */}
            {showPreview && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    팝업 미리보기
                  </h2>
                  <div className="overflow-hidden rounded-2xl border bg-white shadow-lg">
                    {config.imageUrl && (
                      <img
                        src={config.imageUrl}
                        alt={config.title || "팝업 이미지"}
                        className="w-full object-cover"
                        style={{ maxHeight: "300px" }}
                      />
                    )}
                    {(config.title || config.description) && (
                      <div className="px-5 py-4">
                        {config.title && (
                          <h3 className="mb-1 text-lg font-bold text-gray-900">
                            {config.title}
                          </h3>
                        )}
                        {config.description && (
                          <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-600">
                            {config.description}
                          </p>
                        )}
                      </div>
                    )}
                    <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
                      <span className="text-xs text-gray-400">
                        오늘 하루 안 보기
                      </span>
                      <span className="text-sm text-gray-500">닫기</span>
                    </div>
                  </div>
                  {!config.enabled && (
                    <p className="mt-3 text-center text-xs text-amber-600">
                      현재 팝업이 비활성화 상태입니다
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Vercel KV 설정 가이드 */}
            {!kvConfigured && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    Vercel KV 설정 가이드
                  </h2>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p className="text-gray-500">
                      팝업을 동적으로 관리하려면 Vercel KV를 설정해야 합니다.
                    </p>
                    <ol className="list-inside list-decimal space-y-2">
                      <li>
                        <strong>Vercel 대시보드</strong>에서 프로젝트 선택
                      </li>
                      <li>
                        <strong>Storage</strong> 탭 클릭
                      </li>
                      <li>
                        <strong>Create Database</strong> →{" "}
                        <strong>KV (Durable Redis)</strong> 선택
                      </li>
                      <li>데이터베이스 이름 입력 후 생성</li>
                      <li>
                        프로젝트에 <strong>Connect</strong> 클릭
                      </li>
                      <li>
                        환경 변수가 자동으로 추가됩니다:
                        <br />
                        <code className="mt-1 block rounded bg-gray-100 px-2 py-1 text-xs">
                          KV_REST_API_URL
                          <br />
                          KV_REST_API_TOKEN
                        </code>
                      </li>
                      <li>프로젝트 재배포</li>
                    </ol>
                    <p className="rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-600">
                      무료 플랜: 256MB 저장소, 월 30,000 요청
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* 팝업 전체 미리보기 (오버레이) */}
      {showPreview && config.enabled && (
        <div className="pointer-events-none fixed inset-0 z-50 hidden items-center justify-center lg:flex">
          {/* 이 영역은 미리보기 카드에서 확인 가능합니다 */}
        </div>
      )}
    </div>
  )
}
