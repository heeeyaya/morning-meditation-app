import { DailyEntry, DayStats } from '../types';
import { getCuratedContentForDate } from '../data/curations';

const STORAGE_KEY = 'morning_meditation_entries_v1';

/**
 * Get all saved entries from localStorage
 */
export function getAllEntries(): Record<string, DailyEntry> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load entries from storage:', e);
    return {};
  }
}

/**
 * Save all entries
 */
export function saveAllEntries(entries: Record<string, DailyEntry>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error('Failed to save entries to storage:', e);
  }
}

/**
 * Get or create an entry for a specific date (YYYY-MM-DD)
 */
export function getOrCreateEntry(dateStr: string): DailyEntry {
  const all = getAllEntries();
  if (all[dateStr]) {
    return all[dateStr];
  }

  // Generate from curated default
  const curated = getCuratedContentForDate(dateStr);
  const newEntry: DailyEntry = {
    id: dateStr,
    date: dateStr,
    youtubeUrl: curated.youtubeUrl,
    musicTitle: curated.musicTitle,
    musicCategory: curated.musicCategory,
    quoteContent: curated.quoteContent,
    quoteAuthor: curated.quoteAuthor,
    reflectionPrompt: curated.reflectionPrompt,
    journalText: '',
    completed: false,
    updatedAt: new Date().toISOString()
  };

  return newEntry;
}

/**
 * Save or update a specific entry
 */
export function saveEntry(entry: DailyEntry): void {
  const all = getAllEntries();
  all[entry.date] = {
    ...entry,
    updatedAt: new Date().toISOString()
  };
  saveAllEntries(all);
}

/**
 * Search entries by query keyword (searches journal text, music title, quote, date)
 */
export function searchEntries(query: string): DailyEntry[] {
  const all = getAllEntries();
  const list = Object.values(all);
  
  if (!query.trim()) {
    // Return all sorted by date desc
    return list.sort((a, b) => b.date.localeCompare(a.date));
  }

  const q = query.toLowerCase().trim();
  return list
    .filter(item => {
      return (
        item.date.includes(q) ||
        (item.journalText && item.journalText.toLowerCase().includes(q)) ||
        (item.musicTitle && item.musicTitle.toLowerCase().includes(q)) ||
        (item.quoteContent && item.quoteContent.toLowerCase().includes(q)) ||
        (item.quoteAuthor && item.quoteAuthor.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Calculate streak and completed count
 */
export function getStats(): DayStats {
  const all = getAllEntries();
  const list = Object.values(all).filter(e => e.completed && e.journalText?.trim().length > 0);
  
  const totalCompleted = list.length;
  
  // Calculate consecutive streak back from today or yesterday
  const completedDates = new Set(list.map(e => e.date));
  
  let currentStreak = 0;
  const today = new Date();
  
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  let checkDate = new Date(today);
  const todayStr = formatDate(checkDate);

  // If today is completed, start streak from today, otherwise check yesterday
  if (completedDates.has(todayStr)) {
    currentStreak++;
    checkDate.setDate(checkDate.getDate() - 1);
  } else {
    // Check if yesterday was completed
    checkDate.setDate(checkDate.getDate() - 1);
    if (!completedDates.has(formatDate(checkDate))) {
      return { totalCompleted, currentStreak: 0 };
    }
  }

  while (completedDates.has(formatDate(checkDate))) {
    currentStreak++;
    checkDate.setDate(checkDate.getDate() - 1);
  }

  return { totalCompleted, currentStreak };
}

/**
 * Export all entries as JSON file download
 */
export function exportDataAsJSON(): void {
  const data = getAllEntries();
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `meditation-journal-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Import entries from JSON string
 */
export function importDataFromJSON(jsonStr: string): boolean {
  try {
    const parsed = JSON.parse(jsonStr);
    if (typeof parsed !== 'object' || parsed === null) return false;
    saveAllEntries(parsed);
    return true;
  } catch (e) {
    console.error('Import failed:', e);
    return false;
  }
}
