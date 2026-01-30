import { cn } from "@/lib/utils";

interface PlayingCardProps {
  value: number;
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  status: 'sorted' | 'current' | 'unsorted';
  isAnimating?: boolean;
  style?: React.CSSProperties;
}

const suitSymbols = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠',
};

const suitColors = {
  hearts: 'text-accent',
  diamonds: 'text-accent',
  clubs: 'text-card-foreground',
  spades: 'text-card-foreground',
};

export const PlayingCard = ({
  value,
  suit,
  status,
  isAnimating = false,
  style,
}: PlayingCardProps) => {
  const suitSymbol = suitSymbols[suit];
  const suitColor = suitColors[suit];

  const statusClasses = {
    sorted: 'card-glow-green border-secondary/50',
    current: 'card-glow-gold border-primary/50 animate-pulse-card',
    unsorted: 'card-glow-muted border-muted/30',
  };

  return (
    <div
      className={cn(
        'playing-card',
        statusClasses[status],
        status === 'current' && 'z-10 scale-105',
        'hover:scale-110 hover:z-20',
        isAnimating && 'animate-insert'
      )}
      style={style}
    >
      {/* Top left corner */}
      <div className={cn('absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex flex-col items-center leading-none', suitColor)}>
        <span className="text-sm sm:text-lg font-bold">{value}</span>
        <span className="text-xs sm:text-sm">{suitSymbol}</span>
      </div>

      {/* Center suit */}
      <span className={cn('text-3xl sm:text-4xl md:text-5xl', suitColor)}>
        {suitSymbol}
      </span>

      {/* Bottom right corner (inverted) */}
      <div className={cn('absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 flex flex-col items-center leading-none rotate-180', suitColor)}>
        <span className="text-sm sm:text-lg font-bold">{value}</span>
        <span className="text-xs sm:text-sm">{suitSymbol}</span>
      </div>

      {/* Status indicator glow overlay */}
      {status === 'current' && (
        <div className="absolute inset-0 rounded-xl bg-primary/10 pointer-events-none" />
      )}
      {status === 'sorted' && (
        <div className="absolute inset-0 rounded-xl bg-secondary/10 pointer-events-none" />
      )}
    </div>
  );
};
