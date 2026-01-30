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
        <span>الخطوات: {steps}</span>
      </div>
      <div className="stats-badge">
        <span>🔄 المقارنات: {comparisons}</span>
      </div>
      {isComplete && (
        <div className="stats-badge bg-secondary/30 border-secondary/50 animate-success">
          <Trophy className="w-4 h-4 text-secondary" />
          <span>🎉 تم الترتيب!</span>
        </div>
      )}
    </div>
  );
};
