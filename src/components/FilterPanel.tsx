import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MODELES_PAR_MARQUE: Record<string, string[]> = {
  Peugeot: ["108", "208", "308", "2008", "3008", "5008", "508", "Partner", "Rifter"],
  Renault: ["Clio", "Mégane", "Captur", "Kadjar", "Arkana", "Austral", "Scenic", "Twingo", "Zoé"],
  Citroën: ["C1", "C3", "C4", "C5 X", "Berlingo", "C3 Aircross", "C5 Aircross", "ë-C4"],
  Audi: ["A1", "A3", "A4", "A5", "A6", "Q2", "Q3", "Q5", "Q7", "e-tron"],
  BMW: ["Série 1", "Série 2", "Série 3", "Série 4", "Série 5", "X1", "X3", "X5", "iX"],
  Mercedes: ["Classe A", "Classe B", "Classe C", "Classe E", "CLA", "GLA", "GLC", "GLE", "EQA"],
  Volkswagen: ["Polo", "Golf", "T-Roc", "Tiguan", "T-Cross", "Passat", "ID.3", "ID.4", "Touran"],
  Toyota: ["Yaris", "Yaris Cross", "Corolla", "C-HR", "RAV4", "Camry", "Aygo X", "bZ4X"],
};

const FINITIONS_PAR_MODELE: Record<string, string[]> = {
  "208": ["Like", "Active", "Allure", "GT", "GT Pack"],
  "308": ["Active", "Allure", "Allure Pack", "GT", "GT Pack"],
  "2008": ["Active", "Allure", "Allure Pack", "GT", "GT Pack"],
  "3008": ["Active", "Allure", "Allure Pack", "GT", "GT Pack"],
  "5008": ["Active", "Allure", "Allure Pack", "GT", "GT Pack"],
  "Clio": ["Life", "Zen", "Intens", "RS Line", "Initiale Paris"],
  "Mégane": ["Life", "Zen", "Intens", "RS Line"],
  "Captur": ["Life", "Zen", "Intens", "RS Line", "Initiale Paris"],
  "Arkana": ["Zen", "Intens", "RS Line"],
  "C3": ["Live", "Feel", "Feel Pack", "Shine", "Shine Pack"],
  "C4": ["Feel", "Feel Pack", "Shine", "Shine Pack"],
  "A1": ["Design", "S line", "S Edition"],
  "A3": ["Design", "Design Luxe", "S line", "S Edition"],
  "A4": ["Design", "Design Luxe", "S line", "Avus"],
  "Golf": ["Life", "Style", "R-Line", "GTI", "GTD"],
  "Polo": ["Life", "Style", "R-Line"],
  "T-Roc": ["Life", "Style", "R-Line"],
  "Série 1": ["Lounge", "Business", "M Sport", "M135i"],
  "Série 3": ["Lounge", "Business", "Luxury", "M Sport"],
  "Classe A": ["Style", "AMG Line", "Progressive"],
  "Classe C": ["Avantgarde", "AMG Line", "Business Line"],
  "Yaris": ["France", "Design", "Collection"],
  "Corolla": ["Dynamic", "Design", "Collection", "GR Sport"],
};

const MARQUES = Object.keys(MODELES_PAR_MARQUE);
const CARBURANTS = ["Essence", "Diesel", "Hybride", "Électrique"];
const BOITES = ["Manuelle", "Automatique"];

interface FilterPanelProps {
  onAnalyze: () => void;
  isLoading: boolean;
}

const FilterPanel = ({ onAnalyze, isLoading }: FilterPanelProps) => {
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [finition, setFinition] = useState("");
  const [annee, setAnnee] = useState("2022");
  const [km, setKm] = useState([25000]);
  const [puissance, setPuissance] = useState("");
  const [carburant, setCarburant] = useState("Essence");
  const [boite, setBoite] = useState("Manuelle");

  const handleMarqueChange = (value: string) => {
    setMarque(value);
    setModele("");
    setFinition("");
  };

  const handleModeleChange = (value: string) => {
    setModele(value);
    setFinition("");
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5 space-y-5">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <span>🔍</span> Analyse du Véhicule
      </h2>

      <div className="space-y-4">
        {/* Marque */}
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground">Marque</Label>
          <Select value={marque} onValueChange={handleMarqueChange}>
            <SelectTrigger className="bg-secondary border-border focus:ring-primary focus:border-primary">
              <SelectValue placeholder="Sélectionner..." />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {MARQUES.map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Modèle */}
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground">Modèle</Label>
          <Select value={modele} onValueChange={setModele} disabled={!marque}>
            <SelectTrigger className="bg-secondary border-border focus:ring-primary focus:border-primary">
              <SelectValue placeholder={marque ? "Sélectionner un modèle..." : "Choisir une marque d'abord"} />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {(MODELES_PAR_MARQUE[marque] || []).map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Année */}
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground">Année</Label>
          <Input
            type="number"
            min={2010}
            max={2026}
            value={annee}
            onChange={(e) => setAnnee(e.target.value)}
            className="bg-secondary border-border focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Kilométrage */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <Label className="text-sm text-muted-foreground">Kilométrage</Label>
            <span className="text-sm font-medium text-primary">
              {km[0].toLocaleString("fr-FR")} km
            </span>
          </div>
          <Slider
            value={km}
            onValueChange={setKm}
            min={0}
            max={50000}
            step={1000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0 km</span>
            <span>50 000 km</span>
          </div>
        </div>

        {/* Carburant */}
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground">Carburant</Label>
          <div className="grid grid-cols-2 gap-1.5">
            {CARBURANTS.map((c) => (
              <button
                key={c}
                onClick={() => setCarburant(c)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  carburant === c
                    ? "bg-primary text-primary-foreground neon-glow"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Boîte de vitesse */}
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground">Boîte de vitesse</Label>
          <div className="grid grid-cols-2 gap-1.5">
            {BOITES.map((b) => (
              <button
                key={b}
                onClick={() => setBoite(b)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  boite === b
                    ? "bg-primary text-primary-foreground neon-glow"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={onAnalyze}
          disabled={isLoading}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-glow font-semibold py-6 text-base animate-pulse-neon"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <Search className="w-5 h-5 mr-2" />
          )}
          {isLoading ? "Analyse en cours..." : "Calculer la Valeur Marché"}
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
