import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  Code,
  Briefcase,
  Globe,
  FileText,
  X,
  Plus,
  Save,
} from 'lucide-react';

interface StudentPortfolioData {
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
  projects: string;
  languages: string;
}

interface StudentPortfolioEditProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: StudentPortfolioData;
  onSave?: (data: StudentPortfolioData) => void;
}

export function StudentPortfolioEdit({
  isOpen,
  onClose,
  initialData,
  onSave,
}: StudentPortfolioEditProps) {
  const [formData, setFormData] = useState<StudentPortfolioData>(
    initialData || {
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
        'Stage de 6 mois chez StartupTech en développement web. Projet universitaire de création d\'une application mobile.',
      projects:
        'Application de gestion de tâches en React Native, Site e-commerce avec Next.js',
      languages: 'Français (natif), Anglais (C1), Espagnol (B1)',
    }
  );

  const [newSkill, setNewSkill] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <User className="h-5 w-5" />
            Modifier mon portfolio
          </DialogTitle>
          <DialogDescription>
            Mettez à jour vos informations pour attirer les meilleures entreprises
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Informations personnelles */}
          <Card className="p-4 bg-gray-50">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <User className="h-4 w-4" />
              Informations personnelles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="email">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="phone">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Téléphone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="location">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  Localisation
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Card>

          {/* Formation */}
          <Card className="p-4 bg-gray-50">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Formation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="school">École / Université</Label>
                <Input
                  id="school"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="level">Niveau d'études</Label>
                <Input
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="field">Domaine</Label>
                <Input
                  id="field"
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                />
              </div>
            </div>
          </Card>

          {/* Compétences */}
          <Card className="p-4 bg-gray-50">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Code className="h-4 w-4" />
              Compétences
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-violet-100 text-violet-700 pr-1"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 hover:bg-violet-200 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Ajouter une compétence"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addSkill}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </Card>

          {/* Expérience */}
          <Card className="p-4 bg-gray-50">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Expérience
            </h3>
            <Textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows={4}
              placeholder="Décrivez vos expériences professionnelles, stages, etc."
            />
          </Card>

          {/* Projets */}
          <Card className="p-4 bg-gray-50">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Projets
            </h3>
            <Textarea
              name="projects"
              value={formData.projects}
              onChange={handleChange}
              rows={3}
              placeholder="Listez vos projets personnels ou académiques"
            />
          </Card>

          {/* Langues */}
          <Card className="p-4 bg-gray-50">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Langues
            </h3>
            <Input
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              placeholder="Ex: Français (natif), Anglais (C1)"
            />
          </Card>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
