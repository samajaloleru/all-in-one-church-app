import React from 'react';
import Link from 'next/link';
import { BibleVerse } from '@/types/bible';

interface VerseCardProps {
  verse: BibleVerse;
}

const VerseCard: React.FC<VerseCardProps> = ({ verse }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <Link href={`/bible/${verse.bookName.toLowerCase()}/${verse.chapter}/${verse.verse}`} passHref>
          <span className="text-lg font-bold text-zinc-800 hover:text-zinc-600">
            {verse.bookName} {verse.chapter}:{verse.verse}
          </span>
        </Link>
        <span className="bg-zinc-100 text-zinc-800 px-3 py-1 rounded-full text-sm">
          Verse {verse.verse}
        </span>
      </div>
      <p className="text-rose-800 leading-relaxed">{verse.text}</p>
    </div>
  );
};

export default VerseCard;