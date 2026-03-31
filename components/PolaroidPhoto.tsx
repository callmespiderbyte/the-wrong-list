'use client'

import Image from 'next/image'
import { useRef } from 'react'

interface PolaroidPhotoProps {
  src: string
  alt: string
}

export default function PolaroidPhoto({ src, alt }: PolaroidPhotoProps) {
  const wrapRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent) {
    const el = wrapRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5   // -0.5 → 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.02)`
  }

  function handleMouseLeave() {
    const el = wrapRef.current
    if (!el) return
    el.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)'
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.2s ease', transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      <Image
        src={src}
        alt={alt}
        width={400}
        height={400}
        sizes="(max-width: 768px) 90vw, 400px"
        style={{
          display: 'block',
          objectFit: 'cover',
          width: '100%',
          height: 'auto',
          aspectRatio: '1/1',
          boxShadow: '10px 10px 0px 0px white',
        }}
        priority
      />
    </div>
  )
}
