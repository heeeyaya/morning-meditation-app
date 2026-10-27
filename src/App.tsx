import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { MusicPlayerSection } from './components/MusicPlayerSection';
import { InspirationSection } from './components/InspirationSection';
import { JournalSection } from './components/JournalSection';
import { BreathingVisualizer } from './components/BreathingVisualizer';
import { HistoryModal } from './components/HistoryModal';
import { getOrCreateEntry, saveEntry, getStats } from './utils/storage';
import { DailyEntry, MoodType, DayStats } from './types';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  // Today date helper
  const getTodayStr = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const todayStr = getTodayStr();
  const [selectedDateStr, setSelectedDateStr] = useState<string>(todayStr);
  const [entry, setEntry] = useState<DailyEntry>(() => getOrCreateEntry(todayStr));
  const [stats, setStats] = useState<DayStats>(() => getStats());
  const [isBreathingOpen, setIsBreathingOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Sync entry when selected date changes
  useEffect(() => {
    const loaded = getOrCreateEntry(selectedDateStr);
    setEntry(loaded);
  }, [selectedDateStr]);

  // Update and save helper
  const updateAndSaveEntry = useCallback((updater: (prev: DailyEntry) => DailyEntry) => {
    setEntry((prev) => {
      const next = updater(prev);
      saveEntry(next);
      setStats(getStats());
      return next;
    });
  }, []);

  const handleUpdateMusic = (url: string, title: string, category: string) => {
    updateAndSaveEntry((prev) => ({
      ...prev,
      youtubeUrl: url,
      musicTitle: title,
      musicCategory: category
    }));
  };

  const handleUpdateQuote = (content: string, author: string, prompt: string) => {
    updateAndSaveEntry((prev) => ({
      ...prev,
      quoteContent: content,
      quoteAuthor: author,
      reflectionPrompt: prompt
    }));
  };

  const handleUpdateJournal = (text: string) => {
    updateAndSaveEntry((prev) => ({
      ...prev,
      journalText: text
    }));
  };

  const handleSelectMood = (mood: MoodType) => {
    updateAndSaveEntry((prev) => ({
      ...prev,
      selectedMood: prev.selectedMood === mood ? undefined : mood
    }));
  };

  const handleToggleComplete = () => {
    updateAndSaveEntry((prev) => {
      const willComplete = !prev.completed;
      return {
        ...prev,
        completed: willComplete,
        completedAt: willComplete ? new Date().toISOString() : undefined
      };
    });
  };

  // Date Navigation (Previous day, Next day)
  const handleShiftDate = (days: number) => {
    const [y, m, d] = selectedDateStr.split('-').map(Number);
    const target = new Date(y, m - 1, d);
    target.setDate(target.getDate() + days);
    
    const nextY = target.getFullYear();
    const nextM = String(target.getMonth() + 1).padStart(2, '0');
    const nextD = String(target.getDate()).padStart(2, '0');
    setSelectedDateStr(`${nextY}-${nextM}-${nextD}`);
  };

  const isToday = selectedDateStr === todayStr;

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col font-sans">
      
      {/* Top Header */}
      <Header
        currentDateStr={selectedDateStr}
        isToday={isToday}
        streakCount={stats.currentStreak}
        totalCompleted={stats.totalCompleted}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onGoToToday={() => setSelectedDateStr(todayStr)}
        onDataImported={() => {
          setEntry(getOrCreateEntry(selectedDateStr));
          setStats(getStats());
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
        
        {/* Date Navigator Bar */}
        <div className="flex items-center justify-between bg-white/60 backdrop-blur-xs border border-stone-200/60 rounded-xl px-4 py-2 text-xs sm:text-sm text-stone-600 shadow-2xs">
          <button
            onClick={() => handleShiftDate(-1)}
            className="flex items-center gap-1 hover:text-stone-900 px-2 py-1 rounded-md hover:bg-stone-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>어제 기록</span>
          </button>

          <div className="flex items-center gap-2 font-serif font-semibold text-stone-800">
            <CalendarIcon className="w-4 h-4 text-emerald-700" />
            <span>{selectedDateStr}</span>
            {isToday && (
              <span className="text-[10px] font-sans font-medium bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                오늘
              </span>
            )}
          </div>

          <button
            onClick={() => handleShiftDate(1)}
            disabled={isToday}
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
              isToday
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            <span>내일</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Step 1: Music Player */}
        <MusicPlayerSection
          youtubeUrl={entry.youtubeUrl}
          musicTitle={entry.musicTitle}
          musicCategory={entry.musicCategory}
          onUpdateMusic={handleUpdateMusic}
          onOpenBreathingGuide={() => setIsBreathingOpen(true)}
        />

        {/* Step 2: Mindset Inspiration Quote */}
        <InspirationSection
          quoteContent={entry.quoteContent}
          quoteAuthor={entry.quoteAuthor}
          reflectionPrompt={entry.reflectionPrompt}
          onUpdateQuote={handleUpdateQuote}
        />

        {/* Step 3: Journaling */}
        <JournalSection
          journalText={entry.journalText}
          selectedMood={entry.selectedMood}
          completed={entry.completed}
          onUpdateJournal={handleUpdateJournal}
          onSelectMood={handleSelectMood}
          onToggleComplete={handleToggleComplete}
        />

        {/* Completion Card Footer if completed */}
        {entry.completed && (
          <div className="bg-linear-to-r from-emerald-50 via-teal-50 to-stone-50 border border-emerald-200/80 rounded-2xl p-6 text-center shadow-xs animate-in fade-in duration-300">
            <Sparkles className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-serif font-bold text-base text-stone-800 mb-1">
              오늘의 아침 명상과 마음가짐 정돈을 훌륭하게 마쳤습니다.
            </h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
              작은 루틴이 모여 단단하고 흔들리지 않는 하루를 만듭니다. 오늘 하루도 당신만의 속도로 평온하고 힘차게 걸어가세요.
            </p>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200/60 py-6 text-center text-xs text-stone-400 font-sans">
        <p>Morning Meditation & Mindset Journal — 오롯이 나를 위해 시작하는 아침</p>
      </footer>

      {/* Breathing Guide Modal */}
      <BreathingVisualizer
        isOpen={isBreathingOpen}
        onClose={() => setIsBreathingOpen(false)}
      />

      {/* History & Search Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectDate={(d) => setSelectedDateStr(d)}
        currentDateStr={selectedDateStr}
      />

    </div>
  );
};

export default App;
