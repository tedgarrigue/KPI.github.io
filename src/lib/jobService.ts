import { JobOffer, SearchCriteria } from './types';
import { searchJobsMock } from './providers/mockProvider';
import { searchJobsAdzuna } from './providers/adzunaProvider';

type JobProvider = 'mock' | 'adzuna' | 'jooble' | 'francetravail';

const PROVIDER = (process.env.NEXT_PUBLIC_JOB_PROVIDER || 'mock') as JobProvider;

export async function searchJobs(criteria: SearchCriteria): Promise<JobOffer[]> {
  console.log(`[JobService] Searching with provider: ${PROVIDER}`);

  try {
    switch (PROVIDER) {
      case 'adzuna':
        return await searchJobsAdzuna(criteria);

      case 'jooble':
      case 'francetravail':
        // Stubs for future implementation
        console.warn(`Provider ${PROVIDER} not yet implemented, falling back to mock`);
        return await searchJobsMock(criteria);

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
