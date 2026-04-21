import { JobOffer, KPIData, SearchCriteria } from './types';
import { FRENCH_STOPWORDS, filterStopwords } from './stopwords';
import { extractSkills } from './skills';

export function analyzeOffers(offers: JobOffer[]): KPIData {
  const totalOffers = offers.length;

  // Top companies
  const companyMap = new Map<string, number>();
  offers.forEach(offer => {
    companyMap.set(offer.company, (companyMap.get(offer.company) || 0) + 1);
  });
  const topCompanies = Array.from(companyMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Extract skills from all descriptions
  const skillsMap = new Map<string, number>();
  offers.forEach(offer => {
    const skills = extractSkills(offer.description + ' ' + offer.title);
    skills.forEach(skill => {
      skillsMap.set(skill, (skillsMap.get(skill) || 0) + 1);
    });
  });
  const topSkills = Array.from(skillsMap.entries())
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Top keywords
  const words = offers
    .map(o => `${o.title} ${o.description}`.toLowerCase())
    .join(' ')
    .split(/\s+/)
    .filter(w => w.length > 3 && !FRENCH_STOPWORDS.has(w));

  const keywordMap = new Map<string, number>();
  words.forEach(word => {
    keywordMap.set(word, (keywordMap.get(word) || 0) + 1);
  });
  const topKeywords = Array.from(keywordMap.entries())
    .map(([keyword, count]) => ({ keyword, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Contract distribution
  const contractDistribution: Record<string, number> = {};
  offers.forEach(offer => {
    const type = offer.contractType || 'Unknown';
    contractDistribution[type] = (contractDistribution[type] || 0) + 1;
  });

  // Remote distribution
  const remoteDistribution: Record<string, number> = {};
  offers.forEach(offer => {
    const remote = offer.remote || 'Unknown';
    remoteDistribution[remote] = (remoteDistribution[remote] || 0) + 1;
  });

  // Experience distribution
  const experienceDistribution: Record<string, number> = {};
  offers.forEach(offer => {
    const exp = offer.experienceLevel || 'Unknown';
    experienceDistribution[exp] = (experienceDistribution[exp] || 0) + 1;
  });

  // Average salary
  const salaries = offers
    .filter(o => o.salary?.min)
    .map(o => o.salary!.min!);
  const averageSalary = salaries.length > 0 
    ? Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length)
    : undefined;

  // Daily volume (simplified)
  const dailyVolumeMap = new Map<string, number>();
  offers.forEach(offer => {
    const date = offer.postedDate?.split('T')[0] || new Date().toISOString().split('T')[0];
    dailyVolumeMap.set(date, (dailyVolumeMap.get(date) || 0) + 1);
  });
  const dailyVolume = Array.from(dailyVolumeMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-30);

  return {
    totalOffers,
    topCompanies,
    topSkills,
    topKeywords,
    averageSalary,
    contractDistribution,
    remoteDistribution,
    experienceDistribution,
    dailyVolume,
  };
}

export function calculateRelevanceScore(
  offer: JobOffer,
  criteria: SearchCriteria
): number {
  let score = 0;
  const titleLower = offer.title.toLowerCase();
  const descLower = offer.description.toLowerCase();
  const criteriaTitle = criteria.title.toLowerCase();
  const criteriaLocation = criteria.location.toLowerCase();

  // Title match (40 points)
  if (titleLower.includes(criteriaTitle)) {
    score += 40;
  } else {
    const titleWords = criteriaTitle.split(' ');
    const matchedWords = titleWords.filter(w => titleLower.includes(w));
    score += (matchedWords.length / titleWords.length) * 40;
  }

  // Location match (30 points)
  if (offer.location.toLowerCase().includes(criteriaLocation)) {
    score += 30;
  }

  // Description relevance (20 points)
  const descWords = criteriaTitle.split(' ');
  const descMatches = descWords.filter(w => descLower.includes(w));
  score += (descMatches.length / descWords.length) * 20;

  // Bonus for remote if desired
  if (
    criteria.remote &&
    offer.remote &&
    criteria.remote.toLowerCase() === offer.remote.toLowerCase()
  ) {
    score += 10;
  }

  // Bonus for contract type if specified
  if (
    criteria.contractType &&
    offer.contractType &&
    criteria.contractType.toLowerCase() === offer.contractType.toLowerCase()
  ) {
    score += 10;
  }

  return Math.min(100, Math.round(score));
}

export function sortOffersByRelevance(
  offers: JobOffer[],
  criteria: SearchCriteria
): JobOffer[] {
  return [...offers].sort((a, b) => {
    const scoreA = calculateRelevanceScore(a, criteria);
    const scoreB = calculateRelevanceScore(b, criteria);
    return scoreB - scoreA;
  });
}
