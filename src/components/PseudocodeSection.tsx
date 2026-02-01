import { Code, ArrowRight } from 'lucide-react';

interface PseudocodeSectionProps {
  currentPhase: 'idle' | 'picking' | 'comparing' | 'shifting' | 'inserting' | 'complete';
  currentIndex: number;
  comparingIndex: number;
}

export const PseudocodeSection = ({ currentPhase, currentIndex, comparingIndex }: PseudocodeSectionProps) => {
  const getLineHighlight = (line: number) => {
    switch (currentPhase) {
      case 'picking':
        return line === 1 || line === 2;
      case 'comparing':
        return line === 3;
      case 'shifting':
        return line === 4;
      case 'inserting':
        return line === 5;
      case 'complete':
        return line === 6;
      default:
        return false;
    }
  };

  const lines = [
    { code: 'für i = 1 bis n-1:', explanation: 'Durchlaufe alle Elemente ab dem zweiten' },
    { code: '  key = arr[i]', explanation: 'Speichere das aktuelle Element (Schlüssel)' },
    { code: '  j = i - 1', explanation: 'Beginne Vergleich mit dem vorherigen Element' },
    { code: '  solange j ≥ 0 und arr[j] > key:', explanation: 'Vergleiche und verschiebe größere Elemente' },
    { code: '    arr[j+1] = arr[j]; j--', explanation: 'Verschiebe Element nach rechts' },
    { code: '  arr[j+1] = key', explanation: 'Füge Schlüssel an der richtigen Stelle ein' },
  ];

  return (
    <div className="max-w-3xl mx-auto mb-8">
      <div className="tip-card">
        <div className="flex items-center gap-3 mb-4">
          <Code className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-bold text-primary">Pseudocode</h2>
        </div>
        
        <div className="space-y-1 font-mono text-sm">
          {lines.map((line, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-2 rounded-lg transition-all duration-300 ${
                getLineHighlight(index + 1)
                  ? 'bg-primary/20 border border-primary/30'
                  : 'bg-muted/30'
              }`}
            >
              <code className={`flex-shrink-0 ${getLineHighlight(index + 1) ? 'text-primary font-bold' : 'text-foreground/80'}`}>
                {line.code}
              </code>
              {getLineHighlight(index + 1) && (
                <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
                  <ArrowRight className="w-3 h-3" />
                  {line.explanation}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
