import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  // Créer un utilisateur junior
  const juniorUser = await prisma.user.upsert({
    where: { email: 'junior@demo.com' },
    update: {},
    create: {
      email: 'junior@demo.com',
      password: hashedPassword,
      name: 'Amadou Diallo',
      role: 'JUNIOR',
      juniorProfile: {
        create: {
          firstName: 'Amadou',
          lastName: 'Diallo',
          city: 'Bamako',
          title: 'Développeur Web',
          availability: 'Disponible',
          about: 'Je suis un jeune développeur web passionné par les technologies innovantes.',
          whatCanIBring: 'Je peux apporter mes compétences en développement web et ma capacité à apprendre rapidement.',
          whyStartup: 'Je souhaite rejoindre une startup pour contribuer à des projets concrets et évoluer dans un environnement dynamique.',
          desiredOpportunity: 'Je recherche un poste de développeur web full stack.',
          skills: {
            create: [
              { name: 'React' },
              { name: 'Node.js' },
              { name: 'TypeScript' },
              { name: 'PostgreSQL' },
            ]
          },
          education: {
            create: {
              school: 'Université de Bamako',
              degree: 'Licence en Informatique',
              field: 'Informatique',
              startYear: 2020,
              endYear: 2023,
            }
          }
        }
      }
    }
  })

  // Créer un utilisateur startup
  const startupUser = await prisma.user.upsert({
    where: { email: 'startup@demo.com' },
    update: {},
    create: {
      email: 'startup@demo.com',
      password: hashedPassword,
      name: 'Tech Mali',
      role: 'STARTUP',
      startupProfile: {
        create: {
          companyName: 'Tech Mali',
          sector: 'Technologie',
          city: 'Bamako',
          description: 'Startup malienne spécialisée dans le développement de solutions digitales.',
          yearFounded: 2022,
          teamSize: '5-10',
          needs: {
            create: [
              { skillName: 'React' },
              { skillName: 'Node.js' },
              { skillName: 'UI/UX Design' },
            ]
          }
        }
      }
    }
  })

  console.log('✅ Données de démonstration créées avec succès')
  console.log('📧 junior@demo.com / password123')
  console.log('📧 startup@demo.com / password123')
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
