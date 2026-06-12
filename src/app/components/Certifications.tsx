import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { motion } from "motion/react";
import { Award, Brain, Users, Laptop, Palette, Pill, Zap, Globe, GraduationCap, BookOpen } from "lucide-react";

interface Props { theme: "light" | "dark" }

const certs = [
  { title: "Human Psychology", issuer: "Mind Luster", icon: Brain, color: "#7c3aed" },
  { title: "Human Resource Management", issuer: "Saylor Academy", icon: Users, color: "#2563eb" },
  { title: "Freelancing", issuer: "DigiSkills", icon: Laptop, color: "#059669" },
  { title: "Graphic Design", issuer: "DigiSkills", icon: Palette, color: "#d97706" },
  { title: "Diabetes & Obesity Course", issuer: "EACCME", icon: Pill, color: "#dc2626" },
  { title: "Agile Project Management", issuer: "HP LIFE", icon: Zap, color: "#7c3aed" },
  { title: "Business-Proficient ESL", issuer: "Saylor Academy", icon: Globe, color: "#0891b2" },
  { title: "Diploma in Pharmacy", issuer: "Alison", icon: GraduationCap, color: "#be185d" },
  { title: "Basic Esperanto Course", issuer: "CML, Nankana Sahib", icon: BookOpen, color: "#b8860b" },
];

export function Certifications({ theme }: Props) {
  const dark = theme === "dark";

  return (
    <section
      id="certifications"
      className="py-24 px-6"
      style={{ background: dark ? "#0e0c24" : "#faf7f2" }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionWrapper>
          <SectionHeading label="05 — Credentials" title="Certifications" theme={theme} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certs.map(({ title, issuer, icon: Icon, color }, i) => (
              <motion.div
                key={title}
                className="rounded-xl p-5 group cursor-default"
                style={{
                  background: dark ? "rgba(22,19,58,0.7)" : "rgba(255,255,255,0.85)",
                  border: `1px solid ${color}20`,
                  backdropFilter: "blur(8px)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -5, boxShadow: `0 16px 40px ${color}20`, borderColor: `${color}50` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-110"
                    style={{ width: 44, height: 44, background: `${color}18` }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4
                      style={{
                        fontFamily: "Playfair Display, serif",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: dark ? "#f0ece3" : "#1c1a3e",
                        lineHeight: 1.3,
                        marginBottom: "0.3rem",
                      }}
                    >
                      {title}
                    </h4>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color, fontWeight: 500 }}>
                      {issuer}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Award size={12} style={{ color: dark ? "#9993b8" : "#6b6680" }} />
                  <span style={{ fontFamily: "DM Mono, monospace", fontSize: "0.65rem", color: dark ? "#9993b8" : "#6b6680", letterSpacing: "0.08em" }}>
                    CERTIFIED
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
