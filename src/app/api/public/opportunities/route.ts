import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const opportunities = await prisma.opportunity.findMany({
      where: {
        isActive: true,
      },
      include: {
        startupProfile: {
          select: {
            companyName: true,
            sector: true,
            city: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(opportunities)
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
