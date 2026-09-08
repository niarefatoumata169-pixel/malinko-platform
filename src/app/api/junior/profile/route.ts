import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const profile = await prisma.juniorProfile.findUnique({
      where: { userId: session.user.id },
      include: {
        skills: true,
        education: true,
        experience: true,
        projects: true,
        certifications: true,
        languages: true,
      },
    })

    if (!profile) {
      return NextResponse.json({ error: 'Profil non trouvé' }, { status: 404 })
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Erreur GET profil junior:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const body = await request.json()
    const {
      firstName,
      lastName,
      city,
      title,
      availability,
      about,
      whatCanIBring,
      whyStartup,
      desiredOpportunity,
    } = body

    const profile = await prisma.juniorProfile.update({
      where: { userId: session.user.id },
      data: {
        firstName,
        lastName,
        city,
        title,
        availability,
        about,
        whatCanIBring,
        whyStartup,
        desiredOpportunity,
        profileComplete: true,
      },
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Erreur PUT profil junior:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
