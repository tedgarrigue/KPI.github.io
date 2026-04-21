'use client';

import { SearchCriteria } from '@/lib/types';

interface FiltersProps {
  criteria: SearchCriteria;
  onChange: (criteria: SearchCriteria) => void;
  onClear: () => void;
}

const CONTRACT_OPTIONS = ['CDI', 'CDD', 'Stage', 'Alternance', 'Freelance'];
const REMOTE_OPTIONS = ['No', 'Partial', 'Full'];
const EXPERIENCE_OPTIONS = ['Junior', 'Confirmé', 'Senior', 'Expert'];

export default function Filters({ criteria, onChange, onClear }: FiltersProps) {
  const handleChange = (field: string, value: string | number | undefined) => {
    onChange({
      ...criteria,
      [field]: value,
    });
  };

  const hasActiveFilters =
    criteria.contractType ||
    criteria.remote ||
    criteria.experienceLevel ||
    criteria.salaryMin;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-brand-orange">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Filtres avancés</h3>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-sm text-brand-orange hover:text-brand-dark font-semibold"
          >
            ✕ Réinitialiser
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de contrat
          </label>
          <select
            value={criteria.contractType || ''}
            onChange={(e) => handleChange('contractType', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
          >
            <option value="">Tous</option>
            {CONTRACT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Télétravail
          </label>
          <select
            value={criteria.remote || ''}
            onChange={(e) => handleChange('remote', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
          >
            <option value="">Indifférent</option>
            {REMOTE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option === 'No'
                  ? 'Sur site'
                  : option === 'Partial'
                    ? 'Partiel'
                    : 'Complet'}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Niveau d'expérience
          </label>
          <select
            value={criteria.experienceLevel || ''}
            onChange={(e) => handleChange('experienceLevel', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
          >
            <option value="">Tous</option>
            {EXPERIENCE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salaire minimum (€)
          </label>
          <input
            type="number"
            placeholder="ex: 30000"
            value={criteria.salaryMin || ''}
            onChange={(e) =>
              handleChange('salaryMin', e.target.value ? parseInt(e.target.value) : undefined)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
        </div>
      </div>
    </div>
  );
}
