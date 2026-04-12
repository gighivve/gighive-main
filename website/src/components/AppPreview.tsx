import { motion } from "motion/react";
import PhoneFrame from "./PhoneFrame";

const screens = [
  {
    title: "Service Browsing",
    description: "Explore a wide range of services and find the perfect gig for your needs.",
    color: "from-indigo-500 to-blue-500",
    content: (
      <div className="p-4 pt-10 space-y-4 h-full bg-background">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-32 bg-muted rounded-lg" />
          <div className="w-8 h-8 bg-primary/10 rounded-full" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="aspect-square bg-muted/50 rounded-2xl border border-border flex flex-col items-center justify-center gap-2">
              <div className="w-8 h-8 bg-primary/5 rounded-lg" />
              <div className="h-2 w-12 bg-muted rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    title: "Secure Payment",
    description: "Payments are held securely in escrow until the job is completed.",
    color: "from-emerald-500 to-teal-500",
    content: (
      <div className="p-4 pt-10 space-y-6 h-full bg-background">
        <div className="text-center space-y-2">
          <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-wider">Total Amount</p>
          <p className="text-3xl font-bold text-foreground">$120.00</p>
        </div>
        <div className="bg-muted p-4 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <div className="h-3 w-20 bg-foreground/10 rounded" />
            <div className="h-3 w-12 bg-foreground/20 rounded" />
          </div>
          <div className="h-px bg-border" />
          <div className="flex justify-between items-center">
            <div className="h-3 w-24 bg-foreground/10 rounded" />
            <div className="h-3 w-16 bg-foreground/20 rounded" />
          </div>
        </div>
        <button className="w-full py-4 bg-primary text-white rounded-2xl text-xs font-bold shadow-lg">Confirm Payment</button>
      </div>
    )
  },
  {
    title: "Earnings Tracker",
    description: "Track your earnings and gig activity with our intuitive dashboard.",
    color: "from-purple-500 to-indigo-500",
    content: (
      <div className="p-4 pt-10 space-y-6 h-full bg-background">
        <div className="h-6 w-32 bg-muted rounded-lg" />
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-primary/5 rounded-2xl space-y-2">
            <div className="h-2 w-12 bg-primary/20 rounded" />
            <div className="h-4 w-16 bg-primary rounded" />
          </div>
          <div className="p-3 bg-emerald-500/5 rounded-2xl space-y-2">
            <div className="h-2 w-12 bg-emerald-500/20 rounded" />
            <div className="h-4 w-16 bg-emerald-500 rounded" />
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-xs font-bold text-foreground">Activity Graph</p>
          <div className="h-32 w-full bg-muted rounded-2xl flex items-end justify-between p-3 gap-1">
            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
              <div key={i} style={{ height: `${h}%` }} className="w-full bg-primary/30 rounded-t-sm" />
            ))}
          </div>
        </div>
      </div>
    )
  }
];

export default function AppPreview() {
  return (
    <section id="preview" className="py-32 px-6 bg-muted transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Experience the <span className="text-primary">app.</span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed font-medium">
            A beautiful, intuitive interface designed for the modern gig economy.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {screens.map((screen, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              <div className="relative group">
                <div className="relative transform group-hover:scale-[1.02] transition-transform duration-500">
                  <PhoneFrame>
                    {screen.content}
                  </PhoneFrame>
                  {/* Soft Shadow Under Phone */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[200px] h-8 bg-foreground/5 blur-2xl rounded-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground tracking-tight">{screen.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed max-w-[240px] mx-auto font-medium">{screen.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
