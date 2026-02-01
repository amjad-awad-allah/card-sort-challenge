import { Code, ArrowRight, Zap, ArrowLeftRight, ArrowDown } from 'lucide-react';

interface PseudocodeSectionProps {
  currentPhase: 'idle' | 'picking' | 'comparing' | 'shifting' | 'inserting' | 'complete';
  currentIndex: number;
  comparingIndex: number;
  keyValue?: number;
  comparingValue?: number;
}

export const PseudocodeSection = ({ currentPhase, currentIndex, comparingIndex, keyValue, comparingValue }: PseudocodeSectionProps) => {
  const getLineHighlight = (line: number) => {
    switch (currentPhase) {
      case 'picking':
        return line === 1 || line === 2;
      case 'comparing':
        return line === 3 || line === 4;
      case 'shifting':
        return line === 5;
      case 'inserting':
        return line === 6;
      case 'complete':
        return line === 6;
      default:
        return false;
    }
  };

  const getPhaseIcon = (line: number) => {
    if (!getLineHighlight(line)) return null;
    
    switch (currentPhase) {
      case 'picking':
        return <Zap className="w-4 h-4 text-primary animate-pulse" />;
      case 'comparing':
        return <ArrowLeftRight className="w-4 h-4 text-ring animate-pulse" />;
      case 'shifting':
        return <ArrowRight className="w-4 h-4 text-accent animate-pulse" />;
      case 'inserting':
        return <ArrowDown className="w-4 h-4 text-secondary animate-pulse" />;
      default:
        return null;
    }
  };

  const getCurrentValueDisplay = () => {
    if (currentPhase === 'picking' && keyValue !== undefined) {
      return (
        <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/30 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-bold">{keyValue}</span>
          </div>
          <span className="text-sm text-foreground">
            <span className="text-primary font-semibold">Schlüsselkarte</span> ausgewählt — wird in den sortierten Bereich eingefügt
          </span>
        </div>
      );
    }
    
    if ((currentPhase === 'comparing' || currentPhase === 'shifting') && keyValue !== undefined && comparingValue !== undefined) {
      return (
        <div className="mt-4 p-3 rounded-lg bg-ring/10 border border-ring/30 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-ring/20 flex items-center justify-center">
              <span className="text-ring font-bold">{comparingValue}</span>
            </div>
            <span className="text-ring font-bold">{comparingValue > keyValue ? '>' : '≤'}</span>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold">{keyValue}</span>
            </div>
          </div>
          <span className="text-sm text-foreground">
            {comparingValue > keyValue 
              ? <span><span className="text-accent font-semibold">Verschiebung</span> — Karte {comparingValue} wird nach rechts bewegt</span>
              : <span><span className="text-secondary font-semibold">Position gefunden</span> — Schlüssel wird hier eingefügt</span>
            }
          </span>
        </div>
      );
    }
    
    if (currentPhase === 'inserting' && keyValue !== undefined) {
      return (
        <div className="mt-4 p-3 rounded-lg bg-secondary/10 border border-secondary/30 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
            <span className="text-secondary font-bold">{keyValue}</span>
          </div>
          <span className="text-sm text-foreground">
            <span className="text-secondary font-semibold">Einfügen abgeschlossen</span> — Karte {keyValue} ist jetzt im sortierten Bereich
          </span>
        </div>
      );
    }
    
    return null;
  };

  const lines = [
    { code: 'für i = 1 bis n-1:', explanation: 'Durchlaufe alle Elemente ab dem zweiten' },
    { code: '  key = arr[i]', explanation: 'Speichere das aktuelle Element (Schlüssel)' },
    { code: '  j = i - 1', explanation: 'Beginne Vergleich mit dem vorherigen Element' },
    { code: '  solange j ≥ 0 und arr[j] > key:', explanation: 'Vergleiche mit sortiertem Bereich' },
    { code: '    arr[j+1] = arr[j]; j--', explanation: 'Verschiebe Element nach rechts' },
    { code: '  arr[j+1] = key', explanation: 'Füge Schlüssel an der richtigen Stelle ein' },
  ];

  return (
    <div className="max-w-3xl mx-auto mb-8">
      <div className="tip-card relative overflow-hidden">
        {/* Phase indicator glow */}
        {currentPhase !== 'idle' && currentPhase !== 'complete' && (
          <div className={`absolute inset-0 pointer-events-none opacity-20 ${
            currentPhase === 'picking' ? 'bg-gradient-to-r from-primary/30 to-transparent' :
            currentPhase === 'comparing' ? 'bg-gradient-to-r from-ring/30 to-transparent' :
            currentPhase === 'shifting' ? 'bg-gradient-to-r from-accent/30 to-transparent' :
            'bg-gradient-to-r from-secondary/30 to-transparent'
          }`} />
        )}
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-bold text-primary">Pseudocode</h2>
            {currentPhase !== 'idle' && currentPhase !== 'complete' && (
              <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                currentPhase === 'picking' ? 'bg-primary/20 text-primary' :
                currentPhase === 'comparing' ? 'bg-ring/20 text-ring' :
                currentPhase === 'shifting' ? 'bg-accent/20 text-accent' :
                'bg-secondary/20 text-secondary'
              }`}>
                {currentPhase === 'picking' && 'Auswählen'}
                {currentPhase === 'comparing' && 'Vergleichen'}
                {currentPhase === 'shifting' && 'Verschieben'}
                {currentPhase === 'inserting' && 'Einfügen'}
              </span>
            )}
          </div>
          
          <div className="space-y-1 font-mono text-sm">
            {lines.map((line, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-2 rounded-lg transition-all duration-300 ${
                  getLineHighlight(index + 1)
                    ? `bg-gradient-to-r ${
                        currentPhase === 'picking' ? 'from-primary/20 to-primary/5 border border-primary/40' :
                        currentPhase === 'comparing' ? 'from-ring/20 to-ring/5 border border-ring/40' :
                        currentPhase === 'shifting' ? 'from-accent/20 to-accent/5 border border-accent/40' :
                        'from-secondary/20 to-secondary/5 border border-secondary/40'
                      } shadow-lg`
                    : 'bg-muted/30'
                }`}
              >
                {getLineHighlight(index + 1) && (
                  <span className="flex-shrink-0">
                    {getPhaseIcon(index + 1)}
                  </span>
                )}
                <code className={`flex-shrink-0 ${
                  getLineHighlight(index + 1) 
                    ? `font-bold ${
                        currentPhase === 'picking' ? 'text-primary' :
                        currentPhase === 'comparing' ? 'text-ring' :
                        currentPhase === 'shifting' ? 'text-accent' :
                        'text-secondary'
                      }` 
                    : 'text-foreground/80'
                }`}>
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
          
          {/* Dynamic value display */}
          {getCurrentValueDisplay()}
        </div>
      </div>
    </div>
  );
};
