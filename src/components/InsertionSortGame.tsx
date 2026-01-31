import { PlayingCard } from './PlayingCard';
import { GameControls } from './GameControls';
import { TipCard } from './TipCard';
import { StatsDisplay } from './StatsDisplay';
import { ConfettiEffect } from './ConfettiEffect';
import { ExplanationSection } from './ExplanationSection';
import { StepMessage } from './StepMessage';
import { useInsertionSort } from '@/hooks/useInsertionSort';
import { Sparkles } from 'lucide-react';

export const InsertionSortGame = () => {
  const {
    cards,
    steps,
    comparisons,
    isComplete,
    isAutoPlaying,
    hasStarted,
    phase,
    keyCard,
    start,
    nextStep,
    toggleAutoPlay,
    restart,
    getCardStatus,
    stepMessage,
  } = useInsertionSort(7);

  const messageType = phase === 'idle' ? 'picking' : phase;

  return (
    <div className="min-h-screen py-4 sm:py-8 px-2 sm:px-4">
      <ConfettiEffect isActive={isComplete} />
      <StepMessage message={stepMessage} type={messageType} />
      
      {/* Header */}
      <header className="text-center mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-shadow-glow text-foreground">
            Insertion Sort Spiel
          </h1>
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <p className="text-lg text-muted-foreground">
          Lerne den Sortieralgorithmus durch das Sortieren von Spielkarten
        </p>
      </header>

      {/* Tip Card */}
      <div className="mb-8">
        <TipCard />
      </div>

      {/* Stats Display */}
      {hasStarted && (
        <div className="mb-8 animate-scale-in">
          <StatsDisplay 
            steps={steps} 
            comparisons={comparisons} 
            isComplete={isComplete} 
          />
        </div>
      )}

      {/* Cards Area - Full Width Single Row */}
      <div className="mb-8 w-full">
        <div 
          className="relative w-full min-h-[180px] p-4 sm:p-6 rounded-3xl bg-felt/30 backdrop-blur-sm border border-border/30"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(160 40% 15% / 0.5) 0%, transparent 70%)',
          }}
        >
          {/* Cards Container - Single Row */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 w-full overflow-x-auto py-2">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className="flex-shrink-0 transition-all duration-300 ease-out"
                style={{
                  transform: hasStarted ? 'none' : `translateY(${Math.sin(index * 0.5) * 10}px)`,
                }}
              >
                <PlayingCard
                  value={card.value}
                  suit={card.suit}
                  status={hasStarted ? getCardStatus(index) : 'unsorted'}
                  isAnimating={getCardStatus(index) === 'current'}
                />
              </div>
            ))}
          </div>

          {/* Decorative elements */}
          {!hasStarted && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-6xl opacity-10 animate-float">🃏</div>
            </div>
          )}
        </div>
      </div>

      {/* Game Controls */}
      <div className="mb-8">
        <GameControls
          onStart={start}
          onNextStep={nextStep}
          onAutoPlay={toggleAutoPlay}
          onRestart={restart}
          isPlaying={hasStarted}
          isAutoPlaying={isAutoPlaying}
          isComplete={isComplete}
          hasStarted={hasStarted}
        />
      </div>

      {/* Success Message */}
      {isComplete && (
        <div className="text-center mb-8 animate-scale-in">
          <div className="inline-block p-6 rounded-2xl bg-secondary/20 border border-secondary/30">
            <p className="text-2xl font-bold text-secondary mb-2">
              🎉 Gut gemacht! Alle Karten sind sortiert
            </p>
            <p className="text-muted-foreground">
              Du hast die Sortierung in {steps} Schritten und {comparisons} Vergleichen abgeschlossen
            </p>
          </div>
        </div>
      )}

      {/* Explanation Section */}
      <ExplanationSection />
      
      {/* Footer */}
      <footer className="text-center mt-12 text-muted-foreground text-sm">
        <p>Lerne Algorithmen auf spielerische Weise 🎮</p>
      </footer>
    </div>
  );
};
