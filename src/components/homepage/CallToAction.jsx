'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Rocket, HeartHandshake } from 'lucide-react';

const CallToAction = () => {
  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-[#050508] py-24 px-4 md:px-8 flex justify-center items-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-5xl w-full relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-[#12141d]/90 to-[#0a0a0f] border border-gray-800 shadow-2xl p-10 md:p-20 text-center backdrop-blur-md"
      >
        {/* Premium Subtle Glow Background Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-b from-white to-gray-300 mb-6 tracking-tight relative z-10"
        >
          Ready to start your journey?
        </motion.h2>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed font-light relative z-10"
        >
          Whether you're looking to fund your next big idea or support the
          innovations of tomorrow, there's a place for you here.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-5 md:gap-6 relative z-10"
        >
          {/* Primary Button */}
          <Link href="/add-campaign" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:shadow-[0_0_35px_rgba(37,99,235,0.45)] flex items-center justify-center gap-3">
              <Rocket size={20} />
              Start a Project
            </button>
          </Link>

          {/* Secondary Button */}
          <Link href="/explore" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-transparent border border-gray-700 text-gray-300 hover:text-white hover:border-gray-400 hover:bg-gray-800/50 font-semibold transition-all duration-300 flex items-center justify-center gap-3">
              <HeartHandshake size={20} />
              Become a Backer
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
