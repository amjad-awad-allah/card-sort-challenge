import { cn } from "@/lib/utils";

interface PlayingCardProps {
  value: number;
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  status: 'sorted' | 'current' | 'unsorted';
  isAnimating?: boolean;
  animationType?: 'insert' | 'slide' | 'none';
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
  animationType = 'none',
  style,
}: PlayingCardProps) => {
  const suitSymbol = suitSymbols[suit];
  const suitColor = suitColors[suit];

  const statusClasses = {
    sorted: 'card-glow-green border-secondary/50',
    current: 'card-glow-gold border-primary/50 animate-pulse-card',
    unsorted: 'card-glow-muted border-muted/30',
  };

  const animationClasses = {
    insert: 'animate-insert',
    slide: '',
    none: '',
  };

  return (
    <div
      className={cn(
        'playing-card',
        statusClasses[status],
        isAnimating && animationClasses[animationType],
        status === 'current' && 'z-10 scale-105',
        'hover:scale-110 hover:z-20'
      )}
      style={style}
    >
      {/* Top left corner */}
      <div className={cn('absolute top-2 left-2 flex flex-col items-center leading-none', suitColor)}>
        <span className="text-lg sm:text-xl font-bold">{value}</span>
        <span className="text-sm sm:text-base">{suitSymbol}</span>
      </div>

      {/* Center suit */}
      <span className={cn('text-4xl sm:text-5xl md:text-6xl', suitColor)}>
        {suitSymbol}
      </span>

      {/* Bottom right corner (inverted) */}
      <div className={cn('absolute bottom-2 right-2 flex flex-col items-center leading-none rotate-180', suitColor)}>
        <span className="text-lg sm:text-xl font-bold">{value}</span>
        <span className="text-sm sm:text-base">{suitSymbol}</span>
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
