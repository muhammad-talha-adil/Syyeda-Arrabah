import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Mail, FileText, ChevronDown, Download } from "lucide-react";

const titles = [
  "Lecturer",
  "Office Coordinator",
  "BS English Graduate",
  "Researcher",
  "Academic Writer",
  "Administrative Professional",
];

interface HeroProps {
  theme: "light" | "dark";
}

export function Hero({ theme }: HeroProps) {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = titles[titleIdx];
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        return () => clearTimeout(t);
      } else {
        setTitleIdx((i) => (i + 1) % titles.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, titleIdx]);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const openEditor = (kind: "resume" | "cover-letter") => {
    const url = `${window.location.origin}${window.location.pathname}?editor=${kind}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const dark = theme === "dark";

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: dark
          ? "linear-gradient(135deg, #0e0c24 0%, #1a1650 40%, #0e0c24 100%)"
          : "linear-gradient(135deg, #faf7f2 0%, #ede9fe 50%, #faf7f2 100%)",
      }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            background: dark ? "radial-gradient(circle, rgba(109,40,217,0.15) 0%, transparent 70%)" : "radial-gradient(circle, rgba(45,42,110,0.08) 0%, transparent 70%)",
            top: "10%", left: "-10%",
          }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400,
            background: dark ? "radial-gradient(circle, rgba(212,160,23,0.1) 0%, transparent 70%)" : "radial-gradient(circle, rgba(184,134,11,0.08) 0%, transparent 70%)",
            bottom: "10%", right: "-5%",
          }}
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(${dark ? "rgba(168,159,232,0.03)" : "rgba(45,42,110,0.03)"} 1px, transparent 1px), linear-gradient(90deg, ${dark ? "rgba(168,159,232,0.03)" : "rgba(45,42,110,0.03)"} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20 pb-16">
        {/* Left: Text content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.p
            className="uppercase tracking-[0.25em] mb-4"
            style={{ fontFamily: "DM Mono, monospace", fontSize: "0.7rem", color: dark ? "#d4a017" : "#b8860b" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Portfolio · 2024
          </motion.p>

          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 700,
              color: dark ? "#f0ece3" : "#1c1a3e",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Syyeda
            <br />
            <span style={{ color: dark ? "#d4a017" : "#b8860b", fontStyle: "italic" }}>Arrabah</span>
          </h1>

          <div className="flex items-center gap-3 mb-6" style={{ minHeight: "2rem" }}>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "1.1rem",
                fontWeight: 500,
                color: dark ? "#a89fe8" : "#4f46e5",
              }}
            >
              {displayed}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                style={{ display: "inline-block", width: 2, height: "1em", background: dark ? "#a89fe8" : "#4f46e5", marginLeft: 2, verticalAlign: "middle" }}
              />
            </span>
          </div>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1rem",
              color: dark ? "#9993b8" : "#6b6680",
              lineHeight: 1.7,
              maxWidth: "440px",
              marginBottom: "2rem",
            }}
          >
            "Bridging Education, Research, Administration, and Human Development."
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-[760px]">
            <motion.button
              onClick={() => scrollTo("contact")}
              className="flex w-full items-center justify-center gap-2 px-6 py-3 rounded-full transition-all duration-200 min-h-[52px]"
              style={{
                background: dark ? "#d4a017" : "#2d2a6e",
                color: dark ? "#0e0c24" : "#ffffff",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "0.875rem",
                border: "none",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Mail size={15} />
              Contact Me
            </motion.button>
            <motion.button
              onClick={() => scrollTo("education")}
              className="flex w-full items-center justify-center gap-2 px-6 py-3 rounded-full transition-all duration-200 min-h-[52px]"
              style={{
                background: "transparent",
                color: dark ? "#a89fe8" : "#2d2a6e",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                fontSize: "0.875rem",
                border: `1.5px solid ${dark ? "rgba(168,159,232,0.4)" : "rgba(45,42,110,0.3)"}`,
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <FileText size={15} />
              View Qualifications
            </motion.button>
            <motion.button
              onClick={() => openEditor("cover-letter")}
              className="flex w-full items-center justify-center gap-2 px-6 py-3 rounded-full transition-all duration-200 min-h-[52px]"
              style={{
                background: dark ? "rgba(168,159,232,0.12)" : "rgba(45,42,110,0.08)",
                color: dark ? "#f0ece3" : "#2d2a6e",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "0.875rem",
                border: `1.5px solid ${dark ? "rgba(168,159,232,0.24)" : "rgba(45,42,110,0.18)"}`,
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={15} />
              Open Cover Letter Preview
            </motion.button>
            <motion.button
              onClick={() => openEditor("resume")}
              className="flex w-full items-center justify-center gap-2 px-6 py-3 rounded-full transition-all duration-200 min-h-[52px]"
              style={{
                background: dark ? "#d4a017" : "#2d2a6e",
                color: dark ? "#0e0c24" : "#ffffff",
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "0.875rem",
                border: "none",
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={15} />
              Open Resume Preview
            </motion.button>
          </div>
        </motion.div>

        {/* Right: Profile image placeholder */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        >
          <div className="relative">
            {/* Rotating border ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(${dark ? "#d4a017" : "#b8860b"} 0deg, transparent 120deg, ${dark ? "#a89fe8" : "#4f46e5"} 240deg, ${dark ? "#d4a017" : "#b8860b"} 360deg)`,
                padding: "2px",
                borderRadius: "50%",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <div
              className="relative flex items-center justify-center overflow-hidden"
              style={{
                width: 260,
                height: 260,
                borderRadius: "50%",
                background: dark ? "rgba(30,26,74,0.8)" : "rgba(237,233,254,0.8)",
                border: `2px solid ${dark ? "rgba(168,159,232,0.2)" : "rgba(45,42,110,0.15)"}`,
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Placeholder content */}
              <div className="flex flex-col items-center gap-2">
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    background: dark ? "rgba(212,160,23,0.15)" : "rgba(45,42,110,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    color: dark ? "#d4a017" : "#b8860b",
                    fontFamily: "Playfair Display, serif",
                  }}
                >
                  S
                </div>
                <p style={{ fontFamily: "DM Mono, monospace", fontSize: "0.65rem", color: dark ? "#9993b8" : "#6b6680", textAlign: "center", padding: "0 20px" }}>
                  Profile photo
                  <br />placeholder
                </p>
              </div>
            </div>

            {/* Decorative dots */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: 6,
                  height: 6,
                  background: i % 2 === 0 ? (dark ? "#d4a017" : "#b8860b") : (dark ? "#a89fe8" : "#4f46e5"),
                  top: `${50 + 48 * Math.sin((i * Math.PI * 2) / 6)}%`,
                  left: `${50 + 48 * Math.cos((i * Math.PI * 2) / 6)}%`,
                  transform: "translate(-50%,-50%)",
                }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ color: dark ? "#9993b8" : "#6b6680", background: "none", border: "none", cursor: "pointer" }}
      >
        <span style={{ fontFamily: "DM Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.15em" }}>SCROLL</span>
        <ChevronDown size={14} />
      </motion.button>
    </section>
  );
}
