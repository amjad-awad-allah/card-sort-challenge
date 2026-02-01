import { CheckCircle, Lightbulb } from 'lucide-react';

export const ConclusionSection = () => {
  return (
    <div className="max-w-3xl mx-auto mb-8">
      <div className="tip-card">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-secondary" />
          <h2 className="text-lg font-bold text-secondary">Zusammenfassung</h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-foreground/90">
            <strong>Insertion Sort</strong> ist ein einfacher, intuitiver Sortieralgorithmus, 
            der Elemente einzeln an ihre richtige Position im sortierten Bereich einfügt.
          </p>
          
          <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/10 border border-secondary/20">
            <Lightbulb className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-secondary mb-2">Wann Insertion Sort verwenden?</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Kleine Datensätze (n &lt; 50)</li>
                <li>• Fast sortierte Listen</li>
                <li>• Wenn Einfachheit wichtiger ist als Geschwindigkeit</li>
                <li>• Online-Sortierung (Daten kommen nacheinander)</li>
              </ul>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground italic">
            „Sortiere wie du Spielkarten in der Hand ordnest – eins nach dem anderen!"
          </p>
        </div>
      </div>
    </div>
  );
};
