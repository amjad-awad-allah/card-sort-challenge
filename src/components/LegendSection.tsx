import { Eye } from 'lucide-react';

export const LegendSection = () => {
  return (
    <div className="max-w-3xl mx-auto mb-6">
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 p-4 rounded-xl bg-muted/30 border border-border/30">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Legende:</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary/80 card-glow-gold" />
          <span className="text-xs text-foreground">Aktueller Schlüssel</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-ring/80 card-glow-blue" />
          <span className="text-xs text-foreground">Vergleich</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-accent/80 card-glow-orange" />
          <span className="text-xs text-foreground">Verschiebung</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-secondary/80 card-glow-green" />
          <span className="text-xs text-foreground">Sortiert</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-muted/80 border border-border/50" />
          <span className="text-xs text-foreground">Unsortiert</span>
        </div>
      </div>
    </div>
  );
};
