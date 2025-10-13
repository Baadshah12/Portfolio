import { motion } from 'framer-motion';
import { Code, Brain, Zap, Users } from 'lucide-react';
import MoonScene from '../3D/MoonScene';

const features = [
  {
    icon: Code,
    title: 'Full Stack Development',
    description: 'Proficient in both frontend and backend technologies, creating complete web applications.'
  },
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    description: 'Exploring artificial intelligence and machine learning to create intelligent solutions.'
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Building fast, responsive applications optimized for modern web standards.'
  },
  {
    icon: Users,
    title: 'Collaborative Approach',
    description: 'Working effectively in team environments and communicating technical concepts clearly.'
  }
];

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            About Me
          </h2>
          <p className="text-xl bg-white/10 backdrop-blur-md border border-white/20 px-8 py-6 rounded-xl font-semibold text-white max-w-3xl mx-auto">
            I'm a passionate developer who loves creating innovative solutions and exploring the frontiers of artificial intelligence.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <MoonScene className="w-80 h-80 mx-auto" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-white bg-white/10 backdrop-blur-md border border-white/20 px-8 py-6 rounded-xl font-medium text-xl leading-relaxed">
              With a strong foundation in both development and artificial intelligence, I create digital experiences 
              that are not only visually appealing but also highly functional and intelligent. 
              My journey in tech has been driven by curiosity and a constant desire to learn and improve.
            </p>
            <p className="text-white font-medium text-xl leading-relaxed bg-white/10 backdrop-blur-md border border-white/20 px-8 py-6 rounded-xl">
              I specialize in modern web technologies including React, Node.js, and cloud platforms, while also 
              exploring the exciting world of AI and machine learning. When I'm not coding, you can find me 
              experimenting with new AI models, contributing to open-source projects, or sharing knowledge with the developer community.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <feature.icon size={32} className="text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}