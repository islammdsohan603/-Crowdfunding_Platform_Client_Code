'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

const Banner = () => {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const floatVariant = {
    animate: {
      y: [0, -12, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <section className="bg-[#0B0F19] min-h-screen flex items-center justify-center pt-32 pb-12 font-sans text-slate-100 overflow-hidden relative">
      {/* Background Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* === Left Side: Content === */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="flex flex-col items-start space-y-6"
        >
          <motion.div
            variants={fadeUpVariant}
            className="bg-[#1A2235] text-[#38BDF8] text-sm font-medium py-1.5 px-5 rounded-full border border-[#2E3C56] shadow-[0_0_15px_rgba(56,189,248,0.15)] tracking-wide"
          >
            ✧ New Opportunities Await
          </motion.div>

          <motion.h1
            variants={fadeUpVariant}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white"
          >
            Empower Innovation, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#34D399] to-[#38BDF8]">
              Support Change
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUpVariant}
            className="text-slate-400 text-base md:text-lg max-w-lg leading-relaxed font-light"
          >
            Join an exclusive community of creators and supporters bringing
            visionary projects to life. From clean energy to revolutionary tech,
            your contribution creates lasting momentum.
          </motion.p>

          <motion.div
            variants={fadeUpVariant}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <button className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white font-medium py-3.5 px-7 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:shadow-[0_8px_25px_rgba(37,99,235,0.4)] hover:-translate-y-0.5">
              Explore Campaigns <FaArrowRight className="text-sm ml-1" />
            </button>
            <button className="bg-[#1E293B]/80 hover:bg-[#2D3A4F] text-slate-200 font-medium py-3.5 px-7 rounded-xl border border-slate-700/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5">
              How it works
            </button>
          </motion.div>
        </motion.div>

        {/* === Right Side: Image & Overlays === */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="relative w-full aspect-square md:aspect-[4/3] lg:h-[520px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5"
        >
          <Image
            src="/images.jpg"
            width={1000}
            height={800}
            alt="Solar Energy Campaign"
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent opacity-80"></div>

          <motion.div
            variants={floatVariant}
            animate="animate"
            className="absolute top-6 left-6 bg-[#0B0F19]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.4)] text-slate-200 w-60 md:w-72 transform origin-top-left"
          >
            <div className="text-[11px] font-semibold text-emerald-400 mb-2 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Sustainable Finance
            </div>
            <div className="flex justify-between items-end mt-3">
              <div>
                <div className="text-xl md:text-2xl font-black text-white tracking-tight">
                  1.5{' '}
                  <span className="text-sm font-medium text-slate-400">
                    GWh
                  </span>
                </div>
                <div className="text-xs text-emerald-400 font-medium mt-1">
                  ↗ 14.2% Growth
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                  Pool
                </div>
                <div className="text-sm md:text-base font-bold text-white">
                  $4.75B
                </div>
              </div>
            </div>
          </motion.div>

          <div className="absolute bottom-6 left-6 right-6 bg-[#0B0F19]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#38BDF8] font-bold text-xs md:text-sm tracking-widest uppercase">
                Featured Project
              </span>
              <span className="text-white font-semibold text-xs md:text-sm">
                82% Funded
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '82%' }}
                transition={{ duration: 1.8, delay: 0.8, ease: 'easeOut' }}
                className="bg-gradient-to-r from-[#10B981] to-[#34D399] h-full rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
