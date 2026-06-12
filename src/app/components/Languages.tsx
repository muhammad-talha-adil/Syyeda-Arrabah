import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { motion } from "motion/react";

interface Props { theme: "light" | "dark" }

const languages = [
  { name: "English", level: "Professional", proficiency: 92, script: "A B C", flag: "🇬🇧" },
  { name: "Urdu", level: "Native", proficiency: 100, script: "ا ب ت", flag: "🇵🇰" },
  { name: "Punjabi", level: "Native", proficiency: 95, script: "ਅ ਆ ਇ", flag: "🌍" },
];

export function Languages({ theme }: Props) {
  const dark = theme === "dark";

  return (
    <section
      id="languages"
      className="py-24 px-6"
      style={{ background: dark ? "#0e0c24" : "#faf7f2" }}
    >
      <div className="max-w-4xl mx-auto">
        <SectionWrapper>
          <SectionHeading label="07 — Linguistic Proficiency" title="Languages" theme={theme} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {languages.map(({ name, level, proficiency, script }, i) => (
              <motion.div
                key={name}
                className="rounded-2xl p-6 text-center"
                style={{
                  background: dark ? "rgba(22,19,58,0.7)" : "rgba(255,255,255,0.85)",
                  border: `1px solid ${dark ? "rgba(168,159,232,0.15)" : "rgba(45,42,110,0.1)"}`,
                  backdropFilter: "blur(10px)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6, boxShadow: dark ? "0 20px 60px rgba(124,58,237,0.15)" : "0 20px 40px rgba(45,42,110,0.08)" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: dark ? "rgba(212,160,23,0.12)" : "rgba(184,134,11,0.08)",
                    border: `1.5px solid ${dark ? "rgba(212,160,23,0.3)" : "rgba(184,134,11,0.2)"}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Playfair Display, serif",
                      fontSize: "1.1rem",
                      color: dark ? "#d4a017" : "#b8860b",
                      fontStyle: "italic",
                    }}
                  >
                    {script}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: dark ? "#f0ece3" : "#1c1a3e",
                    marginBottom: "0.25rem",
                  }}
                >
                  {name}
                </h3>
                <p style={{ fontFamily: "DM Mono, monospace", fontSize: "0.7rem", color: dark ? "#d4a017" : "#b8860b", letterSpacing: "0.15em", marginBottom: "1.25rem" }}>
                  {level}
                </p>

                {/* Circular progress */}
                <div className="relative flex items-center justify-center mx-auto" style={{ width: 80, height: 80 }}>
                  <svg width="80" height="80" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="40" cy="40" r="34" fill="none" stroke={dark ? "rgba(168,159,232,0.1)" : "rgba(45,42,110,0.08)"} strokeWidth="5" />
                    <motion.circle
                      cx="40" cy="40" r="34"
                      fill="none"
                      stroke={dark ? "#d4a017" : "#b8860b"}
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 34}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 34 * (1 - proficiency / 100) }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 + i * 0.15 }}
                    />
                  </svg>
                  <span
                    className="absolute"
                    style={{ fontFamily: "DM Mono, monospace", fontSize: "0.9rem", fontWeight: 500, color: dark ? "#f0ece3" : "#1c1a3e" }}
                  >
                    {proficiency}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
