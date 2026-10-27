import React from 'react';
import { BookOpen, Quote, RefreshCw } from 'lucide-react';
import { CURATED_PLAYLIST } from '../data/curations';

interface InspirationSectionProps {
  quoteContent: string;
  quoteAuthor: string;
  reflectionPrompt: string;
  onUpdateQuote: (content: string, author: string, prompt: string) => void;
}

export const InspirationSection: React.FC<InspirationSectionProps> = ({
  quoteContent,
  quoteAuthor,
  reflectionPrompt,
  onUpdateQuote
}) => {
  const handleRandomizeQuote = () => {
    // Pick another quote from playlist
    const randomIdx = Math.floor(Math.random() * CURATED_PLAYLIST.length);
    const item = CURATED_PLAYLIST[randomIdx];
    onUpdateQuote(item.quoteContent, item.quoteAuthor, item.reflectionPrompt);
  };

  return (
    <section className="bg-white border border-stone-200/80 rounded-2xl p-5 sm:p-7 shadow-xs relative">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm">
                STEP 2
              </span>
              <h2 className="font-serif font-bold text-base sm:text-lg text-stone-800">
                오늘의 마인드셋
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              활기차고 새로운 마음가짐을 일깨우는 글귀
            </p>
          </div>
        </div>

        {/* Change quote button */}
        <button
          onClick={handleRandomizeQuote}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-lg transition-colors border border-transparent hover:border-stone-200"
          title="다른 영감의 글 읽기"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">다른 글 보기</span>
        </button>
      </div>

      {/* Quote Display Card */}
      <div className="bg-linear-to-br from-stone-50 via-[#FAF9F5] to-amber-50/30 border border-stone-200/70 rounded-xl p-5 sm:p-6 relative overflow-hidden">
        
        {/* Background watermark quote icon */}
        <Quote className="absolute -bottom-2 -right-2 w-24 h-24 text-stone-200/40 pointer-events-none select-none" />

        <div className="relative z-10">
          <blockquote className="font-serif text-base sm:text-lg text-stone-800 leading-relaxed sm:leading-loose tracking-normal mb-3">
            “{quoteContent}”
          </blockquote>
          
          <div className="text-right text-xs sm:text-sm font-sans font-medium text-stone-500">
            — {quoteAuthor}
          </div>

          {/* Reflection Question Box */}
          {reflectionPrompt && (
            <div className="mt-4 pt-3.5 border-t border-stone-200/60 flex items-start gap-2.5 text-xs sm:text-sm text-emerald-900 bg-emerald-50/60 p-3 rounded-lg border border-emerald-100/80">
              <span className="font-semibold text-emerald-700 shrink-0">💡 오늘의 사색:</span>
              <span className="leading-snug">{reflectionPrompt}</span>
            </div>
          )}
        </div>

      </div>

    </section>
  );
};
