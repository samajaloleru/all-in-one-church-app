import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import { getRouteMetadata } from '../lib/routeMetadata';
import { LanguageProvider } from '@/context/LanguageContext';

// ✅ Fonts
import { Lexend, Plus_Jakarta_Sans, Space_Mono } from 'next/font/google';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { title, description } = getRouteMetadata(router.pathname);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <LanguageProvider>
        <div
          className={`${lexend.variable} ${jakarta.variable} antialiased select-none relative`}
        >
          <Component {...pageProps} />
          <div className="fixed top-10 md:top-auto md:bottom-10 right-5 md:right-10 z-30">
            <LanguageSwitcher />
          </div>
        </div>
      </LanguageProvider>
    </>
  );
}
