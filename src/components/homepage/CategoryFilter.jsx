"use client";

import React from "react";
// Gravity UI Icons এবং React Icons ইমপোর্ট করা
import { Cpu, Palette, Person, Heart } from "@gravity-ui/icons";
import { motion } from "framer-motion";

const categories = [
  { name: "Tech", icon: <Cpu /> },
  { name: "Art", icon: <Palette /> },
  { name: "Community", icon: <Person /> },
  { name: "Health", icon: <Heart /> },
];

const CategoryFilter = () => {
  return (
    <section className="py-8 bg-[#0B0F19] border-b border-white/5">
      <div className="w-11/12 max-w-7xl mx-auto px-6">
        <motion.div
          className="flex items-center justify-center gap-4  "
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.name}
              whileHover={{ scale: 1.05, backgroundColor: "#1F2937" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#111827] border border-white/10 text-gray-300 transition-colors duration-200 whitespace-nowrap font-medium hover:text-white"
            >
              {/* Gravity UI icons ব্যবহার করার সময় size কন্ট্রোল করা */}
              <span className="flex items-center text-lg">
                {React.cloneElement(category.icon, { size: 20 })}
              </span>
              {category.name}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryFilter;
