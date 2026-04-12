import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PhoneFrame from "./PhoneFrame";

export default function Hero() {
  return (
    <section className="relative pt-40 pb-24 px-6 overflow-hidden bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Coming soon to your city
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-foreground tracking-tight">
            Your neighborhood's best talent, <span className="text-primary">just a tap away.</span>
          </h1>
          
          <p className="text-xl text-foreground/60 max-w-lg leading-relaxed">
            The smarter way to get things done locally. Verified pros, secure payments, and zero hassle.
          </p>
          
          <div className="space-y-4 max-w-md">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-6 py-4 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background text-foreground shadow-sm"
                />
              </div>
              <button className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group active:scale-95 whitespace-nowrap shadow-lg shadow-primary/20">
                Join Waitlist
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="flex items-center gap-3 px-1">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-black bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-foreground/60">
                <span className="text-foreground font-bold">5,000+</span> professionals joined
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-8 pt-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground/60">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Verified Pros</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground/60">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Secure Payments</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative">
            <PhoneFrame>
              {/* App Interface Mockup */}
              <div className="absolute inset-0 bg-white p-4 pt-10 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Location</p>
                    <p className="text-xs font-bold flex items-center gap-1 text-dark">San Francisco, CA</p>
                  </div>
                  <div className="w-8 h-8 bg-gray-100 rounded-full" />
                </div>
                
                <div className="relative">
                  <input disabled placeholder="Search for a gig..." className="w-full bg-gray-50 border-none rounded-xl px-4 py-2 text-xs" />
                </div>
                
                <div className="space-y-3">
                  <p className="text-xs font-bold text-dark">Popular Services</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Plumbing", icon: "🔧", color: "bg-blue-50" },
                      { name: "Cleaning", icon: "🧹", color: "bg-green-50" },
                      { name: "Delivery", icon: "📦", color: "bg-orange-50" },
                      { name: "Gardening", icon: "🌱", color: "bg-emerald-50" }
                    ].map((s) => (
                      <div key={s.name} className={`${s.color} p-3 rounded-2xl flex flex-col items-center gap-2 border border-black/5`}>
                        <span className="text-xl">{s.icon}</span>
                        <span className="text-[10px] font-bold text-dark">{s.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <p className="text-xs font-bold text-dark">Top Workers Near You</p>
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-white border border-gray-100 rounded-xl shadow-sm">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                      <div className="flex-1 space-y-1">
                        <div className="h-2 w-20 bg-gray-200 rounded" />
                        <div className="h-1.5 w-12 bg-gray-100 rounded" />
                      </div>
                      <div className="text-[10px] font-bold text-indigo-600">$25/hr</div>
                    </div>
                  ))}
                </div>
              </div>
            </PhoneFrame>
            
            {/* Soft Shadow Under Phone */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[240px] h-10 bg-black/10 dark:bg-white/5 blur-3xl rounded-[100%]" />
            
            {/* Floating elements */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-20 bg-background p-4 rounded-xl shadow-xl border border-border flex items-center gap-3 z-10"
            >
              <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Job Done</p>
                <p className="text-[10px] text-foreground/60">Payment released</p>
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-8 bottom-20 bg-background p-4 rounded-xl shadow-xl border border-border flex items-center gap-3 z-10"
            >
              <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                $
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">New Request</p>
                <p className="text-[10px] text-foreground/60">Just now</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
