import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, GraduationCap } from 'lucide-react';

const experiences = [
  {
    title: 'Bachelor of Technology in Information Science Engineering',
    company: 'Reva University',
    location: 'Bengaluru,Karnataka',
    period: '2021 - 2025',
    description: 'During the course, I studied core engineering subjects and gained hands-on experience through labs and mini-projects. I also completed key academic projects that enhanced my practical and problem-solving skills. Graduated with a CGPA of 8.28/10.',
    type: 'education'
  },
  {
    title: 'Higher Secondary',
    company: 'Sri Chaitanya PU College',
    location: 'Bengaluru,Karnataka',
    period: '2020 - 2021',
    description: 'I completed my 12th grade in the PCMB stream, affiliated with CBSE.I secured 87% in the final board examinations. This stage laid a strong academic foundation and helped me develop analytical and reasoning skills.',
    type: 'education'
  },
  {
    title: 'Secondary',
    company: 'Sri Chaitanya Techno School',
    location: 'Bengaluru,Karnataka',
    period: '2018 - 2019',
    description: 'I completed my 10th grade under the CBSE board, with a score of 94%. This stage helped me build a strong foundation in core subjects like Mathematics, Science, and English, while also participating in various school-level academic and extracurricular activities.',
    type: 'education'
  }
];

export default function Resume() {
  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 "
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white  mb-6">
            Education
          </h2>
          
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white"></div>
          
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative mb-12 ml-16"
            >
              {/* Timeline Node */}
              <div className="absolute -left-20 top-6 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                {experience.type === 'work' ? (
                  <Briefcase size={16} className="text-white" />
                ) : (
                  <GraduationCap size={16} className="text-white" />
                )}
              </div>
              
              {/* Content Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                      {experience.title}
                    </h3>
                    <p className="text-purple-600 dark:text-purple-400 font-medium">
                      {experience.company}
                    </p>
                  </div>
                  <div className="flex flex-col sm:text-right mt-2 sm:mt-0">
                    <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-1">
                      <Calendar size={14} className="mr-1" />
                      {experience.period}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                      <MapPin size={14} className="mr-1" />
                      {experience.location}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {experience.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}