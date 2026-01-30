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
  keyCard: Card | null;
  insertPosition: number;
}

const suits: Card['suit'][] = ['hearts', 'diamonds', 'clubs', 'spades'];

const generateRandomCards = (count: number): Card[] => {
  const values = Array.from({ length: count }, (_, i) => i + 1);
  // Shuffle values using Fisher-Yates
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
    keyCard: null,
    insertPosition: -1,
  });

  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

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
      keyCard: null,
      insertPosition: -1,
    });
    setHasStarted(false);
    setIsAutoPlaying(false);
  }, [cardCount]);

  const start = useCallback(() => {
    if (state.cards.length === 0) {
      initialize();
    }
    setHasStarted(true);
    setState(prev => ({
      ...prev,
      phase: 'picking',
      sortedIndex: 0,
    }));
  }, [state.cards.length, initialize]);

  const nextStep = useCallback(() => {
    setState(prev => {
      if (prev.isComplete || prev.phase === 'idle') return prev;

      let { cards, sortedIndex, currentIndex, comparingIndex, steps, comparisons, phase, keyCard, insertPosition } = prev;
      
      // Make a copy of cards array
      const newCards = [...cards];

      // Phase: Picking - Start with new card
      if (phase === 'picking') {
        if (currentIndex > cards.length - 1) {
          return { ...prev, isComplete: true, phase: 'complete' };
        }
        // Store the key card we're going to insert
        keyCard = { ...cards[currentIndex] };
        comparingIndex = currentIndex - 1;
        insertPosition = currentIndex;
        
        return {
          ...prev,
          keyCard,
          comparingIndex,
          insertPosition,
          phase: 'comparing',
          steps: steps + 1,
        };
      }

      // Phase: Comparing - Compare and shift
      if (phase === 'comparing') {
        comparisons++;
        
        if (comparingIndex >= 0 && cards[comparingIndex].value > keyCard!.value) {
          // Shift the card at comparingIndex to the right (to insertPosition)
          newCards[comparingIndex + 1] = { ...cards[comparingIndex] };
          insertPosition = comparingIndex;
          comparingIndex--;
          
          return {
            ...prev,
            cards: newCards,
            comparingIndex,
            insertPosition,
            comparisons,
          };
        } else {
          // Found the correct position, insert the key card
          newCards[insertPosition] = { ...keyCard! };
          
          return {
            ...prev,
            cards: newCards,
            phase: 'inserting',
            comparisons,
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
            keyCard: null,
          };
        }

        return {
          ...prev,
          sortedIndex,
          currentIndex,
          phase: 'picking',
          keyCard: null,
          insertPosition: -1,
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
      }, 500);
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
