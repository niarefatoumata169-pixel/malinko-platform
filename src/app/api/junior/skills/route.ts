import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const { name, level } = await request.json()
    if (!name) {
      return NextResponse.json({ error: 'Le nom de la compétence est requis' }, { status: 400 })
    }

    const profile = await prisma.juniorProfile.findUnique({
      where: { userId: session.user.id },
    })

    if (!profile) {
      return NextResponse.json({ error: 'Profil non trouvé' }, { status: 404 })
    }

    const skill = await prisma.skill.create({
      data: {
        juniorProfileId: profile.id,
        name,
        level: level || 'Débutant',
      },
    })

    return NextResponse.json(skill)
  } catch (error) {
    console.error('Erreur création compétence:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const skillId = searchParams.get('id')

    if (!skillId) {
      return NextResponse.json({ error: 'ID de compétence requis' }, { status: 400 })
    }

    await prisma.skill.delete({
      where: { id: skillId },
    })

    return NextResponse.json({ message: 'Compétence supprimée' })
  } catch (error) {
    console.error('Erreur suppression compétence:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
