'use client'

import Image from 'next/image'
import { ReactNode, useState } from 'react'

interface PhotoOverlayProps {
  src: string
  alt: string
  children: ReactNode
  className?: string
  position?: 'center' | 'bottom' | 'top'
  overlayOpacity?: 'light' | 'medium' | 'dark'
}

export function PhotoOverlay({
  src,
  alt,
  children,
  className = '',
  position = 'center',
  overlayOpacity = 'medium'
}: PhotoOverlayProps) {
  const [error, setError] = useState(false)

  const positionClasses = {
    center: 'items-center justify-center text-center',
    bottom: 'items-end justify-start pb-6 sm:pb-8',
    top: 'items-start justify-start pt-6 sm:pt-8'
  }

  const opacityClasses = {
    light: 'bg-gradient-to-b from-black/10 via-black/20 to-black/30',
    medium: 'bg-gradient-to-b from-black/30 via-black/40 to-black/60',
    dark: 'bg-gradient-to-b from-black/50 via-black/60 to-black/80'
  }

  if (error) {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/10 to-card aspect-square ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-6xl mb-3 text-foreground-secondary/20">👤</div>
            <p className="text-foreground-secondary/40 text-sm">Photo de Amadou Diallo</p>
            <p className="text-foreground-secondary/20 text-xs mt-1">(à placer dans public/images/profil/amadou-diallo.jpg)</p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="text-white/90 text-xs font-light">
            {children}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={600}
        height={600}
        className="w-full h-full object-cover"
        onError={() => setError(true)}
      />
      <div className={`absolute inset-0 ${opacityClasses[overlayOpacity]}`} />
      <div className={`absolute inset-0 flex ${positionClasses[position]} p-4 sm:p-6 text-white`}>
        <div className="max-w-2xl">
          {children}
        </div>
      </div>
    </div>
  )
}
