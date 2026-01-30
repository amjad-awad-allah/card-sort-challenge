import { Lightbulb } from 'lucide-react';

export const TipCard = () => {
  return (
    <div className="tip-card max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Lightbulb className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-primary mb-2">💡 Wie funktioniert das Spiel?</h3>
          <p className="text-foreground/90 leading-relaxed">
            Stell dir vor, du sortierst Spielkarten in deiner Hand —
            <br />
            Du nimmst eine Karte nach der anderen und fügst sie an der richtigen Stelle zwischen den bereits sortierten Karten ein.
          </p>
        </div>
      </div>
    </div>
  );
};
