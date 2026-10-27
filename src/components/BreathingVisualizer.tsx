import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Wind } from 'lucide-react';

interface BreathingVisualizerProps {
  isOpen: boolean;
  onClose: () => void;
}

type BreathPhase = 'inhale' | 'hold' | 'exhale' | 'ready';

export const BreathingVisualizer: React.FC<BreathingVisualizerProps> = ({ isOpen, onClose }) => {
  const [phase, setPhase] = useState<BreathPhase>('ready');
  const [counter, setCounter] = useState(4);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsActive(false);
      setPhase('ready');
      return;
    }
    setIsActive(true);
    setPhase('inhale');
    setCounter(4);
  }, [isOpen]);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev > 1) return prev - 1;

        // Transition phases: inhale (4s) -> hold (4s) -> exhale (4s)
        if (phase === 'inhale') {
          setPhase('hold');
          return 4;
        } else if (phase === 'hold') {
          setPhase('exhale');
          return 4;
        } else {
          setPhase('inhale');
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  if (!isOpen) return null;

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return '숨을 천천히 들이마십니다 (들숨)';
      case 'hold':
        return '잠시 숨을 멈추고 고요함을 느낍니다';
      case 'exhale':
        return '모든 긴장을 내보내며 숨을 내쉽니다 (날숨)';
      default:
        return '마음의 준비를 합니다';
    }
  };

  const getCircleScale = () => {
    if (phase === 'inhale') return 'scale-125 opacity-90 duration-4000';
    if (phase === 'hold') return 'scale-125 opacity-100 duration-1000';
    if (phase === 'exhale') return 'scale-75 opacity-60 duration-4000';
    return 'scale-100 opacity-80';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-stone-50 border border-stone-200 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative flex flex-col items-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-emerald-800 mb-2">
          <Wind className="w-5 h-5" />
          <h3 className="font-serif font-bold text-lg">마음챙김 호흡 가이드</h3>
        </div>
        <p className="text-xs text-stone-500 mb-8">4초 들숨 · 4초 멈춤 · 4초 날숨</p>

        {/* Breathing Circle Container */}
        <div className="w-56 h-56 flex items-center justify-center relative mb-8">
          {/* Animated Background Ring */}
          <div
            className={`absolute inset-0 rounded-full bg-linear-to-br from-emerald-100 via-teal-100 to-amber-100 transition-all ease-in-out ${getCircleScale()} border-2 border-emerald-300/40 shadow-inner`}
          />

          {/* Center Text */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <span className="text-4xl font-serif font-bold text-stone-800 tracking-wider">
              {counter}
            </span>
            <span className="text-xs uppercase tracking-widest font-semibold text-emerald-800/80 mt-1">
              {phase === 'inhale' ? 'Inhale' : phase === 'hold' ? 'Hold' : 'Exhale'}
            </span>
          </div>
        </div>

        {/* Instruction Message */}
        <p className="text-sm font-medium text-stone-700 text-center min-h-6 mb-6">
          {getPhaseText()}
        </p>

        {/* Pause/Resume Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsActive(!isActive)}
            className="flex items-center gap-2 px-4 py-2 bg-stone-200/80 hover:bg-stone-300/80 text-stone-700 rounded-lg text-sm font-medium transition-all"
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isActive ? '잠시 멈춤' : '다시 시작'}
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-sm font-medium shadow-xs transition-all"
          >
            충분해요 (닫기)
          </button>
        </div>

      </div>
    </div>
  );
};
