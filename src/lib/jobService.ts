import { JobOffer, SearchCriteria } from './types';
import { searchJobsMock } from './providers/mockProvider';
import { searchJobsAdzuna } from './providers/adzunaProvider';
import { searchJobsIndeed } from './providers/indeedProvider';
import { searchJobsJooble } from './providers/joobleProvider';
import { searchJobsRemoteOK } from './providers/remoteokProvider';

export type JobProvider = 'mock' | 'adzuna' | 'indeed' | 'jooble' | 'remoteok' | 'multi';

const PROVIDER = (process.env.NEXT_PUBLIC_JOB_PROVIDER || 'mock') as JobProvider;

// Deduplicate jobs by title + company + location
function deduplicateJobs(jobs: JobOffer[]): JobOffer[] {
  const seen = new Set<string>();
  return jobs.filter(job => {
    const key = `${job.title.toLowerCase()}|${job.company.toLowerCase()}|${job.location.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// Search multiple providers and combine results
export async function searchJobsMulti(criteria: SearchCriteria): Promise<JobOffer[]> {
  console.log('[JobService] Searching across multiple providers...');

  const results: JobOffer[] = [];

  // Parallel search across all available providers
  const promises = [
    searchJobsMock(criteria).catch(e => {
      console.error('Mock search error:', e);
      return [];
    }),
    searchJobsIndeed(criteria).catch(e => {
      console.error('Indeed search error:', e);
      return [];
    }),
    searchJobsJooble(criteria).catch(e => {
      console.error('Jooble search error:', e);
      return [];
    }),
    searchJobsRemoteOK(criteria).catch(e => {
      console.error('RemoteOK search error:', e);
      return [];
    }),
  ];

  const allResults = await Promise.all(promises);
  for (const batch of allResults) {
    results.push(...batch);
  }

  // Deduplicate and sort by relevance
  return deduplicateJobs(results).slice(0, 100);
}

export async function searchJobs(
  criteria: SearchCriteria,
  provider?: JobProvider
): Promise<JobOffer[]> {
  const activeProvider = provider || PROVIDER;
  console.log(`[JobService] Searching with provider: ${activeProvider}`);

  try {
    switch (activeProvider) {
      case 'multi':
        return await searchJobsMulti(criteria);

      case 'adzuna':
        return await searchJobsAdzuna(criteria);

      case 'indeed':
        return await searchJobsIndeed(criteria);

      case 'jooble':
        return await searchJobsJooble(criteria);

      case 'remoteok':
        return await searchJobsRemoteOK(criteria);

      case 'mock':
      default:
        return await searchJobsMock(criteria);
    }
  } catch (error) {
    console.error('[JobService] Error during search:', error);
    // Fallback to mock on error
    return await searchJobsMock(criteria);
  }
}
