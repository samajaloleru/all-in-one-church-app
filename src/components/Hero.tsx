const Hero = () => {
  return (
    <section className="relative h-[85vh] flex items-center justify-center bg-gradient-to-b from-zinc-900/40 to-zinc-900/90">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80')" }}
      ></div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Welcome to Grace Community
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-10">
          A place of worship, fellowship, and spiritual growth for all generations
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-zinc-900 font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
          Join Us This Sunday
        </button>
      </div>
    </section>
  );
};

export default Hero;