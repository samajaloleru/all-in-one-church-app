const Features = () => {
  const features = [
    {
      icon: '📖',
      title: 'Bible Study',
      description: 'Join our weekly Bible study groups to deepen your understanding of Scripture and grow in your faith journey.'
    },
    {
      icon: '🎵',
      title: 'Worship & Music',
      description: 'Experience the joy of worship through our choir, band, and special music ministries for all ages.'
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Children & Youth',
      description: 'Engaging programs designed to help children and youth grow in faith and build meaningful relationships.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-playfair text-3xl md:text-4xl text-center text-blue-900 mb-16">
          Our Ministries
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-blue-50 rounded-xl p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="text-5xl mb-5">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-blue-900 mb-3">{feature.title}</h3>
              <p className="text-gray-700 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;