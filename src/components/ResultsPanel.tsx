import { TrendingUp, BarChart3, MapPin, ExternalLink } from "lucide-react";

const MOCK_ANNONCES = [
  { plateforme: "Leboncoin", prix: "13 200 €", annee: 2021, km: "58 000 km", localisation: "Lyon (69)" },
  { plateforme: "La Centrale", prix: "14 800 €", annee: 2022, km: "42 000 km", localisation: "Paris (75)" },
  { plateforme: "Leboncoin", prix: "12 900 €", annee: 2021, km: "71 000 km", localisation: "Marseille (13)" },
  { plateforme: "La Centrale", prix: "15 200 €", annee: 2022, km: "35 000 km", localisation: "Bordeaux (33)" },
  { plateforme: "Leboncoin", prix: "13 700 €", annee: 2021, km: "63 000 km", localisation: "Toulouse (31)" },
];

const MarketGauge = () => {
  const rotation = 55; // degrees from left, max 180
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
        <BarChart3 className="w-4 h-4 text-primary" />
        Température du Marché
      </h3>
      <div className="flex justify-center">
        <svg viewBox="0 0 200 120" className="w-56 h-32">
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="hsl(220 15% 20%)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Red zone */}
          <path
            d="M 20 100 A 80 80 0 0 1 60 35"
            fill="none"
            stroke="hsl(0 70% 50%)"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.7"
          />
          {/* Yellow zone */}
          <path
            d="M 60 35 A 80 80 0 0 1 100 20"
            fill="none"
            stroke="hsl(38 92% 50%)"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.7"
          />
          {/* Green zone */}
          <path
            d="M 100 20 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="hsl(160 60% 45%)"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* Needle */}
          <line
            x1="100"
            y1="100"
            x2={100 + 60 * Math.cos((Math.PI * (180 - rotation * 1.8)) / 180)}
            y2={100 - 60 * Math.sin((Math.PI * (180 - rotation * 1.8)) / 180)}
            stroke="hsl(var(--foreground))"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="100" cy="100" r="5" fill="hsl(var(--foreground))" />
          {/* Labels */}
          <text x="15" y="115" fontSize="8" fill="hsl(0 70% 50%)" fontFamily="Inter">Difficile</text>
          <text x="140" y="115" fontSize="8" fill="hsl(160 60% 45%)" fontFamily="Inter">Excellente</text>
        </svg>
      </div>
      <p className="text-center text-sm font-semibold text-emerald mt-1">
        ✅ Bonne Affaire
      </p>
    </div>
  );
};

const ResultsPanel = () => {
  return (
    <div className="space-y-5 animate-fade-in-up">
      {/* Cote Estimée */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">Valeur de Revente Particulier</p>
            <p className="text-5xl font-bold text-emerald emerald-glow mt-2">14 500 €</p>
            <p className="text-sm text-muted-foreground mt-2">
              Basé sur <span className="text-foreground font-medium">45 annonces</span> analysées (Leboncoin / La Centrale)
            </p>
          </div>
          <div className="bg-emerald/10 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6 text-emerald" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="bg-secondary rounded-md p-3 text-center">
            <p className="text-xs text-muted-foreground">Min.</p>
            <p className="text-lg font-semibold text-foreground">12 200 €</p>
          </div>
          <div className="bg-secondary rounded-md p-3 text-center border border-primary/30">
            <p className="text-xs text-primary">Moyenne</p>
            <p className="text-lg font-semibold text-primary">14 500 €</p>
          </div>
          <div className="bg-secondary rounded-md p-3 text-center">
            <p className="text-xs text-muted-foreground">Max.</p>
            <p className="text-lg font-semibold text-foreground">16 800 €</p>
          </div>
        </div>
      </div>

      {/* Gauge */}
      <MarketGauge />

      {/* Tableau annonces */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-primary" />
          Top 5 Annonces Similaires
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left py-2 px-3 font-medium">Plateforme</th>
                <th className="text-right py-2 px-3 font-medium">Prix</th>
                <th className="text-right py-2 px-3 font-medium">Année</th>
                <th className="text-right py-2 px-3 font-medium">KM</th>
                <th className="text-left py-2 px-3 font-medium hidden sm:table-cell">
                  <MapPin className="w-3.5 h-3.5 inline mr-1" />
                  Localisation
                </th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ANNONCES.map((a, i) => (
                <tr
                  key={i}
                  className="border-b border-border/50 hover:bg-secondary/50 transition-colors"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <td className="py-2.5 px-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      a.plateforme === "Leboncoin"
                        ? "bg-warning/15 text-warning"
                        : "bg-primary/15 text-primary"
                    }`}>
                      {a.plateforme === "Leboncoin" ? "LBC" : "LC"}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-semibold text-foreground">{a.prix}</td>
                  <td className="py-2.5 px-3 text-right text-muted-foreground">{a.annee}</td>
                  <td className="py-2.5 px-3 text-right text-muted-foreground">{a.km}</td>
                  <td className="py-2.5 px-3 text-muted-foreground hidden sm:table-cell">{a.localisation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
