import { JobOffer, SearchCriteria } from '../types';

interface JoobleJob {
  id: string;
  title: string;
  company: string;
  location: string;
  snippet: string;
  description?: string;
  salary: string | null;
  salaryMin?: number;
  salaryMax?: number;
  type?: string;
  remote?: boolean;
  link?: string;
  updatedDate?: string;
}

interface JoobleResponse {
  jobs: JoobleJob[];
  totalCount: number;
}

export async function searchJobsJooble(criteria: SearchCriteria): Promise<JobOffer[]> {
  const apiKey = process.env.NEXT_PUBLIC_JOOBLE_API_KEY;

  if (!apiKey) {
    console.warn('Jooble API key not configured');
    return [];
  }

  const payload = {
    keywords: criteria.title || 'job',
    location: criteria.location || '',
    radius: 100,
    ...(criteria.salaryMin && { salaryMin: criteria.salaryMin }),
    ...(criteria.contractType && { type: criteria.contractType }),
  };

  try {
    const response = await fetch('https://api.jooble.org/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        api_key: apiKey,
      }),
    });

    if (!response.ok) {
      console.error('Jooble API error:', response.statusText);
      return [];
    }

    const data: JoobleResponse = await response.json();
    const jobs = data.jobs || [];

    return jobs.map((job: JoobleJob) => ({
      id: `jooble-${job.id}`,
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description || job.snippet || '',
      salary:
        job.salaryMin || job.salaryMax
          ? {
              min: job.salaryMin,
              max: job.salaryMax,
              currency: 'EUR',
            }
          : undefined,
      contractType: job.type as JobOffer['contractType'],
      remote: job.remote ? 'Full' : undefined,
      postedDate: job.updatedDate,
      url: job.link,
      source: 'Jooble',
    }));
  } catch (error) {
    console.error('Jooble search error:', error);
    return [];
  }
}
