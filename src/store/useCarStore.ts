import { create } from 'zustand';
import { SearchFilters } from '../lib/validations';

interface CarStoreState {
  filters: SearchFilters | null;
  results: any | null;
  isAnalyzing: boolean;
  setFilters: (filters: SearchFilters) => void;
  setResults: (results: any) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  reset: () => void;
}

export const useCarStore = create<CarStoreState>((set) => ({
  filters: null,
  results: null,
  isAnalyzing: false,
  setFilters: (filters) => set({ filters }),
  setResults: (results) => set({ results }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  reset: () => set({ filters: null, results: null, isAnalyzing: false }),
}));
