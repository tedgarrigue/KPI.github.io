'use client';

import { useState, useMemo } from 'react';
import { JobOffer, SearchCriteria } from '@/lib/types';
import JobCard from './JobCard';
import Pagination from './Pagination';

interface JobListProps {
  offers: JobOffer[];
  criteria?: SearchCriteria;
  itemsPerPage?: number;
}

export default function JobList({
  offers,
  criteria,
  itemsPerPage = 10,
}: JobListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginationData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const items = offers.slice(startIndex, endIndex);
    const totalPages = Math.ceil(offers.length / itemsPerPage);

    return { items, totalPages, currentPage };
  }, [offers, currentPage, itemsPerPage]);

  if (offers.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <p className="text-gray-600 text-lg">
          Aucune offre trouvée. Essayez avec d'autres critères.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 rounded-lg p-4">
        <p className="text-gray-700 font-semibold">
          {offers.length} offre{offers.length > 1 ? 's' : ''} trouvée{offers.length > 1 ? 's' : ''}
        </p>
      </div>

      <div className="space-y-4">
        {paginationData.items.map((offer) => (
          <JobCard
            key={offer.id}
            offer={offer}
            criteria={criteria}
          />
        ))}
      </div>

      {paginationData.totalPages > 1 && (
        <Pagination
          currentPage={paginationData.currentPage}
          totalPages={paginationData.totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
