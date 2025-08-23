import React, { useState } from 'react';
import { BibleVerse } from '@/types/bible';

interface BibleSearchProps {
  verses: BibleVerse[];
  onVerseSelect: (verse: BibleVerse) => void;
}

const BibleSearch: React.FC<BibleSearchProps> = ({ verses, onVerseSelect }) => {
  const [query, setQuery] = useState('');

  const filteredVerses = verses.filter(verse => 
    verse.text.toLowerCase().includes(query.toLowerCase()) ||
    `${verse.bookName} ${verse.chapter}:${verse.verse}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search Bible verses or references..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <svg 
          className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
      
      {query && (
        <div className="mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredVerses.map(verse => (
            <div
              key={`${verse.bookId}-${verse.chapter}-${verse.verse}`}
              className="p-3 border-b border-gray-100 hover:bg-indigo-50 cursor-pointer"
              onClick={() => onVerseSelect(verse)}
            >
              <div className="font-medium">{verse.bookName} {verse.chapter}:{verse.verse}</div>
              <div className="text-sm text-gray-600">{verse.text}</div>
            </div>
          ))}
          {filteredVerses.length === 0 && (
            <div className="p-3 text-center text-gray-500">No verses found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default BibleSearch;