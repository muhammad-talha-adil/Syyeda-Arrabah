import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { motion } from "motion/react";
import { Scissors, PenLine, Palette, Coffee, BookOpen } from "lucide-react";

interface Props { theme: "light" | "dark" }

const hobbies = [
  { name: "Crafting", icon: Scissors, color: "#7c3aed", desc: "Creating handmade art with precision, patience, and creative vision." },
  { name: "Sketching", icon: PenLine, color: "#2563eb", desc: "Capturing ideas and expressions through pencil strokes and line work." },
  { name: "Painting", icon: Palette, color: "#d97706", desc: "Bringing color and emotion to canvas through artistic exploration." },
  { name: "Baking", icon: Coffee, color: "#dc2626", desc: "Crafting delightful recipes with care, precision, and warmth." },
  { name: "Book Reading", icon: BookOpen, color: "#059669", desc: "Exploring knowledge, stories, and perspectives through literature." },
];

export function Hobbies({ theme }: Props) {
  const dark = theme === "dark";

  return (
    <section
      id="hobbies"
      className="py-24 px-6"
      style={{ background: dark ? "#0e0c24" : "#faf7f2" }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionWrapper>
          <SectionHeading label="09 — Personal Life" title="Hobbies & Interests" theme={theme} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {hobbies.map(({ name, icon: Icon, color, desc }, i) => (
              <motion.div
                key={name}
                className="rounded-2xl p-5 text-center group cursor-default"
                style={{
                  background: dark ? "rgba(22,19,58,0.7)" : "rgba(255,255,255,0.85)",
                  border: `1px solid ${color}22`,
                  backdropFilter: "blur(8px)",
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, boxShadow: `0 20px 50px ${color}25`, borderColor: `${color}50` }}
              >
                <motion.div
                  className="flex items-center justify-center rounded-2xl mx-auto mb-4"
                  style={{ width: 56, height: 56, background: `${color}15` }}
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon size={24} style={{ color }} />
                </motion.div>
                <h4
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: dark ? "#f0ece3" : "#1c1a3e",
                    marginBottom: "0.5rem",
                  }}
                >
                  {name}
                </h4>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.78rem",
                    color: dark ? "#9993b8" : "#6b6680",
                    lineHeight: 1.5,
                  }}
                >
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
