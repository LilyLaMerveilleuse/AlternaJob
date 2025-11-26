import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Upload, FileText, Award } from 'lucide-react';

export function StudentRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    school: '',
    level: '',
    field: '',
    skills: '',
    experience: '',
    projects: '',
    languages: '',
    additionalInfo: ''
  });

  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Student registration:', formData);
    console.log('CV:', cvFile);
    console.log('Cover letter:', coverLetterFile);
    alert('Inscription réussie ! Votre portfolio unique sera généré et visible par les entreprises.');
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleCoverLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverLetterFile(e.target.files[0]);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-white/50">
      <CardHeader>
        <CardTitle>Inscription Étudiant</CardTitle>
        <CardDescription>
          Créez votre profil complet pour générer un portfolio unique visible par les entreprises
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom *</Label>
              <Input
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom *</Label>
              <Input
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone *</Label>
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="school">École / Université *</Label>
            <Input
              id="school"
              required
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">Niveau d'études *</Label>
            <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
              <SelectTrigger id="level">
                <SelectValue placeholder="Sélectionnez votre niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bac+2">Bac+2</SelectItem>
                <SelectItem value="bac+3">Bac+3</SelectItem>
                <SelectItem value="bac+4">Bac+4</SelectItem>
                <SelectItem value="bac+5">Bac+5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="field">Domaine d'études *</Label>
            <Input
              id="field"
              required
              placeholder="Ex: Informatique, Marketing, Design..."
              value={formData.field}
              onChange={(e) => setFormData({ ...formData, field: e.target.value })}
            />
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700">
              <FileText className="h-5 w-5 text-blue-600" />
              <h4>Documents requis</h4>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cv">CV (PDF, Word) *</Label>
              <div className="relative">
                <Input
                  id="cv"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleCvChange}
                  className="cursor-pointer"
                />
                {cvFile && (
                  <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                    <Upload className="h-4 w-4" />
                    {cvFile.name}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverLetter">Lettre de motivation (PDF, Word) *</Label>
              <div className="relative">
                <Input
                  id="coverLetter"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleCoverLetterChange}
                  className="cursor-pointer"
                />
                {coverLetterFile && (
                  <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                    <Upload className="h-4 w-4" />
                    {coverLetterFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Award className="h-5 w-5 text-blue-600" />
              <h4>Informations complémentaires pour votre portfolio</h4>
            </div>
            <p className="text-sm text-gray-600">
              Ces informations permettront de générer un portfolio unique et attrayant pour les entreprises
            </p>

            <div className="space-y-2">
              <Label htmlFor="skills">Compétences principales</Label>
              <Textarea
                id="skills"
                placeholder="Ex: JavaScript, React, Python, Photoshop, Marketing digital..."
                rows={3}
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Expériences professionnelles</Label>
              <Textarea
                id="experience"
                placeholder="Décrivez vos expériences professionnelles, stages précédents..."
                rows={4}
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projects">Projets réalisés</Label>
              <Textarea
                id="projects"
                placeholder="Décrivez vos projets personnels, académiques ou professionnels..."
                rows={4}
                value={formData.projects}
                onChange={(e) => setFormData({ ...formData, projects: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="languages">Langues parlées</Label>
              <Input
                id="languages"
                placeholder="Ex: Français (natif), Anglais (courant), Espagnol (intermédiaire)..."
                value={formData.languages}
                onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Informations supplémentaires</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Ajoutez toute information pertinente : certifications, distinctions, activités extra-scolaires..."
                rows={4}
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-blue-800">
              💡 <span className="font-medium">Astuce :</span> Plus votre profil est complet, plus votre portfolio sera attractif pour les entreprises !
            </p>
          </div>

          <Button type="submit" className="w-full">
            Créer mon portfolio
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
