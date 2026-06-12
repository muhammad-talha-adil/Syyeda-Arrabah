import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { motion } from "motion/react";
import { BookOpen, Target, Award } from "lucide-react";

interface Props { theme: "light" | "dark" }

const highlights = [
  { icon: BookOpen, label: "BS English", detail: "Allama Iqbal Open University" },
  { icon: Target, label: "ADA", detail: "University of Sargodha · 2020–2022" },
  { icon: Award, label: "9+ Certifications", detail: "HR, Agile, Graphic Design & more" },
];

export function About({ theme }: Props) {
  const dark = theme === "dark";
  const glass = dark
    ? "bg-white/5 border border-violet-900/20"
    : "bg-white/60 border border-[#2d2a6e]/10";

  return (
    <section
      id="about"
      className="py-24 px-6"
      style={{ background: dark ? "#0e0c24" : "#faf7f2" }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionWrapper>
          <SectionHeading label="01 — Who I Am" title="About Me" theme={theme} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {highlights.map(({ icon: Icon, label, detail }, i) => (
              <motion.div
                key={label}
                className={`rounded-xl p-5 ${glass} backdrop-blur-sm flex items-center gap-4`}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-lg"
                  style={{ width: 44, height: 44, background: dark ? "rgba(212,160,23,0.12)" : "rgba(45,42,110,0.08)" }}
                >
                  <Icon size={20} color={dark ? "#d4a017" : "#2d2a6e"} />
                </div>
                <div>
                  <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, color: dark ? "#f0ece3" : "#1c1a3e", fontSize: "0.875rem" }}>{label}</p>
                  <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#9993b8" : "#6b6680", fontSize: "0.78rem" }}>{detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className={`rounded-2xl p-8 ${glass} backdrop-blur-sm`}>
            <p
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "1.15rem",
                fontStyle: "italic",
                color: dark ? "#d4a017" : "#b8860b",
                marginBottom: "1.25rem",
                lineHeight: 1.5,
              }}
            >
              "A dedicated and multifaceted professional with a strong background in education and office management."
            </p>
            <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", color: dark ? "#c8c2e0" : "#3d3860", lineHeight: 1.9 }} className="space-y-4">
              <p>
                BS English graduate from Allama Iqbal Open University with an Associate Degree in Arts from the University of Sargodha. Academic research focuses on neurofunctional and theoretical aspects of language processing — specifically the intersections of Syntax, Semantics, and Phonology as mapped to brain structures.
              </p>
              <p>
                Experienced in teaching, student mentorship, office administration, scheduling, coordination, record management, communication, and organizational leadership. Certified in Human Resource Management, Agile Project Management, Graphic Design, Freelancing, Educational Technologies, Human Psychology, and related professional disciplines.
              </p>
            </div>

            <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${dark ? "rgba(168,159,232,0.12)" : "rgba(45,42,110,0.08)"}` }}>
              <p style={{ fontFamily: "DM Mono, monospace", fontSize: "0.7rem", letterSpacing: "0.2em", color: dark ? "#d4a017" : "#b8860b", marginBottom: "0.75rem" }}>
                CAREER OBJECTIVE
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: dark ? "#9993b8" : "#6b6680", lineHeight: 1.7 }}>
                Seeking opportunities as a <strong style={{ color: dark ? "#a89fe8" : "#2d2a6e" }}>Lecturer</strong>, <strong style={{ color: dark ? "#a89fe8" : "#2d2a6e" }}>Office Coordinator</strong>, or <strong style={{ color: dark ? "#a89fe8" : "#2d2a6e" }}>Assistant to Office Administrator</strong> — contributing to institutional growth, educational excellence, and organizational success.
              </p>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
