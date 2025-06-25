import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skillTiles = [
  {
    category: 'Frontend Development',
    skills: [
      { name: 'React', logo: 'react', desc: 'A JavaScript library for building UIs' },
      { name: 'JavaScript', logo: 'javascript', desc: 'JavaScript at scale' },
      { name: 'Next.js', logo: 'nextjs', desc: 'React framework for server-side rendering' },
      { name: 'Tailwind CSS', logo: 'tailwindcss', desc: 'Utility-first CSS framework' },
    ],
  },
  {
    category: 'Backend Development',
    skills: [
      { name: 'Node.js', logo: 'nodejs', desc: 'JavaScript runtime for server-side' },
      { name: 'Express', logo: 'express', desc: 'Minimalist backend framework' },
      { name: 'Java', logo: 'java', desc: 'General-purpose programming language' },
      { name: 'Python', logo: 'python', desc: 'General-purpose programming language' },
    ],
  },
  {
    category: 'Databases & Others',
    skills: [
      { name: 'MongoDB', logo: 'mongodb', desc: 'NoSQL document database' },
      { name: 'MySQL', logo: 'mysql', desc: 'Popular open-source RDBMS' },
      {
        name: 'AWS',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
        desc: 'Amazon Web Services cloud platform',
        isCustom: true
      },
      {
        name: 'Natural Language Processing',
        logo: 'https://cdn-icons-png.flaticon.com/512/753/753318.png', // or your own image
        desc: 'Working with NLP models and libraries',
        isCustom: true
      },

    ],
  },
  {
    category: 'Data Analysis & Visualization',
    skills: [
      { name: 'Numpy', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/31/NumPy_logo_2020.svg', desc: 'Numerical Pyhton for data analysis', isCustom: true },
      { name: 'Pandas', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Pandas_logo.svg', desc: 'Pandas for Transforming Data', isCustom: true },
      { name: 'Matplotlib', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg', desc: 'Graphical representation of data', isCustom: true },
      { name: 'PowerBI', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg', desc: 'Attractive Dashboards' , isCustom: true},
    ],
  },
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Frontend Development');
  const [hovered, setHovered] = useState<string | null>(null);

  const selectedSkills =
    skillTiles.find((tile) => tile.category === selectedCategory)?.skills || [];

  const getLogoUrl = (logo: string) =>
    `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${logo}/${logo}-original.svg`;

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-black  mb-6">
            Skills & Expertise
          </h2>
          <p className="text-2xl text-gray-500 dark:text-white drop-shadow-[0_0_2px_black] font-semibold max-w-3xl mx-auto">
            Click below to explore my stack. All skills animate into view for a smoother experience.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillTiles.map((section) => (
            <button
              key={section.category}
              onClick={() => setSelectedCategory(section.category)}
              className={`px-4 py-2 rounded-full border transition text-lg font-semibold  ${
                selectedCategory === section.category
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600'
              }`}
            >
              {section.category}
            </button>
          ))}
        </div>

      <AnimatePresence mode="wait">
  <motion.div
    key={selectedCategory}
    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6"
    initial={false}
    animate="visible"
    exit="hidden"
    variants={{
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.07,
          duration: 0.3,
        },
      },
      hidden: {
        opacity: 0,
      },
    }}
  >
    {selectedSkills.map((skill) => (
      <motion.div
        key={skill.name}
        variants={{
          hidden: { opacity: 0, y: 15 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="relative group flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-md transition hover:scale-105"
        onMouseEnter={() => setHovered(skill.name)}
        onMouseLeave={() => setHovered(null)}
      >
        <img
          src={skill.isCustom ? skill.logo : getLogoUrl(skill.logo)}
          alt={skill.name}
          className="w-16 h-16 mb-2 object-contain"
        />
        <p className="text-sm font-medium text-center text-black">
          {skill.name}
        </p>

        {/* Tooltip */}
        <AnimatePresence>
          {hovered === skill.name && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full mb-2 px-3 py-1 text-xs bg-white text-black rounded shadow z-10 text-center whitespace-nowrap"
            >
              {skill.desc}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    ))}
  </motion.div>
</AnimatePresence>
      </div>
    </section>
  );
}

