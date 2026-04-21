'use client';

import { JobOffer, SearchCriteria } from '@/lib/types';
import { calculateRelevanceScore } from '@/lib/analysis';

interface JobCardProps {
  offer: JobOffer;
  criteria?: SearchCriteria;
}

export default function JobCard({ offer, criteria }: JobCardProps) {
  const relevanceScore = criteria
    ? calculateRelevanceScore(offer, criteria)
    : null;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-brand-orange">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{offer.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{offer.company}</p>
        </div>
        {relevanceScore !== null && (
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-brand-light ml-4">
            <span className="text-2xl font-bold text-brand-orange">
              {relevanceScore}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-4">
        <div className="flex items-center gap-1">
          <span className="font-semibold">📍</span>
          {offer.location}
        </div>
        {offer.contractType && (
          <div className="flex items-center gap-1">
            <span className="font-semibold">📋</span>
            {offer.contractType}
          </div>
        )}
        {offer.remote && (
          <div className="flex items-center gap-1">
            <span className="font-semibold">🏠</span>
            {offer.remote === 'Full'
              ? 'Full Remote'
              : offer.remote === 'Partial'
                ? 'Partial Remote'
                : 'On-site'}
          </div>
        )}
        {offer.experienceLevel && (
          <div className="flex items-center gap-1">
            <span className="font-semibold">⭐</span>
            {offer.experienceLevel}
          </div>
        )}
      </div>

      {offer.salary && (offer.salary.min || offer.salary.max) && (
        <div className="bg-brand-light px-3 py-2 rounded mb-4">
          <p className="text-sm font-semibold text-brand-dark">
            💰{' '}
            {offer.salary.min && offer.salary.max
              ? `${offer.salary.min.toLocaleString()} - ${offer.salary.max.toLocaleString()}`
              : offer.salary.min
                ? `À partir de ${offer.salary.min.toLocaleString()}`
                : 'Salaire non communiqué'}{' '}
            {offer.salary.currency}
          </p>
        </div>
      )}

      <p className="text-gray-700 text-sm line-clamp-3 mb-4">
        {offer.description}
      </p>

      <div className="flex items-center justify-between">
        {offer.postedDate && (
          <span className="text-xs text-gray-500">
            {new Date(offer.postedDate).toLocaleDateString('fr-FR')}
          </span>
        )}
        {offer.url && (
          <a
            href={offer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-orange hover:text-brand-dark font-semibold text-sm underline"
          >
            Voir l'offre →
          </a>
        )}
      </div>
    </div>
  );
}
