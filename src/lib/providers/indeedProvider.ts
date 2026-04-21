import { JobOffer, SearchCriteria } from '../types';

interface IndeedJob {
  title: string;
  company: string;
  location: string;
  description?: string;
  summary?: string;
  salary?: string;
  date: string;
  url?: string;
  jobkey?: string;
  snippet?: string;
}

interface IndeedResponse {
  results: IndeedJob[];
  total?: number;
}

export async function searchJobsIndeed(criteria: SearchCriteria): Promise<JobOffer[]> {
  const apiKey = process.env.NEXT_PUBLIC_INDEED_API_KEY;

  if (!apiKey) {
    console.warn('Indeed API key not configured');
    return [];
  }

  const searchTerm = encodeURIComponent(criteria.title || 'job');
  const location = encodeURIComponent(criteria.location || '');

  try {
    // Using RapidAPI Indeed Job Search
    const response = await fetch(
      `https://indeed-api.rapidapi.com/v1/jobs?query=${searchTerm}&location=${location}&limit=50&offset=0`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'indeed-api.rapidapi.com',
        },
      }
    );

    if (!response.ok) {
      console.error('Indeed API error:', response.statusText);
      return [];
    }

    const data: IndeedResponse = await response.json();
    const results = data.results || [];

    return results.map((job: IndeedJob, index: number) => {
      const salaryMatch = job.salary?.match(/(\d+)\s*-\s*(\d+)/);
      const parsedSalary = salaryMatch
        ? {
            min: parseInt(salaryMatch[1]) * 1000,
            max: parseInt(salaryMatch[2]) * 1000,
            currency: 'EUR',
          }
        : undefined;

      return {
        id: `indeed-${job.jobkey || index}`,
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.summary || job.snippet || job.description || '',
        salary: parsedSalary,
        postedDate: job.date,
        url: job.url,
        source: 'Indeed',
      };
    });
  } catch (error) {
    console.error('Indeed search error:', error);
    return [];
  }
}
