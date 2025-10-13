import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Uber Functional Clone',
    description: 'A full-stack Uber clone with ReactJS frontend and Node.js/Express backend, featuring real-time ride booking, Google Maps integration, user authentication, and MongoDB for data storage. Includes Socket.IO for live ride updates and driver-passenger matching.',
    image: 'https://dianapps.com/blog/wp-content/uploads/2022/12/1080600.png',
    technologies: ['React', 'Node.js', 'MongoDB','Express.js','GSAP','API'],
    github: 'https://github.com/Baadshah12/UBER',
    featured: false
  },
  {
    id: 2,
    title: 'AI JArvis Integrated with Game',
    description: 'Jarvis is an AI-powered virtual assistant built using a supervised learning model. It understands and responds to user commands, performs tasks like opening apps, answering queries, and controlling smart functions. Integrated with voice recognition, Python, and custom logic, Jarvis delivers intelligent, context-aware assistance in real time.',
    image: 'data:image/jpeg;base64,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',
    technologies: ['Python',"API's",'React','Speech Recognition'],
    github: 'https://github.com/Baadshah12/Jarvis-Ai-with-Game',
    featured: false
  },
  {
    id: 3,
    title: 'Developer Portfolio',
    description: 'A dynamic and responsive portfolio built with React, styled using Tailwind CSS, animated with Framer Motion, and enhanced with Three.js for interactive 3D elements. Showcases projects, skills, and contact features with smooth transitions and modern design.',
    image: 'https://i.pinimg.com/736x/b0/62/14/b06214ac5ba0cec61acfd74eb0d345df.jpg',
    technologies: ['React', 'Tailwind CSS','Framer Motion','Three.js'],
    github: 'https://github.com/Baadshah12/portfolio',
    featured: false
  },
  {
    id: 4,
    title: 'Myntra Functional Clone With ChatBot Service',
    description: 'A functional clone of the Myntra website with integrated ChatBot service for enhanced user interaction and support.',
    image: 'https://www.searchenginejournal.com/wp-content/uploads/2020/03/20-free-things-you-need-to-do-after-launching-your-ecommerce-website-5e664bcb60da5-1280x720.png',
    technologies: ['React', 'Tailwind CSS', 'ChatBot'],
    github: 'https://github.com/Baadshah12/Myntra-With-Chatbot',
    featured: false
  },
  {
    id: 5,
    title: 'Finance Tracker',
    description: 'A web application for tracking personal finances. Full stack application built with React, Node.js. It allows users to manage their expenses, income, and budgets effectively.',
    image: 'https://meta-q.cdn.bubble.io/f1713868043510x550443877844090750/image%20%2840%29.png',
    technologies: ['React', 'Tailwind CSS', 'Node.js'],
    github: 'https://github.com/Baadshah12/Finance-Tracker-',
    featured: false
  }

];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-2xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-semibold max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 px-8 py-6 rounded-xl">
            Here are some of my recent projects that showcase my skills and passion for development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex space-x-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={18} className="mr-2" />
                    Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-8">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <motion.a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Github size={20} className="mr-2" />
                    View Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}