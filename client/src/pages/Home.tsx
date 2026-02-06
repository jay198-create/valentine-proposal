import { Link } from "wouter";
import { motion } from "framer-motion";
import { Heart, Send, Sparkles, BellRing } from "lucide-react";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      <FloatingHearts />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/80 backdrop-blur border border-pink-200 shadow-sm mb-4">
            <span className="flex items-center gap-2 text-sm font-semibold text-pink-600">
              <Sparkles className="w-4 h-4" /> 
              Make Valentine's 2026 Unforgettable
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black leading-tight text-gradient drop-shadow-sm">
            Ask them to be<br />
            <span className="relative inline-block mt-2">
              your Valentine
              <svg className="absolute -bottom-2 w-full h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            Create a cute, interactive proposal page in seconds. It's almost impossible for them to say no with our playful running button! 💕
          </p>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pt-8"
          >
            <Link href="/create">
              <button className="px-8 py-4 md:px-12 md:py-6 bg-gradient-to-r from-primary to-pink-600 text-white rounded-full text-xl md:text-2xl font-bold shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 flex items-center gap-3 mx-auto">
                <Heart className="w-6 h-6 fill-current animate-pulse" />
                Create Proposal
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-5xl w-full">
          <FeatureCard 
            icon={<Sparkles className="w-8 h-8 text-purple-500" />}
            title="Personalized"
            desc="Add your names and a custom heartfelt message just for them."
            delay={0.2}
          />
          <FeatureCard 
            icon={<Send className="w-8 h-8 text-pink-500" />}
            title="Instant Link"
            desc="Get a unique link immediately to share via WhatsApp or DM."
            delay={0.4}
          />
          <FeatureCard 
            icon={<BellRing className="w-8 h-8 text-rose-500" />}
            title="Get Notified"
            desc="We'll let you know the moment they say YES!"
            delay={0.6}
          />
        </div>
      </main>
      
      <footer className="py-8 text-center text-sm text-muted-foreground bg-white/30 backdrop-blur-sm border-t border-white/50">
        <p>Made with ❤️ for lovers everywhere.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass-card p-6 rounded-3xl text-left hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </motion.div>
  );
}
