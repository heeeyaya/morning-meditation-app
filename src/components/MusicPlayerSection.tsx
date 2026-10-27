import React, { useState } from 'react';
import { Music, Wind, Link2, ListMusic, ExternalLink, Timer, Check } from 'lucide-react';
import { getYouTubeEmbedUrl, getYouTubeVideoId } from '../utils/youtube';
import { CURATED_PLAYLIST } from '../data/curations';

interface MusicPlayerSectionProps {
  youtubeUrl: string;
  musicTitle: string;
  musicCategory: string;
  onUpdateMusic: (url: string, title: string, category: string) => void;
  onOpenBreathingGuide: () => void;
}

export const MusicPlayerSection: React.FC<MusicPlayerSectionProps> = ({
  youtubeUrl,
  musicTitle,
  musicCategory,
  onUpdateMusic,
  onOpenBreathingGuide
}) => {
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const [customInputUrl, setCustomInputUrl] = useState('');
  const [customInputTitle, setCustomInputTitle] = useState('');
  const [urlError, setUrlError] = useState('');

  // Simple Timer state for meditation session
  const [selectedTimerMins, setSelectedTimerMins] = useState<number | null>(null);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const embedUrl = React.useMemo(() => getYouTubeEmbedUrl(youtubeUrl), [youtubeUrl]);

  // Handle Timer Countdown
  React.useEffect(() => {
    if (!isTimerRunning || timerSecondsLeft <= 0) return;

    const interval = setInterval(() => {
      setTimerSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          alert('설정한 명상 시간이 완료되었습니다. 깊게 숨을 들이마시고 편안하게 마무리해 보세요.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, timerSecondsLeft]);

  const handleStartTimer = (mins: number) => {
    setSelectedTimerMins(mins);
    setTimerSecondsLeft(mins * 60);
    setIsTimerRunning(true);
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
    setSelectedTimerMins(null);
    setTimerSecondsLeft(0);
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError('');

    const vid = getYouTubeVideoId(customInputUrl);
    if (!vid) {
      setUrlError('올바른 유튜브 링크(URL)를 입력해 주세요.');
      return;
    }

    const title = customInputTitle.trim() || '내가 추가한 아침 명상 음악';
    onUpdateMusic(customInputUrl.trim(), title, '사용자 정의 음악');
    setShowCustomModal(false);
    setCustomInputUrl('');
    setCustomInputTitle('');
  };

  return (
    <section className="bg-white border border-stone-200/80 rounded-2xl p-5 sm:p-7 shadow-xs relative">
      
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
            <Music className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm">
                STEP 1
              </span>
              <h2 className="font-serif font-bold text-base sm:text-lg text-stone-800">
                아침 명상 사운드
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              마음의 긴장을 풀고 귀를 기울여보세요
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Breathing Guide Button */}
          <button
            onClick={onOpenBreathingGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-800 bg-emerald-50/80 hover:bg-emerald-100 border border-emerald-200/60 transition-colors"
          >
            <Wind className="w-3.5 h-3.5 text-emerald-600" />
            <span>호흡 가이드</span>
          </button>

          {/* Change Playlist Dropdown Toggle */}
          <button
            onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200/80 border border-stone-200 transition-colors"
          >
            <ListMusic className="w-3.5 h-3.5 text-stone-600" />
            <span>다른 음악 선택</span>
          </button>

          {/* Custom Link Button */}
          <button
            onClick={() => setShowCustomModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-transparent hover:border-stone-200 transition-colors"
            title="나만의 유튜브 링크 입력"
          >
            <Link2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Recommended Playlist Dropdown List */}
      {showPlaylistMenu && (
        <div className="mb-5 p-3 bg-stone-50 border border-stone-200 rounded-xl animate-in fade-in duration-150">
          <p className="text-xs font-semibold text-stone-500 mb-2 px-1">
            원하는 테마의 명상 음악을 골라보세요:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CURATED_PLAYLIST.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onUpdateMusic(item.youtubeUrl, item.musicTitle, item.musicCategory);
                  setShowPlaylistMenu(false);
                }}
                className={`text-left p-2.5 rounded-lg border text-xs transition-all flex items-start justify-between gap-2 ${
                  youtubeUrl === item.youtubeUrl
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium'
                    : 'bg-white border-stone-200/80 text-stone-700 hover:bg-stone-100/70'
                }`}
              >
                <div>
                  <span className="inline-block text-[10px] px-1.5 py-0.5 bg-stone-100 text-stone-600 rounded-sm mb-1">
                    {item.musicCategory}
                  </span>
                  <div className="font-sans line-clamp-1">{item.musicTitle}</div>
                </div>
                {youtubeUrl === item.youtubeUrl && (
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Currently Playing Track Info Banner */}
      <div className="mb-3.5 flex flex-wrap items-center justify-between text-xs text-stone-600 bg-stone-50/80 px-3 py-2 rounded-lg border border-stone-200/60">
        <div className="flex items-center gap-2 overflow-hidden mr-2">
          <span className="font-semibold text-emerald-800 shrink-0">[{musicCategory}]</span>
          <span className="truncate font-medium text-stone-800">{musicTitle}</span>
        </div>
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-400 hover:text-stone-700 inline-flex items-center gap-1 shrink-0 ml-auto transition-colors"
          title="유튜브에서 직접 열기"
        >
          <span>YouTube 열기</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* YouTube Embedded Video Player */}
      <div className="relative w-full aspect-video sm:aspect-21/9 bg-black rounded-xl overflow-hidden shadow-inner border border-stone-300/40">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={musicTitle}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 p-6 text-center">
            <Music className="w-10 h-10 mb-2 opacity-50" />
            <p className="text-sm">유튜브 링크가 올바르지 않습니다.</p>
          </div>
        )}
      </div>

      {/* Quick Meditation Timer Controls */}
      <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-stone-500">
          <Timer className="w-3.5 h-3.5 text-stone-400" />
          <span>명상 타이머 설정:</span>
        </div>
        <div className="flex items-center gap-1.5">
          {[5, 10, 15, 20].map((mins) => (
            <button
              key={mins}
              onClick={() => handleStartTimer(mins)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                selectedTimerMins === mins && isTimerRunning
                  ? 'bg-emerald-700 text-white font-semibold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {mins}분
            </button>
          ))}
          {isTimerRunning && (
            <button
              onClick={handleStopTimer}
              className="px-2 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-md font-medium border border-rose-200"
            >
              종료 ({Math.floor(timerSecondsLeft / 60)}:{(timerSecondsLeft % 60).toString().padStart(2, '0')})
            </button>
          )}
        </div>
      </div>

      {/* Custom YouTube URL Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-stone-200">
            <h3 className="font-serif font-bold text-base text-stone-800 mb-1">
              원하는 유튜브 음악 등록
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              즐겨 듣는 아침 명상 또는 피아노 연주곡의 유튜브 링크를 붙여넣으세요.
            </p>

            <form onSubmit={handleApplyCustomUrl} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  유튜브 링크 (URL) *
                </label>
                <input
                  type="text"
                  value={customInputUrl}
                  onChange={(e) => setCustomInputUrl(e.target.value)}
                  placeholder="예: https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                  required
                />
                {urlError && <p className="text-xs text-rose-600 mt-1">{urlError}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  음악 제목 (선택)
                </label>
                <input
                  type="text"
                  value={customInputTitle}
                  onChange={(e) => setCustomInputTitle(e.target.value)}
                  placeholder="예: 나의 최애 아침 명상곡"
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-100 rounded-lg"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg shadow-xs"
                >
                  적용하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
