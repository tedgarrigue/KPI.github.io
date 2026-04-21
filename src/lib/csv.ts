import { JobOffer } from './types';

export function generateCSV(offers: JobOffer[]): string {
  const headers = [
    'Title',
    'Company',
    'Location',
    'Contract Type',
    'Remote',
    'Experience Level',
    'Salary Min',
    'Salary Max',
    'Currency',
    'Posted Date',
    'URL',
    'Source',
  ];

  const rows = offers.map(offer => [
    `"${(offer.title || '').replace(/"/g, '""')}"`,
    `"${(offer.company || '').replace(/"/g, '""')}"`,
    `"${(offer.location || '').replace(/"/g, '""')}"`,
    offer.contractType || '',
    offer.remote || '',
    offer.experienceLevel || '',
    offer.salary?.min || '',
    offer.salary?.max || '',
    offer.salary?.currency || '',
    offer.postedDate || '',
    offer.url || '',
    offer.source || '',
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(r => r.join(',')),
  ].join('\n');

  return csvContent;
}

export function downloadCSV(jobOffers: JobOffer[], filename: string = 'job-offers.csv'): void {
  const csv = generateCSV(jobOffers);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
