import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { motion } from "motion/react";
import { TrendingUp, Zap, Laptop, Users, Database } from "lucide-react";

interface Props { theme: "light" | "dark" }

const trainings = [
  { title: "Network Marketing", icon: TrendingUp, color: "#7c3aed", desc: "Strategic networking, relationship building, and business development methodologies." },
  { title: "Agile Project Management", icon: Zap, color: "#2563eb", desc: "Iterative planning, sprint management, and adaptive project delivery frameworks." },
  { title: "Freelancing & Digital Entrepreneurship", icon: Laptop, color: "#059669", desc: "Building a sustainable freelance career, client management, and digital monetization." },
  { title: "Human Resource Management", icon: Users, color: "#b8860b", desc: "Talent acquisition, employee relations, performance evaluation, and HR best practices." },
  { title: "Data Management & Record Keeping", icon: Database, color: "#dc2626", desc: "Systematic data organization, records governance, and information lifecycle management." },
];

export function Trainings({ theme }: Props) {
  const dark = theme === "dark";

  return (
    <section
      id="trainings"
      className="py-24 px-6"
      style={{ background: dark ? "#0a0820" : "#f5f0e8" }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionWrapper>
          <SectionHeading label="06 — Professional Development" title="Trainings & Seminars" theme={theme} />

          <div className="relative">
            <div
              className="absolute left-6 top-6 bottom-6 w-px hidden md:block"
              style={{ background: dark ? "rgba(168,159,232,0.12)" : "rgba(45,42,110,0.08)" }}
            />
            <div className="space-y-5">
              {trainings.map(({ title, icon: Icon, color, desc }, i) => (
                <motion.div
                  key={title}
                  className="relative flex gap-6 items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="hidden md:flex flex-col items-center">
                    <div
                      className="flex items-center justify-center rounded-full flex-shrink-0 z-10"
                      style={{ width: 48, height: 48, background: dark ? "#16133a" : "#fff", border: `1.5px solid ${color}35`, boxShadow: `0 0 16px ${color}18` }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>
                  </div>
                  <div
                    className="flex-1 rounded-xl p-5"
                    style={{
                      background: dark ? "rgba(22,19,58,0.65)" : "rgba(255,255,255,0.8)",
                      border: `1px solid ${color}20`,
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: "Playfair Display, serif",
                        fontWeight: 600,
                        color: dark ? "#f0ece3" : "#1c1a3e",
                        marginBottom: "0.35rem",
                      }}
                    >
                      {title}
                    </h4>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.87rem", color: dark ? "#9993b8" : "#6b6680", lineHeight: 1.65 }}>
                      {desc}
                    </p>
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
