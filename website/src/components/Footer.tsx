import { motion } from "motion/react";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-32 px-6 bg-background border-t border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-16">
        <div className="space-y-8">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">G</span>
            </div>
            <span className="text-xl font-bold font-display tracking-tight text-foreground">Gighive</span>
          </div>
          <p className="text-sm text-foreground/60 leading-relaxed font-medium">
            Connecting you with trusted local service providers for everything from quick fixes to long-term projects.
          </p>
          <div className="flex items-center gap-6 text-foreground/40">
            <Twitter className="w-5 h-5 hover:text-primary transition-colors cursor-pointer" />
            <Instagram className="w-5 h-5 hover:text-primary transition-colors cursor-pointer" />
            <Linkedin className="w-5 h-5 hover:text-primary transition-colors cursor-pointer" />
            <Github className="w-5 h-5 hover:text-primary transition-colors cursor-pointer" />
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">Platform</h3>
          <ul className="space-y-3 text-sm text-foreground/60 font-medium">
            <li className="hover:text-primary transition-colors cursor-pointer">How it works</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Features</li>
            <li className="hover:text-primary transition-colors cursor-pointer">App Preview</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Security</li>
          </ul>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">Company</h3>
          <ul className="space-y-3 text-sm text-foreground/60 font-medium">
            <li className="hover:text-primary transition-colors cursor-pointer">About Us</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Careers</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Terms of Service</li>
          </ul>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">Contact</h3>
          <ul className="space-y-3 text-sm text-foreground/60 font-medium">
            <li className="hover:text-primary transition-colors cursor-pointer">Support</li>
            <li className="hover:text-primary transition-colors cursor-pointer">Contact Us</li>
            <li className="hover:text-primary transition-colors cursor-pointer">FAQ</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-24 text-center text-xs font-bold uppercase tracking-widest text-foreground/40">
        <p>© 2026 Gighive. All rights reserved.</p>
      </div>
    </footer>
  );
}
