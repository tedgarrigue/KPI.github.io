'use client';

import { useState, useEffect } from 'react';
import { SearchHistory, SearchCriteria } from '@/lib/types';

const STORAGE_KEY = 'jobAnalyzer:searchHistory';
const MAX_HISTORY = 10;

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistory[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setHistory(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to load search history:', error);
      }
      setIsLoaded(true);
    }
  }, []);

  // Add to history
  const addToHistory = (criteria: SearchCriteria, resultCount: number) => {
    if (!isLoaded) return;

    const newEntry: SearchHistory = {
      id: Math.random().toString(36).substring(2, 11),
      criteria,
      timestamp: Date.now(),
      resultCount,
    };

    const updated = [newEntry, ...history].slice(0, MAX_HISTORY);
    setHistory(updated);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save search history:', error);
    }
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear search history:', error);
    }
  };

  // Get search from history
  const getFromHistory = (id: string): SearchCriteria | null => {
    const entry = history.find(h => h.id === id);
    return entry ? entry.criteria : null;
  };

  return {
    history,
    addToHistory,
    clearHistory,
    getFromHistory,
    isLoaded,
  };
}
