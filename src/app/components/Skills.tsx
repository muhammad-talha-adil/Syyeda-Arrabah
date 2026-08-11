import { useState } from "react";
import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Activity, BriefcaseMedical, ShieldPlus } from "lucide-react";

interface Props {
  theme: "light" | "dark";
}

const categories = [
  {
    id: "primary",
    label: "Linguistic Core",
    icon: Brain,
    color: "#7c3aed",
    skills: [
      "Neurolinguistics",
      "Language analysis",
      "Speech and language patterns",
      "Cognitive observation",
      "Communication assessment",
      "Discourse analysis",
      "Clinical reasoning",
      "Patient interaction",
      "Precision and focus",
      "Multidisciplinary understanding",
    ],
  },
  {
    id: "research",
    label: "Research Focus",
    icon: Activity,
    color: "#2563eb",
    skills: [
      "Research methodology",
      "Literature review",
      "Scientific writing",
      "Case review",
      "Data analysis",
      "Critical thinking",
      "Academic presentation",
      "Evidence synthesis",
      "Medical reporting",
      "Research documentation",
    ],
  },
  {
    id: "secondary",
    label: "Secondary Support",
    icon: BriefcaseMedical,
    color: "#b8860b",
    skills: [
      "Office administration",
      "Scheduling",
      "Record management",
      "Communication",
      "Coordination",
      "Task prioritization",
      "Documentation",
      "Email handling",
      "Workflow organization",
      "Confidentiality",
    ],
  },
];

export function Skills({ theme }: Props) {
  const dark = theme === "dark";
  const [active, setActive] = useState("primary");
  const cat = categories.find((c) => c.id === active)!;

  return (
    <section id="skills" className="py-24 px-6" style={{ background: dark ? "#0a0820" : "#f5f0e8" }}>
      <div className="max-w-5xl mx-auto">
        <SectionWrapper>
          <SectionHeading label="04 - Core Competencies" title="Professional Skills" theme={theme} />

          <div className="flex justify-center mb-8">
            <div
              className="flex flex-wrap justify-center rounded-xl p-1 gap-1"
              style={{
                background: dark ? "rgba(22,19,58,0.8)" : "rgba(255,255,255,0.8)",
                border: `1px solid ${dark ? "rgba(168,159,232,0.15)" : "rgba(45,42,110,0.1)"}`,
              }}
            >
              {categories.map(({ id, label, icon: Icon, color }) => (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-200"
                  style={{
                    background: active === id ? (dark ? "#1e1a4a" : "#2d2a6e") : "transparent",
                    color: active === id ? (dark ? "#f0ece3" : "#fff") : dark ? "#9993b8" : "#6b6680",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: active === id ? 600 : 400,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <Icon size={15} style={{ color: active === id ? color : "inherit" }} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                icon: ShieldPlus,
                title: "Primary focus",
                text: "Language-focused analysis, communication assessment, and clinical reasoning.",
                color: "#7c3aed",
              },
              {
                icon: Activity,
                title: "Research posture",
                text: "Evidence review, academic writing, and structured research support.",
                color: "#2563eb",
              },
              {
                icon: BriefcaseMedical,
                title: "Secondary support",
                text: "Administration, scheduling, and documentation as backup strengths.",
                color: "#b8860b",
              },
            ].map(({ icon: Icon, title, text, color }) => (
              <div
                key={title}
                className="rounded-xl p-4"
                style={{
                  background: dark ? "rgba(22,19,58,0.65)" : "rgba(255,255,255,0.8)",
                  border: `1px solid ${color}20`,
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: `${color}18` }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <h4 style={{ fontFamily: "Playfair Display, serif", fontSize: "0.95rem", color: dark ? "#f0ece3" : "#1c1a3e", fontWeight: 700 }}>
                    {title}
                  </h4>
                </div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: dark ? "#b9b3d6" : "#67637d", lineHeight: 1.55 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap gap-2 justify-center"
            >
              {cat.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 rounded-full"
                  style={{
                    background: dark ? `${cat.color}14` : `${cat.color}0d`,
                    color: dark ? "#c8c2e0" : "#3d3860",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.82rem",
                    border: `1px solid ${cat.color}28`,
                    cursor: "default",
                  }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.02 }}
                  whileHover={{ scale: 1.05, borderColor: cat.color, color: cat.color }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 text-center">
            <span style={{ fontFamily: "DM Mono, monospace", fontSize: "0.7rem", color: dark ? "#9993b8" : "#6b6680", letterSpacing: "0.1em" }}>
              {cat.skills.length} skills in this category
            </span>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
