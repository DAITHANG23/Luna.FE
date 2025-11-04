import React from "react";
import { motion } from "framer-motion";
interface LayoutMotionProps {
  children: React.ReactNode;
  className?: string;
}

export const LayoutMotion = ({ children, className }: LayoutMotionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
