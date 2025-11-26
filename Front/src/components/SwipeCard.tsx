import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Building2, Calendar, Euro, Heart, X } from 'lucide-react';
import { Offer } from '../types';

interface SwipeCardProps {
  offer: Offer;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
}

export function SwipeCard({ offer, onSwipe, isTop }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  
  // Indicateurs visuels
  const likeOpacity = useTransform(x, [0, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-150, 0], [1, 0]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 150) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      onSwipe(direction);
    }
  };

  return (
    <motion.div
      style={{
        x,
        rotate,
        cursor: isTop ? 'grab' : 'default',
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={isTop ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0.5 }}
      className="w-full touch-none"
      whileTap={{ cursor: 'grabbing' }}
    >
      <Card className="w-full h-[600px] shadow-2xl overflow-hidden select-none bg-white/95 backdrop-blur-sm border-2 border-white/50">
        <div className="h-full flex flex-col">
          <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-50 border-b">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant={offer.type === 'alternance' ? 'default' : 'secondary'} className="text-sm">
                    {offer.type === 'alternance' ? 'Alternance' : 'Stage'}
                  </Badge>
                  {offer.salary && (
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Euro className="h-4 w-4" />
                      {offer.salary}
                    </span>
                  )}
                </div>
                <CardTitle className="text-2xl mb-2">{offer.title}</CardTitle>
              </div>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-gray-600" />
                <span className="text-base">{offer.companyName}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-600" />
                <span className="text-base">{offer.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-600" />
                <span className="text-base">{offer.duration}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              <div>
                <h4 className="mb-3 text-gray-900">Description du poste</h4>
                <p className="text-gray-700 leading-relaxed">{offer.description}</p>
              </div>

              <div>
                <h4 className="mb-3 text-gray-900">Profil recherché</h4>
                <p className="text-gray-700 leading-relaxed">{offer.requirements}</p>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500">
                  Offre publiée le {new Date(offer.postedDate).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Overlays pour le feedback visuel */}
      <motion.div
        style={{
          opacity: likeOpacity,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div className="bg-green-500 text-white rounded-full p-6 shadow-2xl">
          <Heart className="h-16 w-16" fill="white" />
        </div>
      </motion.div>

      <motion.div
        style={{
          opacity: nopeOpacity,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div className="bg-red-500 text-white rounded-full p-6 shadow-2xl">
          <X className="h-16 w-16" strokeWidth={4} />
        </div>
      </motion.div>

      {/* Bordure colorée pendant le drag */}
      <motion.div
        style={{
          opacity: likeOpacity,
        }}
        className="absolute inset-0 border-8 border-green-500 rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.6)] pointer-events-none"
      />
      <motion.div
        style={{
          opacity: nopeOpacity,
        }}
        className="absolute inset-0 border-8 border-red-500 rounded-xl shadow-[0_0_30px_rgba(239,68,68,0.6)] pointer-events-none"
      />
    </motion.div>
  );
}
