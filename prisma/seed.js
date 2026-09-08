const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Démarrage du seed avec données enrichies...')

  const hashedPassword = await bcrypt.hash('password123', 10)

  // Nettoyer les données
  await prisma.contact.deleteMany()
  await prisma.application.deleteMany()
  await prisma.opportunity.deleteMany()
  await prisma.need.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.education.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.project.deleteMany()
  await prisma.certification.deleteMany()
  await prisma.language.deleteMany()
  await prisma.juniorProfile.deleteMany()
  await prisma.startupProfile.deleteMany()
  await prisma.user.deleteMany()

  console.log('🧹 Données existantes supprimées')

  // ============================================
  // PROFIL 1: Amadou Diallo - Développeur Mobile
  // ============================================
  const user1 = await prisma.user.create({
    data: {
      email: 'junior@demo.com',
      password: hashedPassword,
      name: 'Amadou Diallo',
      role: 'JUNIOR',
    }
  })

  const profile1 = await prisma.juniorProfile.create({
    data: {
      userId: user1.id,
      firstName: 'Amadou',
      lastName: 'Diallo',
      city: 'Bamako',
      title: 'Développeur Mobile Flutter',
      availability: 'Disponible',
      about: 'Je suis un développeur mobile passionné par la création d\'applications utiles pour le quotidien des Maliens. Diplômé en informatique, je maîtrise Flutter et le développement multiplateforme.',
      whatCanIBring: 'Je peux apporter mon expertise en développement mobile, ma capacité à créer des interfaces fluides et mon expérience dans la conception d\'applications adaptées au contexte local.',
      whyStartup: 'Je souhaite rejoindre une startup pour créer des solutions mobiles innovantes qui répondent aux besoins réels des utilisateurs maliens.',
      desiredOpportunity: 'Je recherche un poste de développeur mobile Flutter où je pourrai concevoir et développer des applications performantes.',
      isVerified: true,
      profileComplete: true,
    }
  })

  await prisma.skill.createMany({
    data: [
      { juniorProfileId: profile1.id, name: 'Flutter', level: 'Avancé' },
      { juniorProfileId: profile1.id, name: 'Dart', level: 'Avancé' },
      { juniorProfileId: profile1.id, name: 'Firebase', level: 'Intermédiaire' },
      { juniorProfileId: profile1.id, name: 'React Native', level: 'Intermédiaire' },
      { juniorProfileId: profile1.id, name: 'Git', level: 'Intermédiaire' },
      { juniorProfileId: profile1.id, name: 'Figma', level: 'Débutant' },
    ]
  })

  await prisma.education.create({
    data: {
      juniorProfileId: profile1.id,
      school: 'Université des Sciences et Techniques de Bamako',
      degree: 'Licence en Informatique',
      field: 'Développement Mobile',
      startYear: 2020,
      endYear: 2023,
    }
  })

  await prisma.project.createMany({
    data: [
      {
        juniorProfileId: profile1.id,
        name: 'Application de santé mobile',
        description: 'Application de suivi médical pour les patients maliens. Permet la prise de rendez-vous et le suivi des traitements.',
        technologies: 'Flutter,Firebase,Bloc',
      },
      {
        juniorProfileId: profile1.id,
        name: 'Marketplace agricole',
        description: 'Plateforme mobile connectant les producteurs agricoles aux acheteurs. Développée en Flutter avec synchronisation hors ligne.',
        technologies: 'Flutter,SQLite,REST API',
      },
    ]
  })

  await prisma.language.createMany({
    data: [
      { juniorProfileId: profile1.id, name: 'Bambara', level: 'Natif' },
      { juniorProfileId: profile1.id, name: 'Français', level: 'Courant' },
      { juniorProfileId: profile1.id, name: 'Anglais', level: 'Intermédiaire' },
    ]
  })

  console.log('✅ Profil 1: Amadou Diallo - Développeur Mobile')

  // ============================================
  // PROFIL 2: Fatoumata Traoré - Designer UX/UI
  // ============================================
  const user2 = await prisma.user.create({
    data: {
      email: 'fatoumata@demo.com',
      password: hashedPassword,
      name: 'Fatoumata Traoré',
      role: 'JUNIOR',
    }
  })

  const profile2 = await prisma.juniorProfile.create({
    data: {
      userId: user2.id,
      firstName: 'Fatoumata',
      lastName: 'Traoré',
      city: 'Bamako',
      title: 'Designer UX/UI',
      availability: 'Disponible',
      about: 'Designer passionnée par les interfaces intuitives et l\'expérience utilisateur. Je conçois des produits numériques qui allient esthétique et fonctionnalité.',
      whatCanIBring: 'Je peux apporter une vision créative, une maîtrise des outils de design moderne et une compréhension fine des besoins utilisateurs.',
      whyStartup: 'J\'aime l\'agilité des startups et la possibilité de voir mes designs prendre vie rapidement dans des projets concrets.',
      desiredOpportunity: 'Je recherche un poste de Designer UX/UI pour contribuer à la conception de produits digitaux innovants.',
      isVerified: true,
      profileComplete: true,
    }
  })

  await prisma.skill.createMany({
    data: [
      { juniorProfileId: profile2.id, name: 'Figma', level: 'Avancé' },
      { juniorProfileId: profile2.id, name: 'Adobe XD', level: 'Avancé' },
      { juniorProfileId: profile2.id, name: 'Sketch', level: 'Intermédiaire' },
      { juniorProfileId: profile2.id, name: 'Design System', level: 'Avancé' },
      { juniorProfileId: profile2.id, name: 'Prototypage', level: 'Avancé' },
      { juniorProfileId: profile2.id, name: 'User Research', level: 'Intermédiaire' },
    ]
  })

  await prisma.education.create({
    data: {
      juniorProfileId: profile2.id,
      school: 'Institut National des Arts de Bamako',
      degree: 'Licence en Design Graphique',
      field: 'Design UX/UI',
      startYear: 2019,
      endYear: 2022,
    }
  })

  await prisma.certification.create({
    data: {
      juniorProfileId: profile2.id,
      name: 'Certification Google UX Design',
      issuer: 'Google',
      year: 2023,
    }
  })

  await prisma.project.createMany({
    data: [
      {
        juniorProfileId: profile2.id,
        name: 'Application bancaire mobile',
        description: 'Refonte de l\'expérience utilisateur d\'une application bancaire. Simplification du parcours utilisateur et modernisation de l\'interface.',
        technologies: 'Figma,Design System,Prototypage',
      },
      {
        juniorProfileId: profile2.id,
        name: 'Plateforme e-commerce locale',
        description: 'Conception de l\'interface d\'une plateforme e-commerce pour les artisans maliens.',
        technologies: 'Figma,User Research,UI Design',
      },
    ]
  })

  await prisma.language.createMany({
    data: [
      { juniorProfileId: profile2.id, name: 'Français', level: 'Courant' },
      { juniorProfileId: profile2.id, name: 'Bambara', level: 'Natif' },
      { juniorProfileId: profile2.id, name: 'Anglais', level: 'Intermédiaire' },
    ]
  })

  console.log('✅ Profil 2: Fatoumata Traoré - Designer UX/UI')

  // ============================================
  // PROFIL 3: Moussa Cissé - Ingénieur IA
  // ============================================
  const user3 = await prisma.user.create({
    data: {
      email: 'moussa@demo.com',
      password: hashedPassword,
      name: 'Moussa Cissé',
      role: 'JUNIOR',
    }
  })

  const profile3 = await prisma.juniorProfile.create({
    data: {
      userId: user3.id,
      firstName: 'Moussa',
      lastName: 'Cissé',
      city: 'Sikasso',
      title: 'Ingénieur en Intelligence Artificielle',
      availability: 'Disponible',
      about: 'Je suis un ingénieur passionné par l\'IA et la data science. J\'ai développé des compétences solides en machine learning et en analyse de données.',
      whatCanIBring: 'Je peux apporter mon expertise en IA, ma maîtrise de Python et des bibliothèques de data science.',
      whyStartup: 'Je souhaite appliquer mes compétences en IA à des problèmes concrets et participer à l\'innovation technologique au Mali.',
      desiredOpportunity: 'Je recherche un poste d\'Ingénieur en IA ou Data Scientist.',
      isVerified: false,
      profileComplete: true,
    }
  })

  await prisma.skill.createMany({
    data: [
      { juniorProfileId: profile3.id, name: 'Python', level: 'Avancé' },
      { juniorProfileId: profile3.id, name: 'TensorFlow', level: 'Avancé' },
      { juniorProfileId: profile3.id, name: 'Machine Learning', level: 'Avancé' },
      { juniorProfileId: profile3.id, name: 'Data Analysis', level: 'Avancé' },
      { juniorProfileId: profile3.id, name: 'SQL', level: 'Intermédiaire' },
      { juniorProfileId: profile3.id, name: 'Deep Learning', level: 'Intermédiaire' },
    ]
  })

  await prisma.education.create({
    data: {
      juniorProfileId: profile3.id,
      school: 'Université de Sikasso',
      degree: 'Master en Intelligence Artificielle',
      field: 'Machine Learning',
      startYear: 2019,
      endYear: 2023,
    }
  })

  await prisma.certification.createMany({
    data: [
      {
        juniorProfileId: profile3.id,
        name: 'Google Professional ML Engineer',
        issuer: 'Google',
        year: 2023,
      },
      {
        juniorProfileId: profile3.id,
        name: 'AWS Machine Learning Specialty',
        issuer: 'Amazon',
        year: 2022,
      },
    ]
  })

  await prisma.project.create({
    data: {
      juniorProfileId: profile3.id,
      name: 'Système de recommandation agricole',
      description: 'Système de recommandation pour aider les agriculteurs à choisir leurs cultures en fonction des données climatiques.',
      technologies: 'Python,TensorFlow,Scikit-learn',
    }
  })

  await prisma.language.createMany({
    data: [
      { juniorProfileId: profile3.id, name: 'Français', level: 'Courant' },
      { juniorProfileId: profile3.id, name: 'Bambara', level: 'Natif' },
      { juniorProfileId: profile3.id, name: 'Anglais', level: 'Avancé' },
    ]
  })

  console.log('✅ Profil 3: Moussa Cissé - Ingénieur IA')

  // ============================================
  // PROFIL 4: Aminata Koné - Community Manager
  // ============================================
  const user4 = await prisma.user.create({
    data: {
      email: 'aminata@demo.com',
      password: hashedPassword,
      name: 'Aminata Koné',
      role: 'JUNIOR',
    }
  })

  const profile4 = await prisma.juniorProfile.create({
    data: {
      userId: user4.id,
      firstName: 'Aminata',
      lastName: 'Koné',
      city: 'Bamako',
      title: 'Community Manager et Chargée de Communication',
      availability: 'Disponible',
      about: 'Passionnée par la communication digitale et le community management, j\'aide les entreprises à développer leur présence en ligne.',
      whatCanIBring: 'Je peux apporter ma créativité, ma maîtrise des réseaux sociaux et ma capacité à créer du contenu engageant.',
      whyStartup: 'Je souhaite contribuer au développement de la stratégie de communication des startups maliennes.',
      desiredOpportunity: 'Je recherche un poste de Community Manager ou Chargée de Communication Digitale.',
      isVerified: false,
      profileComplete: true,
    }
  })

  await prisma.skill.createMany({
    data: [
      { juniorProfileId: profile4.id, name: 'SEO', level: 'Avancé' },
      { juniorProfileId: profile4.id, name: 'Social Media', level: 'Avancé' },
      { juniorProfileId: profile4.id, name: 'Content Creation', level: 'Avancé' },
      { juniorProfileId: profile4.id, name: 'Community Management', level: 'Avancé' },
      { juniorProfileId: profile4.id, name: 'Canva', level: 'Avancé' },
      { juniorProfileId: profile4.id, name: 'Adobe Suite', level: 'Intermédiaire' },
    ]
  })

  await prisma.education.create({
    data: {
      juniorProfileId: profile4.id,
      school: 'Université des Sciences Juridiques et Politiques',
      degree: 'Licence en Communication',
      field: 'Communication Digitale',
      startYear: 2020,
      endYear: 2023,
    }
  })

  await prisma.certification.create({
    data: {
      juniorProfileId: profile4.id,
      name: 'Google Digital Garage - Marketing Digital',
      issuer: 'Google',
      year: 2023,
    }
  })

  await prisma.language.createMany({
    data: [
      { juniorProfileId: profile4.id, name: 'Français', level: 'Courant' },
      { juniorProfileId: profile4.id, name: 'Bambara', level: 'Natif' },
      { juniorProfileId: profile4.id, name: 'Anglais', level: 'Débutant' },
    ]
  })

  console.log('✅ Profil 4: Aminata Koné - Community Manager')

  // ============================================
  // PROFIL 5: Oumar Sidibé - Analyste Financier
  // ============================================
  const user5 = await prisma.user.create({
    data: {
      email: 'oumar@demo.com',
      password: hashedPassword,
      name: 'Oumar Sidibé',
      role: 'JUNIOR',
    }
  })

  const profile5 = await prisma.juniorProfile.create({
    data: {
      userId: user5.id,
      firstName: 'Oumar',
      lastName: 'Sidibé',
      city: 'Bamako',
      title: 'Analyste Financier',
      availability: 'Disponible',
      about: 'Je suis un analyste financier rigoureux, passionné par la gestion et l\'analyse des données financières.',
      whatCanIBring: 'Je peux apporter mon expertise en analyse financière, ma maîtrise des outils d\'analyse et ma rigueur.',
      whyStartup: 'Je souhaite contribuer à la croissance des startups en structurant leur gestion financière.',
      desiredOpportunity: 'Je recherche un poste d\'Analyste Financier ou de Gestionnaire de Projets.',
      isVerified: false,
      profileComplete: true,
    }
  })

  await prisma.skill.createMany({
    data: [
      { juniorProfileId: profile5.id, name: 'Excel', level: 'Avancé' },
      { juniorProfileId: profile5.id, name: 'Analyse Financière', level: 'Avancé' },
      { juniorProfileId: profile5.id, name: 'Sage', level: 'Intermédiaire' },
      { juniorProfileId: profile5.id, name: 'Power BI', level: 'Intermédiaire' },
      { juniorProfileId: profile5.id, name: 'Gestion de Projets', level: 'Intermédiaire' },
      { juniorProfileId: profile5.id, name: 'Comptabilité', level: 'Intermédiaire' },
    ]
  })

  await prisma.education.create({
    data: {
      juniorProfileId: profile5.id,
      school: 'Institut Supérieur de Gestion de Bamako',
      degree: 'Master en Finance',
      field: 'Finance d\'Entreprise',
      startYear: 2019,
      endYear: 2022,
    }
  })

  await prisma.certification.create({
    data: {
      juniorProfileId: profile5.id,
      name: 'Certification en Analyse Financière',
      issuer: 'Institut de Formation Financière',
      year: 2023,
    }
  })

  await prisma.experience.create({
    data: {
      juniorProfileId: profile5.id,
      company: 'Banque Nationale de Développement',
      position: 'Stagiaire en Analyse Financière',
      startDate: new Date('2022-06-01'),
      endDate: new Date('2022-12-31'),
      description: 'Analyse des dossiers de financement et élaboration de rapports financiers.',
      current: false,
    }
  })

  await prisma.language.createMany({
    data: [
      { juniorProfileId: profile5.id, name: 'Français', level: 'Courant' },
      { juniorProfileId: profile5.id, name: 'Bambara', level: 'Natif' },
      { juniorProfileId: profile5.id, name: 'Anglais', level: 'Intermédiaire' },
    ]
  })

  console.log('✅ Profil 5: Oumar Sidibé - Analyste Financier')

  // ============================================
  // STARTUPS
  // ============================================

  // Startup 1: GreenTech Mali
  const startupUser1 = await prisma.user.create({
    data: {
      email: 'greentech@demo.com',
      password: hashedPassword,
      name: 'GreenTech Mali',
      role: 'STARTUP',
    }
  })

  const startupProfile1 = await prisma.startupProfile.create({
    data: {
      userId: startupUser1.id,
      companyName: 'GreenTech Mali',
      sector: 'Énergie renouvelable',
      city: 'Bamako',
      description: 'GreenTech Mali conçoit et installe des solutions d\'énergie solaire pour les entreprises et les ménages maliens. Nous proposons des installations solaires clés en main pour réduire la facture énergétique.',
      website: 'https://greentechmali.com',
      yearFounded: 2022,
      teamSize: '5-10',
      isVerified: true,
      profileComplete: true,
    }
  })

  await prisma.need.createMany({
    data: [
      { startupProfileId: startupProfile1.id, skillName: 'Ingénieur Énergie' },
      { startupProfileId: startupProfile1.id, skillName: 'Marketing Digital' },
      { startupProfileId: startupProfile1.id, skillName: 'Vente' },
      { startupProfileId: startupProfile1.id, skillName: 'Community Management' },
    ]
  })

  await prisma.opportunity.create({
    data: {
      startupProfileId: startupProfile1.id,
      title: 'Ingénieur en Énergie Solaire',
      type: 'EMPLOI',
      location: 'Bamako',
      remote: false,
      requiredSkills: 'Énergie solaire,Électricité,Conception technique',
      description: 'Nous recherchons un ingénieur en énergie solaire pour concevoir et superviser l\'installation de nos systèmes solaires.',
      idealProfile: 'Jeune diplômé en génie électrique avec une spécialisation en énergie renouvelable.',
      isActive: true,
    }
  })

  console.log('✅ Startup 1: GreenTech Mali')

  // Startup 2: AgriInnov Mali
  const startupUser2 = await prisma.user.create({
    data: {
      email: 'agriinnov@demo.com',
      password: hashedPassword,
      name: 'AgriInnov Mali',
      role: 'STARTUP',
    }
  })

  const startupProfile2 = await prisma.startupProfile.create({
    data: {
      userId: startupUser2.id,
      companyName: 'AgriInnov Mali',
      sector: 'Agrotech',
      city: 'Sikasso',
      description: 'AgriInnov Mali développe des solutions technologiques pour les agriculteurs maliens. Nous proposons une application mobile de conseil agricole et une plateforme de mise en relation avec les acheteurs.',
      website: 'https://agriinnovmali.com',
      yearFounded: 2023,
      teamSize: '3-5',
      isVerified: false,
      profileComplete: true,
    }
  })

  await prisma.need.createMany({
    data: [
      { startupProfileId: startupProfile2.id, skillName: 'Python' },
      { startupProfileId: startupProfile2.id, skillName: 'Data Analysis' },
      { startupProfileId: startupProfile2.id, skillName: 'Machine Learning' },
      { startupProfileId: startupProfile2.id, skillName: 'Flutter' },
    ]
  })

  console.log('✅ Startup 2: AgriInnov Mali')

  console.log('\n📋 Données de démonstration enrichies créées avec succès')
  console.log('👤 5 profils de jeunes diplômés avec parcours complets')
  console.log('🏢 2 startups avec besoins spécifiques')
  console.log('📋 1 opportunité')
  console.log('\n🔑 Comptes de démonstration:')
  console.log('📧 junior@demo.com / password123 (Amadou Diallo - Dev Mobile)')
  console.log('📧 fatoumata@demo.com / password123 (Fatoumata Traoré - Design)')
  console.log('📧 moussa@demo.com / password123 (Moussa Cissé - IA)')
  console.log('📧 aminata@demo.com / password123 (Aminata Koné - Community)')
  console.log('📧 oumar@demo.com / password123 (Oumar Sidibé - Finance)')
  console.log('📧 greentech@demo.com / password123 (GreenTech Mali)')
  console.log('📧 agriinnov@demo.com / password123 (AgriInnov Mali)')
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
