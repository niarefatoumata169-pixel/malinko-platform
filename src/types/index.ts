export type Role = 'JUNIOR' | 'STARTUP'

export interface User {
  id: string
  email: string
  name?: string | null
  role: Role
}

export interface JuniorProfile {
  id: string
  userId: string
  firstName: string
  lastName: string
  city: string
  phone?: string
  title: string
  availability: string
  about: string
  whatCanIBring: string
  whyStartup: string
  desiredOpportunity: string
  cvUrl?: string
  profilePicture?: string
  isVerified: boolean
  profileComplete: boolean
  education: Education[]
  skills: Skill[]
  experience: Experience[]
  projects: Project[]
  certifications: Certification[]
  languages: Language[]
}

export interface StartupProfile {
  id: string
  userId: string
  companyName: string
  sector: string
  city: string
  description: string
  website?: string
  yearFounded?: number
  teamSize?: string
  logo?: string
  isVerified: boolean
  profileComplete: boolean
  opportunities: Opportunity[]
  needs: Need[]
}

export interface Education {
  id: string
  juniorProfileId: string
  school: string
  degree: string
  field?: string
  startYear: number
  endYear?: number
}

export interface Skill {
  id: string
  juniorProfileId: string
  name: string
  level?: string
}

export interface Experience {
  id: string
  juniorProfileId: string
  company: string
  position: string
  startDate: Date
  endDate?: Date
  description?: string
  current: boolean
}

export interface Project {
  id: string
  juniorProfileId: string
  name: string
  description: string
  technologies: string[]
  url?: string
}

export interface Certification {
  id: string
  juniorProfileId: string
  name: string
  issuer: string
  year: number
  url?: string
}

export interface Language {
  id: string
  juniorProfileId: string
  name: string
  level: string
}

export interface Opportunity {
  id: string
  startupProfileId: string
  title: string
  type: string
  location: string
  remote: boolean
  requiredSkills: string[]
  description: string
  idealProfile: string
  applicationDeadline?: Date
  isActive: boolean
  startupProfile?: StartupProfile
}

export interface Application {
  id: string
  juniorProfileId: string
  opportunityId: string
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN'
  message?: string
  juniorProfile?: JuniorProfile
  opportunity?: Opportunity
}

export interface Need {
  id: string
  startupProfileId: string
  skillName: string
}

export interface SavedProfile {
  id: string
  startupProfileId: string
  juniorProfileId: string
  juniorProfile?: JuniorProfile
}
