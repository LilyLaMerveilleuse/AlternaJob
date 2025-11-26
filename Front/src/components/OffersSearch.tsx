import { useState } from 'react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Search, MapPin, Building2, Calendar, Euro } from 'lucide-react';
import { mockOffers } from '../data/mockData';
import { Offer } from '../types';

export function OffersSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState('');

  const filteredOffers = mockOffers.filter((offer) => {
    const matchesSearch = offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || offer.type === typeFilter;
    
    const matchesLocation = !locationFilter || 
      offer.location.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-lg">
        <h2 className="mb-6">Trouvez votre alternance ou stage idéal</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Poste, entreprise, mots-clés..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Type d'offre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="alternance">Alternance</SelectItem>
              <SelectItem value="stage">Stage</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Ville ou région..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
        </div>
      </div>

      <div>
        <p className="text-gray-600 mb-4">{filteredOffers.length} offre{filteredOffers.length > 1 ? 's' : ''} trouvée{filteredOffers.length > 1 ? 's' : ''}</p>
        
        <div className="space-y-4">
          {filteredOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </div>
  );
}

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={offer.type === 'alternance' ? 'default' : 'secondary'}>
                {offer.type === 'alternance' ? 'Alternance' : 'Stage'}
              </Badge>
              {offer.salary && (
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Euro className="h-3 w-3" />
                  {offer.salary}
                </span>
              )}
            </div>
            <CardTitle className="mb-1">{offer.title}</CardTitle>
            <CardDescription className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {offer.companyName}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {offer.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {offer.duration}
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4">{offer.description}</p>
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Profil recherché :</span> {offer.requirements}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Publiée le {new Date(offer.postedDate).toLocaleDateString('fr-FR')}
          </span>
          <Button>Postuler</Button>
        </div>
      </CardContent>
    </Card>
  );
}
