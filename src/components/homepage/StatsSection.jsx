"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
const Counter = ({ from, to, label }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, { duration: 2 });
    return () => controls.stop();
  }, [count, to]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl font-bold text-white">
        <motion.span>{rounded}</motion.span>+
      </h2>
      <p className="text-blue-200 text-sm mt-2">{label}</p>
    </div>
  );
};
const StatsSection = () => {
  return (
    <section className="py-16 bg-[#0f162e]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <Counter from={0} to={2} label="TOTAL FUNDS RAISED ($M)" />
        <Counter from={0} to={500} label="SUCCESSFUL PROJECTS" />
        <Counter from={0} to={10} label="GLOBAL SUPPORTERS (k+)" />
      </div>
    </section>
  );
};

export default StatsSection;
