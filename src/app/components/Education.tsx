import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { motion } from "motion/react";
import { GraduationCap, BookOpen } from "lucide-react";

interface Props { theme: "light" | "dark" }

const educations = [
  {
    degree: "BS English",
    institution: "Allama Iqbal Open University",
    duration: "Completed",
    icon: GraduationCap,
    description:
      "A comprehensive programme in English Language and Literature encompassing critical literary analysis, linguistic theory, and academic writing excellence.",
    subjects: [
      "English Literature",
      "Linguistics",
      "Creative Writing",
      "Literary Analysis",
      "Communication Skills",
      "Cultural Studies",
      "Critical Thinking",
      "Academic Writing",
      "Language Studies",
    ],
    color: "#7c3aed",
  },
  {
    degree: "Associate Degree in Arts (ADA)",
    institution: "University of Sargodha",
    duration: "2020 – 2022",
    icon: BookOpen,
    description:
      "A foundational programme in humanities and social sciences, building analytical, communicative, and problem-solving abilities across cultural and academic contexts.",
    subjects: [
      "Humanities",
      "Social Sciences",
      "Communication Skills",
      "Critical Thinking",
      "Problem Solving",
      "Analytical Development",
      "Cultural Understanding",
    ],
    color: "#b8860b",
  },
];

export function Education({ theme }: Props) {
  const dark = theme === "dark";

  return (
    <section
      id="education"
      className="py-24 px-6"
      style={{ background: dark ? "#0a0820" : "#f5f0e8" }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionWrapper>
          <SectionHeading label="02 — Academic Foundation" title="Education" theme={theme} />

          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-7 top-8 bottom-8 w-px hidden md:block"
              style={{ background: dark ? "rgba(168,159,232,0.15)" : "rgba(45,42,110,0.1)" }}
            />

            <div className="space-y-8">
              {educations.map(({ degree, institution, duration, icon: Icon, description, subjects, color }, i) => (
                <motion.div
                  key={degree}
                  className="relative flex gap-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex flex-col items-center">
                    <div
                      className="flex-shrink-0 flex items-center justify-center rounded-full z-10"
                      style={{ width: 56, height: 56, background: dark ? "#16133a" : "#fff", border: `2px solid ${color}30`, boxShadow: `0 0 20px ${color}20` }}
                    >
                      <Icon size={22} style={{ color }} />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 rounded-2xl p-6"
                    style={{
                      background: dark ? "rgba(22,19,58,0.8)" : "rgba(255,255,255,0.8)",
                      border: `1px solid ${color}20`,
                      backdropFilter: "blur(10px)",
                      boxShadow: dark ? `0 4px 30px ${color}10` : `0 4px 20px rgba(0,0,0,0.05)`,
                    }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3
                          style={{
                            fontFamily: "Playfair Display, serif",
                            fontSize: "1.25rem",
                            fontWeight: 700,
                            color: dark ? "#f0ece3" : "#1c1a3e",
                          }}
                        >
                          {degree}
                        </h3>
                        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.875rem", color, fontWeight: 500 }}>
                          {institution}
                        </p>
                      </div>
                      <span
                        className="px-3 py-1 rounded-full"
                        style={{
                          background: `${color}15`,
                          color,
                          fontFamily: "DM Mono, monospace",
                          fontSize: "0.7rem",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {duration}
                      </span>
                    </div>

                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: dark ? "#9993b8" : "#6b6680", lineHeight: 1.7, marginBottom: "1rem" }}>
                      {description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {subjects.map((s) => (
                        <span
                          key={s}
                          className="px-3 py-1 rounded-md"
                          style={{
                            background: dark ? `${color}12` : `${color}0d`,
                            color: dark ? "#c8c2e0" : "#3d3860",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "0.75rem",
                            border: `1px solid ${color}20`,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
