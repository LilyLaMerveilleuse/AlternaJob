import { Offer, StudentProfile, ContactedCompany } from '../types';

export const mockOffers: Offer[] = [
  {
    id: '1',
    companyId: 'c1',
    companyName: 'TechCorp',
    title: 'Développeur Full Stack',
    type: 'alternance',
    duration: '12 mois',
    location: 'Paris',
    description: 'Rejoignez notre équipe de développement pour travailler sur des projets innovants utilisant React, Node.js et PostgreSQL.',
    requirements: 'Bac+3/4 en informatique, connaissances en JavaScript, React, et bases de données.',
    postedDate: '2025-10-25',
    salary: '1200€/mois'
  },
  {
    id: '2',
    companyId: 'c2',
    companyName: 'Design Studio',
    title: 'Designer UX/UI',
    type: 'stage',
    duration: '6 mois',
    location: 'Lyon',
    description: 'Participez à la conception d\'interfaces utilisateur pour nos clients dans le secteur du luxe.',
    requirements: 'Bac+3 en design, maîtrise de Figma et Adobe Creative Suite.',
    postedDate: '2025-10-28',
    salary: '800€/mois'
  },
  {
    id: '3',
    companyId: 'c3',
    companyName: 'Marketing Plus',
    title: 'Chargé de Marketing Digital',
    type: 'alternance',
    duration: '24 mois',
    location: 'Bordeaux',
    description: 'Gestion des campagnes digitales, SEO/SEA, réseaux sociaux et analyse de données.',
    requirements: 'Bac+4/5 en marketing digital, connaissances Google Ads et Analytics.',
    postedDate: '2025-10-20',
    salary: '1100€/mois'
  },
  {
    id: '4',
    companyId: 'c4',
    companyName: 'Green Energy',
    title: 'Ingénieur en Énergies Renouvelables',
    type: 'stage',
    duration: '4 mois',
    location: 'Nantes',
    description: 'Étude et développement de solutions énergétiques durables pour nos projets éoliens et solaires.',
    requirements: 'Bac+4 en ingénierie énergétique ou environnementale.',
    postedDate: '2025-10-22',
    salary: '900€/mois'
  },
  {
    id: '5',
    companyId: 'c5',
    companyName: 'Finance Pro',
    title: 'Analyste Financier Junior',
    type: 'alternance',
    duration: '18 mois',
    location: 'Paris',
    description: 'Analyse financière, reporting et support à la gestion de portefeuilles clients.',
    requirements: 'Bac+4/5 en finance ou école de commerce, maîtrise d\'Excel.',
    postedDate: '2025-10-26',
    salary: '1300€/mois'
  },
  {
    id: '6',
    companyId: 'c6',
    companyName: 'Data Insights',
    title: 'Data Analyst',
    type: 'stage',
    duration: '6 mois',
    location: 'Toulouse',
    description: 'Analyse de données, création de dashboards et visualisations pour nos équipes métier.',
    requirements: 'Bac+3/4 en data science, connaissances Python, SQL et Power BI.',
    postedDate: '2025-10-29',
    salary: '850€/mois'
  }
];

export const mockStudents: StudentProfile[] = [
  {
    id: 's1',
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@email.com',
    phone: '06 12 34 56 78',
    school: 'Université Paris-Saclay',
    level: 'Master 2',
    field: 'Informatique',
    location: 'Paris',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'SQL'],
    experience: 'Stage de 6 mois chez StartupTech en développement web. Projet universitaire de création d\'une application mobile.',
    projects: 'Application de gestion de tâches en React Native, Site e-commerce avec Next.js',
    languages: 'Français (natif), Anglais (C1), Espagnol (B1)',
    lookingFor: 'alternance',
    availability: 'Septembre 2025',
    photo: undefined
  },
  {
    id: 's2',
    firstName: 'Thomas',
    lastName: 'Martin',
    email: 'thomas.martin@email.com',
    phone: '06 98 76 54 32',
    school: 'ESCP Business School',
    level: 'Master 1',
    field: 'Marketing Digital',
    location: 'Lyon',
    skills: ['SEO', 'Google Ads', 'Analytics', 'Social Media', 'Content Marketing'],
    experience: 'Assistant marketing chez AgenceWeb pendant 4 mois. Gestion des réseaux sociaux pour 3 clients.',
    projects: 'Campagne de lancement pour une startup, Audit SEO complet',
    languages: 'Français (natif), Anglais (B2)',
    lookingFor: 'stage',
    availability: 'Janvier 2025',
    photo: undefined
  },
  {
    id: 's3',
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 'sophie.bernard@email.com',
    phone: '06 11 22 33 44',
    school: 'École des Beaux-Arts de Nantes',
    level: 'Licence 3',
    field: 'Design UX/UI',
    location: 'Nantes',
    skills: ['Figma', 'Adobe XD', 'Illustrator', 'Photoshop', 'Prototypage'],
    experience: 'Freelance en design graphique depuis 2 ans. Refonte UI pour 5 applications mobiles.',
    projects: 'Design system pour startup fintech, Redesign site e-commerce mode',
    languages: 'Français (natif), Anglais (B2), Allemand (A2)',
    lookingFor: 'both',
    availability: 'Immédiate',
    photo: undefined
  },
  {
    id: 's4',
    firstName: 'Lucas',
    lastName: 'Petit',
    email: 'lucas.petit@email.com',
    phone: '06 55 66 77 88',
    school: 'INSA Lyon',
    level: 'Ingénieur 4ème année',
    field: 'Génie Énergétique',
    location: 'Lyon',
    skills: ['AutoCAD', 'MATLAB', 'Thermodynamique', 'Énergies renouvelables', 'Gestion de projet'],
    experience: 'Stage de 3 mois chez EDF Renouvelables sur un projet éolien offshore.',
    projects: 'Étude de faisabilité parc solaire, Optimisation système de chauffage industriel',
    languages: 'Français (natif), Anglais (C1)',
    lookingFor: 'alternance',
    availability: 'Septembre 2025',
    photo: undefined
  },
  {
    id: 's5',
    firstName: 'Emma',
    lastName: 'Leroy',
    email: 'emma.leroy@email.com',
    phone: '06 99 88 77 66',
    school: 'Sciences Po Bordeaux',
    level: 'Master 2',
    field: 'Communication',
    location: 'Bordeaux',
    skills: ['Relations presse', 'Rédaction', 'Événementiel', 'Community management', 'Stratégie de communication'],
    experience: 'Chargée de communication junior chez Mairie de Bordeaux pendant 6 mois.',
    projects: 'Organisation festival culturel, Campagne de sensibilisation environnementale',
    languages: 'Français (natif), Anglais (C1), Italien (B1)',
    lookingFor: 'stage',
    availability: 'Mars 2025',
    photo: undefined
  },
  {
    id: 's6',
    firstName: 'Antoine',
    lastName: 'Moreau',
    email: 'antoine.moreau@email.com',
    phone: '06 44 33 22 11',
    school: 'HEC Paris',
    level: 'Master 1',
    field: 'Finance',
    location: 'Paris',
    skills: ['Excel avancé', 'VBA', 'Bloomberg', 'Analyse financière', 'Modélisation'],
    experience: 'Assistant analyste chez BNP Paribas pendant 4 mois. Analyse de portefeuilles clients.',
    projects: 'Modèle de valorisation DCF, Analyse sectorielle retail',
    languages: 'Français (natif), Anglais (C2), Mandarin (A2)',
    lookingFor: 'alternance',
    availability: 'Septembre 2025',
    photo: undefined
  }
];

export const mockContactedCompanies: ContactedCompany[] = [
  {
    id: 'cc1',
    companyName: 'TechCorp',
    contactDate: '2025-10-20',
    status: 'replied',
    offerTitle: 'Développeur Full Stack'
  },
  {
    id: 'cc2',
    companyName: 'Design Studio',
    contactDate: '2025-10-25',
    status: 'pending',
    offerTitle: 'Designer UX/UI'
  },
  {
    id: 'cc3',
    companyName: 'Finance Pro',
    contactDate: '2025-10-15',
    status: 'accepted',
    offerTitle: 'Analyste Financier Junior'
  },
  {
    id: 'cc4',
    companyName: 'Marketing Plus',
    contactDate: '2025-10-18',
    status: 'rejected',
    offerTitle: 'Chargé de Marketing Digital'
  }
];
