import { JobOffer, SearchCriteria } from '../types';

interface RemoteOKJob {
  id: number;
  slug: string;
  url?: string;
  title: string;
  company: string;
  company_logo?: string;
  description: string;
  location?: string;
  salary?: string;
  published_at: string;
  tags?: string[];
}

interface RemoteOKResponse {
  [key: string]: RemoteOKJob | string;
}

export async function searchJobsRemoteOK(criteria: SearchCriteria): Promise<JobOffer[]> {
  try {
    // RemoteOK doesn't require authentication for public jobs
    // Filter by keyword
    const searchTerm = encodeURIComponent(criteria.title || 'developer');

    const response = await fetch(
      `https://remoteok.com/api?action=fetch&location=${encodeURIComponent(criteria.location || 'worldwide')}&tag=${searchTerm}`
    );

    if (!response.ok) {
      console.error('RemoteOK API error:', response.statusText);
      return [];
    }

    const data: RemoteOKResponse = await response.json();
    const jobs: RemoteOKJob[] = [];

    // Convert object to array, skipping metadata
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'object' && value !== null && 'id' in value) {
        jobs.push(value as RemoteOKJob);
      }
    }

    return jobs.map((job: RemoteOKJob) => {
      const salaryMatch = job.salary?.match(/\$?([\d,]+)[\s-]*\$?([\d,]+)?/);
      const parsedSalary =
        salaryMatch && salaryMatch[1]
          ? {
              min: parseInt(salaryMatch[1].replace(/,/g, '')) * 12, // Convert monthly to yearly
              max: salaryMatch[2]
                ? parseInt(salaryMatch[2].replace(/,/g, '')) * 12
                : undefined,
              currency: 'USD',
            }
          : undefined;

      return {
        id: `remoteok-${job.id}`,
        title: job.title,
        company: job.company,
        location: job.location || 'Remote',
        description: job.description,
        salary: parsedSalary,
        remote: 'Full',
        postedDate: new Date(job.published_at * 1000).toISOString(),
        url: job.url || `https://remoteok.com/l/${job.slug}`,
        source: 'RemoteOK',
      };
    });
  } catch (error) {
    console.error('RemoteOK search error:', error);
    return [];
  }
}
