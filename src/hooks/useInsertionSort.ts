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
  phase: 'idle' | 'picking' | 'comparing' | 'shifting' | 'inserting' | 'complete';
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

      const { cards, sortedIndex, currentIndex, comparingIndex, steps, comparisons, phase, keyCard, insertPosition } = prev;

      // Phase: Picking - Select the key card to insert
      if (phase === 'picking') {
        if (currentIndex > cards.length - 1) {
          return { ...prev, isComplete: true, phase: 'complete' };
        }
        
        // Store the key card value (we'll use it for comparison)
        const newKeyCard = cards[currentIndex];
        
        return {
          ...prev,
          keyCard: newKeyCard,
          comparingIndex: currentIndex - 1,
          insertPosition: currentIndex,
          phase: 'comparing',
          steps: steps + 1,
        };
      }

      // Phase: Comparing - Compare key card with sorted portion
      if (phase === 'comparing') {
        const newComparisons = comparisons + 1;
        
        if (comparingIndex >= 0 && cards[comparingIndex].value > keyCard!.value) {
          // Need to shift - swap the comparing card with the one to its right
          const newCards = [...cards];
          // Swap positions: move comparing card to the right
          const temp = newCards[comparingIndex];
          newCards[comparingIndex] = newCards[comparingIndex + 1];
          newCards[comparingIndex + 1] = temp;
          
          return {
            ...prev,
            cards: newCards,
            comparingIndex: comparingIndex - 1,
            insertPosition: comparingIndex,
            comparisons: newComparisons,
            phase: 'shifting',
          };
        } else {
          // Found correct position - key is already in place
          return {
            ...prev,
            phase: 'inserting',
            comparisons: newComparisons,
          };
        }
      }

      // Phase: Shifting - Continue shifting or insert
      if (phase === 'shifting') {
        if (comparingIndex >= 0 && cards[comparingIndex].value > keyCard!.value) {
          // Continue shifting - swap again
          const newCards = [...cards];
          const temp = newCards[comparingIndex];
          newCards[comparingIndex] = newCards[comparingIndex + 1];
          newCards[comparingIndex + 1] = temp;
          
          return {
            ...prev,
            cards: newCards,
            comparingIndex: comparingIndex - 1,
            insertPosition: comparingIndex,
          };
        } else {
          // Done shifting, key is now in correct position
          return {
            ...prev,
            phase: 'inserting',
          };
        }
      }

      // Phase: Inserting - Finalize and move to next card
      if (phase === 'inserting') {
        const newSortedIndex = currentIndex;
        const newCurrentIndex = currentIndex + 1;
        
        if (newCurrentIndex > cards.length - 1) {
          return {
            ...prev,
            sortedIndex: newSortedIndex,
            currentIndex: newCurrentIndex,
            isComplete: true,
            phase: 'complete',
            keyCard: null,
            insertPosition: -1,
          };
        }

        return {
          ...prev,
          sortedIndex: newSortedIndex,
          currentIndex: newCurrentIndex,
          phase: 'picking',
          keyCard: null,
          insertPosition: -1,
          comparingIndex: -1,
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

  const getCardStatus = useCallback((index: number): 'sorted' | 'current' | 'comparing' | 'shifting' | 'unsorted' => {
    if (state.phase === 'complete') return 'sorted';
    if (index === state.insertPosition && state.keyCard) return 'current';
    if (index === state.comparingIndex && (state.phase === 'comparing' || state.phase === 'shifting')) return 'comparing';
    if (index <= state.sortedIndex) return 'sorted';
    return 'unsorted';
  }, [state.sortedIndex, state.insertPosition, state.comparingIndex, state.phase, state.keyCard]);

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
