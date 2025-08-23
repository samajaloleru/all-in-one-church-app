import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { BasicLayout } from "@/components/Layout/BasicLayout";
import { bibleBooks, bibleVerses } from "@/constant/bible/en";
import VerseCard from "@/components/Bible/VerseCard";
import { useEffect } from "react";

export default function VersePage() {
  const router = useRouter();
  const { book, chapter, verse } = router.query;

  const bookData = bibleBooks.find(b => b.slug === book);
  const chapterNum = parseInt(chapter as string);
  const verseNum = parseInt(verse as string);
  
  // Find the specific verse
  const verseData = bibleVerses.find(
    v => v.bookName.toLowerCase() === book && 
         v.chapter === chapterNum && 
         v.verse === verseNum
  );

  if (!bookData || isNaN(chapterNum) || isNaN(verseNum) || !verseData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-800">Verse not found</h1>
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

  // Find adjacent verses for navigation
  const allVerses = bibleVerses.filter(
    v => v.bookName.toLowerCase() === book && v.chapter === chapterNum
  );
  const currentIndex = allVerses.findIndex(v => v.verse === verseNum);
  const prevVerse = currentIndex > 0 ? allVerses[currentIndex - 1] : null;
  const nextVerse = currentIndex < allVerses.length - 1 ? allVerses[currentIndex + 1] : null;


  return (
    <>
      <Head>
        <title>{bookData.name} {chapterNum}:{verseNum} | Holy Bible</title>
        <meta name="description" content={`Read ${bookData.name} ${chapterNum}:${verseNum} from the Holy Bible`} />
      </Head>
      <BasicLayout
        title={`${bookData.name} ${chapterNum}`}
        description={`Read ${bookData.name} ${chapterNum}:${verseNum} from the Holy Bible`}
      >
        <div className="max-w-7xl md:max-w-6xl md:mx-auto mx-auto container">
          <header className="text-center mb-10">
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={() => router.push(`/bible/${bookData.slug}/${chapterNum}`)}
                className="flex items-center text-zinc-600 hover:text-zinc-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Chapter {chapterNum}
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
              {bookData.name} {chapterNum}:{verseNum}
            </h1>
          </header>

          <div className="bg-white rounded-xl shadow-md p-8 text-center mb-10">
            <p className="text-2xl text-rose-800 leading-relaxed mb-6">{verseData.text}</p>
            <p className="text-lg text-zinc-600">— {bookData.name} {chapterNum}:{verseNum}</p>
          </div>

          <div className="flex justify-between">
            {prevVerse && (
              <Link href={`/bible/${bookData.slug}/${chapterNum}/${prevVerse.verse}`} passHref>
                <span className="px-4 py-2 bg-zinc-600 text-white rounded-lg flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Verse {prevVerse.verse}
                </span>
              </Link>
            )}
            {nextVerse && (
              <Link href={`/bible/${bookData.slug}/${chapterNum}/${nextVerse.verse}`} passHref>
                <span className="px-4 py-2 bg-zinc-600 text-white rounded-lg flex items-center ml-auto">
                  Verse {nextVerse.verse}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              </Link>
            )}
          </div>

          <div className="mt-8 text-center">
            <Link href={`/bible/${bookData.slug}/${chapterNum}`} passHref>
              <span className="text-zinc-600 hover:text-zinc-800">
                View all verses in {bookData.name} {chapterNum}
              </span>
            </Link>
          </div>
        </div>

      </BasicLayout>
    </>
  );
}