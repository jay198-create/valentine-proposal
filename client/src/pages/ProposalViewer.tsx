import { useState, useRef, useEffect } from "react";
import { useRoute } from "wouter";
import { useProposal, useAcceptProposal } from "@/hooks/use-proposals";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Loader2 } from "lucide-react";

export default function ProposalViewer() {
  const [, params] = useRoute("/proposal/:id");
  const id = params?.id || "";
  const { data: proposal, isLoading } = useProposal(id);
  const { mutate: acceptProposal } = useAcceptProposal();
  
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [attempts, setAttempts] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  
  const hints = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
  ];

  useEffect(() => {
    if (proposal?.accepted) {
      setAccepted(true);
      triggerConfetti();
    }
  }, [proposal]);

  const moveNoButton = () => {
    // Increment stats
    setAttempts(prev => prev + 1);
    setYesScale(prev => Math.min(prev + 0.1, 2.5)); // Cap scale at 2.5x

    // Calculate random position within viewport, keeping padding
    const padding = 50;
    const maxX = window.innerWidth - 100 - padding;
    const maxY = window.innerHeight - 50 - padding;
    
    // Ensure we don't go off screen or overlap top header area
    const x = Math.max(padding, Math.random() * maxX) - (window.innerWidth / 2);
    const y = Math.max(padding, Math.random() * maxY) - (window.innerHeight / 2);

    setNoBtnPosition({ x, y });
  };

  const handleYes = () => {
    setAccepted(true);
    triggerConfetti();
    acceptProposal(id);
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50">
        <h1 className="text-xl text-gray-500">Proposal not found or invalid link.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4">
      <FloatingHearts />
      
      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div 
            key="question"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="z-10 text-center w-full max-w-lg mx-auto"
          >
            <div className="glass-card p-8 md:p-12 rounded-[3rem] shadow-2xl border-4 border-white">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-pink-600 mb-6 drop-shadow-sm">
                Hey {proposal.partnerName}! 💕
              </h2>
              
              <div className="relative w-64 h-64 mx-auto mb-8 rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-white">
                <img 
                  src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtZ2JiZDR0a3lvMDF4OG1uy3pxdmdmbZ1kY2V6aWZ2b3p4bnl5dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/26FLdmIp6wJr91JAI/giphy.gif" 
                  alt="Cute Proposal GIF" 
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 leading-tight">
                Will You Be My Valentine?
              </h1>

              <div className="relative h-24 flex items-center justify-center gap-6">
                <motion.button
                  onClick={handleYes}
                  style={{ scale: yesScale }}
                  whileHover={{ scale: yesScale * 1.1 }}
                  whileTap={{ scale: yesScale * 0.9 }}
                  className="px-8 py-4 bg-primary text-white rounded-2xl font-bold text-xl shadow-lg shadow-primary/30 z-20 hover:bg-pink-600 transition-colors"
                >
                  YES! 💖
                </motion.button>

                <motion.button
                  ref={noBtnRef}
                  onClick={moveNoButton}
                  onMouseEnter={moveNoButton}
                  animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute px-8 py-4 bg-gray-200 text-gray-600 rounded-2xl font-bold text-xl shadow-md cursor-pointer hover:bg-gray-300 transition-colors"
                  style={{ position: attempts > 0 ? "fixed" : "relative" }}
                >
                  {hints[Math.min(attempts, hints.length - 1)]}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="z-10 text-center max-w-2xl mx-auto px-4"
          >
            <div className="glass-card p-10 md:p-14 rounded-[3rem] shadow-2xl border-4 border-white bg-white/80">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="text-8xl mb-6"
              >
                🎉💕
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-8">
                YAAAY!!!
              </h1>
              
              <div className="bg-rose-50 p-8 rounded-2xl border border-rose-100 mb-8">
                <p className="text-xl md:text-2xl font-handwriting text-gray-700 leading-relaxed italic">
                  "{proposal.customMessage}"
                </p>
                <div className="mt-6 text-right font-bold text-pink-600">
                  - {proposal.yourName}
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-full font-bold animate-bounce">
                Notification sent to {proposal.yourName}! 📱
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
