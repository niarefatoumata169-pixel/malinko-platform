'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProfileImageProps {
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function ProfileImage({ name, size = 'md', className = '' }: ProfileImageProps) {
  const [error, setError] = useState(false)

  // Générer les initiales
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase()

  // Taille des classes
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-sm',
    lg: 'w-20 h-20 text-lg',
    xl: 'w-24 h-24 text-xl'
  }

  // Fonction pour normaliser le nom (supprimer les accents)
  const normalizeName = (str: string) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
      .replace(/\s+/g, '-')
  }

  // Construire le chemin de l'image
  const imagePath = `/images/profil/${normalizeName(name)}.jpg`

  if (error) {
    return (
      <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center bg-accent/10 text-accent font-light ${className}`}>
        {initials}
      </div>
    )
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden flex-shrink-0 bg-ivory dark:bg-anthracite ${className}`}>
      <Image
        src={imagePath}
        alt={name}
        width={96}
        height={96}
        className="w-full h-full object-cover"
        onError={() => setError(true)}
      />
    </div>
  )
}
