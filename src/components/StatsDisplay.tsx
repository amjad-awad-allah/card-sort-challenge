import { Footprints, Trophy } from 'lucide-react';

interface StatsDisplayProps {
  steps: number;
  comparisons: number;
  isComplete: boolean;
}

export const StatsDisplay = ({ steps, comparisons, isComplete }: StatsDisplayProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="stats-badge">
        <Footprints className="w-4 h-4 text-primary" />
        <span>Schritte: {steps}</span>
      </div>
      <div className="stats-badge">
        <span>🔄 Vergleiche: {comparisons}</span>
      </div>
      {isComplete && (
        <div className="stats-badge bg-secondary/30 border-secondary/50 animate-success">
          <Trophy className="w-4 h-4 text-secondary" />
          <span>🎉 Sortiert!</span>
        </div>
      )}
    </div>
  );
};
