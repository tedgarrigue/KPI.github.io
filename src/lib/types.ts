export interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  contractType?: 'CDI' | 'CDD' | 'Stage' | 'Alternance' | 'Freelance' | 'Other';
  remote?: 'No' | 'Partial' | 'Full';
  experienceLevel?: 'Junior' | 'Confirmé' | 'Senior' | 'Expert';
  postedDate?: string;
  url?: string;
  source?: string;
}

export interface SearchCriteria {
  title: string;
  location: string;
  contractType?: string;
  remote?: string;
  experienceLevel?: string;
  salaryMin?: number;
}

export interface KPIData {
  totalOffers: number;
  topCompanies: Array<{ name: string; count: number }>;
  topSkills: Array<{ skill: string; count: number }>;
  topKeywords: Array<{ keyword: string; count: number }>;
  averageSalary?: number;
  contractDistribution: Record<string, number>;
  remoteDistribution: Record<string, number>;
  experienceDistribution: Record<string, number>;
  dailyVolume?: Array<{ date: string; count: number }>;
}

export interface SearchHistory {
  id: string;
  criteria: SearchCriteria;
  timestamp: number;
  resultCount: number;
}
