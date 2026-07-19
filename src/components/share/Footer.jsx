'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LogoLinkedin, LogoFacebook, LogoGithub } from '@gravity-ui/icons';

export default function Footer() {
  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // একে একে এলিমেন্টগুলো আসবে
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <footer className="bg-[#0b0f1a] py-12 px-6 md:px-12 text-white font-sans">
      <motion.div
        className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left Section - Brand & Copyright */}
        <motion.div
          variants={itemVariants}
          className="lg:w-5/12 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Momentum</h2>
            <p className="text-white leading-relaxed max-w-sm mb-8 lg:mb-0">
              Empowering the next generation of creators with secure,
              transparent, and catalytic crowdfunding.
            </p>
          </div>
          <p className="text-sm text-slate-200 mt-auto">
            © 2024 Momentum Crowdfunding. All rights reserved.
          </p>
        </motion.div>

        {/* Right Section - Links & Socials */}
        <div className="lg:w-7/12 flex flex-wrap md:flex-nowrap gap-10 md:gap-16 justify-between">
          {/* Platform Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <h3 className="font-semibold text-slate-200 mb-2">Platform</h3>
            <Link
              href="#"
              className="text-slate-200 hover:text-slate-300 transition-colors"
            >
              Explore
            </Link>
            <Link
              href="#"
              className="text-slate-200 hover:text-slate-300 transition-colors"
            >
              How it Works
            </Link>
            <Link
              href="#"
              className="text-slate-200 hover:text-slate-300 transition-colors"
            >
              Impact Stats
            </Link>
          </motion.div>

          {/* Support Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <h3 className="font-semibold text-slate-900 mb-2">Support</h3>
            <Link
              href="#"
              className="text-slate-200 hover:text-slate-300 transition-colors"
            >
              Help Center
            </Link>
            <Link
              href="#"
              className="text-slate-200 hover:text-slate-300 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-slate-200 hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <h3 className="font-semibold text-slate-200 mb-2">Social</h3>
            {/* Horizontal Layout for Socials like the image */}
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="flex items-center gap-2 text-slate-200 hover:text-blue-600 transition-colors"
              >
                <LogoLinkedin size={18} />
                <span>LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-slate-200 hover:text-blue-600 transition-colors"
              >
                <LogoFacebook size={18} />
                <span>Facebook</span>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-slate-200 hover:text-gray-200 transition-colors"
              >
                <LogoGithub size={18} />
                <span>GitHub</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
