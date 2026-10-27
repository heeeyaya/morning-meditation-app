import React, { useState, useMemo } from 'react';
import { X, Search, Calendar, ChevronRight, Music, PenLine } from 'lucide-react';
import { searchEntries } from '../utils/storage';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (dateStr: string) => void;
  currentDateStr: string;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  onSelectDate,
  currentDateStr
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCompletedOnly, setFilterCompletedOnly] = useState(false);
  const [customCalendarDate, setCustomCalendarDate] = useState(currentDateStr);

  const searchResults = useMemo(() => {
    let list = searchEntries(searchQuery);
    if (filterCompletedOnly) {
      list = list.filter(item => item.completed || (item.journalText && item.journalText.trim().length > 0));
    }
    return list;
  }, [searchQuery, filterCompletedOnly]);

  if (!isOpen) return null;

  const handleJumpToDate = (d: string) => {
    if (!d) return;
    onSelectDate(d);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white border border-stone-200 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-emerald-800" />
            <div>
              <h3 className="font-serif font-bold text-lg text-stone-800">
                기록 둘러보기 및 검색
              </h3>
              <p className="text-xs text-stone-500">
                과거의 아침 명상 음악과 작성했던 마음가짐을 찾아보세요
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Date Jump & Search Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-100 space-y-3 bg-white">
          
          {/* Quick Date Selector */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-stone-600 shrink-0">
              특정 날짜로 이동:
            </label>
            <input
              type="date"
              value={customCalendarDate}
              onChange={(e) => setCustomCalendarDate(e.target.value)}
              className="px-3 py-1.5 text-xs border border-stone-300 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-emerald-600"
            />
            <button
              onClick={() => handleJumpToDate(customCalendarDate)}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-medium transition-colors"
            >
              이동
            </button>
          </div>

          {/* Keyword Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="작성한 일기 내용, 음악 제목, 글귀 키워드로 검색..."
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all placeholder:text-stone-400"
            />
          </div>

          {/* Filter options */}
          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>총 {searchResults.length}개의 기록</span>
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-stone-700">
              <input
                type="checkbox"
                checked={filterCompletedOnly}
                onChange={(e) => setFilterCompletedOnly(e.target.checked)}
                className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>글을 작성한 기록만 보기</span>
            </label>
          </div>

        </div>

        {/* Results List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1 divide-y divide-stone-100">
          {searchResults.length === 0 ? (
            <div className="py-12 text-center text-stone-400">
              <PenLine className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">일치하는 기록이 없습니다.</p>
            </div>
          ) : (
            searchResults.map((entry) => {
              const isSelected = entry.date === currentDateStr;
              return (
                <div
                  key={entry.date}
                  onClick={() => handleJumpToDate(entry.date)}
                  className={`pt-3 first:pt-0 p-3 rounded-xl border transition-all cursor-pointer hover:border-emerald-300 hover:bg-emerald-50/20 ${
                    isSelected
                      ? 'bg-emerald-50/40 border-emerald-300 shadow-2xs'
                      : 'border-transparent bg-stone-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm text-stone-800">
                        {entry.date}
                      </span>
                      {entry.completed && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                          루틴 완료
                        </span>
                      )}
                      {entry.selectedMood && (
                        <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                          {entry.selectedMood}
                        </span>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </div>

                  {/* Journal excerpt */}
                  {entry.journalText ? (
                    <p className="text-xs text-stone-700 line-clamp-2 leading-relaxed mb-2 bg-white/80 p-2 rounded-md border border-stone-200/60 font-sans">
                      {entry.journalText}
                    </p>
                  ) : (
                    <p className="text-xs text-stone-400 italic mb-2">
                      작성된 마음가짐 기록이 없습니다.
                    </p>
                  )}

                  {/* Meta items */}
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-500">
                    <span className="flex items-center gap-1">
                      <Music className="w-3 h-3 text-stone-400" />
                      <span className="truncate max-w-[220px]">{entry.musicTitle}</span>
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="truncate max-w-[200px]">
                      {entry.quoteAuthor}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
