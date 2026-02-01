import { Info, CheckCircle2 } from 'lucide-react';

interface InitialStateExplanationProps {
  hasStarted: boolean;
  isComplete: boolean;
  sortedCount: number;
  totalCards: number;
}

export const InitialStateExplanation = ({ hasStarted, isComplete, sortedCount, totalCards }: InitialStateExplanationProps) => {
  if (isComplete) {
    return (
      <div className="max-w-3xl mx-auto mb-4 animate-fade-in">
        <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/30 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-secondary">
              Sortierung abgeschlossen!
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Alle {totalCards} Karten sind jetzt in aufsteigender Reihenfolge sortiert.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="max-w-3xl mx-auto mb-4 animate-fade-in">
        <div className="p-4 rounded-xl bg-muted/50 border border-border/50 flex items-start gap-3">
          <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Anfangszustand des Algorithmus
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Bei Insertion Sort wird die <span className="text-primary font-medium">erste Karte automatisch als sortiert betrachtet</span>.
              Der Algorithmus beginnt mit der zweiten Karte und fügt jede folgende Karte an der richtigen Stelle im bereits sortierten Bereich ein — 
              genau wie beim Sortieren von Spielkarten in der Hand.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mb-4 animate-fade-in">
      <div className="p-4 rounded-xl bg-muted/50 border border-border/50 flex items-start gap-3">
        <Info className="w-5 h-5 text-ring flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground">
            Aktueller Fortschritt
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-secondary font-medium">{sortedCount + 1} von {totalCards} Karten</span> sind bereits im sortierten Bereich.
            Die nächste Karte wird ausgewählt und an der richtigen Position eingefügt.
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-secondary to-secondary/70 transition-all duration-500 rounded-full"
                style={{ width: `${((sortedCount + 1) / totalCards) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {Math.round(((sortedCount + 1) / totalCards) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
