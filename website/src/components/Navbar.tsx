import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border px-6 py-4 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <span className="text-white font-bold text-xl">G</span>
          </div>
          <span className="text-xl font-bold font-display tracking-tight text-foreground">Gighive</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-foreground/60">
          <a href="#how-it-works" className="hover:text-primary transition-colors">How it works</a>
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#preview" className="hover:text-primary transition-colors">App Preview</a>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-muted transition-colors text-foreground/60"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all active:scale-95 whitespace-nowrap shadow-md shadow-primary/10">
            Join Waitlist
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
