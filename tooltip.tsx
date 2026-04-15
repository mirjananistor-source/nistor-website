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
      {/* Framed Video */}
      <div 
        className="mx-auto"
        style={{ 
          maxWidth: '860px',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(13,115,119,0.3)'
        }}
      >
        <video 
          id="hero-video"
          controls
          playsInline
          style={{ 
            width: '100%',
            maxHeight: '480px',
            objectFit: 'cover',
            display: 'block'
          }}
        >
          <source 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Merceds%20vs.%20Fica-hQUyqOEpJuvTzT5pAuYfiNc5GDgM41.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Text Below Video */}
      <div className="text-center" style={{ padding: '24px 0 32px' }}>
        <p 
          className="font-sans leading-relaxed"
          style={{ 
            color: 'rgba(255,255,255,0.7)', 
            fontSize: '14px',
            lineHeight: '1.7',
            marginBottom: '20px'
          }}
        >
          Mi menjamo motor dok Vi vozite.
        </p>
        <a 
          href="#dijagnostika"
          className="inline-block text-white font-medium transition-colors hover:opacity-90"
          style={{ 
            backgroundColor: '#0D7377', 
            padding: '13px 28px',
            borderRadius: '7px',
            fontSize: '14px'
          }}
        >
          Zakazite besplatnu dijagnostiku
        </a>
      </div>
    </section>
  )
}
