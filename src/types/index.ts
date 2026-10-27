export type MoodType = 'peaceful' | 'energized' | 'grateful' | 'focused' | 'calm' | 'hopeful';

export interface DailyCuratedContent {
  youtubeUrl: string;
  musicTitle: string;
  musicDescription: string;
  musicCategory: string;
  quoteContent: string;
  quoteAuthor: string;
  reflectionPrompt: string;
}

export interface DailyEntry {
  id: string; // YYYY-MM-DD
  date: string; // YYYY-MM-DD
  youtubeUrl: string;
  musicTitle: string;
  musicCategory: string;
  quoteContent: string;
  quoteAuthor: string;
  reflectionPrompt: string;
  journalText: string;
  selectedMood?: MoodType;
  completed: boolean;
  completedAt?: string;
  updatedAt: string;
}

export interface DayStats {
  totalCompleted: number;
  currentStreak: number;
}
