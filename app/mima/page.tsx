"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { MimaSurvey } from "@/components/mima-survey"

// URL videa koji ide na ovu stranicu — uploaduj na Vercel Blob i zamijeni
const QR_VIDEO_URL = "https://v5jxvvclvm46vuqh.public.blob.vercel-storage.com/Mima_AI_steps_202604221416.mp4"

const MIMA_AVATAR = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1771973866321-yfsQ8gDzKNdg5PALUQ5Hsxb1mshd7X.png"

// Mapiranje src parametra na lead izvor
const SRC_MAP: Record<string, string> = {
  vizitka: "vizitka",
  purple: "purple",
  prezentacija: "prezentacija",
  qr: "qr",
  teams: "teams",
  linkedin: "linkedin",
}

// Prva poruka prema izvoru
const WELCOME_MAP: Record<string, string> = {
  vizitka: "Kako se Vi zovete?",
  purple: "Kako se Vi zovete?",
  prezentacija: "Kako se Vi zovete?",
  qr: "Kako se Vi zovete?",
  linkedin: "Kako se Vi zovete?",
  teams: "Kako se Vi zovete?",
}

export default function MimaPage() {
  const searchParams = useSearchParams()
  const src = searchParams.get("src") || "qr"
  const leadIzvor = SRC_MAP[src] || "qr"
  const welcomeMessage = WELCOME_MAP[src] || "Kako se Vi zovete?"

  const [videoEnded, setVideoEnded] = useState(false)
  const [chatStarted, setChatStarted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Auto-play video on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked — show video with controls
      })
    }
  }, [])

  // After video ends, show chat after short delay
  useEffect(() => {
    if (videoEnded) {
      const t = setTimeout(() => setChatStarted(true), 600)
      return () => clearTimeout(t)
    }
  }, [videoEnded])

  // Also dispatch mima:start event when chat should start
  useEffect(() => {
    if (chatStarted) {
      window.dispatchEvent(new CustomEvent("mima:start"))
    }
  }, [chatStarted])

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-start"
      style={{ backgroundColor: "#0A1E30" }}
    >
      {/* Logo */}
      <div className="w-full flex justify-center pt-6 pb-4">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nistor_logo_xl-zbxpcfuWG3WmrLy0zZxfAjm5tfRvSw.png"
          alt="NiStor"
          className="h-12 w-auto opacity-80"
        />
      </div>

      {/* Video sekcija */}
      {!chatStarted && (
        <div
          className="w-full flex flex-col items-center"
          style={{ maxWidth: "420px", padding: "0 16px" }}
        >
          <div
            className="w-full rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(13,115,119,0.3)" }}
          >
            <video
              ref={videoRef}
              playsInline
              muted
              style={{ width: "100%", display: "block" }}
              onEnded={() => setVideoEnded(true)}
            >
              <source src={QR_VIDEO_URL} type="video/mp4" />
            </video>
          </div>

          {/* Skip dugme — pojavljuje se nakon 2s */}
          {!videoEnded && (
            <button
              onClick={() => setVideoEnded(true)}
              className="mt-4 text-white/30 hover:text-white/60 text-xs transition-colors"
            >
              Preskoči →
            </button>
          )}
        </div>
      )}

      {/* Chat sekcija */}
      <div
        className="w-full flex flex-col"
        style={{
          maxWidth: "420px",
          padding: "0 16px 24px",
          marginTop: chatStarted ? "0" : "16px",
          flex: chatStarted ? 1 : undefined,
        }}
      >
        {chatStarted && (
          <div className="flex items-center gap-2 py-3">
            <div className="w-7 h-7 rounded-full border border-teal overflow-hidden">
              <img src={MIMA_AVATAR} alt="MIMA" className="w-full h-full object-cover" />
            </div>
            <span className="text-white text-sm font-medium">MIMA</span>
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full ml-1" />
            <span className="text-teal text-xs">aktivna</span>
          </div>
        )}

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(13,115,119,0.4)",
            backgroundColor: "#0A1E30",
            minHeight: chatStarted ? "500px" : "0",
          }}
        >
          <MimaSurvey
            welcomeMessage={welcomeMessage}
            leadIzvor={leadIzvor}
            onStart={() => setChatStarted(true)}
          />
        </div>
      </div>
    </main>
  )
}
