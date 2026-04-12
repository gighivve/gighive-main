import React from 'react';
import { motion } from 'motion/react';

export default function SplashScreen() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] splash-gradient flex flex-col items-center justify-center text-white"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.5, 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
        className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl mb-8"
      >
        <span className="text-5xl font-black text-brand-600 tracking-tighter">G</span>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">GigHive</h1>
        <div className="flex items-center gap-2 justify-center">
          <div className="w-1.5 h-1.5 bg-brand-300 rounded-full animate-pulse"></div>
          <p className="text-brand-200 text-sm font-medium uppercase tracking-widest">Initializing Core Systems</p>
        </div>
      </motion.div>

      <div className="absolute bottom-12 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-full bg-white"
        />
      </div>
    </motion.div>
  );
}
