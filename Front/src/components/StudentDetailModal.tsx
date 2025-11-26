import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  MapPin,
  GraduationCap,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  Globe,
  User,
  Code,
} from 'lucide-react';
import { StudentProfile } from '../types';

interface StudentDetailModalProps {
  student: StudentProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StudentDetailModal({
  student,
  isOpen,
  onClose,
}: StudentDetailModalProps) {
  if (!student) return null;

  const getLookingForLabel = (lookingFor: string) => {
    switch (lookingFor) {
      case 'alternance':
        return 'Alternance';
      case 'stage':
        return 'Stage';
      case 'both':
        return 'Alternance ou Stage';
      default:
        return lookingFor;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">
                  {student.firstName} {student.lastName}
                </DialogTitle>
                <DialogDescription className="text-base mt-1">
                  {student.school} - {student.level}
                </DialogDescription>
              </div>
            </div>
            <Badge
              className={
                student.lookingFor === 'alternance'
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                  : student.lookingFor === 'stage'
                  ? 'bg-purple-100 text-purple-700 hover:bg-purple-100'
                  : 'bg-green-100 text-green-700 hover:bg-green-100'
              }
            >
              {getLookingForLabel(student.lookingFor)}
            </Badge>
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Informations clés */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <GraduationCap className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Domaine</p>
                <p className="text-sm font-medium">{student.field}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Localisation</p>
                <p className="text-sm font-medium">{student.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Disponibilité</p>
                <p className="text-sm font-medium">{student.availability}</p>
              </div>
            </div>
          </div>

          {/* Compétences */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Code className="h-4 w-4" />
              Compétences
            </h4>
            <div className="flex flex-wrap gap-2">
              {student.skills.map((skill, index) => (
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

          {/* Expérience */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Expérience
            </h4>
            <p className="text-gray-600 leading-relaxed">{student.experience}</p>
          </div>

          {/* Projets */}
          {student.projects && (
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Code className="h-4 w-4" />
                Projets
              </h4>
              <p className="text-gray-600 leading-relaxed">{student.projects}</p>
            </div>
          )}

          {/* Langues */}
          {student.languages && (
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Langues
              </h4>
              <p className="text-gray-600">{student.languages}</p>
            </div>
          )}

          {/* Contact */}
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Contact</h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <a
                  href={`mailto:${student.email}`}
                  className="hover:text-violet-600"
                >
                  {student.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4" />
                <a href={`tel:${student.phone}`} className="hover:text-violet-600">
                  {student.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Contacter cet étudiant
            </Button>
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
