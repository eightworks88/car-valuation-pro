import { User } from "lucide-react";

const AppHeader = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🚗</span>
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-foreground">Cote Auto</span>{" "}
          <span className="text-primary neon-text">Pro</span>
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground hidden sm:block">Marc Dupont</span>
        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center border border-border">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
