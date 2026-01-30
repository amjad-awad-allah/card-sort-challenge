import { useState, useCallback, useRef, useEffect } from 'react';

export interface Card {
  id: number;
  value: number;
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
}

interface SortState {
  cards: Card[];
  sortedIndex: number;
  currentIndex: number;
  comparingIndex: number;
  steps: number;
  comparisons: number;
  isComplete: boolean;
  phase: 'idle' | 'picking' | 'comparing' | 'inserting' | 'complete';
}

const suits: Card['suit'][] = ['hearts', 'diamonds', 'clubs', 'spades'];

const generateRandomCards = (count: number): Card[] => {
  const values = Array.from({ length: count }, (_, i) => i + 1);
  // Shuffle values
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }
  
  return values.map((value, index) => ({
    id: index,
    value,
    suit: suits[Math.floor(Math.random() * suits.length)],
  }));
};

export const useInsertionSort = (cardCount: number = 7) => {
  const [state, setState] = useState<SortState>({
    cards: [],
    sortedIndex: 0,
    currentIndex: 1,
    comparingIndex: 0,
    steps: 0,
    comparisons: 0,
    isComplete: false,
    phase: 'idle',
  });

  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const keyRef = useRef<number | null>(null);

  const initialize = useCallback(() => {
    const cards = generateRandomCards(cardCount);
    setState({
      cards,
      sortedIndex: 0,
      currentIndex: 1,
      comparingIndex: 0,
      steps: 0,
      comparisons: 0,
      isComplete: false,
      phase: 'idle',
    });
    setHasStarted(false);
    setIsAutoPlaying(false);
    keyRef.current = null;
  }, [cardCount]);

  const start = useCallback(() => {
    if (state.cards.length === 0) {
      initialize();
    }
    setHasStarted(true);
    setState(prev => ({
      ...prev,
      phase: 'picking',
    }));
  }, [state.cards.length, initialize]);

  const nextStep = useCallback(() => {
    setState(prev => {
      if (prev.isComplete || prev.phase === 'idle') return prev;

      const cards = [...prev.cards];
      let { sortedIndex, currentIndex, comparingIndex, steps, comparisons, phase } = prev;

      // Phase: Picking - Start with new card
      if (phase === 'picking') {
        if (currentIndex > cards.length - 1) {
          return { ...prev, isComplete: true, phase: 'complete' };
        }
        keyRef.current = cards[currentIndex].value;
        comparingIndex = currentIndex - 1;
        return {
          ...prev,
          comparingIndex,
          phase: 'comparing',
          steps: steps + 1,
        };
      }

      // Phase: Comparing
      if (phase === 'comparing') {
        if (comparingIndex >= 0 && cards[comparingIndex].value > keyRef.current!) {
          comparisons++;
          // Shift card right
          cards[comparingIndex + 1] = { ...cards[comparingIndex] };
          comparingIndex--;
          return {
            ...prev,
            cards,
            comparingIndex,
            comparisons,
          };
        } else {
          // Found position, insert key
          const keyCard = prev.cards[currentIndex];
          cards[comparingIndex + 1] = { ...keyCard, value: keyRef.current! };
          
          return {
            ...prev,
            cards,
            phase: 'inserting',
          };
        }
      }

      // Phase: Inserting - Move to next card
      if (phase === 'inserting') {
        sortedIndex = currentIndex;
        currentIndex++;
        
        if (currentIndex > cards.length - 1) {
          return {
            ...prev,
            sortedIndex,
            currentIndex,
            isComplete: true,
            phase: 'complete',
          };
        }

        return {
          ...prev,
          sortedIndex,
          currentIndex,
          phase: 'picking',
        };
      }

      return prev;
    });
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev);
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (isAutoPlaying && !state.isComplete) {
      autoPlayRef.current = setInterval(() => {
        nextStep();
      }, 600);
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, state.isComplete, nextStep]);

  // Stop auto-play when complete
  useEffect(() => {
    if (state.isComplete) {
      setIsAutoPlaying(false);
    }
  }, [state.isComplete]);

  // Initialize on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  const getCardStatus = useCallback((index: number): 'sorted' | 'current' | 'unsorted' => {
    if (state.phase === 'complete') return 'sorted';
    if (index === state.currentIndex) return 'current';
    if (index <= state.sortedIndex) return 'sorted';
    return 'unsorted';
  }, [state.sortedIndex, state.currentIndex, state.phase]);

  return {
    ...state,
    isAutoPlaying,
    hasStarted,
    start,
    nextStep,
    toggleAutoPlay,
    restart: initialize,
    getCardStatus,
  };
};
