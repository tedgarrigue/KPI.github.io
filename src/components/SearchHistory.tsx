'use client';

import { SearchHistory } from '@/lib/types';

interface SearchHistoryProps {
  history: SearchHistory[];
  onSelect: (criteria: SearchHistory) => void;
  onClear: () => void;
}

export default function SearchHistoryComponent({
  history,
  onSelect,
  onClear,
}: SearchHistoryProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Historique des recherches</h3>
        <button
          onClick={onClear}
          className="text-sm text-gray-500 hover:text-gray-700 font-semibold"
        >
          ✕ Effacer
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {history.map((entry) => (
          <button
            key={entry.id}
            onClick={() => onSelect(entry)}
            className="px-3 py-2 bg-gray-100 hover:bg-brand-light text-gray-700 hover:text-brand-dark rounded-lg transition-colors text-sm font-medium"
          >
            <span>
              {entry.criteria.title && entry.criteria.location
                ? `${entry.criteria.title} - ${entry.criteria.location}`
                : entry.criteria.title || entry.criteria.location || 'Recherche'}
            </span>
            <span className="ml-2 text-xs text-gray-500">({entry.resultCount})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
