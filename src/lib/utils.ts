import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(d)
}

export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(d)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export function calculateProfileCompletion(profile: any): number {
  let completed = 0
  const total = 15

  if (profile.firstName && profile.lastName) completed++
  if (profile.city) completed++
  if (profile.title) completed++
  if (profile.availability) completed++
  if (profile.about) completed++
  if (profile.whatCanIBring) completed++
  if (profile.whyStartup) completed++
  if (profile.desiredOpportunity) completed++
  if (profile.profilePicture) completed++
  if (profile.cvUrl) completed++
  if (profile.education && profile.education.length > 0) completed++
  if (profile.skills && profile.skills.length > 0) completed++
  if (profile.projects && profile.projects.length > 0) completed++
  if (profile.experience && profile.experience.length > 0) completed++

  return Math.round((completed / total) * 100)
}
