import React from 'react';
import { Sparkles, Calendar, Search, Download, Upload } from 'lucide-react';
import { exportDataAsJSON, importDataFromJSON } from '../utils/storage';

interface HeaderProps {
  currentDateStr: string;
  isToday: boolean;
  streakCount: number;
  totalCompleted: number;
  onOpenHistory: () => void;
  onGoToToday: () => void;
  onDataImported: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentDateStr,
  isToday,
  streakCount,
  totalCompleted,
  onOpenHistory,
  onGoToToday,
  onDataImported
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Format date nicely: e.g. "2026년 10월 27일 화요일"
  const formattedDate = React.useMemo(() => {
    try {
      const [year, month, day] = currentDateStr.split('-').map(Number);
      const d = new Date(year, month - 1, day);
      return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      }).format(d);
    } catch {
      return currentDateStr;
    }
  }, [currentDateStr]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && importDataFromJSON(content)) {
        alert('데이터가 성공적으로 복원되었습니다.');
        onDataImported();
      } else {
        alert('올바르지 않은 백업 파일 형식입니다.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="border-b border-stone-200/80 bg-white/70 backdrop-blur-md sticky top-0 z-30 transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand & Date */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-emerald-600/10 text-emerald-800 flex items-center justify-center font-serif text-lg font-bold border border-emerald-600/20 shadow-xs">
            息
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-serif font-bold text-base sm:text-lg text-stone-800 tracking-tight">
                아침 명상 & 마인드셋
              </h1>
              {!isToday && (
                <button
                  onClick={onGoToToday}
                  className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center gap-1 font-medium"
                >
                  오늘로 돌아가기
                </button>
              )}
            </div>
            <p className="text-xs text-stone-500 font-sans">
              {formattedDate}
            </p>
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Streak pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-amber-50/80 border border-amber-200/60 rounded-full text-xs text-amber-800 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{streakCount}일 연속</span>
            <span className="text-stone-300">|</span>
            <span className="text-stone-500">누적 {totalCompleted}회</span>
          </div>

          {/* History / Search Button */}
          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-stone-700 bg-stone-100/90 hover:bg-stone-200/80 active:scale-98 transition-all border border-stone-200"
            title="날짜별 기록 및 검색"
          >
            <Calendar className="w-4 h-4 text-stone-600" />
            <Search className="w-3.5 h-3.5 text-stone-400 -ml-0.5" />
            <span className="hidden xs:inline">기록·검색</span>
          </button>

          {/* Backup menu dropdown / buttons */}
          <div className="flex items-center space-x-1 pl-1 border-l border-stone-200">
            <button
              onClick={exportDataAsJSON}
              className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-md transition-colors"
              title="데이터 백업 (JSON 다운로드)"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-md transition-colors"
              title="데이터 복원 (JSON 파일 가져오기)"
            >
              <Upload className="w-4 h-4" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json"
              className="hidden"
            />
          </div>

        </div>
      </div>
    </header>
  );
};
