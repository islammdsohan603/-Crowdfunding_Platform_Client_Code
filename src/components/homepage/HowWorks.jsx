"use client";

import React from "react";
import { motion } from "framer-motion";

import Cpu from "@gravity-ui/icons/Cpu";
import Palette from "@gravity-ui/icons/Palette";
import Person from "@gravity-ui/icons/Person";
import Heart from "@gravity-ui/icons/Heart";

const steps = [
  {
    icon: <Cpu />,
    title: "1. Launch Campaign",
    description:
      "Tell your story, set your funding goals, and define unique rewards for your future supporters.",
  },
  {
    icon: <Heart />,
    title: "2. Gather Support",
    description:
      "Share your vision with our global community. Watch as supporters back your project with credits.",
  },
  {
    icon: <Palette />,
    title: "3. Make Impact",
    description:
      "Receive funds, execute your project, and update your backers on the change you are creating together.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const HowItWorks = () => {
  return (
    <section className="py-20 bg-[#0B0F19] text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-gray-400 mb-16">
          The path from an idea to a global movement is simple with Momentum.
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-[#111827] p-8 rounded-3xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-[#1F2937] rounded-2xl flex items-center justify-center text-blue-500 text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
