import { useState } from 'react';
import { SwipeCard } from './SwipeCard';
import { Button } from './ui/button';
import { Heart, X, RotateCcw, Sparkles } from 'lucide-react';
import { mockOffers } from '../data/mockData';
import { Offer } from '../types';
import { Card, CardContent } from './ui/card';

export function SwipeInterface() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedOffers, setLikedOffers] = useState<Offer[]>([]);
  const [passedOffers, setPassedOffers] = useState<Offer[]>([]);

  const currentOffers = mockOffers.slice(currentIndex, currentIndex + 3);
  const hasMoreOffers = currentIndex < mockOffers.length;

  const handleSwipe = (direction: 'left' | 'right') => {
    const swipedOffer = mockOffers[currentIndex];
    
    if (direction === 'right') {
      setLikedOffers([...likedOffers, swipedOffer]);
    } else {
      setPassedOffers([...passedOffers, swipedOffer]);
    }
    
    setCurrentIndex(currentIndex + 1);
  };

  const handleButtonSwipe = (direction: 'left' | 'right') => {
    if (hasMoreOffers) {
      handleSwipe(direction);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setLikedOffers([]);
    setPassedOffers([]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* En-tête avec statistiques */}
      <div className="mb-8 text-center bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-xl">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-6 w-6 text-yellow-300" />
          <h2 className="text-white drop-shadow-lg">Trouvez votre match parfait</h2>
        </div>
        <p className="text-white/90 mb-6 drop-shadow">
          Swipez à droite si l'offre vous intéresse, à gauche sinon
        </p>
        
        <div className="flex justify-center gap-6">
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[100px]">
            <div className="text-2xl text-green-300 drop-shadow-lg">{likedOffers.length}</div>
            <div className="text-sm text-white/80">Intéressé(e)</div>
          </div>
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[100px]">
            <div className="text-2xl text-gray-300 drop-shadow-lg">{passedOffers.length}</div>
            <div className="text-sm text-white/80">Passé(e)</div>
          </div>
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[100px]">
            <div className="text-2xl text-cyan-300 drop-shadow-lg">{mockOffers.length - currentIndex}</div>
            <div className="text-sm text-white/80">Restant(e)s</div>
          </div>
        </div>
      </div>

      {/* Zone de swipe */}
      <div className="relative h-[600px] mb-8">
        {!hasMoreOffers ? (
          <Card className="h-full flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-white/50">
            <CardContent className="text-center py-12">
              <div className="mb-6">
                <Sparkles className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="mb-2">Plus d'offres disponibles !</h3>
                <p className="text-gray-600 mb-6">
                  Vous avez consulté toutes les offres disponibles.
                  {likedOffers.length > 0 && (
                    <span className="block mt-2">
                      Vous avez {likedOffers.length} match{likedOffers.length > 1 ? 's' : ''} !
                    </span>
                  )}
                </p>
                <Button onClick={handleReset} className="gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Recommencer
                </Button>
              </div>
              
              {likedOffers.length > 0 && (
                <div className="mt-8 text-left">
                  <h4 className="mb-4">Vos offres favorites :</h4>
                  <div className="space-y-2">
                    {likedOffers.map((offer) => (
                      <div key={offer.id} className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{offer.title}</p>
                            <p className="text-sm text-gray-600">{offer.companyName} • {offer.location}</p>
                          </div>
                          <Heart className="h-5 w-5 text-green-600" fill="currentColor" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            {currentOffers.map((offer, index) => (
              <div
                key={offer.id}
                style={{ zIndex: currentOffers.length - index }}
                className="absolute w-full"
              >
                <SwipeCard
                  offer={offer}
                  onSwipe={handleSwipe}
                  isTop={index === 0}
                />
              </div>
            ))}
          </>
        )}
      </div>

      {/* Boutons d'action */}
      {hasMoreOffers && (
        <div className="flex justify-center gap-6">
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleButtonSwipe('left')}
            className="w-20 h-20 rounded-full border-4 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all hover:scale-110 shadow-lg hover:shadow-red-500/50"
          >
            <X className="h-8 w-8" strokeWidth={3} />
          </Button>
          
          <Button
            size="lg"
            onClick={() => handleButtonSwipe('right')}
            className="w-20 h-20 rounded-full bg-green-500 hover:bg-green-600 transition-all hover:scale-110 shadow-lg hover:shadow-green-500/50"
          >
            <Heart className="h-8 w-8" fill="white" />
          </Button>
        </div>
      )}

      {/* Instructions */}
      {hasMoreOffers && (
        <div className="mt-8 text-center text-sm text-white/80 bg-white/10 backdrop-blur-sm rounded-lg p-3">
          <p>💡 Astuce : Vous pouvez aussi glisser la carte avec votre souris ou votre doigt</p>
        </div>
      )}
    </div>
  );
}
