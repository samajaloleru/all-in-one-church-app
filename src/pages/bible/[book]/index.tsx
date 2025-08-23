import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { BasicLayout } from "@/components/Layout/BasicLayout";
import { bibleBooks } from "@/constant/bible/en";

export default function BookPage() {
  const router = useRouter();
  const { book } = router.query;

  const bookData = bibleBooks.find(b => b.slug === book);

  if (!bookData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-800">Book not found</h1>
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
        <title>{bookData.name} | Holy Bible</title>
        <meta name="description" content={`Read ${bookData.name} from the Holy Bible`} />
      </Head>
      <BasicLayout
        title={bookData.name}
        description={`Read ${bookData.name} from the Holy Bible`}
      >
        <div className="max-w-7xl md:max-w-6xl md:mx-auto mx-auto container">
          <header className="text-center mb-10">
            <button 
              onClick={() => router.push('/bible')}
              className="flex items-center text-zinc-600 hover:text-zinc-800 mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Books
            </button>
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-2">
              {bookData.name}
            </h1>
            <p className="text-rose-600">{bookData.chapters} chapters</p>
          </header>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {Array.from({ length: bookData.chapters }, (_, i) => i + 1).map(chapter => (
              <Link key={chapter} href={`/bible/${bookData.slug}/${chapter}`} className="bg-white rounded-xl shadow-md p-4 text-center cursor-pointer transition-transform hover:scale-105 hover:shadow-lg" passHref>
                <div className="text-sm font-bold text-zinc-800">Chapter {chapter}</div>
              </Link>
            ))}
          </div>
        </div>

      </BasicLayout>
    </>
  );
}