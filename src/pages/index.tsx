import SplashScreen from '../components/SplashScreen';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import MagicBento from '@/components/MagicBento';

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
    <>``
      {showSplash ? (
        <SplashScreen skipSplash={skipSplash} />
      ) : (
        <div className="h-screen flex flex-col">
          <MagicBento 
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />
          <Footer />
        </div>
      )}
    </>
  );
}