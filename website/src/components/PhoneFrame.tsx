import React from "react";
import { motion } from "motion/react";

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
}

export default function PhoneFrame({ children, className = "" }: PhoneFrameProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.4 } }}
      className={`relative w-[280px] h-[580px] bg-black rounded-[3.5rem] p-[8px] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25),0_18px_36px_-18px_rgba(0,0,0,0.3)] dark:shadow-[0_30px_60px_-12px_rgba(255,255,255,0.05)] overflow-hidden ${className}`}
    >
      {/* Outer Border/Frame */}
      <div className="absolute inset-0 rounded-[3.5rem] border-[1px] border-white/10 pointer-events-none z-50" />
      
      {/* Dynamic Island */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-40 flex items-center justify-between px-4">
        <div className="w-1.5 h-1.5 bg-[#1a1a1a] rounded-full" />
        <div className="w-3 h-3 bg-[#1a1a1a] rounded-full" />
      </div>
      
      {/* Screen Content */}
      <div className="relative w-full h-full bg-white dark:bg-black rounded-[2.8rem] overflow-hidden z-10">
        {children}
      </div>
      
      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1.5 bg-content/20 rounded-full z-40" />
      
      {/* Side Buttons (Subtle) */}
      <div className="absolute left-[-2px] top-24 w-[4px] h-12 bg-[#1a1a1a] rounded-r-lg z-0" />
      <div className="absolute left-[-2px] top-40 w-[4px] h-16 bg-[#1a1a1a] rounded-r-lg z-0" />
      <div className="absolute left-[-2px] top-60 w-[4px] h-16 bg-[#1a1a1a] rounded-r-lg z-0" />
      <div className="absolute right-[-2px] top-32 w-[4px] h-20 bg-[#1a1a1a] rounded-l-lg z-0" />
    </motion.div>
  );
}
