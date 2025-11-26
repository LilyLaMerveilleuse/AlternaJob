import { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  User, 
  MapPin, 
  GraduationCap, 
  Briefcase, 
  Award,
  Heart,
  X,
  Star,
  Mail,
  Phone
} from 'lucide-react';
import { Button } from './ui/button';

interface StudentProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  school: string;
  level: string;
  field: string;
  location: string;
  skills: string[];
  experience: string;
  lookingFor: 'alternance' | 'stage' | 'both';
  availability: string;
  photo?: string;
}

const mockStudents: StudentProfile[] = [
  {
    id: 's1',
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@email.com',
    phone: '06 12 34 56 78',
    school: 'Université Paris-Saclay',
    level: 'Master 1',
    field: 'Informatique',
    location: 'Paris',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Git'],
    experience: '2 ans d\'expérience en développement web',
    lookingFor: 'alternance',
    availability: 'Septembre 2025'
  },
  {
    id: 's2',
    firstName: 'Thomas',
    lastName: 'Martin',
    email: 'thomas.martin@email.com',
    phone: '06 23 45 67 89',
    school: 'EDHEC Business School',
    level: 'Master 2',
    field: 'Marketing Digital',
    location: 'Lyon',
    skills: ['SEO/SEA', 'Google Analytics', 'Content Marketing', 'Social Media', 'Photoshop'],
    experience: '1 stage de 6 mois en agence marketing',
    lookingFor: 'stage',
    availability: 'Janvier 2026'
  },
  {
    id: 's3',
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 'sophie.bernard@email.com',
    phone: '06 34 56 78 90',
    school: 'Arts et Métiers',
    level: 'Ingénieur 2A',
    field: 'Énergies Renouvelables',
    location: 'Bordeaux',
    skills: ['AutoCAD', 'MATLAB', 'Python', 'Gestion de projet', 'Anglais courant'],
    experience: 'Projet universitaire sur l\'énergie solaire',
    lookingFor: 'both',
    availability: 'Immédiatement'
  },
  {
    id: 's4',
    firstName: 'Lucas',
    lastName: 'Petit',
    email: 'lucas.petit@email.com',
    phone: '06 45 67 89 01',
    school: 'Epitech',
    level: 'Bachelor 3',
    field: 'Data Science',
    location: 'Toulouse',
    skills: ['Python', 'Machine Learning', 'SQL', 'Power BI', 'R'],
    experience: 'Projets académiques en analyse de données',
    lookingFor: 'alternance',
    availability: 'Septembre 2025'
  },
  {
    id: 's5',
    firstName: 'Emma',
    lastName: 'Rousseau',
    email: 'emma.rousseau@email.com',
    phone: '06 56 78 90 12',
    school: 'Strate École de Design',
    level: 'Master 1',
    field: 'UX/UI Design',
    location: 'Paris',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
    experience: 'Freelance pendant 1 an',
    lookingFor: 'stage',
    availability: 'Mars 2026'
  }
];

export function StudentSwipeInterface() {
  const [students, setStudents] = useState(mockStudents);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState(0);
  const [passed, setPassed] = useState(0);

  const currentStudent = students[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setMatches(matches + 1);
    } else {
      setPassed(passed + 1);
    }

    if (currentIndex < students.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Réinitialiser ou afficher un message de fin
      setCurrentIndex(0);
      setStudents([...mockStudents]);
    }
  };

  if (!currentStudent) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="p-12 text-center bg-white/70 backdrop-blur-md border-white/20">
          <h3 className="mb-4">Plus de profils disponibles</h3>
          <p className="text-gray-600 mb-6">
            Vous avez consulté tous les profils disponibles
          </p>
          <Button
            onClick={() => {
              setCurrentIndex(0);
              setStudents([...mockStudents]);
              setMatches(0);
              setPassed(0);
            }}
            className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
          >
            Recommencer
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="mb-2 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
          Recherche de talents
        </h1>
        <p className="text-gray-600">
          Trouvez les étudiants qui correspondent à vos besoins
        </p>
      </motion.div>

      {/* Statistiques */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center gap-6 mb-8"
      >
        <Card className="px-6 py-3 bg-white/70 backdrop-blur-md border-white/20">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-green-600" />
            <span className="text-gray-600">Intéressé: </span>
            <span>{matches}</span>
          </div>
        </Card>
        <Card className="px-6 py-3 bg-white/70 backdrop-blur-md border-white/20">
          <div className="flex items-center gap-2">
            <X className="h-5 w-5 text-red-600" />
            <span className="text-gray-600">Passé: </span>
            <span>{passed}</span>
          </div>
        </Card>
        <Card className="px-6 py-3 bg-white/70 backdrop-blur-md border-white/20">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            <span className="text-gray-600">Restants: </span>
            <span>{students.length - currentIndex}</span>
          </div>
        </Card>
      </motion.div>

      {/* Carte du profil étudiant */}
      <div className="relative h-[600px] flex items-center justify-center mb-8">
        <SwipeCard
          student={currentStudent}
          onSwipe={handleSwipe}
        />
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-center gap-6">
        <Button
          onClick={() => handleSwipe('left')}
          size="lg"
          variant="outline"
          className="h-16 w-16 rounded-full border-2 border-red-300 hover:bg-red-50 hover:border-red-400 hover:scale-110 transition-all"
        >
          <X className="h-8 w-8 text-red-600" />
        </Button>
        <Button
          onClick={() => handleSwipe('right')}
          size="lg"
          className="h-16 w-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-110 transition-all"
        >
          <Heart className="h-8 w-8 text-white" />
        </Button>
      </div>
    </div>
  );
}

interface SwipeCardProps {
  student: StudentProfile;
  onSwipe: (direction: 'left' | 'right') => void;
}

function SwipeCard({ student, onSwipe }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      onSwipe(info.offset.x > 0 ? 'right' : 'left');
    }
  };

  // Indicateurs de direction
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute w-full max-w-2xl cursor-grab active:cursor-grabbing"
    >
      <Card className="bg-white/80 backdrop-blur-md border-2 border-white/20 shadow-2xl overflow-hidden">
        {/* Indicateurs */}
        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute top-8 right-8 z-10 bg-green-500 text-white px-6 py-3 rounded-lg rotate-12 border-4 border-green-500"
        >
          <span className="text-2xl">INTÉRESSÉ</span>
        </motion.div>
        <motion.div
          style={{ opacity: nopeOpacity }}
          className="absolute top-8 left-8 z-10 bg-red-500 text-white px-6 py-3 rounded-lg -rotate-12 border-4 border-red-500"
        >
          <span className="text-2xl">PASSER</span>
        </motion.div>

        {/* Avatar */}
        <div className="bg-gradient-to-br from-violet-500 to-blue-600 h-48 flex items-center justify-center">
          <div className="h-32 w-32 rounded-full bg-white/90 flex items-center justify-center">
            <User className="h-20 w-20 text-gray-400" />
          </div>
        </div>

        <div className="p-8">
          {/* En-tête */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="mb-1">{student.firstName} {student.lastName}</h2>
                <p className="text-gray-600">{student.level} - {student.field}</p>
              </div>
              <Badge 
                className={
                  student.lookingFor === 'alternance' 
                    ? 'bg-blue-100 text-blue-700' 
                    : student.lookingFor === 'stage'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-green-100 text-green-700'
                }
              >
                {student.lookingFor === 'both' ? 'Stage/Alternance' : student.lookingFor}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                {student.school}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {student.location}
              </div>
            </div>
          </div>

          {/* Compétences */}
          <div className="mb-6">
            <h4 className="mb-3 flex items-center gap-2">
              <Award className="h-5 w-5 text-violet-600" />
              Compétences
            </h4>
            <div className="flex flex-wrap gap-2">
              {student.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-violet-50 text-violet-700">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Expérience */}
          <div className="mb-6">
            <h4 className="mb-2 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-600" />
              Expérience
            </h4>
            <p className="text-gray-600">{student.experience}</p>
          </div>

          {/* Disponibilité */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-green-600" />
              <span>Disponible à partir de: </span>
              <span>{student.availability}</span>
            </div>
          </div>

          {/* Contact */}
          <div className="flex gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {student.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              {student.phone}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
