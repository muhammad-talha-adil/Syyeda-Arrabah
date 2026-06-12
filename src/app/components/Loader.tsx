import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const symbols = ["α", "β", "λ", "∑", "∞", "Ψ", "Φ", "Ω", "π", "δ", "∇", "∂"];
const positions = [
  { left: "8%", top: "15%" }, { left: "18%", top: "70%" }, { left: "28%", top: "35%" },
  { left: "40%", top: "80%" }, { left: "55%", top: "20%" }, { left: "65%", top: "60%" },
  { left: "75%", top: "40%" }, { left: "85%", top: "75%" }, { left: "92%", top: "25%" },
  { left: "12%", top: "50%" }, { left: "48%", top: "55%" }, { left: "80%", top: "10%" },
];

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, #0e0c24 0%, #1a1650 50%, #0e0c24 100%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Floating symbols */}
          {symbols.map((sym, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl font-mono select-none pointer-events-none"
              style={{
                color: "rgba(168,159,232,0.25)",
                fontFamily: "DM Mono, monospace",
                left: positions[i].left,
                top: positions[i].top,
              }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: [0, 0.5, 0], y: [60, -20, -100] }}
              transition={{ duration: 3, delay: i * 0.2, repeat: Infinity, repeatDelay: 0.5 }}
            >
              {sym}
            </motion.div>
          ))}

          {/* Central content */}
          <motion.div
            className="flex flex-col items-center gap-6 z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Animated mark */}
            <div className="relative w-16 h-16 mb-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded"
                  style={{ border: "1px solid rgba(168,159,232,0.3)", transform: `rotate(${i * 15}deg)` }}
                  animate={{ rotate: [i * 15, i * 15 + 360] }}
                  transition={{ duration: 6 + i, repeat: Infinity, ease: "linear" }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  style={{ color: "#d4a017", fontSize: 28, fontFamily: "Playfair Display, serif" }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✦
                </motion.span>
              </div>
            </div>

            <motion.h1
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#f0ece3",
                fontSize: "2rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Syyeda Arrabah
            </motion.h1>

            <p style={{ color: "#9993b8", fontFamily: "Inter, sans-serif", fontSize: "0.875rem", letterSpacing: "0.2em" }}>
              EDUCATOR · RESEARCHER · LINGUIST
            </p>

            {/* Progress bar */}
            <div className="w-64 h-px rounded-full overflow-hidden" style={{ background: "rgba(168,159,232,0.15)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #7c3aed, #d4a017)", width: `${progress}%` }}
              />
            </div>

            <p style={{ color: "rgba(153,147,184,0.6)", fontFamily: "DM Mono, monospace", fontSize: "0.7rem" }}>
              {progress}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
