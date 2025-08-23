// import { FaChurch } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-zinc-900 to-zinc-800 text-white py-5 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center shadow-lg sticky top-0 z-40">
      <div className="flex items-center mb-4 md:mb-0">
        {/* <FaChurch className="text-3xl md:text-4xl text-yellow-400 mr-3" /> */}
        <div className="font-playfair">
          <h2 className="text-2xl md:text-3xl font-bold">Grace Community</h2>
          <p className="text-sm md:text-base text-white/80">Church</p>
        </div>
      </div>
      
      <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
        {['Home', 'About', 'Ministries', 'Sermons', 'Events', 'Contact'].map((item) => (
          <a 
            key={item}
            href="#"
            className="text-white/90 hover:text-yellow-400 transition-colors relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all hover:after:w-full"
          >
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;