"use client"
import { useEffect } from "react"

export function VideoSection() {

  useEffect(() => {
    const timer = setTimeout(() => {
      const video = document.getElementById('hero-video') as HTMLVideoElement | null
      if (video) {
        video.muted = false
        video.play().catch(() => {
          video.muted = true
          video.play()
        })
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section style={{ backgroundColor: '#0D2137', padding: '0 40px 32px' }}>
      <div className="mx-auto" style={{ maxWidth: '860px', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(13,115,119,0.3)' }}>
        <video
          id="hero-video"
          controls
          playsInline
          style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', display: 'block' }}
        >
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Merceds%20vs.%20Fica-hQUyqOEpJuvTzT5pAuYfiNc5GDgM41.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  )
}