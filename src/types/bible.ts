export interface BibleVerse {
  bookId: number;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleBook {
  id: number;
  name: string;
  slug: string;
  chapters: number;
  testament: 'Old' | 'New';
}

export interface BibleChapter {
  bookId: number;
  chapter: number;
  verses: BibleVerse[];
}