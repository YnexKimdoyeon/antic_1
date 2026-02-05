"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import type { PopupConfig } from "@/lib/popup-config"

export function PopupModal() {
  const [config, setConfig] = useState<PopupConfig | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [dontShowToday, setDontShowToday] = useState(false)

  useEffect(() => {
    // "오늘 하루 안 보기" 체크
    const lastClosed = localStorage.getItem("popup-closed-date")
    const today = new Date().toISOString().split("T")[0]
    if (lastClosed === today) return

    // 팝업 설정 가져오기
    fetch("/api/popup")
      .then((res) => res.json())
      .then((data) => {
        if (data.enabled && (data.imageUrl || data.title || data.description)) {
          setConfig(data)
          setIsOpen(true)
        }
      })
      .catch(() => {})
  }, [])

  const handleClose = () => {
    if (dontShowToday) {
      const today = new Date().toISOString().split("T")[0]
      localStorage.setItem("popup-closed-date", today)
    }
    setIsOpen(false)
  }

  if (!isOpen || !config) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[400px] overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
        >
          <X className="h-4 w-4" />
        </button>

        {/* 이미지 */}
        {config.imageUrl && (
          <a
            href={config.linkUrl || undefined}
            target={config.linkUrl ? "_blank" : undefined}
            rel={config.linkUrl ? "noopener noreferrer" : undefined}
            className={config.linkUrl ? "cursor-pointer" : "cursor-default"}
          >
            <img
              src={config.imageUrl}
              alt={config.title || "팝업 이미지"}
              className="w-full object-cover"
              style={{ maxHeight: "500px" }}
            />
          </a>
        )}

        {/* 제목 & 설명 */}
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

        {/* 하단 바 */}
        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500 select-none">
            <input
              type="checkbox"
              checked={dontShowToday}
              onChange={(e) => setDontShowToday(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-gray-300 accent-gray-600"
            />
            오늘 하루 안 보기
          </label>
          <button
            onClick={handleClose}
            className="rounded-lg px-4 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}
