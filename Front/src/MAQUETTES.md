# Maquettes AlternaJob - Documentation Visuelle

## 🎨 Design System

### Palette de couleurs
- **Fond principal** : Dégradé animé violet → bleu → cyan
- **Glassmorphisme** : `bg-white/90 backdrop-blur-sm` avec bordures `border-white/50`
- **Accents** :
  - Étudiant : Vert (`from-green-400 to-green-600`)
  - Entreprise : Violet (`from-purple-400 to-purple-600`)
  - Recherche : Bleu (`from-blue-400 to-blue-600`)
  - Like : Vert (`green-500`)
  - Reject : Rouge (`red-500`)

### Effets visuels
- Glassmorphisme sur tous les composants
- Formes géométriques flottantes en arrière-plan
- Animations fluides avec motion/react
- Drop-shadows sur les textes blancs
- Hover effects avec `scale-105` et `y: -5`

---

## 📱 Pages et Vues

### 1. Page d'Accueil (Home)
**Route** : `/` (view: 'home')

**Composant** : `Hero.tsx`

**Structure** :
```
┌─────────────────────────────────────────────┐
│            [Header sticky]                  │
│  ← AlternaJob          Accueil | Offres    │
├─────────────────────────────────────────────┤
│                                             │
│         [Icône Briefcase animé]            │
│                                             │
│           🎓 AlternaJob                     │
│  La plateforme qui connecte les étudiants  │
│    avec les entreprises...                 │
│                                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │    🔍   │  │    🎓    │  │    🏢   │   │
│  │ Chercher│  │ Étudiant │  │Entreprise│  │
│  │une offre│  │S'inscrire│  │S'inscrire│  │
│  │[Bouton] │  │[Bouton]  │  │[Bouton]  │  │
│  └─────────┘  └─────────┘  └─────────┘   │
│                                             │
│  ┌──────┐   ┌──────┐    ┌──────┐         │
│  │ 500+ │   │2000+ │    │ 95%  │         │
│  │Entrep│   │Offres│    │Satis │         │
│  └──────┘   └──────┘    └──────┘         │
│                                             │
├─────────────────────────────────────────────┤
│            [Footer 4 colonnes]              │
└─────────────────────────────────────────────┘
```

**Caractéristiques** :
- 3 cartes cliquables avec effet glassmorphisme
- Icône Briefcase avec animation de rotation
- Stats en bas (glassmorphisme)
- Animations d'apparition échelonnées (delay 0.1s, 0.2s, 0.3s)

---

### 2. Inscription Étudiant
**Route** : view: 'student'

**Composant** : `StudentRegistration.tsx`

**Structure** :
```
┌─────────────────────────────────────────────┐
│         ← Retour | AlternaJob              │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │  📋 Inscription Étudiant            │  │
│  │  Créez votre profil complet...      │  │
│  ├─────────────────────────────────────┤  │
│  │                                     │  │
│  │  Prénom *          │ Nom *          │  │
│  │  [Input]           │ [Input]        │  │
│  │                                     │  │
│  │  Email *                            │  │
│  │  [Input]                            │  │
│  │                                     │  │
│  │  Téléphone *                        │  │
│  │  [Input]                            │  │
│  │                                     │  │
│  │  École / Université *               │  │
│  │  [Input]                            │  │
│  │                                     │  │
│  │  Niveau d'études *                  │  │
│  │  [Select: Bac+2 → Bac+5]           │  │
│  │                                     │  │
│  │  Domaine d'études *                 │  │
│  │  [Input]                            │  │
│  │                                     │  │
│  │  ────────────────────────────       │  │
│  │                                     │  │
│  │  📄 Documents requis                │  │
│  │                                     │  │
│  │  CV (PDF, Word) *                   │  │
│  │  [File upload] ✅ fichier.pdf       │  │
│  │                                     │  │
│  │  Lettre de motivation *             │  │
│  │  [File upload] ✅ lettre.pdf        │  │
│  │                                     │  │
│  │  ────────────────────────────       │  │
│  │                                     │  │
│  │  🏆 Infos complémentaires           │  │
│  │  pour votre portfolio               │  │
│  │                                     │  │
│  │  Compétences principales            │  │
│  │  [Textarea]                         │  │
│  │                                     │  │
│  │  Expériences professionnelles       │  │
│  │  [Textarea]                         │  │
│  │                                     │  │
│  │  Projets réalisés                   │  │
│  │  [Textarea]                         │  │
│  │                                     │  │
│  │  Langues parlées                    │  │
│  │  [Input]                            │  │
│  │                                     │  │
│  │  Informations supplémentaires       │  │
│  │  [Textarea]                         │  │
│  │                                     │  │
│  │  ┌─────────────────────────────┐   │  │
│  │  │ 💡 Astuce : Plus complet... │   │  │
│  │  └─────────────────────────────┘   │  │
│  │                                     │  │
│  │  [Créer mon portfolio]              │  │
│  │                                     │  │
│  └─────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

**Caractéristiques** :
- Formulaire long avec sections séparées par des `Separator`
- Upload de fichiers avec feedback visuel (✅ + nom fichier)
- Sections : Infos perso → Documents → Portfolio
- Encadré bleu avec astuce
- Bouton final : "Créer mon portfolio"

---

### 3. Inscription Entreprise
**Route** : view: 'company'

**Composant** : `CompanyRegistration.tsx`

**Structure** :
```
┌─────────────────────────────────────────────┐
│         ← Retour | AlternaJob              │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │  🏢 Inscription Entreprise          │  │
│  │  Publiez vos offres...              │  │
│  ├─────────────────────────────────────┤  │
│  │                                     │  │
│  │  Nom de l'entreprise *              │  │
│  │  [Input]                            │  │
│  │                                     │  │
│  │  Email professionnel *              │  │
│  │  [Input]                            │  │
│  │                                     │  │
│  │  Téléphone *                        │  │
│  │  [Input]                            │  │
│  │                                     │  │
│  │  Secteur d'activité *               │  │
│  │  [Select: Tech, Finance, etc.]      │  │
│  │                                     │  │
│  │  Taille de l'entreprise *           │  │
│  │  [Select: 1-10, 11-50, etc.]        │  │
│  │                                     │  │
│  │  Site web *                         │  │
│  │  [Input]                            │  │
│  │                                     │  │
│  │  Description *                      │  │
│  │  [Textarea]                         │  │
│  │                                     │  │
│  │  [S'inscrire]                       │  │
│  │                                     │  │
│  └─────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

---

### 4. Interface de Recherche (Swipe)
**Route** : view: 'search'

**Composants** : `SwipeInterface.tsx` + `SwipeCard.tsx`

**Structure** :
```
┌─────────────────────────────────────────────┐
│         ← Retour | AlternaJob              │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │  ✨ Trouvez votre match parfait     │  │
│  │  Swipez à droite si intéressé...    │  │
│  │                                     │  │
│  │  [5] Intéressé  [3] Passé [12] Rest│  │
│  └─────────────────────────────────────┘  │
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │ ┌─────────────────────────────────┐ │  │
│  │ │ [Alternance] €1800-2000/mois    │ │  │
│  │ │                                 │ │  │
│  │ │ Développeur Full Stack          │ │  │
│  │ │                                 │ │  │
│  │ │ 🏢 TechCorp                     │ │  │
│  │ │ 📍 Paris                        │ │  │
│  │ │ 📅 12 mois                      │ │  │
│  │ │                                 │ │  │
│  │ │ Description du poste            │ │  │
│  │ │ Lorem ipsum dolor sit amet...   │ │  │
│  │ │                                 │ │  │
│  │ │ Profil recherché                │ │  │
│  │ │ Étudiant en informatique...     │ │  │
│  │ │                                 │ │  │
│  │ │ Publié le 15 janvier 2025       │ │  │
│  │ └─────────────────────────────────┘ │  │
│  │    [Cartes empilées dessous]        │  │
│  └─────────────────────────────────────┘  │
│                                             │
│           ⭕ ❌          ❤️ ⭕             │
│         [Passer]      [Like]              │
│                                             │
│  💡 Glissez la carte avec votre souris     │
│                                             │
└─────────────────────────────────────────────┘
```

**Interactions** :
- **Drag à droite** : Bordure verte + icône ❤️ grandissante
- **Drag à gauche** : Bordure rouge + icône ❌ grandissante
- **Cartes empilées** : 3 cartes visibles, les 2 du dessous à 95% scale et 50% opacity
- **Boutons** : Cercles avec icônes ❌ (rouge) et ❤️ (vert)
- **z-index** : Carte du dessus au premier plan

**États** :
1. **Pendant le swipe** :
   - Rotation de la carte (-25° à +25°)
   - Overlay semi-transparent avec icône centrée
   - Bordure colorée (verte ou rouge)

2. **Après validation** :
   - Carte suivante prend le dessus
   - Stats mises à jour en temps réel

3. **Fin des offres** :
   - Message "Plus d'offres disponibles"
   - Liste des offres aimées avec icônes ❤️
   - Bouton "Recommencer" avec icône 🔄

---

## 🎯 Éléments Communs

### Header
- Sticky top-0
- `bg-white/80 backdrop-blur-md`
- Logo "AlternaJob" avec dégradé violet→cyan
- Navigation : Accueil | Offres
- Bouton "← Retour" (conditionnel)

### Footer
- 4 colonnes : AlternaJob | Étudiants | Entreprises | À propos
- Liens hover en bleu
- Copyright centré

### AnimatedBackground
- Dégradé animé : `from-violet-600 via-blue-500 to-cyan-500`
- Formes géométriques flottantes avec animations
- Filtres blur pour effet de profondeur

---

## 📊 Données Mock

**mockOffers** : 10 offres (voir `/data/mockData.ts`)
- Mix alternances/stages
- Secteurs : Tech, Marketing, Design, Finance, Juridique
- Localisations variées : Paris, Lyon, Toulouse, Bordeaux, Nantes

---

## 🔄 Flux Utilisateur

### Étudiant
1. Accueil → "Je suis étudiant"
2. Remplir formulaire complet
3. Upload CV + lettre de motivation
4. Compléter infos portfolio
5. → Portfolio généré (visible entreprises uniquement)

### Entreprise
1. Accueil → "Je suis entreprise"
2. Remplir formulaire entreprise
3. → Peut publier des offres

### Recherche
1. Accueil → "Chercher une offre"
2. Swipe sur les cartes
3. ❤️ = Match | ❌ = Skip
4. Voir liste des matches
5. Recommencer si besoin

---

## 🎨 Composants UI Utilisés (Shadcn)

- `Button` : Variants (default, outline, ghost)
- `Card` : Pour toutes les cartes
- `Input` : Champs texte
- `Textarea` : Descriptions longues
- `Select` : Dropdowns
- `Label` : Labels de formulaires
- `Badge` : Tags (Alternance/Stage)
- `Separator` : Séparateurs visuels

---

## ✨ Animations

### Hero
- Fade in + translateY pour titre
- Rotation de l'icône Briefcase
- Delays échelonnés pour les cartes (0.1s, 0.2s, 0.3s)
- Hover effects : `y: -5` + `scale: 1.05`

### Swipe Cards
- Rotation pendant le drag
- Overlays avec opacity dynamique
- Bordures animées
- Scale/opacity pour cartes en arrière-plan

### Background
- Keyframes pour mouvement des formes
- Rotation continue
- Dégradé animé

---

## 📱 Responsive

- **Desktop** : Grilles 3 colonnes (Hero, Footer)
- **Mobile** : Tout passe en 1 colonne
- Formulaires : Grid 2 colonnes → 1 colonne sur mobile
- Swipe : Interface tactile supportée

---

## 🎯 Prochaines Étapes Suggérées

1. **Ajouter page de profil étudiant** avec portfolio généré
2. **Dashboard entreprise** pour gérer les offres
3. **Système de matching** réel avec notifications
4. **Chat** entre étudiants et entreprises
5. **Filtres** avancés dans la recherche
6. **Analytics** pour les entreprises
