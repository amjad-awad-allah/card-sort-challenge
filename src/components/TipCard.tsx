import { Lightbulb } from 'lucide-react';

export const TipCard = () => {
  return (
    <div className="tip-card max-w-2xl mx-auto animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <Lightbulb className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 text-right" dir="rtl">
          <h3 className="text-lg font-bold text-primary mb-2">💡 كيف تعمل اللعبة؟</h3>
          <p className="text-foreground/90 leading-relaxed">
            تخيّل أنك تُرتّب أوراق لعب في يدك —
            <br />
            تأخذ ورقة تلو الأخرى وتُدخلها في مكانها الصحيح بين الأوراق التي سبق ترتيبها.
          </p>
        </div>
      </div>
    </div>
  );
};
