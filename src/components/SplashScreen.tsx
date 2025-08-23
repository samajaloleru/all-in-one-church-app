// import { FaChurch } from 'react-icons/fa';
import Image from 'next/image';
import { Logo } from "@/constant/image";
import SplitText from "./SplitText";

interface SplashScreenProps {
  skipSplash: () => void;
}



const SplashScreen = ({ skipSplash }:SplashScreenProps) => {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };


  return (
    <div className="fixed inset-0 bg-gradient-to-br from-zinc-900 to-rose-800 flex flex-col items-center justify-center z-50 transition-opacity duration-1000">
      <div className="w-32 h-32 p-2 bg-white/10 rounded-full flex items-center justify-center border-4 border-white/30 animate-pulse mb-8">
        <Image 
          src={Logo} 
          alt="Splash Image" 
          width={100} 
          height={100} 
          priority 
        />
      </div>

      <SplitText
        text="Celestial Church of Christ"
        className="text-4xl md:text-6xl font-playfair font-bold text-white text-center mb-5"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
        onLetterAnimationComplete={handleAnimationComplete}
      />
      
      <p className="text-xl md:text-2xl text-white/90 text-center max-w-2xl px-4 mb-10">
        Welcome to our spiritual home where faith, hope, and love come together
      </p>
      
      
      <button 
        onClick={skipSplash}
        className="absolute bottom-10 border border-white/50 text-white px-6 py-2 rounded-full hover:bg-white/10 transition-all"
      >
        Skip
      </button>
    </div>
  );
};

export default SplashScreen;