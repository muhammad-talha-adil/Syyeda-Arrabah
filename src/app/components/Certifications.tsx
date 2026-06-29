import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Award, CalendarDays, Expand, FileImage, Medal, ShieldCheck, Sparkles, X } from "lucide-react";
import { SectionWrapper, SectionHeading } from "./SectionWrapper";

interface Props {
  theme: "light" | "dark";
}

type Certificate = {
  title: string;
  issuer: string;
  filename: string;
  accent: string;
  icon: typeof Medal;
  subtitle: string;
};

const certificateFiles = import.meta.glob("../../assets/certificates/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const certificates: Certificate[] = [
  {
    title: "Human Psychology",
    issuer: "Mind Luster",
    filename: "human psychology by mind luster.jpg",
    accent: "#7c3aed",
    icon: Sparkles,
    subtitle: "Behavioral sciences and human understanding",
  },
  {
    title: "Human Resource Management",
    issuer: "Saylor Academy",
    filename: "slayor accademy award for HR Management.jpg",
    accent: "#2563eb",
    icon: ShieldCheck,
    subtitle: "People operations and workplace coordination",
  },
  {
    title: "Professional Photography",
    issuer: "Mind Luster",
    filename: "certificate of preofessional phototgraphy by mind luster.jpg",
    accent: "#d97706",
    icon: FileImage,
    subtitle: "Creative visual composition and camera skills",
  },
  {
    title: "Agile Project Management",
    issuer: "HP LIFE",
    filename: "agile project management by HP.jpg",
    accent: "#059669",
    icon: Medal,
    subtitle: "Delivery planning and agile workflows",
  },
  {
    title: "Conversations with ChatGPT",
    issuer: "OpenAI Training",
    filename: "Empowering converstaion with chatgpt.jpg",
    accent: "#dc2626",
    icon: Sparkles,
    subtitle: "AI-assisted communication and productivity",
  },
  {
    title: "Network Marketing",
    issuer: "Professional Development",
    filename: "network marketing.jpg",
    accent: "#be185d",
    icon: Award,
    subtitle: "Audience growth and outreach strategy",
  },
  {
    title: "Diabetes and Obesity Course",
    issuer: "EACCME",
    filename: "EACCME awarded.jpg",
    accent: "#0891b2",
    icon: CalendarDays,
    subtitle: "Health awareness and medical learning",
  },
  {
    title: "Pharmacy Technician",
    issuer: "Alison",
    filename: "pharmacy techniscian by Alison.jpg",
    accent: "#b8860b",
    icon: Medal,
    subtitle: "Pharmacy support and dispensing knowledge",
  },
  {
    title: "Business-Proficient English",
    issuer: "Saylor Academy",
    filename: "Saylor accademy award for Bussiness proficiant english.jpg",
    accent: "#0f766e",
    icon: ShieldCheck,
    subtitle: "Professional communication and business English",
  },
  {
    title: "DigiSkills Training",
    issuer: "DigiSkills.pk",
    filename: "Training Certificates from DGskills.pk.jpg",
    accent: "#7c2d12",
    icon: FileImage,
    subtitle: "Digital skills and training portfolio",
  },
];

function getCertificateImage(filename: string) {
  const path = `../../assets/certificates/${filename}`;
  return certificateFiles[path];
}

export function Certifications({ theme }: Props) {
  const dark = theme === "dark";
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <section
      id="certifications"
      className="py-24 px-6"
      style={{
        background: dark
          ? "radial-gradient(circle at top, rgba(124,58,237,0.18), transparent 38%), #0e0c24"
          : "radial-gradient(circle at top, rgba(212,160,23,0.12), transparent 38%), #faf7f2",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionWrapper>
          <SectionHeading label="05 - Credentials" title="Certifications" theme={theme} />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {certificates.map((cert, i) => {
              const image = getCertificateImage(cert.filename);
              const Icon = cert.icon;

              return (
                <motion.button
                  key={cert.filename}
                  type="button"
                  onClick={() => setSelected(cert)}
                  className="group text-left rounded-2xl p-4 sm:p-5 cursor-pointer overflow-hidden"
                  style={{
                    background: dark ? "rgba(22,19,58,0.72)" : "rgba(255,255,255,0.88)",
                    border: `1px solid ${cert.accent}22`,
                    boxShadow: dark ? "0 18px 45px rgba(0,0,0,0.24)" : "0 18px 45px rgba(24,20,72,0.08)",
                    backdropFilter: "blur(12px)",
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.45 }}
                  whileHover={{
                    y: -8,
                    scale: 1.01,
                    borderColor: `${cert.accent}55`,
                    boxShadow: `0 22px 55px ${cert.accent}18`,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative mb-4 overflow-hidden rounded-xl">
                    <img
                      src={image}
                      alt={cert.title}
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 0%, rgba(14,12,36,0.1) 48%, rgba(14,12,36,0.68) 100%)",
                      }}
                    />
                    <div
                      className="absolute left-3 top-3 rounded-full px-3 py-1 text-[0.62rem] tracking-[0.22em] uppercase text-white/95"
                      style={{ background: `${cert.accent}cc` }}
                    >
                      {cert.issuer}
                    </div>
                    <div className="absolute right-3 top-3 rounded-full p-2 bg-white/12 backdrop-blur-sm text-white">
                      <Expand size={16} />
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: `${cert.accent}18`, color: cert.accent }}
                    >
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4
                        className="truncate"
                        style={{
                          fontFamily: "Playfair Display, serif",
                          fontWeight: 700,
                          fontSize: "1rem",
                          color: dark ? "#f0ece3" : "#1c1a3e",
                        }}
                      >
                        {cert.title}
                      </h4>
                      <p
                        className="mt-1"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "0.82rem",
                          lineHeight: 1.5,
                          color: dark ? "#b9b3d6" : "#67637d",
                        }}
                      >
                        {cert.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.64rem] uppercase tracking-[0.22em]"
                      style={{
                        background: dark ? "rgba(255,255,255,0.06)" : "rgba(45,42,110,0.06)",
                        color: dark ? "#cfc9ea" : "#4b476d",
                      }}
                    >
                      <Award size={12} />
                      Certified
                    </span>
                    <span
                      style={{
                        fontFamily: "DM Mono, monospace",
                        fontSize: "0.66rem",
                        letterSpacing: "0.12em",
                        color: cert.accent,
                      }}
                    >
                      VIEW CERTIFICATE
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </SectionWrapper>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-10"
            style={{ background: "rgba(7, 9, 20, 0.78)", backdropFilter: "blur(14px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative w-full max-w-5xl overflow-hidden rounded-[28px] border"
              style={{
                background: dark ? "linear-gradient(180deg, #171336 0%, #0f0d24 100%)" : "#fffdf8",
                borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(45,42,110,0.12)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
              }}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="absolute right-4 top-4 z-10">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white backdrop-blur-md transition-transform hover:scale-105"
                  aria-label="Close certificate preview"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
                <div className="relative bg-black/10">
                  <motion.img
                    key={selected.filename}
                    src={getCertificateImage(selected.filename)}
                    alt={selected.title}
                    className="h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45 }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(180deg, rgba(14,12,36,0.02) 0%, rgba(14,12,36,0.28) 100%)",
                    }}
                  />
                </div>

                <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                  <div>
                    <div
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.64rem] uppercase tracking-[0.22em]"
                      style={{
                        background: `${selected.accent}18`,
                        color: selected.accent,
                      }}
                    >
                      <ShieldCheck size={12} />
                      Verified Achievement
                    </div>

                    <h3
                      className="mt-5"
                      style={{
                        fontFamily: "Playfair Display, serif",
                        fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                        color: dark ? "#f0ece3" : "#1c1a3e",
                        lineHeight: 1.1,
                        fontWeight: 700,
                      }}
                    >
                      {selected.title}
                    </h3>

                    <p
                      className="mt-3"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        color: dark ? "#b9b3d6" : "#67637d",
                        lineHeight: 1.7,
                      }}
                    >
                      {selected.subtitle}. This certificate has been placed in a refined preview view so it feels
                      polished and presentation-ready when opened.
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div
                        className="rounded-2xl p-4"
                        style={{
                          background: dark ? "rgba(255,255,255,0.05)" : "rgba(45,42,110,0.05)",
                        }}
                      >
                        <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[#8d85af]">Issuer</p>
                        <p className="mt-2 text-sm" style={{ color: dark ? "#f0ece3" : "#1c1a3e" }}>
                          {selected.issuer}
                        </p>
                      </div>
                      <div
                        className="rounded-2xl p-4"
                        style={{
                          background: dark ? "rgba(255,255,255,0.05)" : "rgba(45,42,110,0.05)",
                        }}
                      >
                        <p className="text-[0.65rem] uppercase tracking-[0.22em] text-[#8d85af]">Status</p>
                        <p className="mt-2 text-sm" style={{ color: dark ? "#f0ece3" : "#1c1a3e" }}>
                          Professional certificate
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="mt-8 flex items-center gap-3 rounded-2xl px-4 py-3"
                    style={{
                      background: dark ? "rgba(255,255,255,0.05)" : "rgba(45,42,110,0.05)",
                    }}
                  >
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-full"
                      style={{ background: `${selected.accent}18`, color: selected.accent }}
                    >
                      <Award size={18} />
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          color: dark ? "#f0ece3" : "#1c1a3e",
                          fontWeight: 600,
                        }}
                      >
                        Click outside the card or press the close button to exit
                      </p>
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          color: dark ? "#b9b3d6" : "#67637d",
                          fontSize: "0.85rem",
                        }}
                      >
                        A smooth modal transition keeps the certificate presentation elegant.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
