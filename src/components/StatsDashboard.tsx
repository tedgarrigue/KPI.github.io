'use client';

import { KPIData } from '@/lib/types';
import KpiCard from './KpiCard';

interface StatsDashboardProps {
  data: KPIData;
}

export default function StatsDashboard({ data }: StatsDashboardProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border-t-4 border-brand-orange">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tableau de bord KPI</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KpiCard
          icon="📊"
          title="Offres trouvées"
          value={data.totalOffers}
        />
        <KpiCard
          icon="🏢"
          title="Entreprises"
          value={data.topCompanies.length}
        />
        <KpiCard
          icon="💼"
          title="Compétences détectées"
          value={data.topSkills.length}
        />
        {data.averageSalary && (
          <KpiCard
            icon="💰"
            title="Salaire moyen"
            value={`${data.averageSalary.toLocaleString()} €`}
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="font-bold text-gray-900 mb-4">Top Entreprises</h3>
          <ul className="space-y-2">
            {data.topCompanies.slice(0, 5).map((company, idx) => (
              <li key={idx} className="flex justify-between text-sm text-gray-700">
                <span>{company.name}</span>
                <span className="font-semibold text-brand-orange">{company.count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="font-bold text-gray-900 mb-4">Compétences Top</h3>
          <ul className="space-y-2">
            {data.topSkills.slice(0, 5).map((skill, idx) => (
              <li key={idx} className="flex justify-between text-sm text-gray-700">
                <span>{skill.skill}</span>
                <span className="font-semibold text-brand-orange">{skill.count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="font-bold text-gray-900 mb-4">Mots-clés Top</h3>
          <ul className="space-y-2">
            {data.topKeywords.slice(0, 5).map((kw, idx) => (
              <li key={idx} className="flex justify-between text-sm text-gray-700">
                <span>{kw.keyword}</span>
                <span className="font-semibold text-brand-orange">{kw.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h4 className="font-semibold text-gray-900 mb-3">Types de contrats</h4>
          <div className="space-y-1 text-sm">
            {Object.entries(data.contractDistribution).map(([type, count]) => (
              <div key={type} className="flex justify-between text-gray-700">
                <span>{type}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-md">
          <h4 className="font-semibold text-gray-900 mb-3">Télétravail</h4>
          <div className="space-y-1 text-sm">
            {Object.entries(data.remoteDistribution).map(([type, count]) => (
              <div key={type} className="flex justify-between text-gray-700">
                <span>{type === 'No' ? 'Sur site' : type === 'Partial' ? 'Partiel' : 'Complet'}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-md">
          <h4 className="font-semibold text-gray-900 mb-3">Niveau d'expérience</h4>
          <div className="space-y-1 text-sm">
            {Object.entries(data.experienceDistribution).map(([level, count]) => (
              <div key={level} className="flex justify-between text-gray-700">
                <span>{level}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
