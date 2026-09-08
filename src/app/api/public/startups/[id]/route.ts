import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const startup = await prisma.startupProfile.findUnique({
      where: { id: params.id },
      include: {
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
            type: true,
            location: true,
            remote: true,
          },
        },
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    })

    if (!startup) {
      return NextResponse.json({ error: 'Startup non trouvée' }, { status: 404 })
    }

    return NextResponse.json(startup)
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
