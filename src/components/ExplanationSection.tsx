import { BookOpen, ArrowRight } from 'lucide-react';

export const ExplanationSection = () => {
  return (
    <div className="max-w-3xl mx-auto mt-12 animate-slide-up">
      <div className="tip-card">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-primary">📘 Wie funktioniert der Insertion Sort Algorithmus?</h2>
        </div>
        
        <div className="space-y-4 text-foreground/90">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              1
            </div>
            <div>
              <p className="font-semibold">Wir bauen schrittweise einen sortierten Bereich auf</p>
              <p className="text-muted-foreground text-sm">Wir beginnen mit der Annahme, dass die erste Karte bereits sortiert ist</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              2
            </div>
            <div>
              <p className="font-semibold">Wir nehmen die nächste Karte</p>
              <p className="text-muted-foreground text-sm">Wir betrachten die neue Karte und vergleichen sie mit den sortierten Karten</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              3
            </div>
            <div>
              <p className="font-semibold">Wir fügen sie an der richtigen Stelle ein</p>
              <p className="text-muted-foreground text-sm">Wir verschieben größere Karten und platzieren sie an der passenden Position</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center text-secondary font-bold">
              ✓
            </div>
            <div>
              <p className="font-semibold">Wir wiederholen, bis alle Karten sortiert sind</p>
              <p className="text-muted-foreground text-sm">So erhalten wir eine vollständig aufsteigende Sortierung!</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border/30">
          <p className="text-sm text-muted-foreground flex items-center gap-2 justify-center">
            <ArrowRight className="w-4 h-4" />
            Zeitkomplexität: O(n²) im schlimmsten Fall
            <span className="mx-2">|</span>
            Geeignet für kleine und fast sortierte Listen
          </p>
        </div>
      </div>
    </div>
  );
};
