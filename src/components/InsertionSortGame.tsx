import { PlayingCard } from './PlayingCard';
import { GameControls } from './GameControls';
import { TipCard } from './TipCard';
import { StatsDisplay } from './StatsDisplay';
import { ConfettiEffect } from './ConfettiEffect';
import { ExplanationSection } from './ExplanationSection';
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
    start,
    nextStep,
    toggleAutoPlay,
    restart,
    getCardStatus,
  } = useInsertionSort(7);

  return (
    <div className="min-h-screen py-8 px-4">
      <ConfettiEffect isActive={isComplete} />
      
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

      {/* Cards Area */}
      <div className="mb-8">
        <div 
          className="relative mx-auto max-w-4xl min-h-[200px] p-6 sm:p-8 rounded-3xl bg-felt/30 backdrop-blur-sm border border-border/30"
          style={{
            background: 'radial-gradient(ellipse at center, hsl(160 40% 15% / 0.5) 0%, transparent 70%)',
          }}
        >
          {/* Cards Container */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-5">
            {cards.map((card, index) => (
              <div
                key={card.id}
                className="transition-all duration-300 ease-out"
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
