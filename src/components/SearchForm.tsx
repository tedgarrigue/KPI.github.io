'use client';

import { useState } from 'react';
import { SearchCriteria } from '@/lib/types';
import { JobProvider } from '@/lib/jobService';

interface SearchFormProps {
  onSearch: (criteria: SearchCriteria, provider?: JobProvider) => void;
  isLoading?: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [provider, setProvider] = useState<JobProvider>('multi');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() || location.trim()) {
      onSearch({ title: title.trim(), location: location.trim() }, provider);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Intitulé du poste
          </label>
          <input
            id="title"
            type="text"
            placeholder="ex: Développeur React, Data Scientist..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Localisation
          </label>
          <input
            id="location"
            type="text"
            placeholder="ex: Paris, Lyon, Télétravail..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
        </div>
        <div>
          <label htmlFor="provider" className="block text-sm font-medium text-gray-700 mb-2">
            Source d'offres
          </label>
          <select
            id="provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value as JobProvider)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
          >
            <option value="multi">🔄 Toutes les sources</option>
            <option value="mock">📋 Mock (Demo)</option>
            <option value="indeed">💼 Indeed</option>
            <option value="jooble">🔍 Jooble</option>
            <option value="remoteok">🌍 RemoteOK</option>
            <option value="adzuna">🎯 Adzuna</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 w-full md:w-auto px-6 py-3 bg-brand-orange hover:bg-brand-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Recherche en cours...' : 'Rechercher'}
      </button>
    </form>
  );
}
