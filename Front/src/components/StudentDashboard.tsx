import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  User,
  Eye,
  Heart,
  Bookmark,
  TrendingUp,
  MapPin,
  Clock,
  Euro,
  Building2,
  X,
  ExternalLink,
  Mail,
  Phone,
  GraduationCap,
  Code,
  Edit,
  CheckCircle,
  XCircle,
  Clock3,
  MessageSquare,
} from 'lucide-react';
import { mockOffers, mockContactedCompanies } from '../data/mockData';
import { Offer, ContactedCompany } from '../types';
import { StudentPortfolioEdit } from './StudentPortfolioEdit';

interface StudentStats {
  profileViews: number;
  totalMatches: number;
  savedOffers: number;
  applicationsInProgress: number;
}

export function StudentDashboard() {
  const [stats] = useState<StudentStats>({
    profileViews: 342,
    totalMatches: 12,
    savedOffers: 8,
    applicationsInProgress: 5,
  });

  // Simuler les offres sauvegardées (likes)
  const [savedOffers, setSavedOffers] = useState<Offer[]>([
    mockOffers[0],
    mockOffers[1],
    mockOffers[4],
  ]);

  // Entreprises contactées
  const [contactedCompanies] = useState<ContactedCompany[]>(mockContactedCompanies);

  // État pour le modal d'édition du portfolio
  const [isEditPortfolioOpen, setIsEditPortfolioOpen] = useState(false);

  // Données du portfolio (simulées)
  const [portfolioData] = useState({
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@email.com',
    phone: '06 12 34 56 78',
    school: 'Université Paris-Saclay',
    level: 'Master 2',
    field: 'Informatique',
    location: 'Paris',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'SQL'],
    experience:
      "Stage de 6 mois chez StartupTech en développement web. Projet universitaire de création d'une application mobile.",
    projects:
      'Application de gestion de tâches en React Native, Site e-commerce avec Next.js',
    languages: 'Français (natif), Anglais (C1), Espagnol (B1)',
  });

  const removeSavedOffer = (offerId: string) => {
    setSavedOffers(savedOffers.filter((offer) => offer.id !== offerId));
  };

  const getStatusBadge = (status: ContactedCompany['status']) => {
    switch (status) {
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            <Clock3 className="h-3 w-3 mr-1" />
            En attente
          </Badge>
        );
      case 'replied':
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            <MessageSquare className="h-3 w-3 mr-1" />
            Répondu
          </Badge>
        );
      case 'accepted':
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Accepté
          </Badge>
        );
      case 'rejected':
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Refusé
          </Badge>
        );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="mb-2 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
          Mon espace étudiant
        </h1>
        <p className="text-gray-600">
          Suivez vos candidatures et consultez vos statistiques
        </p>
      </motion.div>

      {/* Statistiques */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Vues du profil</p>
                <p className="text-3xl">{stats.profileViews}</p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +23% ce mois
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Matches</p>
                <p className="text-3xl">{stats.totalMatches}</p>
                <p className="text-xs text-gray-500 mt-1">Intérêts mutuels</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Offres sauvegardées</p>
                <p className="text-3xl">{savedOffers.length}</p>
                <p className="text-xs text-gray-500 mt-1">À consulter</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Bookmark className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Candidatures</p>
                <p className="text-3xl">{stats.applicationsInProgress}</p>
                <p className="text-xs text-orange-600 mt-1">En cours</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Mon Portfolio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2>Mon portfolio</h2>
          <Button
            variant="outline"
            className="border-green-200 hover:bg-green-50 text-green-700"
            onClick={() => setIsEditPortfolioOpen(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Modifier mon profil
          </Button>
        </div>
        <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Infos personnelles */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {portfolioData.firstName} {portfolioData.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">{portfolioData.field}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  {portfolioData.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  {portfolioData.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {portfolioData.location}
                </div>
              </div>
            </div>

            {/* Formation */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Formation
              </h4>
              <p className="font-medium">{portfolioData.school}</p>
              <p className="text-sm text-gray-600">{portfolioData.level}</p>
              <p className="text-sm text-gray-600">{portfolioData.field}</p>
            </div>

            {/* Compétences */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Code className="h-4 w-4" />
                Compétences
              </h4>
              <div className="flex flex-wrap gap-2">
                {portfolioData.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-violet-100 text-violet-700"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Entreprises contactées */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2>Entreprises contactées</h2>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            {contactedCompanies.length} entreprise
            {contactedCompanies.length > 1 ? 's' : ''}
          </Badge>
        </div>

        <Card className="bg-white/70 backdrop-blur-md border-white/20 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {contactedCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">{company.companyName}</h4>
                    <p className="text-sm text-gray-600">{company.offerTitle}</p>
                    <p className="text-xs text-gray-400">
                      Contacté le{' '}
                      {new Date(company.contactDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                {getStatusBadge(company.status)}
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Offres sauvegardées */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2>Mes offres sauvegardées</h2>
          <Badge variant="secondary" className="bg-violet-100 text-violet-700">
            {savedOffers.length} offre{savedOffers.length > 1 ? 's' : ''}
          </Badge>
        </div>

        {savedOffers.length === 0 ? (
          <Card className="p-12 bg-white/70 backdrop-blur-md border-white/20 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
                <Bookmark className="h-10 w-10 text-gray-400" />
              </div>
              <div>
                <h3 className="mb-2">Aucune offre sauvegardée</h3>
                <p className="text-gray-600 mb-4">
                  Commencez à swiper pour trouver votre opportunité idéale
                </p>
                <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700">
                  Découvrir les offres
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {savedOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20 hover:shadow-xl transition-all hover:scale-[1.02]">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3>{offer.title}</h3>
                          <p className="text-sm text-gray-600">
                            {offer.companyName}
                          </p>
                        </div>
                        <Badge
                          className={
                            offer.type === 'alternance'
                              ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                              : 'bg-purple-100 text-purple-700 hover:bg-purple-100'
                          }
                        >
                          {offer.type}
                        </Badge>
                      </div>

                      <p className="text-gray-600 mb-4">{offer.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {offer.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {offer.duration}
                        </div>
                        {offer.salary && (
                          <div className="flex items-center gap-1">
                            <Euro className="h-4 w-4" />
                            {offer.salary}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700">
                          Postuler maintenant
                        </Button>
                        <Button variant="outline" className="border-gray-200">
                          Voir les détails
                        </Button>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      className="ml-4 text-gray-400 hover:text-red-600 hover:bg-red-50"
                      onClick={() => removeSavedOffer(offer.id)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Modal d'édition du portfolio */}
      <StudentPortfolioEdit
        isOpen={isEditPortfolioOpen}
        onClose={() => setIsEditPortfolioOpen(false)}
        initialData={portfolioData}
      />
    </div>
  );
}
