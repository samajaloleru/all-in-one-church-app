import { FaChurch, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Church Info */}
          <div>
            <div className="flex items-center mb-5">
              <FaChurch className="text-2xl text-yellow-400 mr-3" />
              <h3 className="text-xl font-bold">Grace Community Church</h3>
            </div>
            <p className="text-blue-200 mb-6">
              A welcoming community where people encounter God, grow in faith, and serve others with love.
            </p>
            <div className="flex space-x-4">
              {[FaFacebookF, FaInstagram, FaYoutube, FaTwitter].map((Icon, index) => (
                <a 
                  key={index}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center bg-blue-800 rounded-full text-white hover:bg-yellow-500 hover:text-blue-900 transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-5 pb-2 border-b border-blue-700">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-yellow-400 mt-1 mr-3" />
                <span className="text-blue-200">123 Faith Avenue, Hopeville, HV 12345</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-yellow-400 mr-3" />
                <span className="text-blue-200">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-yellow-400 mr-3" />
                <span className="text-blue-200">info@gracecommunity.org</span>
              </li>
            </ul>
          </div>
          
          {/* Service Times */}
          <div>
            <h3 className="text-xl font-bold mb-5 pb-2 border-b border-blue-700">Service Times</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaChurch className="text-yellow-400 mt-1 mr-3" />
                <span className="text-blue-200">Sunday Worship: 9:00 AM & 11:00 AM</span>
              </li>
              <li className="flex items-start">
                <FaChurch className="text-yellow-400 mt-1 mr-3" />
                <span className="text-blue-200">Wednesday Prayer: 7:00 PM</span>
              </li>
              <li className="flex items-start">
                <FaChurch className="text-yellow-400 mt-1 mr-3" />
                <span className="text-blue-200">Bible Study: Thursday 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-blue-800 text-center text-blue-300 text-sm">
          <p>&copy; {new Date().getFullYear()} Grace Community Church. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;