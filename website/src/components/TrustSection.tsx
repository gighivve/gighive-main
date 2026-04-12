import { motion } from "motion/react";
import { ShieldCheck, UserCheck, Lock } from "lucide-react";

export default function TrustSection() {
  return (
    <section className="py-32 px-6 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-12 md:p-24 text-center text-white shadow-xl">
          <div className="relative z-10 space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                Ready to join the community?
              </h2>
              <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto leading-relaxed font-medium">
                Be among the first to experience a safer, faster, and more rewarding local gig economy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-8"
            >
              <div className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-6 py-4 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-medium"
                />
                <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-all active:scale-95 shadow-lg whitespace-nowrap">
                  Join Waitlist
                </button>
              </div>
              
              <div className="flex flex-col items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-white/20 flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <p className="text-xs font-bold tracking-widest uppercase text-white/80">
                  <span className="text-white">5,000+</span> professionals joined the waitlist
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
