import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Clock, Euro, Building2, Calendar, FileText } from 'lucide-react';
import { Offer } from '../types';

interface OfferDetailModalProps {
  offer: Offer | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OfferDetailModal({ offer, isOpen, onClose }: OfferDetailModalProps) {
  if (!offer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">{offer.title}</DialogTitle>
                <DialogDescription className="text-base mt-1">
                  {offer.companyName}
                </DialogDescription>
              </div>
            </div>
            <Badge
              className={
                offer.type === 'alternance'
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-100'
              }
            >
              {offer.type === 'alternance' ? 'Alternance' : 'Stage'}
            </Badge>
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Informations clés */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Localisation</p>
                <p className="text-sm font-medium">{offer.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Durée</p>
                <p className="text-sm font-medium">{offer.duration}</p>
              </div>
            </div>
            {offer.salary && (
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Euro className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Rémunération</p>
                  <p className="text-sm font-medium">{offer.salary}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Publiée le</p>
                <p className="text-sm font-medium">
                  {new Date(offer.postedDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Description du poste
            </h4>
            <p className="text-gray-600 leading-relaxed">{offer.description}</p>
          </div>

          {/* Prérequis */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Profil recherché
            </h4>
            <p className="text-gray-600 leading-relaxed">{offer.requirements}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700">
              Postuler maintenant
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
