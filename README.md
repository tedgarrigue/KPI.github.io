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

### Adzuna API (optionnel)
- **Configuration** :
  1. Inscrivez-vous à [Adzuna API](https://adzuna.com/api)
  2. Copiez votre `app_id` et `app_key`
  3. Créez `.env.local` :
     ```
     NEXT_PUBLIC_JOB_PROVIDER=adzuna
     NEXT_PUBLIC_ADZUNA_API_KEY=your_key
     NEXT_PUBLIC_ADZUNA_APP_ID=your_app_id
     ```

### Autres Providers (stub)
- `jooble` : implémentation en attente
- `francetravail` : nécessite OAuth2 côté serveur (non implémenté)

## ⚠️ Limites Connues

### Sécurité des clés API
- En mode GitHub Pages (export statique), les clés `NEXT_PUBLIC_*` sont **exposées côté client**
- **Solution de production** : déployer sur Vercel et utiliser des routes API anonymisées

### Extraction de compétences
- Utilise un **dictionnaire statique** (pas de machine learning)
- Suffisant pour démarrer, extensible via `src/lib/skills.ts`
- Cas d'usage avancé : intégrer un modèle NER (NLP)

### France Travail
- Nécessite un **flux OAuth2 serveur** pour échanger le code
- Stub documenté mais non implémenté
- À mettre en place via une API route Vercel

### Performance
- Pagination limitée à 50 résultats par requête Adzuna
- Cache localStorage : 10 dernières recherches maximum

## 🛠️ Technologie

- **Frontend** : Next.js 14 (App Router), React 18, TypeScript
- **Styling** : Tailwind CSS 3, PostCSS
- **Charts** : Recharts 2
- **Déploiement** : GitHub Pages (export statique) ou Vercel

## 📝 Exemples d'utilisation

### Recherche simple
1. Entrez "Développeur React" et "Paris"
2. Cliquez sur "Rechercher"
3. Consultez le tableau de bord KPI et les offres

### Filtrage avancé
1. Effectuez une recherche
2. Filtrez par type de contrat (CDI), télétravail (Full), salaire (> 40000€)
3. Exporte les résultats en CSV

### Historique
- Jusqu'à 10 dernières recherches sauvegardées automatiquement
- Cliquez sur une recherche précédente pour la relancer
- Effacez l'historique au besoin

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

MIT License - voir `LICENSE` pour les détails.

## 📧 Contact

Pour toute question, ouvrez une [issue](https://github.com/tedgarrigue/KPI.github.io/issues).

---

**Dernière mise à jour** : Avril 2025
