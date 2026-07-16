"use client"; // Next.js App Router এ অ্যানিমেশন কাজ করানোর জন্য

import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

const Banner = () => {
  // Framer Motion এর জন্য অ্যানিমেশন ভ্যারিয়েন্ট
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatVariant = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <section className="bg-[#1b2431] min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-20 font-sans text-white">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* === Left Side: Content === */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="flex flex-col items-start space-y-6"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUpVariant}
            className="bg-[#1e3a5f] text-blue-200 text-sm font-medium py-1.5 px-4 rounded-full border border-blue-900/50 shadow-sm"
          >
            New Opportunities Await
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUpVariant}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            Empower Innovation, <br />
            <span className="text-[#3ee29b]">Support Change</span>
          </motion.h1>

          {/* Subtitle / Paragraph */}
          <motion.p
            variants={fadeUpVariant}
            className="text-gray-400 text-base md:text-lg max-w-lg leading-relaxed"
          >
            Join a community of creators and supporters bringing visionary
            projects to life. From clean energy to revolutionary tech, your
            contribution creates momentum.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUpVariant}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <button className="bg-[#0052cc] hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-blue-500/30">
              Explore Campaigns <FaArrowRight className="text-sm" />
            </button>
            <button className="bg-[#334155]/60 hover:bg-[#334155] text-white font-medium py-3 px-6 rounded-lg border border-gray-600 transition-all">
              How it works
            </button>
          </motion.div>
        </motion.div>

        {/* === Right Side: Image & Overlays === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full aspect-square md:aspect-[4/3] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Main Background Image */}
          <Image
            src="/images.jpg"
            width={400}
            height={400}
            alt="Solar Energy Campaign"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Top Dashboard Overlay Card (Floating Animation) */}
          <motion.div
            variants={floatVariant}
            animate="animate"
            className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg text-gray-800 w-56 md:w-64 transform origin-top-left"
          >
            <div className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wider">
              Sustainable Finance
            </div>
            <div className="flex justify-between items-end mb-2">
              <div>
                <div className="text-sm md:text-lg font-extrabold text-gray-800">
                  1.5 GWh
                </div>
                <div className="text-[10px] text-green-500 font-semibold">
                  ↗ 14.2%
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-gray-400">Investment Pool</div>
                <div className="text-xs md:text-sm font-bold text-gray-800">
                  $4.75B
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Progress Overlay Card */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/20 backdrop-blur-md border border-white/40 rounded-2xl p-4 shadow-xl">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[#0052cc] font-bold text-xs md:text-sm tracking-wider">
                FEATURED PROJECT
              </span>
              <span className="text-gray-800 font-semibold text-xs md:text-sm">
                82% Funded
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-300/60 rounded-full h-2.5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "82%" }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                className="bg-[#00875a] h-full rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
