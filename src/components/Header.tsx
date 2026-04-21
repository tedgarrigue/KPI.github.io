'use client';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-brand-orange to-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Job Analyzer
          </h1>
          <p className="text-lg text-orange-100">
            Analysez les offres d'emploi en temps réel avec des insights détaillés
          </p>
        </div>
      </div>
    </header>
  );
}
