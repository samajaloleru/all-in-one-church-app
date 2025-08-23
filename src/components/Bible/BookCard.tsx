import React from 'react';
import { BibleBook } from '@/types/bible';

interface BookCardProps {
  book: BibleBook;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-105 hover:shadow-lg">
      <h3 className={`text-xl font-bold mb-2 ${ book.testament === 'Old' ? 'text-zinc-600' : 'text-rose-600'} `}>{book.name}</h3>
      <div className="flex justify-between items-center">
        <span className={`px-3 py-1 rounded-full text-sm ${
          book.testament === 'Old' 
            ? 'bg-rose-100 text-rose-800' 
            : 'bg-zinc-100 text-zinc-800'
        }`}>
          {book.testament} Testament
        </span>
        <span className={`${ book.testament === 'Old' ? 'text-rose-600' : 'text-zinc-600'}`}>{book.chapters} chapters</span>
      </div>
    </div>
  );
};

export default BookCard;