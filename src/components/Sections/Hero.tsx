import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Download, Mail } from 'lucide-react';
import { ReactTyped } from 'react-typed';

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-4xl sm:text-6xl block bg-gradient-to-r from-purple-400 to-pink-300 drop-shadow-[0_0_2px_black] bg-clip-text text-transparent lg:text-7xl font-bold mb-6">
          <ReactTyped
          strings={[
            "HEYY...",
            "I AM ABDUL MUYEEZ",
            "FEEL FREE TO EXPLORE"
          ]}
          typeSpeed={150}
          backSpeed={100}
          loop
        />
        </div>

        <div className='text-2xl sm:text-2xl text-gray-900 dark:text-white font-bold  mb-8 max-w-2xl mx-auto'>
          <ReactTyped
          strings={[
            "I am a Full Stack Developer",
            "I am an AI Enthusiast",
            "I am a Software Engineer"
          ]}
          typeSpeed={150}
          backSpeed={100}
          loop
        />
        </div>
       

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl text-gray-600 dark:text-white mb-12 drop-shadow-[0_0_2px_black] max-w-3xl font-semibold mx-auto"
        >
          Passionate about creating beautiful, functional, and intelligent digital experiences. 
          I bring ideas to life through code, design, and artificial intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.button
            onClick={scrollToContact}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
            whileHover={{ scale: 1.10 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={20} />
            Get In Touch
          </motion.button>
          <motion.a
            href="https://drive.google.com/file/d/1z9eg5WiiA9neHkX7Ei7SLj3ATwoD3J8b/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 border-2 border-purple-500 text-purple-500 rounded-full font-medium bg-purple-500 text-white transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.10 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={20} />
            Download CV
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex justify-center space-x-6"
        >
          <motion.a
            href="https://www.linkedin.com/in/abdul-muyeez-104728295"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-purple-500 hover:text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin size={24} />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/_abdul_muyeez_?igsh=MWV3ZTFjeWpseXgxeA=="
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-purple-500 hover:text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            <Instagram size={24} />
          </motion.a>
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-purple-500 hover:text-white transition-colors"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github size={24} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}