import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from './components/Background/ParticleBackground';
import Navbar from './components/Navigation/Navbar';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Resume from './components/Sections/Resume';
import Projects from './components/Sections/Projects';
import Skills from './components/Sections/Skills';
import Certifications from './components/Sections/Certifications';
import Contact from './components/Sections/Contact';
import Footer from './components/Sections/Footer';
import Experience from './components/Sections/Experience';

function App() {
  useEffect(() => {
    // Initialize EmailJS
    import('@emailjs/browser').then((emailjs) => {
      emailjs.init('Al96hyWKyYtCBvJ2F');
    });
  }, []);

  return (
    <AnimatePresence>
      <div className="min-h-screen bg-transparent transition-colors duration-300">
        <ParticleBackground />
        <Navbar />
        
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Hero />
          <About />
          <Resume />
          <Projects />
          <Experience />
          <Skills />
          <Certifications />
          <Contact />
        </motion.main>
        
        <Footer />
      </div>
    </AnimatePresence>
  );
}

export default App;