import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Building2,
  Eye,
  Heart,
  FileText,
  TrendingUp,
  Users,
  MapPin,
  Clock,
  Euro,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  Globe,
  Briefcase,
} from 'lucide-react';
import { mockOffers } from '../data/mockData';

interface CompanyStats {
  totalOffers: number;
  totalViews: number;
  totalMatches: number;
  activeOffers: number;
}

interface CompanyInfo {
  name: string;
  email: string;
  phone: string;
  sector: string;
  size: string;
  website: string;
  description: string;
  location: string;
}

export function CompanyDashboard() {
  // Simuler les données d'une entreprise connectée
  const [companyId] = useState('c1');
  const [stats] = useState<CompanyStats>({
    totalOffers: 5,
    totalViews: 1247,
    totalMatches: 89,
    activeOffers: 3,
  });

  // Informations de l'entreprise
  const [companyInfo] = useState<CompanyInfo>({
    name: 'TechCorp',
    email: 'contact@techcorp.fr',
    phone: '01 23 45 67 89',
    sector: 'Technologie / IT',
    size: '50-200 employés',
    website: 'www.techcorp.fr',
    description:
      "TechCorp est une entreprise innovante spécialisée dans le développement de solutions logicielles. Nous accompagnons nos clients dans leur transformation digitale depuis 2015.",
    location: 'Paris, France',
  });

  // Filtrer les offres de l'entreprise
  const companyOffers = mockOffers.filter(
    (offer) => offer.companyId === companyId
  );

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
          Mon espace entreprise
        </h1>
        <p className="text-gray-600">
          Gérez vos offres et consultez vos statistiques
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
                <p className="text-sm text-gray-600 mb-1">Offres publiées</p>
                <p className="text-3xl">{stats.totalOffers}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Vues totales</p>
                <p className="text-3xl">{stats.totalViews}</p>
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
                <p className="text-sm text-gray-600 mb-1">Offres actives</p>
                <p className="text-3xl">{stats.activeOffers}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Informations de l'entreprise */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2>Informations de l'entreprise</h2>
          <Button
            variant="outline"
            className="border-purple-200 hover:bg-purple-50 text-purple-700"
          >
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </Button>
        </div>
        <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Infos principales */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{companyInfo.name}</h3>
                  <p className="text-sm text-gray-600">{companyInfo.sector}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  {companyInfo.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  {companyInfo.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {companyInfo.location}
                </div>
              </div>
            </div>

            {/* Détails */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Détails
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Secteur d'activité</p>
                  <p className="font-medium">{companyInfo.sector}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Taille de l'entreprise</p>
                  <p className="font-medium">{companyInfo.size}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Site web</p>
                  <a
                    href={`https://${companyInfo.website}`}
                    className="font-medium text-violet-600 hover:underline flex items-center gap-1"
                  >
                    <Globe className="h-3 w-3" />
                    {companyInfo.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold mb-3">À propos</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {companyInfo.description}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Actions rapides */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8"
      >
        <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-2">Actions rapides</h3>
              <p className="text-sm text-gray-600">
                Publiez une nouvelle offre ou consultez vos candidatures
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle offre
              </Button>
              <Button
                variant="outline"
                className="border-violet-200 hover:bg-violet-50"
              >
                <Users className="h-4 w-4 mr-2" />
                Candidatures
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Liste des offres */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2>Vos offres publiées</h2>
          <Badge variant="secondary" className="bg-violet-100 text-violet-700">
            {companyOffers.length} offre{companyOffers.length > 1 ? 's' : ''}
          </Badge>
        </div>

        <div className="grid gap-4">
          {companyOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20 hover:shadow-xl transition-all hover:scale-[1.02]">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3>{offer.title}</h3>
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

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {offer.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
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

                    {/* Statistiques de l'offre */}
                    <div className="flex gap-6 mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-sm">
                        <Eye className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-600">
                          {Math.floor(Math.random() * 200 + 50)} vues
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Heart className="h-4 w-4 text-pink-600" />
                        <span className="text-gray-600">
                          {Math.floor(Math.random() * 30 + 10)} likes
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-green-600" />
                        <span className="text-gray-600">
                          {Math.floor(Math.random() * 15 + 5)} candidatures
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-200 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
