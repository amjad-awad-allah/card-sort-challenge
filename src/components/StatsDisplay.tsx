import { Footprints, Trophy, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StatsDisplayProps {
  steps: number;
  comparisons: number;
  isComplete: boolean;
}

export const StatsDisplay = ({ steps, comparisons, isComplete }: StatsDisplayProps) => {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex flex-wrap justify-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="stats-badge cursor-help group">
              <Footprints className="w-4 h-4 text-primary" />
              <span>Schritte: {steps}</span>
              <Info className="w-3 h-3 text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <p className="font-semibold mb-1">Schritte (Einfügeoperationen)</p>
            <p className="text-xs text-muted-foreground">
              Anzahl der Karten, die bisher zum Einfügen ausgewählt wurden. 
              Jeder Schritt entspricht der Bearbeitung einer neuen Schlüsselkarte.
            </p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <div className="stats-badge cursor-help group">
              <span>🔄 Vergleiche: {comparisons}</span>
              <Info className="w-3 h-3 text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            <p className="font-semibold mb-1">Vergleiche</p>
            <p className="text-xs text-muted-foreground">
              Anzahl der Vergleiche zwischen Karten. Bei jedem Vergleich wird geprüft, 
              ob die aktuelle Karte größer als die Schlüsselkarte ist.
            </p>
          </TooltipContent>
        </Tooltip>

        {isComplete && (
          <div className="stats-badge bg-secondary/30 border-secondary/50 animate-success">
            <Trophy className="w-4 h-4 text-secondary" />
            <span>🎉 Sortiert!</span>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};
