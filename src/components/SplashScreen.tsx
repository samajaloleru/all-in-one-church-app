// import { FaChurch } from 'react-icons/fa';
import { Logo } from "@/constant/image";
import SplitText from "./SplitText";


const SplashScreen = ({ skipSplash } : {skipSplash: any}) => {
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };


  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 to-red-800 flex flex-col items-center justify-center z-50 transition-opacity duration-1000">
      <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center border-4 border-white/30 animate-pulse mb-8">
        <img src={Logo.src} alt='logo' className='lg:h-14 h-10'/>
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