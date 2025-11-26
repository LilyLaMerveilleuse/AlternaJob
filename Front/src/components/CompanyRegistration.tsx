import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function CompanyRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sector: '',
    size: '',
    website: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Company registration:', formData);
    alert('Inscription réussie ! Vous pouvez maintenant publier des offres.');
  };

  return (
    <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-white/50">
      <CardHeader>
        <CardTitle>Inscription Entreprise</CardTitle>
        <CardDescription>
          Créez votre compte entreprise pour publier des offres d'alternance et de stage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">Nom de l'entreprise *</Label>
            <Input
              id="companyName"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyEmail">Email professionnel *</Label>
            <Input
              id="companyEmail"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyPhone">Téléphone *</Label>
            <Input
              id="companyPhone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sector">Secteur d'activité *</Label>
            <Select value={formData.sector} onValueChange={(value) => setFormData({ ...formData, sector: value })}>
              <SelectTrigger id="sector">
                <SelectValue placeholder="Sélectionnez un secteur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">Technologie & IT</SelectItem>
                <SelectItem value="finance">Finance & Banque</SelectItem>
                <SelectItem value="marketing">Marketing & Communication</SelectItem>
                <SelectItem value="design">Design & Créativité</SelectItem>
                <SelectItem value="engineering">Ingénierie</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="size">Taille de l'entreprise *</Label>
            <Select value={formData.size} onValueChange={(value) => setFormData({ ...formData, size: value })}>
              <SelectTrigger id="size">
                <SelectValue placeholder="Nombre d'employés" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 employés</SelectItem>
                <SelectItem value="11-50">11-50 employés</SelectItem>
                <SelectItem value="51-200">51-200 employés</SelectItem>
                <SelectItem value="201-500">201-500 employés</SelectItem>
                <SelectItem value="500+">500+ employés</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Site web</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://..."
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description de l'entreprise *</Label>
            <Textarea
              id="description"
              required
              rows={4}
              placeholder="Présentez votre entreprise..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full">
            S'inscrire
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
