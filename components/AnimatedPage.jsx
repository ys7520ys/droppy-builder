// components/AnimatedPage.jsx
"use client";

import { motion } from "framer-motion";

export default function AnimatedPage({ children, index }) {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
