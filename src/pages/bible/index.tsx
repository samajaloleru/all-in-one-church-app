import Link from 'next/link';
import  Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { bibleBooks, bibleVerses } from '@/constant/bible/en';
import { BibleVerse } from '@/types/bible';
import { BasicLayout } from '@/components/Layout/BasicLayout';
import BibleSearch from '@/components/Bible/BibleSearch';
import BookCard from '@/components/Bible/BookCard';

export default function Bible() {
  const router = useRouter();
  const [selectedTestament, setSelectedTestament] = useState<'Old' | 'New'>('Old');

  const filteredBooks = bibleBooks.filter(book => book.testament === selectedTestament);

  const handleVerseSelect = (verse: BibleVerse) => {
    router.push(`/bible/${verse.bookName.toLowerCase()}/${verse.chapter}#verse-${verse.verse}`);
  };

  return (
    <>
      <Head>
        <title>{`${selectedTestament} Testament Books`} | Holy Bible</title>
        <title>Holy Bible </title>
        <meta name="description" content="Explore the Bible, read scriptures, and deepen your faith." />
      </Head>
      <BasicLayout
        title={`${selectedTestament} Testament Books`}
        description={`Explore the ${selectedTestament} Testament Books, and deepen your faith.`}
      >
        <div className="max-w-7xl md:max-w-6xl md:mx-auto container">
          <BibleSearch verses={bibleVerses} onVerseSelect={handleVerseSelect} />

          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setSelectedTestament('Old')}
                className={`px-6 py-2 rounded-lg ${
                  selectedTestament === 'Old' 
                    ? 'bg-rose-600 text-white' 
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                Old Testament
              </button>
              <button
                onClick={() => setSelectedTestament('New')}
                className={`px-6 py-2 rounded-lg ${
                  selectedTestament === 'New' 
                    ? 'bg-zinc-600 text-white' 
                    : 'bg-zinc-100 text-zinc-800'
                }`}
              >
                New Testament
              </button>
            </div>
          </div>

          <div className="mb-8">            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map(book => (
                <Link key={book.id} href={`/bible/${book.slug}`} passHref>
                  <span>
                    <BookCard book={book} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </BasicLayout>
    </>
  );
}