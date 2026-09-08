import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const startups = await prisma.startupProfile.findMany({
      select: {
        id: true,
        companyName: true,
        sector: true,
        city: true,
        description: true,
        website: true,
        yearFounded: true,
        teamSize: true,
        logo: true,
        isVerified: true,
        needs: {
          select: {
            skillName: true,
          },
        },
        opportunities: {
          where: {
            isActive: true,
          },
          select: {
            id: true,
            title: true,
          },
          take: 3,
        },
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(startups)
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
