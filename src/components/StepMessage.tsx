import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface StepMessageProps {
  message: string | null;
  type: 'picking' | 'comparing' | 'shifting' | 'inserting' | 'complete';
}

const typeStyles = {
  picking: 'bg-primary/90 text-primary-foreground border-primary',
  comparing: 'bg-ring/90 text-white border-ring',
  shifting: 'bg-accent/90 text-accent-foreground border-accent',
  inserting: 'bg-secondary/90 text-secondary-foreground border-secondary',
  complete: 'bg-secondary/90 text-secondary-foreground border-secondary',
};

const typeIcons = {
  picking: '🎯',
  comparing: '🔍',
  shifting: '➡️',
  inserting: '✅',
  complete: '🎉',
};

export const StepMessage = ({ message, type }: StepMessageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);

  useEffect(() => {
    if (message) {
      setCurrentMessage(message);
      setIsVisible(true);
      
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 1500);

      return () => clearTimeout(hideTimer);
    }
  }, [message]);

  if (!currentMessage) return null;

  return (
    <div
      className={cn(
        'fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 sm:px-6 py-2 sm:py-3 rounded-xl border-2 shadow-lg backdrop-blur-sm',
        'transition-all duration-300 ease-out',
        'max-w-[90vw] sm:max-w-md text-center',
        typeStyles[type],
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
      )}
    >
      <div className="flex items-center justify-center gap-2">
        <span className="text-lg sm:text-xl">{typeIcons[type]}</span>
        <span className="text-sm sm:text-base font-medium">{currentMessage}</span>
      </div>
    </div>
  );
};
