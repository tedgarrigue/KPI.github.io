'use client';

import { JobOffer } from '@/lib/types';
import { downloadCSV } from '@/lib/csv';

interface ExportButtonProps {
  offers: JobOffer[];
  disabled?: boolean;
}

export default function ExportButton({ offers, disabled }: ExportButtonProps) {
  const handleExport = () => {
    if (offers.length === 0) return;
    
    const filename = `job-offers-${new Date().toISOString().split('T')[0]}.csv`;
    downloadCSV(offers, filename);
  };

  return (
    <button
      onClick={handleExport}
      disabled={disabled || offers.length === 0}
      className="px-4 py-2 bg-brand-orange hover:bg-brand-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      ⬇️ Exporter en CSV
      {offers.length > 0 && <span className="text-xs">({offers.length})</span>}
    </button>
  );
}
