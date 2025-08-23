import { Hymn } from '@/types/hymn';
import React from 'react';

interface HymnCardProps {
  hymn: Hymn;
  onClick: () => void;
}

const HymnCard: React.FC<HymnCardProps> = ({ hymn, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
      onClick={onClick}
    >
      <div className="flex md:flex-row flex-col justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-zinc-800">{hymn.number}. {hymn.title}</h3>
        <span className="bg-zinc-100 text-zinc-800 px-3 py-1 rounded-full text-sm">
          {hymn.category}
        </span>
      </div>
      {hymn.musicNote && (
        <p className="text-rose-600 mb-4">{hymn.musicNote}</p>
      )}
      {hymn.lyrics.length > 0 && (
        <div className="text-rose-700">
          <p className="line-clamp-2">{hymn.lyrics[0].lines[0]}</p>
        </div>
      )}
    </div>
  );
};

export default HymnCard;