import { JobOffer, SearchCriteria } from '../types';

interface AdzunaJob {
  title: string;
  company: { display_name: string };
  location: { display_name: string };
  description: string;
  salary_min?: number;
  salary_max?: number;
  contract_type?: string;
  redirect_url?: string;
  created: string;
}

export async function searchJobsAdzuna(criteria: SearchCriteria): Promise<JobOffer[]> {
  const apiKey = process.env.NEXT_PUBLIC_ADZUNA_API_KEY;
  const appId = process.env.NEXT_PUBLIC_ADZUNA_APP_ID;

  if (!apiKey || !appId) {
    throw new Error(
      'Adzuna API key or App ID not configured. Please set NEXT_PUBLIC_ADZUNA_API_KEY and NEXT_PUBLIC_ADZUNA_APP_ID in .env.local'
    );
  }

  const searchTerm = criteria.title;
  const location = criteria.location;

  // Build Adzuna API URL
  const params = new URLSearchParams({
    app_id: appId,
    app_key: apiKey,
    what: searchTerm,
    where: location,
    results_per_page: '50',
    country: 'fr',
  });

  try {
    const response = await fetch(
      `https://api.adzuna.com/v1/search/2?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error(`Adzuna API error: ${response.statusText}`);
    }

    const data = await response.json();
    const results = data.results || [];

    return results.map((job: AdzunaJob, index: number) => ({
      id: `adzuna-${index}`,
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      description: job.description,
      salary: {
        min: job.salary_min,
        max: job.salary_max,
        currency: 'EUR',
      },
      contractType: mapContractType(job.contract_type),
      postedDate: job.created,
      url: job.redirect_url,
      source: 'Adzuna',
    }));
  } catch (error) {
    console.error('Adzuna search error:', error);
    throw error;
  }
}

function mapContractType(adzunaType?: string): JobOffer['contractType'] {
  if (!adzunaType) return undefined;

  const lowerType = adzunaType.toLowerCase();
  if (lowerType.includes('permanent') || lowerType.includes('cdi'))
    return 'CDI';
  if (lowerType.includes('contract') || lowerType.includes('cdd'))
    return 'CDD';
  if (lowerType.includes('temporary')) return 'CDD';
  if (lowerType.includes('apprenticeship')) return 'Alternance';
  if (lowerType.includes('internship')) return 'Stage';

  return undefined;
}
