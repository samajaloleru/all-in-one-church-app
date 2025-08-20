import  Head from 'next/head';
import { BasicLayout } from '@/components/Layout/BasicLayout';

export default function Bible() {


  return (
    <>
      <Head>
        <title>Bible</title>
        <meta name="description" content="Bible" />
      </Head>
      <BasicLayout
        title="Holy Bible"
        description="Explore the Bible, read scriptures, and deepen your faith."
      >
        <div className="max-w-6xl mx-auto container">
          Bible Lesson
        </div>

      </BasicLayout>
    </>
  );
}