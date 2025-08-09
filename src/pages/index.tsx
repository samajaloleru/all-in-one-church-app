import Head from 'next/head';
import SplashScreen from '../components/SplashScreen';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Services from '../components/Services';
import Footer from '../components/Footer';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (showSplash) {
      setTimeout(() => setShowSplash(false), 5000);
    }
  }, [showSplash]);

  const skipSplash = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash ? (
        <SplashScreen skipSplash={skipSplash} />
      ) : (
        <div className="min-h-screen flex flex-col">
          <Header />
          <Hero />
          <Features />
          <Services />
          <Footer />
        </div>
      )}
    </>
  );
}