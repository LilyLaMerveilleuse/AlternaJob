import { Button } from './ui/button';
import { GraduationCap, Building2, Briefcase, Search, Sparkles, User } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onSelectUserType: (type: 'student' | 'company' | 'search') => void;
  isStudentLoggedIn?: boolean;
  isCompanyLoggedIn?: boolean;
  onNavigate?: (view: string) => void;
}

export function Hero({ onSelectUserType, isStudentLoggedIn, isCompanyLoggedIn, onNavigate }: HeroProps) {
  // Cartes pour étudiant connecté
  const renderStudentCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
      <motion.div
        onClick={() => onNavigate?.('offers-list')}
        className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-white/50 hover:border-blue-400 hover:scale-105"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ y: -5 }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-4 rounded-full mb-4 shadow-lg">
            <Search className="h-10 w-10 text-white" />
          </div>
          <h3 className="mb-2">Chercher une offre</h3>
          <p className="text-gray-600 mb-4">
            Parcourez les offres avec filtres et tableau
          </p>
          <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            Rechercher
          </Button>
        </div>
      </motion.div>

      <motion.div
        onClick={() => onNavigate?.('student-search')}
        className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-white/50 hover:border-cyan-400 hover:scale-105"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ y: -5 }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="bg-gradient-to-br from-cyan-400 to-cyan-600 p-4 rounded-full mb-4 shadow-lg">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h3 className="mb-2">Chercher une offre mode swipe</h3>
          <p className="text-gray-600 mb-4">
            Découvrez les offres en swipant comme sur Tinder
          </p>
          <Button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700">
            Swiper
          </Button>
        </div>
      </motion.div>

      <motion.div
        onClick={() => onNavigate?.('student-dashboard')}
        className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-white/50 hover:border-green-400 hover:scale-105"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ y: -5 }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="bg-gradient-to-br from-green-400 to-green-600 p-4 rounded-full mb-4 shadow-lg">
            <User className="h-10 w-10 text-white" />
          </div>
          <h3 className="mb-2">Mon espace</h3>
          <p className="text-gray-600 mb-4">
            Gérez vos favoris, candidatures et portfolio
          </p>
          <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
            Accéder
          </Button>
        </div>
      </motion.div>
    </div>
  );

  // Cartes pour entreprise connectée
  const renderCompanyCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
      <motion.div
        onClick={() => onNavigate?.('students-list')}
        className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-white/50 hover:border-purple-400 hover:scale-105"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ y: -5 }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-4 rounded-full mb-4 shadow-lg">
            <Search className="h-10 w-10 text-white" />
          </div>
          <h3 className="mb-2">Chercher un étudiant</h3>
          <p className="text-gray-600 mb-4">
            Parcourez les profils avec filtres et tableau
          </p>
          <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
            Rechercher
          </Button>
        </div>
      </motion.div>

      <motion.div
        onClick={() => onNavigate?.('company-search')}
        className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-white/50 hover:border-pink-400 hover:scale-105"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ y: -5 }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="bg-gradient-to-br from-pink-400 to-pink-600 p-4 rounded-full mb-4 shadow-lg">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h3 className="mb-2">Chercher un étudiant mode swipe</h3>
          <p className="text-gray-600 mb-4">
            Découvrez les talents en swipant comme sur Tinder
          </p>
          <Button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700">
            Swiper
          </Button>
        </div>
      </motion.div>

      <motion.div
        onClick={() => onNavigate?.('company-dashboard')}
        className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-white/50 hover:border-violet-400 hover:scale-105"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ y: -5 }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="bg-gradient-to-br from-violet-400 to-violet-600 p-4 rounded-full mb-4 shadow-lg">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <h3 className="mb-2">Mon espace</h3>
          <p className="text-gray-600 mb-4">
            Gérez vos offres et informations entreprise
          </p>
          <Button variant="outline" className="w-full border-violet-500 text-violet-600 hover:bg-violet-50">
            Accéder
          </Button>
        </div>
      </motion.div>
    </div>
  );

  // Cartes par défaut (non connecté)
  const renderDefaultCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
      <motion.div
        onClick={() => onSelectUserType('search')}
        className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-white/50 hover:border-blue-400 hover:scale-105"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ y: -5 }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-4 rounded-full mb-4 shadow-lg">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <h3 className="mb-2">Chercher une offre</h3>
          <p className="text-gray-600 mb-4">
            Explorez des centaines d'opportunités d'alternance et de stage
          </p>
          <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
            Rechercher
          </Button>
        </div>
      </motion.div>

      <motion.div
        onClick={() => onSelectUserType('student')}
        className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-white/50 hover:border-green-400 hover:scale-105"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ y: -5 }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="bg-gradient-to-br from-green-400 to-green-600 p-4 rounded-full mb-4 shadow-lg">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <h3 className="mb-2">Je suis étudiant</h3>
          <p className="text-gray-600 mb-4">
            Créez votre profil et postulez aux meilleures offres
          </p>
          <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
            S'inscrire
          </Button>
        </div>
      </motion.div>

      <motion.div
        onClick={() => onSelectUserType('company')}
        className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border-2 border-white/50 hover:border-purple-400 hover:scale-105"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ y: -5 }}
      >
        <div className="flex flex-col items-center text-center">
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-4 rounded-full mb-4 shadow-lg">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <h3 className="mb-2">Je suis entreprise</h3>
          <p className="text-gray-600 mb-4">
            Publiez vos offres et trouvez les meilleurs talents
          </p>
          <Button variant="outline" className="w-full border-purple-500 text-purple-600 hover:bg-purple-50">
            S'inscrire
          </Button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Briefcase className="h-16 w-16 text-white drop-shadow-lg" />
          </motion.div>
        </div>
        <h1 className="mb-4 bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-lg">
          AlternaJob
        </h1>
        <p className="text-xl max-w-2xl mx-auto bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-md">
          {isStudentLoggedIn
            ? 'Bienvenue ! Trouvez votre prochaine opportunité'
            : isCompanyLoggedIn
            ? 'Bienvenue ! Trouvez vos futurs talents'
            : 'La plateforme qui connecte les étudiants avec les entreprises pour des opportunités d\'alternance et de stage'}
        </p>
      </motion.div>

      {isStudentLoggedIn && renderStudentCards()}
      {isCompanyLoggedIn && renderCompanyCards()}
      {!isStudentLoggedIn && !isCompanyLoggedIn && renderDefaultCards()}

      <motion.div 
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg p-6">
          <p className="text-3xl mb-2 text-white drop-shadow-lg">500+</p>
          <p className="text-white/90">Entreprises partenaires</p>
        </div>
        <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg p-6">
          <p className="text-3xl mb-2 text-white drop-shadow-lg">2000+</p>
          <p className="text-white/90">Offres disponibles</p>
        </div>
        <div className="text-center bg-white/20 backdrop-blur-sm rounded-lg p-6">
          <p className="text-3xl mb-2 text-white drop-shadow-lg">95%</p>
          <p className="text-white/90">Taux de satisfaction</p>
        </div>
      </motion.div>
    </div>
  );
}