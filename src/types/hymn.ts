export interface HymnVerse {
  verseNumber: number;
  lines: string[];
}

export interface Hymn {
  id: number;
  number: number;
  title: string;
  musicNote?: string;
  lyrics: HymnVerse[];
  category: string;
}

export interface HymnCategory {
  id: number;
  title: string;
  range: string;
  description?: string;
}