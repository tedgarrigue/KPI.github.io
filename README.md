# Job Analyzer 📊

Une application web moderne pour analyser les offres d'emploi en temps réel avec des insights détaillés et des visualisations KPI.

## 🎯 Objectif

Permettre aux utilisateurs de :
- Rechercher des offres d'emploi par intitulé et localisation
- Analyser les tendances du marché de l'emploi
- Visualiser les compétences les plus demandées
- Exporter les résultats en CSV
- Consulter l'historique des recherches

## ✨ Fonctionnalités

### Recherche & Filtrage
- **Recherche libre** : intitulé de poste + localisation
- **Filtres avancés** :
  - Type de contrat (CDI, CDD, Stage, Alternance, Freelance)
  - Mode de travail (Télétravail complet, partiel, sur site)
  - Niveau d'expérience (Junior, Confirmé, Senior, Expert)
  - Salaire minimum

### Tableau de Bord KPI
- **Métriques clés** : nombre total d'offres, entreprises, compétences détectées, salaire moyen
- **Top 5** : entreprises, compétences, mots-clés
- **Distributions** : types de contrats, télétravail, niveaux d'expérience

### Visualisations
- Graphiques en barres (offres par entreprise, compétence, mot-clé, volume par jour)
- Graphiques en camembert (distribution des contrats, télétravail)
- Cartes détaillées avec score de pertinence

### Fonctionnalités Bonus
- 📝 **Historique** : 10 dernières recherches sauvegardées en localStorage
- 📥 **Export** : télécharger les résultats en CSV
- ⭐ **Score de pertinence** : 0-100 pour chaque offre selon la recherche
- 📄 **Pagination** : navigation intuitive dans les résultats
- 📱 **Responsive** : design adaptable à tous les écrans

## 🏗️ Architecture

```
KPI.github.io/
├── .github/workflows/
│   └── deploy.yml                    # CI/CD GitHub Pages
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Main page
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── SearchForm.tsx
│   │   ├── Filters.tsx
│   │   ├── JobCard.tsx
│   │   ├── JobList.tsx
│   │   ├── KpiCard.tsx
│   │   ├── StatsDashboard.tsx
│   │   ├── SearchHistory.tsx
│   │   ├── ExportButton.tsx
│   │   ├── Pagination.tsx
│   │   └── charts/
│   │       ├── BarChartCard.tsx
│   │       └── PieChartCard.tsx
│   ├── hooks/
│   │   └── useSearchHistory.ts       # localStorage hook
│   └── lib/
│       ├── types.ts                  # TypeScript interfaces
│       ├── analysis.ts               # KPI analysis logic
│       ├── csv.ts                    # CSV export
│       ├── stopwords.ts              # French stopwords
│       ├── skills.ts                 # Skill extraction
│       ├── jobService.ts             # Provider factory
│       └── providers/
│           ├── mockProvider.ts       # Mock data (no API key)
│           └── adzunaProvider.ts     # Adzuna API adapter
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── postcss.config.js
├── .env.example
└── README.md
```

## 🚀 Installation

### Prérequis
- Node.js 18+ et npm

### Étapes

1. **Cloner le projet**
   ```bash
   git clone https://github.com/tedgarrigue/KPI.github.io.git
   cd KPI.github.io
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration (optionnelle)**
   ```bash
   cp .env.example .env.local
   # Éditer .env.local pour configurer une API job (Adzuna, Jooble, etc.)
   ```

4. **Lancer en développement**
   ```bash
   npm run dev
   ```
   Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗️ Build & Déploiement

### Build statique pour GitHub Pages
```bash
npm run build
```
Cela génère les fichiers statiques dans `/out`.

### Déploiement automatique (GitHub Pages)
- Le workflow `.github/workflows/deploy.yml` s'exécute automatiquement sur chaque push à `main`
- Les fichiers statiques sont déployés à `https://tedgarrigue.github.io/KPI.github.io/`

### Alternative : Déploiement sur Vercel
```bash
npm install -g vercel
vercel
```
Vercel auto-détecte Next.js et configure le build automatiquement.

## 📊 Données & Providers

### Mock Provider (défaut)
- **Utilisation** : aucune clé API requise
- **Source** : données générées de manière déterministe
- **Cas d'usage** : développement, démo, prototype

### Multi-Source Provider ⭐ **(Recommandé)**
Combine automatiquement les sources :
1. **Indeed** (via RapidAPI) - 💼 Très large couverture
2. **Jooble** - 🔍 Bonne couverture européenne
3. **RemoteOK** - 🌍 Spécialisé remote, gratuit
4. **Adzuna** - 🎯 Optionnel

**Configuration** :
```bash
# .env.local
NEXT_PUBLIC_JOB_PROVIDER=multi
NEXT_PUBLIC_INDEED_API_KEY=your_rapidapi_key
NEXT_PUBLIC_JOOBLE_API_KEY=your_jooble_key
# RemoteOK est gratuit, pas de clé requise
```

### Individual Providers

#### RemoteOK (Gratuit ✅)
- **API** : publique, sans authentification
- **Spécialité** : offres 100% remote
- **Configuration** : aucune clé requise
- **Utilisation** :
  ```
  NEXT_PUBLIC_JOB_PROVIDER=remoteok
  ```

#### Indeed (via RapidAPI)
- **API** : https://rapidapi.com/laimoon/api/indeed-api
- **Pricing** : free tier (100 req/jour), puis payant
- **Couverture** : mondiale, très large
- **Configuration** :
  ```
  NEXT_PUBLIC_JOB_PROVIDER=indeed
  NEXT_PUBLIC_INDEED_API_KEY=your_key
  ```

#### Jooble
- **API** : https://jooble.org/api
- **Pricing** : gratuit (250 req/jour)
- **Couverture** : Europe, USA
- **Configuration** :
  ```
  NEXT_PUBLIC_JOB_PROVIDER=jooble
  NEXT_PUBLIC_JOOBLE_API_KEY=your_key
  ```

#### Adzuna
- **API** : https://adzuna.com/api
- **Pricing** : gratuit avec clés
- **Couverture** : mondiale
- **Configuration** :
  ```
  NEXT_PUBLIC_JOB_PROVIDER=adzuna
  NEXT_PUBLIC_ADZUNA_API_KEY=your_key
  NEXT_PUBLIC_ADZUNA_APP_ID=your_app_id
  ```

## ⚠️ Limites Connues

### Sources d'API Libres & Gratuites
- ✅ **RemoteOK** : gratuit, aucune clé requise, spécialisé remote
- ✅ **Jooble** : gratuit avec limite (250 req/jour)
- ✅ **Indeed (RapidAPI)** : free tier 100 req/jour, puis payant
- ✅ **Adzuna** : gratuit avec clés

### Performance Multi-Source
- Recherche parallèle sur multiple sources (~2-3 sec)
- Déduplication automatique des offres dupliquées
- Limite : 100 résultats combinés max (configurable)

### Extraction de compétences
- Utilise un **dictionnaire statique** (pas de machine learning)
- Suffisant pour démarrer, extensible via `src/lib/skills.ts`
- Cas d'usage avancé : intégrer un modèle NER (NLP)

### Limites API officielles
- RemoteOK 🟢 : aucune limite publique
- Jooble 🟡 : 250 requêtes/jour
- Indeed 🟡 : 100 requêtes/jour (free tier)
- Adzuna 🟡 : limite selon plan

## 🛠️ Technologie

- **Frontend** : Next.js 14 (App Router), React 18, TypeScript
- **Styling** : Tailwind CSS 3, PostCSS
- **Charts** : Recharts 2
- **Déploiement** : GitHub Pages (export statique) ou Vercel

## � Exemples de Configuration

### Démarrer immédiatement (Mock Provider)
Aucune configuration requise, data de démo automatiquement générée.
```bash
npm run dev
# Accès à http://localhost:3000
# Mode: Mock Provider (30+ offres simulées)
```

### Activer les sources légales réelles

#### Option 1 : Multi-Source (Recommandé)
```bash
# .env.local
NEXT_PUBLIC_JOB_PROVIDER=multi
NEXT_PUBLIC_JOOBLE_API_KEY=your_jooble_key
NEXT_PUBLIC_INDEED_API_KEY=your_rapidapi_key
```
Cherche sur : Indeed, Jooble, RemoteOK (gratuit), Adzuna (si clé fournie)

#### Option 2 : RemoteOK Seul (Gratuit)
```bash
NEXT_PUBLIC_JOB_PROVIDER=remoteok
```
Aucune clé requise, offres 100% remote uniquement.

#### Option 3 : Jooble Seul
```bash
NEXT_PUBLIC_JOB_PROVIDER=jooble
NEXT_PUBLIC_JOOBLE_API_KEY=your_key
```

### Obtenir les clés API

**Jooble** (Gratuit 250 req/jour)
1. Allez sur https://jooble.org/api
2. Inscrivez-vous, récupérez votre clé
3. Copiez dans `.env.local`

**Indeed** (via RapidAPI)
1. Allez sur https://rapidapi.com/laimoon/api/indeed-api
2. Cliquez "Subscribe" (free tier)
3. Copiez votre clé RapidAPI
4. Copiez dans `.env.local`

**RemoteOK**
- Accès gratuit automatique, aucune inscription requise

## 🎯 Utilisation

### Sélecteur de Source dans l'Interface
L'app inclut un **dropdown pour choisir votre source** :
- 🔄 **Toutes les sources** (Multi) - combien Indeed, Jooble, RemoteOK
- 📋 **Mock** - donnée de démo sans clé
- 💼 **Indeed** - accès direct via RapidAPI
- 🔍 **Jooble** - spécialisé découverte emplois
- 🌍 **RemoteOK** - 100% remote, gratuit
- 🎯 **Adzuna** - accès optionnel

### Workflow Typique
1. Démarrez avec **Mock** ou **RemoteOK** (gratuit)
2. Entrez un intitulé : "Développeur Python"
3. Localisation : "Paris" ou "Télétravail"
4. Cliquez "Rechercher"
5. Analysez le tableau de bord KPI
6. Exportez en CSV si besoin

### Passer à l'API Réelle
```bash
# En développement local
1. Obtenez votre clé Jooble/Indeed
2. Créez .env.local
3. NEXT_PUBLIC_JOB_PROVIDER=multi
4. NEXT_PUBLIC_JOOBLE_API_KEY=...
5. npm run dev
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

MIT License - voir `LICENSE` pour les détails.

## 📧 Contact

Pour toute question, ouvrez une [issue](https://github.com/tedgarrigue/KPI.github.io/issues).

---

**Dernière mise à jour** : Avril 2025
