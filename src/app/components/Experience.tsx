import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { motion } from "motion/react";
import { BookOpen, Layout, FileText } from "lucide-react";

interface Props { theme: "light" | "dark" }

const expertiseAreas = [
  {
    role: "Lecturer",
    icon: BookOpen,
    color: "#7c3aed",
    items: ["Teaching", "Student Guidance", "Academic Mentorship", "Classroom Leadership", "Curriculum Delivery", "Assessment Design"],
  },
  {
    role: "Office Coordinator",
    icon: Layout,
    color: "#b8860b",
    items: ["Scheduling", "Administration", "Workflow Management", "Record Keeping", "Meeting Coordination", "Resource Planning"],
  },
  {
    role: "Administrative Professional",
    icon: FileText,
    color: "#2563eb",
    items: ["Communication", "Operations", "Documentation", "Team Coordination", "Correspondence Handling", "Stakeholder Relations"],
  },
];

export function Experience({ theme }: Props) {
  const dark = theme === "dark";

  return (
    <section
      id="experience"
      className="py-24 px-6"
      style={{ background: dark ? "#0a0820" : "#f5f0e8" }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionWrapper>
          <SectionHeading label="08 — Professional Experience" title="Experience & Expertise" theme={theme} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expertiseAreas.map(({ role, icon: Icon, color, items }, i) => (
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
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: color }}
                      />
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
