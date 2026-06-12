import { useEffect, useRef } from "react";
import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { motion } from "motion/react";
import { Brain, Zap, Layers, Search } from "lucide-react";

interface Props { theme: "light" | "dark" }

const pillars = [
  { icon: Brain, title: "Neuroscience", desc: "Brain-language relationships and neural pathways for linguistic processing.", color: "#7c3aed" },
  { icon: Layers, title: "Syntax", desc: "Structural rules governing sentence formation and hierarchical language organization.", color: "#2563eb" },
  { icon: Search, title: "Semantics", desc: "Meaning construction, lexical representation, and conceptual knowledge networks.", color: "#059669" },
  { icon: Zap, title: "Phonology", desc: "Sound systems and their neurofunctional representations within cortical regions.", color: "#d97706" },
];

function NeuralCanvas({ dark }: { dark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < 30; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = dark ? `rgba(168,159,232,${0.3 * (1 - dist / 120)})` : `rgba(45,42,110,${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = dark ? "rgba(212,160,23,0.6)" : "rgba(184,134,11,0.4)";
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [dark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full rounded-2xl"
      style={{ opacity: 0.5 }}
    />
  );
}

export function Research({ theme }: Props) {
  const dark = theme === "dark";

  return (
    <section
      id="research"
      className="py-24 px-6"
      style={{ background: dark ? "#0e0c24" : "#faf7f2" }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionWrapper>
          <SectionHeading
            label="03 — Academic Research"
            title="Research"
            subtitle="A theoretical and neurofunctional review of brain-language relationships"
            theme={theme}
          />

          {/* Main research card */}
          <div
            className="relative rounded-2xl p-8 mb-8 overflow-hidden"
            style={{
              background: dark ? "linear-gradient(135deg, #16133a 0%, #1e1a4a 100%)" : "linear-gradient(135deg, #ede9fe 0%, #faf7f2 100%)",
              border: `1px solid ${dark ? "rgba(168,159,232,0.2)" : "rgba(45,42,110,0.15)"}`,
              minHeight: 220,
            }}
          >
            <NeuralCanvas dark={dark} />
            <div className="relative z-10">
              <div
                className="inline-block px-3 py-1 rounded-full mb-4"
                style={{ background: dark ? "rgba(212,160,23,0.15)" : "rgba(184,134,11,0.1)", border: `1px solid ${dark ? "#d4a017" : "#b8860b"}40` }}
              >
                <span style={{ fontFamily: "DM Mono, monospace", fontSize: "0.68rem", color: dark ? "#d4a017" : "#b8860b", letterSpacing: "0.1em" }}>
                  RESEARCH PAPER · NEUROLINGUISTICS
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
                  fontWeight: 700,
                  color: dark ? "#f0ece3" : "#1c1a3e",
                  lineHeight: 1.3,
                  maxWidth: "600px",
                }}
              >
                Neurolinguistics and Brain-Language Relationships: A Theoretical and Neurofunctional Review of Syntax, Semantics, and Phonology
              </h3>
            </div>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillars.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                className="rounded-xl p-5"
                style={{
                  background: dark ? "rgba(22,19,58,0.7)" : "rgba(255,255,255,0.8)",
                  border: `1px solid ${color}25`,
                  backdropFilter: "blur(8px)",
                }}
                whileHover={{ y: -4, boxShadow: `0 12px 40px ${color}25` }}
                transition={{ duration: 0.25, delay: i * 0.1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div
                  className="flex items-center justify-center rounded-lg mb-3"
                  style={{ width: 40, height: 40, background: `${color}15` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <h4 style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, color: dark ? "#f0ece3" : "#1c1a3e", marginBottom: "0.4rem" }}>
                  {title}
                </h4>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: dark ? "#9993b8" : "#6b6680", lineHeight: 1.6 }}>
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Key areas */}
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {["Language Processing", "Cognitive Science", "Neurofunctional Analysis", "Cortical Mapping", "Brocaʼs Area", "Wernickeʼs Area", "Phonological Loop"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full"
                style={{
                  background: dark ? "rgba(124,58,237,0.12)" : "rgba(45,42,110,0.07)",
                  color: dark ? "#a89fe8" : "#4f46e5",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.78rem",
                  border: `1px solid ${dark ? "rgba(124,58,237,0.2)" : "rgba(45,42,110,0.12)"}`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
