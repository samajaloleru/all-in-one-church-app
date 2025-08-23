import React from 'react';

interface ChapterCardProps {
  chapter: number;
  onClick: () => void;
}

const ChapterCard: React.FC<ChapterCardProps> = ({ chapter, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-transform hover:scale-105 hover:shadow-lg text-center"
      onClick={onClick}
    >
      <h3 className="text-xl font-bold text-zinc-800">Chapter {chapter}</h3>
    </div>
  );
};

export default ChapterCard;