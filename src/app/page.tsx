'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import SearchHistoryComponent from '@/components/SearchHistory';
import Filters from '@/components/Filters';
import StatsDashboard from '@/components/StatsDashboard';
import JobList from '@/components/JobList';
import ExportButton from '@/components/ExportButton';
import BarChartCard from '@/components/charts/BarChartCard';
import PieChartCard from '@/components/charts/PieChartCard';
import { JobOffer, SearchCriteria, KPIData } from '@/lib/types';
import { analyzeOffers, sortOffersByRelevance } from '@/lib/analysis';
import { searchJobs } from '@/lib/jobService';
import { useSearchHistory } from '@/hooks/useSearchHistory';

export default function Home() {
  const [criteria, setCriteria] = useState<SearchCriteria>({
    title: '',
    location: '',
  });
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [kpiData, setKpiData] = useState<KPIData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const { history, addToHistory, clearHistory, getFromHistory, isLoaded } =
    useSearchHistory();

  const handleSearch = async (searchCriteria: SearchCriteria) => {
    setCriteria(searchCriteria);
    setIsLoading(true);
    setHasSearched(true);

    try {
      const results = await searchJobs(searchCriteria);
      const sortedResults = sortOffersByRelevance(results, searchCriteria);
      setOffers(sortedResults);
      addToHistory(searchCriteria, results.length);

      const analysis = analyzeOffers(results);
      setKpiData(analysis);
    } catch (error) {
      console.error('Search error:', error);
      setOffers([]);
      setKpiData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (newCriteria: SearchCriteria) => {
    setCriteria(newCriteria);
  };

  const handleFilterClear = () => {
    setCriteria({
      title: criteria.title,
      location: criteria.location,
    });
  };

  const handleHistorySelect = (entry: typeof history[0]) => {
    handleSearch(entry.criteria);
  };

  const handleHistoryClear = () => {
    clearHistory();
  };

  return (
    <div>
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Form */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6 sticky top-0 z-10">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Search History */}
        {isLoaded && (
          <div className="mb-8">
            <SearchHistoryComponent
              history={history}
              onSelect={handleHistorySelect}
              onClear={handleHistoryClear}
            />
          </div>
        )}

        {/* Filters and Results */}
        {hasSearched && (
          <div className="space-y-8">
            {/* Filters */}
            <Filters
              criteria={criteria}
              onChange={handleFilterChange}
              onClear={handleFilterClear}
            />

            {/* KPI Dashboard */}
            {kpiData && (
              <StatsDashboard data={kpiData} />
            )}

            {/* Charts */}
            {kpiData && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BarChartCard
                  title="Offres par enterprise"
                  data={kpiData.topCompanies.map(c => ({ name: c.name, value: c.count }))}
                />
                <BarChartCard
                  title="Offres par compétences"
                  data={kpiData.topSkills.map(s => ({ name: s.skill, value: s.count }))}
                />
                <BarChartCard
                  title="Offres par mots-clés"
                  data={kpiData.topKeywords.map(k => ({ name: k.keyword, value: k.count }))}
                />
                {kpiData.dailyVolume && (
                  <BarChartCard
                    title="Volume par jour"
                    data={kpiData.dailyVolume.map(d => ({ name: d.date, value: d.count }))}
                  />
                )}

                <PieChartCard
                  title="Distribution des contrats"
                  data={kpiData.contractDistribution}
                />
                <PieChartCard
                  title="Distribution télétravail"
                  data={kpiData.remoteDistribution}
                />
              </div>
            )}

            {/* Export Button */}
            {offers.length > 0 && (
              <div className="flex justify-end">
                <ExportButton offers={offers} disabled={isLoading} />
              </div>
            )}

            {/* Job Listings */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Résultats ({offers.length})
                </h2>
              </div>
              <JobList offers={offers} criteria={criteria} itemsPerPage={10} />
            </div>
          </div>
        )}

        {/* Initial State */}
        {!hasSearched && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Commencez votre recherche
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Entrez un intitulé de poste et une localisation pour découvrir les offres
              d'emploi disponibles et analyser les tendances du marché.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
