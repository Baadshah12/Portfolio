import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <motion.h3 
              className="text-2xl font-bold mb-4 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              onClick={scrollToTop}
            >
              Abdul Muyeez
            </motion.h3>
            <p className="text-gray-300 mb-4">
              Full Stack Developer passionate about creating beautiful and functional web experiences.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://www.linkedin.com/in/abdul-muyeez-104728295"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/_abdul_muyeez_?igsh=MWV3ZTFjeWpseXgxeA=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="https://github.com/Baadshah12"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="abdulmuyeezbaig@gmail.com"
                className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['Home', 'About', 'Projects', 'Skills', 'Resume', 'Contact'].map((link) => (
                <motion.button
                  key={link}
                  onClick={() => {
                    const element = document.getElementById(link.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block text-gray-300 hover:text-purple-400 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  {link}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <div className="space-y-2 text-gray-300">
              <p>Full Stack Web Development</p>
              <p>Ai Integration</p>
              <p>Data Science</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <motion.p 
            className="text-gray-300 text-sm flex items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            © {currentYear} Abdul Muyeez. Made with lot of <Heart size={16} className="mx-1 text-red-500" /> and lots of coffee.
          </motion.p>
          <motion.p 
            className="text-gray-300 text-sm mt-2 md:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Built with React & Tailwind CSS
          </motion.p>
        </div>
      </div>
    </footer>
  );
}