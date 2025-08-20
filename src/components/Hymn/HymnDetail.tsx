import { Hymn } from '@/types/hymn';
import React from 'react';

interface HymnDetailProps {
  hymn: Hymn;
  onClose: () => void;
}

const HymnDetail: React.FC<HymnDetailProps> = ({ hymn, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-indigo-800">
            {hymn.number}. {hymn.title}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {hymn.musicNote && (
            <p className="text-lg text-gray-600 mb-6">{hymn.musicNote}</p>
          )}
          
          <div className="space-y-6">
            {hymn.lyrics.map((verse, index) => (
              <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
                {verse.lines.map((line, lineIndex) => (
                  <p key={lineIndex} className="text-gray-800 mb-2">
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t">
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
              Amen
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HymnDetail;