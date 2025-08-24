import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import VerseCard from "@/components/Bible/VerseCard";
import { BasicLayout } from "@/components/Layout/BasicLayout";
import { bibleBooks, bibleVerses } from "@/constant/bible/en";
import ProjectionControls from "@/components/ProjectionControls";

export default function ChapterPage() {
  const router = useRouter();
  const { book, chapter } = router.query;
  const [viewMode, setViewMode] = useState<'single' | 'multiple'>('single');

  const bookData = bibleBooks.find(b => b.slug === book);
  const chapterNum = parseInt(chapter as string);
  
  // Filter verses for this book and chapter
  const verses = bibleVerses.filter(
    verse => verse.bookName.toLowerCase() === book && verse.chapter === chapterNum
  );


  const SingleCardView = () => (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="space-y-4">
        {verses.map(verse => (
          <div key={verse.verse} id={`verse-${verse.verse}`} className="pb-4 border-b border-rose-100 last:border-b-0">
            <Link href={`/bible/${bookData?.slug}/${chapterNum}/${verse.verse}`} className="text-zinc-600 hover:text-zinc-800 font-medium mr-2" passHref>
              {verse.verse}.
            </Link>
            <span className="text-rose-800">{verse.text}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Scroll to specific verse if hash is present
  useEffect(() => {
    if (router.asPath.includes('#')) {
      const verseId = router.asPath.split('#')[1];
      setTimeout(() => {
        const element = document.getElementById(verseId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          element.classList.add('bg-yellow-100');
          setTimeout(() => element.classList.remove('bg-yellow-100'), 2000);
        }
      }, 100);
    }
  }, [router.asPath]);

  if (!bookData || isNaN(chapterNum)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-800">Chapter not found</h1>
          <button 
            onClick={() => router.push('/bible')}
            className="mt-4 px-4 py-2 bg-zinc-600 text-white rounded-lg"
          >
            Back to Bible
          </button>
        </div>
      </div>
    );
  }


  return (
    <>
      <Head>
        <title>{bookData.name} {chapterNum} | Holy Bible</title>
        <meta name="description" content={`Read ${bookData.name} chapter ${chapterNum} from the Holy Bible`} />
      </Head>
      <BasicLayout
        title={`${bookData.name} ${chapterNum}`}
        description={`Read ${bookData.name} chapter ${chapterNum} from the Holy Bible`}
      >
        <div className="max-w-7xl md:max-w-6xl md:mx-auto mx-auto container">
          <header className="text-center mb-10">
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={() => router.push(`/bible/${bookData.slug}`)}
                className="flex items-center text-zinc-600 hover:text-zinc-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to {bookData.name}
              </button>
              <button 
                onClick={() => router.push('/bible')}
                className="flex items-center text-zinc-600 hover:text-zinc-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Books
              </button>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-2">
              {bookData.name} {chapterNum}
            </h1>
          </header>

          <div className="space-y-6">
            <div className="flex justify-end items-center mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-rose-600">View:</span>
                <button
                  onClick={() => setViewMode('single')}
                  className={`px-3 py-1 rounded ${viewMode === 'single' ? 'bg-zinc-600 text-white' : 'bg-rose-200'}`}
                >
                  Single
                </button>
                <button
                  onClick={() => setViewMode('multiple')}
                  className={`px-3 py-1 rounded ${viewMode === 'multiple' ? 'bg-zinc-600 text-white' : 'bg-rose-200'}`}
                >
                  Multiple
                </button>
              </div>
            </div>

            {viewMode === 'single' ?
              <SingleCardView /> :
              <>
                {verses.map(verse => (
                  <div key={verse.verse} id={`verse-${verse.verse}`}>
                    <VerseCard verse={verse} />
                  </div>
                ))}
              </>
            }

            {verses.length === 0 && (
              <div className="text-center py-10 text-rose-500">
                No verses found for {bookData.name} {chapterNum}
              </div>
            )}
          </div>

          <div className="mt-10 flex justify-between">
            {chapterNum > 1 && (
              <Link href={`/bible/${bookData.slug}/${chapterNum - 1}`} passHref>
                <span className="px-4 py-2 bg-zinc-600 text-white rounded-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Previous Chapter
                </span>
              </Link>
            )}
            {chapterNum < bookData.chapters && (
              <Link href={`/bible/${bookData.slug}/${chapterNum + 1}`} passHref>
                <span className="px-4 py-2 bg-zinc-600 text-white rounded-lg flex items-center ml-auto">
                  Next Chapter
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              </Link>
            )}
          </div>
        </div>
        <ProjectionControls 
          passage={`${bookData.name} ${chapterNum}:${verses.length > 0 ? verses[0].verse : ''}-${verses.length > 0 ? verses[verses.length - 1].verse : ''}`}
          verses={verses}
        />

      </BasicLayout>
    </>
  );
}