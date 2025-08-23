import React from 'react';
import { BibleBook } from '@/types/bible';

interface BookCardProps {
  book: BibleBook;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-105 hover:shadow-lg">
      <h3 className="text-xl font-bold text-indigo-800 mb-2">{book.name}</h3>
      <div className="flex justify-between items-center">
        <span className={`px-3 py-1 rounded-full text-sm ${
          book.testament === 'Old' 
            ? 'bg-amber-100 text-amber-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {book.testament} Testament
        </span>
        <span className="text-gray-600">{book.chapters} chapters</span>
      </div>
    </div>
  );
};

export default BookCard;