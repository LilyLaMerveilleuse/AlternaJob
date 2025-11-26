import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Search, MapPin, Clock, Euro, RotateCcw, Building2 } from 'lucide-react';
import { mockOffers } from '../data/mockData';
import { Offer } from '../types';
import { OfferDetailModal } from './OfferDetailModal';

export function OffersListView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [durationFilter, setDurationFilter] = useState<string>('all');
  const [salaryMin, setSalaryMin] = useState<string>('');
  const [salaryMax, setSalaryMax] = useState<string>('');
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extraire les localisations uniques
  const locations = useMemo(() => {
    const locs = [...new Set(mockOffers.map((offer) => offer.location))];
    return locs.sort();
  }, []);

  // Fonction pour extraire le salaire numérique
  const extractSalary = (salary?: string): number => {
    if (!salary) return 0;
    const match = salary.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Fonction pour extraire la durée en mois
  const extractDuration = (duration: string): number => {
    const match = duration.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  // Filtrage des offres
  const filteredOffers = useMemo(() => {
    return mockOffers.filter((offer) => {
      // Filtre recherche texte
      const matchesSearch =
        searchTerm === '' ||
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtre type
      const matchesType = typeFilter === 'all' || offer.type === typeFilter;

      // Filtre localisation
      const matchesLocation =
        locationFilter === 'all' || offer.location === locationFilter;

      // Filtre durée
      let matchesDuration = true;
      if (durationFilter !== 'all') {
        const months = extractDuration(offer.duration);
        if (durationFilter === 'short') matchesDuration = months <= 6;
        else if (durationFilter === 'medium')
          matchesDuration = months > 6 && months <= 12;
        else if (durationFilter === 'long') matchesDuration = months > 12;
      }

      // Filtre salaire
      let matchesSalary = true;
      const offerSalary = extractSalary(offer.salary);
      if (salaryMin && offerSalary < parseInt(salaryMin, 10)) {
        matchesSalary = false;
      }
      if (salaryMax && offerSalary > parseInt(salaryMax, 10)) {
        matchesSalary = false;
      }

      return (
        matchesSearch &&
        matchesType &&
        matchesLocation &&
        matchesDuration &&
        matchesSalary
      );
    });
  }, [searchTerm, typeFilter, locationFilter, durationFilter, salaryMin, salaryMax]);

  const resetFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setLocationFilter('all');
    setDurationFilter('all');
    setSalaryMin('');
    setSalaryMax('');
  };

  const handleRowClick = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Rechercher une offre
        </h1>
        <p className="text-gray-600">
          Trouvez l'opportunité idéale parmi {mockOffers.length} offres disponibles
        </p>
      </motion.div>

      {/* Filtres */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 bg-white/70 backdrop-blur-md border-white/20 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Recherche texte */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher par titre, entreprise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type de contrat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="alternance">Alternance</SelectItem>
                <SelectItem value="stage">Stage</SelectItem>
              </SelectContent>
            </Select>

            {/* Localisation */}
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Localisation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les villes</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Durée */}
            <Select value={durationFilter} onValueChange={setDurationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Durée" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les durées</SelectItem>
                <SelectItem value="short">Moins de 6 mois</SelectItem>
                <SelectItem value="medium">6 à 12 mois</SelectItem>
                <SelectItem value="long">Plus de 12 mois</SelectItem>
              </SelectContent>
            </Select>

            {/* Salaire min */}
            <div className="relative">
              <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="number"
                placeholder="Salaire min"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Salaire max */}
            <div className="relative">
              <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="number"
                placeholder="Salaire max"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Réinitialiser */}
            <Button
              variant="outline"
              onClick={resetFilters}
              className="border-gray-300"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Réinitialiser
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Résultats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-white/70 backdrop-blur-md border-white/20 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredOffers.length} offre{filteredOffers.length > 1 ? 's' : ''}{' '}
              trouvée{filteredOffers.length > 1 ? 's' : ''}
            </p>
          </div>

          {filteredOffers.length === 0 ? (
            <div className="p-12 text-center">
              <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Search className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Aucune offre trouvée</h3>
              <p className="text-gray-600 mb-4">
                Essayez de modifier vos critères de recherche
              </p>
              <Button variant="outline" onClick={resetFilters}>
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[300px]">Offre</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead className="text-right">Salaire</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOffers.map((offer) => (
                  <TableRow
                    key={offer.id}
                    onClick={() => handleRowClick(offer)}
                    className="cursor-pointer hover:bg-blue-50/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                          <Building2 className="h-5 w-5 text-white" />
                        </div>
                        <span>{offer.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>{offer.companyName}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          offer.type === 'alternance'
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                            : 'bg-purple-100 text-purple-700 hover:bg-purple-100'
                        }
                      >
                        {offer.type === 'alternance' ? 'Alternance' : 'Stage'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        {offer.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        {offer.duration}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {offer.salary ? (
                        <div className="flex items-center justify-end gap-1">
                          <Euro className="h-4 w-4 text-gray-400" />
                          {offer.salary}
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </motion.div>

      {/* Modal détails */}
      <OfferDetailModal
        offer={selectedOffer}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
