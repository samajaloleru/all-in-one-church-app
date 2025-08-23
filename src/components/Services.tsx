const Services = () => {
  const services = [
    {
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
      title: "Sunday Morning Worship",
      time: "9:00 AM - 10:30 AM",
      description: "Join us for our main worship service with inspiring music, prayer, and biblical teaching."
    },
    {
      image: "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80",
      title: "Midweek Fellowship",
      time: "Wednesday, 7:00 PM",
      description: "A time of prayer, Bible study, and fellowship for all ages in smaller group settings."
    },
    {
      image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&auto=format&fit=crop&w=1032&q=80",
      title: "Youth Night",
      time: "Friday, 6:30 PM",
      description: "An exciting evening for youth with games, worship, and relevant biblical teaching."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-zinc-50 to-rose-100">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-3xl md:text-4xl text-center text-zinc-900 mb-16">
          Worship Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl md:max-w-6xl md:mx-auto mx-auto">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div 
                className="h-56 bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
              ></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-zinc-900 mb-2">{service.title}</h3>
                <span className="inline-block bg-yellow-400 text-zinc-900 font-bold px-3 py-1 rounded-full text-sm mb-3">
                  {service.time}
                </span>
                <p className="text-rose-700">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;