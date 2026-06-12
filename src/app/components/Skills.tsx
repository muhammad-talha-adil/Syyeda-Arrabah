import { useState } from "react";
import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Briefcase } from "lucide-react";

interface Props { theme: "light" | "dark" }

const categories = [
  {
    id: "teaching",
    label: "Teaching & Academic",
    icon: BookOpen,
    color: "#7c3aed",
    skills: [
      "Subject Matter Expertise", "Curriculum Development", "Lesson Planning",
      "Effective Communication", "Classroom Management", "Student Mentorship",
      "Assessment & Evaluation", "Research Skills", "Academic Writing",
      "Critical Thinking", "Adaptability in Teaching", "Time Management",
      "Active Listening", "Problem Solving in Education", "Educational Technology",
      "Feedback & Counseling", "Staff Collaboration", "Innovative Teaching Strategies",
    ],
  },
  {
    id: "office",
    label: "Office Coordination",
    icon: Briefcase,
    color: "#b8860b",
    skills: [
      "Organizational Skills", "Scheduling & Calendar Management", "Meeting Coordination",
      "Minute Taking", "File Management", "Document Management", "Data Entry",
      "Data Management", "Office Software Proficiency", "Event Planning",
      "Email Communication", "Records Management", "Professional Multitasking",
      "Reporting", "Documentation", "Inventory Management", "Supplies Management",
      "Budget Tracking", "Expense Tracking", "Task Delegation", "Interpersonal Skills",
      "Confidentiality", "Discretion", "Administrative Support", "Office Equipment Management",
      "Policy Implementation", "Strategic Planning Assistance", "Recruitment Support",
      "Onboarding Assistance", "Project Coordination", "Customer Service",
      "Correspondence Handling", "Decision Making Under Pressure", "Stakeholder Management",
    ],
  },
];

export function Skills({ theme }: Props) {
  const dark = theme === "dark";
  const [active, setActive] = useState("teaching");
  const cat = categories.find((c) => c.id === active)!;

  return (
    <section
      id="skills"
      className="py-24 px-6"
      style={{ background: dark ? "#0a0820" : "#f5f0e8" }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionWrapper>
          <SectionHeading label="04 — Competencies" title="Professional Skills" theme={theme} />

          {/* Tab switcher */}
          <div className="flex justify-center mb-8">
            <div
              className="flex rounded-xl p-1 gap-1"
              style={{ background: dark ? "rgba(22,19,58,0.8)" : "rgba(255,255,255,0.8)", border: `1px solid ${dark ? "rgba(168,159,232,0.15)" : "rgba(45,42,110,0.1)"}` }}
            >
              {categories.map(({ id, label, icon: Icon, color }) => (
                <button
                  key={id}
                  onClick={() => setActive(id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-200"
                  style={{
                    background: active === id ? (dark ? "#1e1a4a" : "#2d2a6e") : "transparent",
                    color: active === id ? (dark ? "#f0ece3" : "#fff") : (dark ? "#9993b8" : "#6b6680"),
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: active === id ? 600 : 400,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <Icon size={15} style={{ color: active === id ? (id === "teaching" ? "#a89fe8" : "#d4a017") : "inherit" }} />
                  {label}
                </button>
              ))}
            </div>
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
