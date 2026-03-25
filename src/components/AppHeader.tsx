import { User } from "lucide-react";

const AppHeader = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-foreground">OCHO CARS COTES</span>{" "}
        </h1>
      </div>
    </header>
  );
};

export default AppHeader;
