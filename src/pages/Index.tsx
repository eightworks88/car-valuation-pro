import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import FilterPanel from "@/components/FilterPanel";
import ResultsPanel from "@/components/ResultsPanel";
import { BarChart3 } from "lucide-react";

const Index = () => {
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = () => {
    setIsLoading(true);
    setShowResults(false);
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Colonne gauche - Filtres */}
          <div className="w-full lg:w-[30%] lg:min-w-[320px]">
            <FilterPanel onAnalyze={handleAnalyze} isLoading={isLoading} />
          </div>

          {/* Colonne droite - Résultats */}
          <div className="w-full lg:w-[70%]">
            {showResults ? (
              <ResultsPanel />
            ) : (
              <div className="bg-card border border-border rounded-lg flex flex-col items-center justify-center py-24 text-center">
                <div className="bg-secondary rounded-full p-5 mb-4">
                  <BarChart3 className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-medium">
                  Renseignez les informations du véhicule
                </p>
                <p className="text-sm text-muted-foreground/60 mt-1">
                  et lancez l'analyse pour obtenir la cote marché
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
