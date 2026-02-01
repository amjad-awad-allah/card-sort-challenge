import { Info, Target } from 'lucide-react';

export const IntroSection = () => {
  return (
    <div className="max-w-3xl mx-auto mb-8 animate-fade-in">
      <div className="tip-card">
        <div className="flex items-center gap-3 mb-4">
          <Info className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-primary">Was ist Insertion Sort?</h2>
        </div>
        
        <p className="text-foreground/90 mb-4">
          Insertion Sort ist ein einfacher Sortieralgorithmus, der Elemente einzeln an die richtige 
          Stelle in einem bereits sortierten Bereich einfügt – genau wie beim Sortieren von 
          Spielkarten in der Hand.
        </p>
        
        <div className="flex items-start gap-3 p-3 rounded-xl bg-primary/10 border border-primary/20">
          <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-primary mb-1">Lernziel</p>
            <p className="text-sm text-muted-foreground">
              Verstehe, wie Insertion Sort funktioniert, indem du Karten interaktiv sortierst 
              und jeden Schritt des Algorithmus beobachtest.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
