import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  scale: number;
  duration: number;
  delay: number;
  color: string;
}

const colors = [
  "text-pink-300",
  "text-rose-300", 
  "text-purple-300",
  "text-red-300"
];

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Initial batch
    const initialHearts = Array.from({ length: 15 }, (_, i) => createHeart(i));
    setHearts(initialHearts);

    // Continuous generation
    const interval = setInterval(() => {
      setHearts(prev => {
        const newHeart = createHeart(Date.now());
        // Keep array size manageable
        return [...prev.slice(-20), newHeart];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  function createHeart(id: number): Heart {
    return {
      id,
      x: Math.random() * 100, // percentage
      scale: 0.5 + Math.random() * 1,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: "100vh", opacity: 0, x: `${heart.x}vw` }}
            animate={{ 
              y: "-20vh", 
              opacity: [0, 0.8, 0],
              rotate: [0, 45, -45, 0] 
            }}
            transition={{ 
              duration: heart.duration, 
              ease: "linear",
              repeat: Infinity,
              delay: heart.delay
            }}
            className={`absolute ${heart.color} text-4xl`}
            style={{ scale: heart.scale }}
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
