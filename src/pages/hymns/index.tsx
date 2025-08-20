import Head from 'next/head';
import { useState } from 'react';
import { BasicLayout } from '@/components/Layout/BasicLayout';
import { hymnCategories, hymns } from '@/constant/hymns/en';
import { HymnCategory, Hymn } from '@/types/hymn';

import HymnCard from '@/components/Hymn/HymnCard';
import HymnDetail from '@/components/Hymn/HymnDetail';
import HymnSearch from '@/components/Hymn/HymnSearch';
import HymnCategoryCard from '@/components/Hymn/CategoryCard';

export default function Bible() {
  const [selectedCategory, setSelectedCategory] = useState<HymnCategory | null>(null);
  const [selectedHymn, setSelectedHymn] = useState<Hymn | null>(null);
  const [view, setView] = useState<'categories' | 'hymns'>('categories');

  const handleCategorySelect = (category: HymnCategory) => {
    setSelectedCategory(category);
    setView('hymns');
  };

  const handleHymnSelect = (hymn: Hymn) => {
    setSelectedHymn(hymn);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setView('categories');
  };

  const filteredHymns = selectedCategory 
    ? hymns.filter(hymn => {
        // Split on either hyphen "-" or en-dash "–"
        const [start, end] = selectedCategory.range
          .split(/[-–]/) // regex handles both
          .map(Number);

        console.log(`Filtering hymns in range: ${selectedCategory.range}`);
        console.log(`Filtering hymns in range: ${start} to ${end}`);

        return hymn.number >= start && hymn.number <= end;
      })
    : hymns;


  return (
    <>
      <Head>
        <title>Celestial Church of Christ Hymn Book</title>
        <meta name="description" content="Browse our collection of Celestial Church of Christ inspirational hymns" />
      </Head>
      <BasicLayout
        title="Hymn"
        description="Browse our collection of Celestial Church of Christ inspirational hymns"
      >
        <div className="max-w-6xl mx-auto container">
          <HymnSearch hymns={hymns} onHymnSelect={handleHymnSelect} />

          {view === 'categories' ? (
            <>
              <div className="mb-8 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-indigo-800">Hymn Categories</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hymnCategories.map(category => (
                  <HymnCategoryCard
                    key={category.id}
                    category={category}
                    onClick={() => handleCategorySelect(category)}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="mb-8 flex md:flex-row flex-col justify-between md:items-center">
                <button
                  onClick={handleBackToCategories}
                  className="flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to Categories
                </button>
                <h2 className="text-2xl font-bold text-indigo-800">
                  {selectedCategory?.title}
                </h2>
                <div></div> {/* Empty div for spacing */}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredHymns.map(hymn => (
                  <HymnCard
                    key={hymn.id}
                    hymn={hymn}
                    onClick={() => handleHymnSelect(hymn)}
                  />
                ))}
              </div>
            </>
          )}

          {selectedHymn && (
            <HymnDetail
              hymn={selectedHymn}
              onClose={() => setSelectedHymn(null)}
            />
          )}
        </div>

      </BasicLayout>
    </>
  );
}