import { useRef, useEffect, useState, ReactNode } from "react";
import { motion } from "motion/react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function SectionWrapper({ children, className = "", style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  theme: "light" | "dark";
}

export function SectionHeading({ label, title, subtitle, theme }: SectionHeadingProps) {
  const dark = theme === "dark";
  return (
    <div className="mb-12 text-center">
      <p
        className="uppercase tracking-[0.25em] mb-3"
        style={{ fontFamily: "DM Mono, monospace", fontSize: "0.7rem", color: dark ? "#d4a017" : "#b8860b" }}
      >
        {label}
      </p>
      <h2
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
          fontWeight: 700,
          color: dark ? "#f0ece3" : "#1c1a3e",
          lineHeight: 1.2,
          marginBottom: subtitle ? "0.75rem" : 0,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", color: dark ? "#9993b8" : "#6b6680", maxWidth: 560, margin: "0 auto" }}>
          {subtitle}
        </p>
      )}
      <div className="flex justify-center mt-4">
        <div
          className="h-px w-20 rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${dark ? "#d4a017" : "#b8860b"}, transparent)` }}
        />
      </div>
    </div>
  );
}
