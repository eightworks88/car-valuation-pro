import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MARQUES = ["Peugeot", "Renault", "Citroën", "Audi", "BMW", "Mercedes", "Volkswagen", "Toyota"];
const CARBURANTS = ["Essence", "Diesel", "Hybride", "Électrique"];
const BOITES = ["Manuelle", "Automatique"];

interface FilterPanelProps {
  onAnalyze: () => void;
  isLoading: boolean;
}

const FilterPanel = ({ onAnalyze, isLoading }: FilterPanelProps) => {
  const [marque, setMarque] = useState("");
  const [modele, setModele] = useState("");
  const [annee, setAnnee] = useState("2022");
  const [km, setKm] = useState("");
  const [carburant, setCarburant] = useState("Essence");
  const [boite, setBoite] = useState("Manuelle");

  return (
    <div className="bg-card border border-border rounded-lg p-5 space-y-5">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <span>🔍</span> Analyse du Véhicule
      </h2>

      <div className="space-y-4">
        {/* Marque */}
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground">Marque</Label>
          <Select value={marque} onValueChange={setMarque}>
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
          <Input
            placeholder="Ex: 208, Clio, A3..."
            value={modele}
            onChange={(e) => setModele(e.target.value)}
            className="bg-secondary border-border focus:ring-primary focus:border-primary"
          />
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
        <div className="space-y-1.5">
          <Label className="text-sm text-muted-foreground">Kilométrage</Label>
          <Input
            placeholder="Ex: 60000"
            value={km}
            onChange={(e) => setKm(e.target.value.replace(/\D/g, ""))}
            className="bg-secondary border-border focus:ring-primary focus:border-primary"
          />
          {km && (
            <span className="text-xs text-muted-foreground">
              {Number(km).toLocaleString("fr-FR")} km
            </span>
          )}
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
