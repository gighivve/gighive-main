import { motion } from "motion/react";
import { Search, Users, ShieldCheck, CheckCircle } from "lucide-react";

const steps = [
  {
    title: "Find a Service",
    description: "Browse skilled local providers or post your own gig requirements.",
    icon: Search,
    color: "bg-primary/10 text-primary"
  },
  {
    title: "Connect & Hire",
    description: "Chat with providers, check ratings, and hire the best fit for your job.",
    icon: Users,
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    title: "Secure Escrow",
    description: "Payments are held safely until you confirm the job is done right.",
    icon: ShieldCheck,
    color: "bg-violet-500/10 text-violet-500"
  },
  {
    title: "Job Done",
    description: "Confirm satisfaction and release payment instantly to the provider.",
    icon: CheckCircle,
    color: "bg-emerald-500/10 text-emerald-500"
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6 bg-muted transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            How it <span className="text-primary">works.</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed font-medium">
            A simple, secure process designed to get your tasks done efficiently.
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-border -z-10" />
          
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative flex flex-col items-center text-center space-y-6"
            >
              <div className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center shadow-sm border border-border relative z-10`}>
                <step.icon className="w-8 h-8" />
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-background text-foreground text-xs font-black flex items-center justify-center shadow-md border border-border">
                  {index + 1}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground tracking-tight">{step.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed max-w-[200px] mx-auto font-medium">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
