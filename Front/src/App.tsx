import { useState } from 'react';
import { Hero } from './components/Hero';
import { StudentRegistration } from './components/StudentRegistration';
import { CompanyRegistration } from './components/CompanyRegistration';
import { SwipeInterface } from './components/SwipeInterface';
import { StudentDashboard } from './components/StudentDashboard';
import { CompanyDashboard } from './components/CompanyDashboard';
import { StudentSwipeInterface } from './components/StudentSwipeInterface';
import { AnimatedBackground } from './components/AnimatedBackground';
import { OffersListView } from './components/OffersListView';
import { StudentsListView } from './components/StudentsListView';
import { Button } from './components/ui/button';
import { ArrowLeft, User } from 'lucide-react';

type View = 'home' | 'student' | 'company' | 'search' | 'student-dashboard' | 'company-dashboard' | 'student-search' | 'company-search' | 'offers-list' | 'students-list';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  // Simuler l'état de connexion
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const [isCompanyLoggedIn, setIsCompanyLoggedIn] = useState(false);

  const handleSelectUserType = (type: 'student' | 'company' | 'search') => {
    setCurrentView(type);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  // Simuler la connexion (à remplacer par une vraie logique d'authentification)
  const handleStudentLogin = () => {
    setIsStudentLoggedIn(true);
    setCurrentView('student-search');
  };

  const handleCompanyLogin = () => {
    setIsCompanyLoggedIn(true);
    setCurrentView('company-search');
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {currentView !== 'home' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToHome}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Retour
              </Button>
            )}
            <h2 className="bg-gradient-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">AlternaJob</h2>
          </div>
          <nav className="flex gap-4">
            <Button variant="ghost" onClick={handleBackToHome}>
              Accueil
            </Button>
            <Button variant="ghost" onClick={() => setCurrentView('search')}>
              Offres
            </Button>
            {/* Boutons de démonstration pour accéder aux interfaces de recherche */}
            {!isStudentLoggedIn && !isCompanyLoggedIn && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleStudentLogin}
                  className="border-blue-200 hover:bg-blue-50"
                >
                  Démo Étudiant
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCompanyLogin}
                  className="border-violet-200 hover:bg-violet-50"
                >
                  Démo Entreprise
                </Button>
              </>
            )}
            {/* Bouton Mon espace pour utilisateurs connectés */}
            {isStudentLoggedIn && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView('student-dashboard')}
                className="border-green-200 hover:bg-green-50 text-green-700"
              >
                <User className="h-4 w-4 mr-2" />
                Mon espace
              </Button>
            )}
            {isCompanyLoggedIn && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentView('company-dashboard')}
                className="border-purple-200 hover:bg-purple-50 text-purple-700"
              >
                <User className="h-4 w-4 mr-2" />
                Mon espace
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentView === 'home' && (
          <Hero
            onSelectUserType={handleSelectUserType}
            isStudentLoggedIn={isStudentLoggedIn}
            isCompanyLoggedIn={isCompanyLoggedIn}
            onNavigate={(view) => setCurrentView(view as View)}
          />
        )}
        
        {currentView === 'student' && (
          <div className="py-8">
            <StudentRegistration />
          </div>
        )}
        
        {currentView === 'company' && (
          <div className="py-8">
            <CompanyRegistration />
          </div>
        )}
        
        {currentView === 'search' && (
          <div className="py-8">
            <SwipeInterface />
          </div>
        )}

        {currentView === 'student-dashboard' && (
          <div className="py-8">
            <StudentDashboard />
          </div>
        )}

        {currentView === 'company-dashboard' && (
          <div className="py-8">
            <CompanyDashboard />
          </div>
        )}

        {currentView === 'student-search' && (
          <div className="py-8">
            <SwipeInterface />
          </div>
        )}

        {currentView === 'company-search' && (
          <div className="py-8">
            <StudentSwipeInterface />
          </div>
        )}

        {currentView === 'offers-list' && (
          <div className="py-8">
            <OffersListView />
          </div>
        )}

        {currentView === 'students-list' && (
          <div className="py-8">
            <StudentsListView />
          </div>
        )}
      </main>

      <footer className="bg-white/80 backdrop-blur-md mt-20 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="mb-4">AlternaJob</h3>
              <p className="text-gray-600 text-sm">
                La plateforme de référence pour trouver votre alternance ou stage.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Pour les étudiants</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Rechercher des offres</a></li>
                <li><a href="#" className="hover:text-blue-600">Créer un profil</a></li>
                <li><a href="#" className="hover:text-blue-600">Conseils CV</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Pour les entreprises</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Publier une offre</a></li>
                <li><a href="#" className="hover:text-blue-600">Tarifs</a></li>
                <li><a href="#" className="hover:text-blue-600">Nous contacter</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">À propos</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-blue-600">Qui sommes-nous</a></li>
                <li><a href="#" className="hover:text-blue-600">Mentions légales</a></li>
                <li><a href="#" className="hover:text-blue-600">Confidentialité</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
            © 2025 AlternaJob. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}