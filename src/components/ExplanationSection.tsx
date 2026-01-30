import { BookOpen, ArrowRight } from 'lucide-react';

export const ExplanationSection = () => {
  return (
    <div className="max-w-3xl mx-auto mt-12 animate-slide-up" dir="rtl">
      <div className="tip-card">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-primary">📘 كيف تعمل خوارزمية Insertion Sort؟</h2>
        </div>
        
        <div className="space-y-4 text-foreground/90">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              1
            </div>
            <div>
              <p className="font-semibold">نبني جزءاً مرتّباً تدريجياً</p>
              <p className="text-muted-foreground text-sm">نبدأ بافتراض أن الكرت الأول مرتّب</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              2
            </div>
            <div>
              <p className="font-semibold">نأخذ الكرت التالي</p>
              <p className="text-muted-foreground text-sm">ننظر إلى الكرت الجديد ونقارنه بالكروت المرتّبة</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              3
            </div>
            <div>
              <p className="font-semibold">نُدرجه في مكانه الصحيح</p>
              <p className="text-muted-foreground text-sm">نُزيح الكروت الأكبر منه ونضعه في موقعه المناسب</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center text-secondary font-bold">
              ✓
            </div>
            <div>
              <p className="font-semibold">نكرّر حتى تنتهي كل الكروت</p>
              <p className="text-muted-foreground text-sm">وهكذا نحصل على ترتيب تصاعدي كامل!</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border/30">
          <p className="text-sm text-muted-foreground flex items-center gap-2 justify-center">
            <ArrowRight className="w-4 h-4 rotate-180" />
            التعقيد الزمني: O(n²) في أسوأ الحالات
            <span className="mx-2">|</span>
            مناسب للقوائم الصغيرة والقوائم شبه المرتّبة
          </p>
        </div>
      </div>
    </div>
  );
};
