import React from 'react';
import { PenLine, CheckCircle2, Heart, Zap, Sparkles, Smile, Sun, Check } from 'lucide-react';
import { MoodType } from '../types';

interface JournalSectionProps {
  journalText: string;
  selectedMood?: MoodType;
  completed: boolean;
  onUpdateJournal: (text: string) => void;
  onSelectMood: (mood: MoodType) => void;
  onToggleComplete: () => void;
}

const MOODS: { type: MoodType; label: string; icon: React.ReactNode; color: string }[] = [
  { type: 'peaceful', label: '평온함', icon: <Heart className="w-3.5 h-3.5" />, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
  { type: 'grateful', label: '감사함', icon: <Sparkles className="w-3.5 h-3.5" />, color: 'bg-amber-50 text-amber-800 border-amber-200' },
  { type: 'energized', label: '활기참', icon: <Zap className="w-3.5 h-3.5" />, color: 'bg-orange-50 text-orange-800 border-orange-200' },
  { type: 'focused', label: '몰입·집중', icon: <Sun className="w-3.5 h-3.5" />, color: 'bg-blue-50 text-blue-800 border-blue-200' },
  { type: 'calm', label: '차분함', icon: <Smile className="w-3.5 h-3.5" />, color: 'bg-teal-50 text-teal-800 border-teal-200' },
];

export const JournalSection: React.FC<JournalSectionProps> = ({
  journalText,
  selectedMood,
  completed,
  onUpdateJournal,
  onSelectMood,
  onToggleComplete
}) => {
  return (
    <section className="bg-white border border-stone-200/80 rounded-2xl p-5 sm:p-7 shadow-xs relative">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100">
            <PenLine className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-sm">
                STEP 3
              </span>
              <h2 className="font-serif font-bold text-base sm:text-lg text-stone-800">
                나의 마음가짐 기록
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              명상 후 떠오른 감정과 오늘 하루를 향한 다짐을 적어보세요
            </p>
          </div>
        </div>

        {/* Saved Status Indicator */}
        <div className="text-[11px] text-stone-400 font-sans flex items-center gap-1">
          <Check className="w-3 h-3 text-emerald-500" />
          <span>입력 즉시 자동 저장됨</span>
        </div>
      </div>

      {/* Mood Selector Chips */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-stone-600 mb-2">
          지금 내 마음에 머무는 느낌:
        </label>
        <div className="flex flex-wrap gap-2">
          {MOODS.map((m) => {
            const isSelected = selectedMood === m.type;
            return (
              <button
                key={m.type}
                onClick={() => onSelectMood(m.type)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  isSelected
                    ? `${m.color} ring-2 ring-emerald-600/30 font-semibold shadow-xs`
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                {m.icon}
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Journal Textarea */}
      <div className="relative mb-4">
        <textarea
          value={journalText}
          onChange={(e) => onUpdateJournal(e.target.value)}
          placeholder="오늘 하루를 어떤 마음가짐으로 살아갈 것인가요? 명상 중 떠오른 생각, 감사한 일, 나에게 건네는 따뜻한 다짐을 솔직하게 적어보세요..."
          rows={6}
          className="w-full p-4 text-sm sm:text-base font-sans text-stone-800 bg-stone-50/70 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all leading-relaxed placeholder:text-stone-400 resize-y"
        />
        <div className="text-right text-[11px] text-stone-400 mt-1">
          {journalText.length}자 작성됨
        </div>
      </div>

      {/* Completion Button */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={onToggleComplete}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all shadow-xs ${
            completed
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
              : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/20 active:scale-98'
          }`}
        >
          <CheckCircle2 className={`w-4 h-4 ${completed ? 'text-emerald-600' : 'text-white'}`} />
          <span>{completed ? '오늘의 명상 루틴 완료됨 (다시 클릭하여 취소)' : '오늘의 명상 & 다짐 완료하기'}</span>
        </button>
      </div>

    </section>
  );
};
