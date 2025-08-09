import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import { getRouteMetadata } from '../lib/routeMetadata';

// ✅ Fonts
import { Lexend, Plus_Jakarta_Sans, Space_Mono } from 'next/font/google';

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

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'], // Specify the weights you want
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

      <div
        className={`${lexend.variable} ${jakarta.variable} ${spaceMono.variable} antialiased`}
      >
        <Component {...pageProps} />
      </div>
    </>
  );
}
