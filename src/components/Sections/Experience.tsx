import { motion } from 'framer-motion';
import { FileBadge } from 'lucide-react';

export default function Experience() {
  const certificateLink = 'https://drive.google.com/file/d/1QL5WMqf8sa7-a9vCFKPffSTsT0bQS9py/view?usp=drive_link'; 
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold  text-white  mb-6">
            Experience
          </h2>
          <p className=" bg-white/10 backdrop-blur-md border border-white/20 px-8 py-6 rounded-xl text-2xl text-gray-500 dark:text-white drop-shadow-[0_0_2px_black] font-semibold max-w-3xl mx-auto">
            A glimpse into my internship experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow max-w-4xl mx-auto"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center">
              <FileBadge size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-black dark:text-white">Full Stack Developer Intern</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">TechnoHacks Solutions · June 2025 – July 2025</p>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6 px-6 text-lg leading-relaxed">
            Built two full stack projects using the MERN stack:
            <br />
            1. Quiz App – Interactive quiz platform with dynamic scoring
            <br />
            2. Finance Tracker – Real-time expense management tool
            <br />
            Gained hands-on experience in REST APIs, UI design, and full stack deployment
            <br />
            Strengthened skills in team collaboration, version control, and agile practices
          </p>

          <button
            onClick={() => window.open(certificateLink, '_blank')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 ml-2 rounded-md text-sm hover:opacity-90 transition"
          >
            View Certificate
          </button>
        </motion.div>
      </div>
    </section>
  );
}

