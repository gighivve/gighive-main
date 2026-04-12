import { motion } from "motion/react";
import { Shield, Zap, Globe, Heart, Clock, Wallet } from "lucide-react";

const features = [
  {
    title: "Verified Trust",
    description: "Every provider is vetted with a multi-step verification process.",
    icon: Shield,
    color: "text-primary bg-primary/10"
  },
  {
    title: "Instant Gigs",
    description: "Find available workers in your immediate vicinity in real-time.",
    icon: Zap,
    color: "text-blue-500 bg-blue-500/10"
  },
  {
    title: "Global Reach",
    description: "Access a worldwide network of digital service providers.",
    icon: Globe,
    color: "text-violet-500 bg-violet-500/10"
  },
  {
    title: "Community First",
    description: "Built by gig workers, for gig workers. Fair pay prioritized.",
    icon: Heart,
    color: "text-rose-500 bg-rose-500/10"
  },
  {
    title: "Smart Escrow",
    description: "Funds are only released when milestones are met.",
    icon: Wallet,
    color: "text-emerald-500 bg-emerald-500/10"
  },
  {
    title: "Local Support",
    description: "24/7 localized support to help resolve any issues quickly.",
    icon: Clock,
    color: "text-purple-500 bg-purple-500/10"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-32 px-6 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Built for the <span className="text-primary">modern</span> worker.
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed font-medium">
            Powerful features that make the gig economy safer, faster, and more rewarding for everyone involved.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative rounded-2xl bg-background border border-border p-8 hover:shadow-xl transition-all duration-300 shadow-sm"
            >
              <div className="space-y-6">
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed font-medium">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
