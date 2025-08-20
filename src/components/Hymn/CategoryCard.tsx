import React from 'react';
import { HymnCategory } from '@/types/hymn';

interface HymnCategoryCardProps {
  category: HymnCategory;
  onClick: () => void;
}

const HymnCategoryCard: React.FC<HymnCategoryCardProps> = ({ category, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-md p-6 cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
      onClick={onClick}
    >
      <h3 className="text-xl font-bold text-indigo-800 mb-2">{category.title}</h3>
      <p className="text-gray-600">Hymns {category.range}</p>
      {category.description && (
        <p className="text-sm text-gray-500 mt-2">{category.description}</p>
      )}
    </div>
  );
};

export default HymnCategoryCard;