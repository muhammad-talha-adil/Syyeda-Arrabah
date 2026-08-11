import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { motion } from "motion/react";
import { Brain, Layout, FileText, BadgeCheck } from "lucide-react";

interface Props {
  theme: "light" | "dark";
}

const expertiseAreas = [
  {
    role: "Language and Clinical Track",
    icon: Brain,
    color: "#7c3aed",
    timeframe: "Primary Role",
    items: [
      "Neurolinguistic awareness",
      "Language-focused analysis",
      "Clinical reasoning",
      "Communication support",
      "Patient interaction",
      "Observation and precision",
    ],
  },
  {
    role: "Office Administration and Management",
    icon: Layout,
    color: "#b8860b",
    timeframe: "Company Sumsols Technologies",
    items: [
      "14 April 2026 - 18 July 2026",
      "Scheduling and coordination",
      "Record keeping",
      "Workflow organization",
      "Communication support",
      "Operational assistance",
    ],
  },
  {
    role: "Research & Documentation",
    icon: BadgeCheck,
    color: "#2563eb",
    timeframe: "Supporting Strength",
    items: [
      "Research design",
      "Evidence review",
      "Scientific writing",
      "Academic reporting",
      "Case review",
      "Documentation",
    ],
  },
  {
    role: "Secondary Support Professional",
    icon: FileText,
    color: "#dc2626",
    timeframe: "Secondary Strength",
    items: [
      "Task management",
      "Confidentiality",
      "Team coordination",
      "Reporting",
      "Stakeholder support",
      "Documentation",
    ],
  },
];

export function Experience({ theme }: Props) {
  const dark = theme === "dark";

  return (
    <section id="experience" className="py-24 px-6" style={{ background: dark ? "#0a0820" : "#f5f0e8" }}>
      <div className="max-w-5xl mx-auto">
        <SectionWrapper>
          <SectionHeading label="08 - Experience & Expertise" title="Experience & Expertise" theme={theme} />

          <div className="mb-6 rounded-2xl p-5" style={{ background: dark ? "rgba(22,19,58,0.72)" : "rgba(255,255,255,0.82)", border: `1px solid ${dark ? "rgba(168,159,232,0.14)" : "rgba(45,42,110,0.1)"}` }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: dark ? "#c8c2e0" : "#3d3860", lineHeight: 1.7 }}>
              Sumsols experience is shown clearly as a dedicated card, while research and support strengths stay visible without taking over the main profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {expertiseAreas.map(({ role, icon: Icon, color, items, timeframe }, i) => (
              <motion.div
                key={role}
                className="rounded-2xl p-6"
                style={{
                  background: dark ? "rgba(22,19,58,0.7)" : "rgba(255,255,255,0.85)",
                  border: `1px solid ${color}22`,
                  backdropFilter: "blur(10px)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -5, boxShadow: `0 20px 60px ${color}18` }}
              >
                <div
                  className="flex items-center justify-center rounded-xl mb-4"
                  style={{ width: 52, height: 52, background: `${color}15` }}
                >
                  <Icon size={24} style={{ color }} />
                </div>

                <p
                  style={{
                    fontFamily: "DM Mono, monospace",
                    fontSize: "0.66rem",
                    color: color,
                    letterSpacing: "0.14em",
                    marginBottom: "0.5rem",
                  }}
                >
                  {timeframe}
                </p>

                <h3
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: dark ? "#f0ece3" : "#1c1a3e",
                    marginBottom: "1rem",
                  }}
                >
                  {role}
                </h3>

                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: dark ? "#c8c2e0" : "#3d3860" }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
