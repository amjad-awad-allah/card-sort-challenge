import { Play, SkipForward, Zap, RotateCcw, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GameControlsProps {
  onStart: () => void;
  onNextStep: () => void;
  onAutoPlay: () => void;
  onRestart: () => void;
  isPlaying: boolean;
  isAutoPlaying: boolean;
  isComplete: boolean;
  hasStarted: boolean;
}

export const GameControls = ({
  onStart,
  onNextStep,
  onAutoPlay,
  onRestart,
  isPlaying,
  isAutoPlaying,
  isComplete,
  hasStarted,
}: GameControlsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {!hasStarted ? (
        <button
          onClick={onStart}
          className="game-btn flex items-center gap-2 text-lg"
        >
          <Play className="w-5 h-5" />
          <span>🎴 Spiel starten</span>
        </button>
      ) : (
        <>
          <button
            onClick={onNextStep}
            disabled={isAutoPlaying || isComplete}
            className="game-btn-ghost flex items-center gap-2"
          >
            <SkipForward className="w-5 h-5" />
            <span>👆 Nächster Schritt</span>
          </button>

          <button
            onClick={onAutoPlay}
            disabled={isComplete}
            className={cn(
              'flex items-center gap-2',
              isAutoPlaying ? 'game-btn-accent' : 'game-btn-secondary'
            )}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-5 h-5" />
                <span>Stopp</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>⚡ Auto-Modus</span>
              </>
            )}
          </button>

          <button
            onClick={onRestart}
            className="game-btn-ghost flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>🔄 Neustart</span>
          </button>
        </>
      )}
    </div>
  );
};
