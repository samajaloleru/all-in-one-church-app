// components/HymnSearch.tsx
import { Hymn } from '@/types/hymn';
import React, { useState } from 'react';

interface HymnSearchProps {
  hymns: Hymn[];
  onHymnSelect: (hymn: Hymn) => void;
}

const HymnSearch: React.FC<HymnSearchProps> = ({ hymns, onHymnSelect }) => {
  const [query, setQuery] = useState('');

  const filteredHymns = hymns.filter(hymn => 
    hymn.title.toLowerCase().includes(query.toLowerCase()) ||
    // hymn.subtitle?.toLowerCase().includes(query.toLowerCase()) ||
    hymn.lyrics.some(verse => 
      verse.lines.some(line => 
        line.toLowerCase().includes(query.toLowerCase())
      )
    )
  );

  return (
    <div className="mb-8">
      <div className="border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full flex items-center space-x-2 p-2 px-4">
        <input
          type="text"
          placeholder="Search hymns by title, lyrics, or number..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
        />
        <svg 
          className="h-5 w-5 text-gray-400" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      </div>
      
      {query && (
        <div className="mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredHymns.map(hymn => (
            <div
              key={hymn.id}
              className="p-3 border-b border-gray-100 hover:bg-indigo-50 cursor-pointer"
              onClick={() => onHymnSelect(hymn)}
            >
              <div className="font-medium">{hymn.number}. {hymn.title}</div>
              {/* {hymn.subtitle && (
                <div className="text-sm text-gray-600">{hymn.subtitle}</div>
              )} */}
            </div>
          ))}
          {filteredHymns.length === 0 && (
            <div className="p-3 text-center text-gray-500">No hymns found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default HymnSearch;