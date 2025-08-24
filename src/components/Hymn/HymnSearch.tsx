import { Hymn } from '@/types/hymn';
import React, { useState } from 'react';

interface HymnSearchProps {
  hymns: Hymn[];
  onHymnSelect: (hymn: Hymn) => void;
}

const HymnSearch: React.FC<HymnSearchProps> = ({ hymns, onHymnSelect }) => {
  const [query, setQuery] = useState('');

   // Trim and lowercase query for comparison
  const normalizedQuery = query.trim().toLowerCase();

  // Check if query is a number
  const isNumberQuery = /^\d+$/.test(normalizedQuery);

  let filteredHymns: Hymn[] = [];

  if (isNumberQuery) {
    // Search only by hymn number
    filteredHymns = hymns.filter(hymn =>
      hymn.number.toString() === normalizedQuery
    );
  } else {
    // Search by title or lyrics
    filteredHymns = hymns.filter(hymn => 
      hymn.title.toLowerCase().includes(normalizedQuery) ||
      hymn.lyrics.some(verse => 
        verse.lines.some(line => 
          line.toLowerCase().includes(normalizedQuery)
        )
      )
    );
  }

  const uniqueHymns = Array.from(
    new Map(filteredHymns.map(hymn => [hymn.number, hymn])).values()
  );

  return (
    <div className="mb-8">
      <div className="border-2 border-rose-400 rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 w-full flex items-center space-x-2 p-2 px-4">
        <input
          type="text"
          placeholder="Search hymns by title, lyrics, or number..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent focus:outline-none text-rose-800 placeholder-rose-500"
        />
        <svg 
          className="h-5 w-5 text-rose-400" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
      
      {query && (
        <div className="mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {uniqueHymns.map(hymn => (
            <div
              key={hymn.id}
              className="p-3 border-b border-rose-100 hover:bg-zinc-50 cursor-pointer"
              onClick={() => onHymnSelect(hymn)}
            >
              <div className="font-medium">{hymn.number}. {hymn.title}</div>
              {/* {hymn.subtitle && (
                <div className="text-sm text-rose-600">{hymn.subtitle}</div>
              )} */}
            </div>
          ))}
          {uniqueHymns.length === 0 && (
            <div className="p-3 text-center text-rose-500">No hymns found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default HymnSearch;