import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { motion } from "motion/react";
import { User, Calendar, Globe, Heart, QrCode, Scan } from "lucide-react";

interface Props { theme: "light" | "dark" }

const personalInfo = [
  { label: "Date of Birth", value: "13 April 2002", icon: Calendar },
  { label: "Nationality", value: "Pakistani", icon: Globe },
  { label: "Religion", value: "Islam", icon: Heart },
  { label: "Gender", value: "Female", icon: User },
  { label: "Marital Status", value: "Single", icon: Heart },
];

export function PersonalQR({ theme }: Props) {
  const dark = theme === "dark";
  const glass = dark
    ? "bg-[rgba(22,19,58,0.7)] border border-[rgba(168,159,232,0.12)]"
    : "bg-[rgba(255,255,255,0.85)] border border-[rgba(45,42,110,0.1)]";

  return (
    <>
      {/* Personal Info section */}
      <section
        className="py-16 px-6"
        style={{ background: dark ? "#0a0820" : "#f5f0e8" }}
      >
        <div className="max-w-5xl mx-auto">
          <SectionWrapper>
            <SectionHeading label="10 — Personal Details" title="Personal Information" theme={theme} />
            <div className="flex flex-wrap justify-center gap-4">
              {personalInfo.map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className={`rounded-xl px-5 py-4 flex items-center gap-3 ${glass} backdrop-blur-sm`}
                >
                  <Icon size={16} style={{ color: dark ? "#d4a017" : "#b8860b", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontFamily: "DM Mono, monospace", fontSize: "0.62rem", color: dark ? "#9993b8" : "#6b6680", letterSpacing: "0.12em" }}>{label}</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "0.9rem", color: dark ? "#f0ece3" : "#1c1a3e" }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* QR Code section */}
      <section
        id="qr"
        className="py-20 px-6"
        style={{ background: dark ? "#0e0c24" : "#faf7f2" }}
      >
        <div className="max-w-3xl mx-auto">
          <SectionWrapper>
            <SectionHeading label="11 — Digital Access" title="Professional QR Access" theme={theme} />
            <div className="flex justify-center">
              <div
                className={`rounded-2xl p-8 ${glass} backdrop-blur-sm text-center`}
                style={{ maxWidth: 320, width: "100%" }}
              >
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: dark ? "#9993b8" : "#6b6680", marginBottom: "1.5rem" }}>
                  Scan to access portfolio
                </p>

                {/* QR placeholder */}
                <div className="relative flex items-center justify-center mx-auto mb-4" style={{ width: 180, height: 180 }}>
                  {/* Scan animation corners */}
                  {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
                    <div
                      key={i}
                      className={`absolute ${pos} w-6 h-6`}
                      style={{
                        borderTop: i < 2 ? `2px solid ${dark ? "#d4a017" : "#b8860b"}` : "none",
                        borderBottom: i >= 2 ? `2px solid ${dark ? "#d4a017" : "#b8860b"}` : "none",
                        borderLeft: i % 2 === 0 ? `2px solid ${dark ? "#d4a017" : "#b8860b"}` : "none",
                        borderRight: i % 2 === 1 ? `2px solid ${dark ? "#d4a017" : "#b8860b"}` : "none",
                      }}
                    />
                  ))}

                  <div
                    className="w-40 h-40 rounded-xl flex items-center justify-center"
                    style={{ background: dark ? "rgba(30,26,74,0.8)" : "rgba(237,233,254,0.6)", border: `1px dashed ${dark ? "rgba(168,159,232,0.25)" : "rgba(45,42,110,0.2)"}` }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <QrCode size={40} style={{ color: dark ? "#a89fe8" : "#4f46e5", opacity: 0.6 }} />
                      <p style={{ fontFamily: "DM Mono, monospace", fontSize: "0.6rem", color: dark ? "#9993b8" : "#6b6680", textAlign: "center" }}>
                        QR Code
                        <br />placeholder
                      </p>
                    </div>
                  </div>

                  {/* Scan line animation */}
                  <motion.div
                    className="absolute left-2 right-2 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${dark ? "#d4a017" : "#b8860b"}, transparent)` }}
                    animate={{ top: ["10%", "90%", "10%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                <div className="flex items-center justify-center gap-2 mt-2">
                  <Scan size={13} style={{ color: dark ? "#9993b8" : "#6b6680" }} />
                  <span style={{ fontFamily: "DM Mono, monospace", fontSize: "0.65rem", color: dark ? "#9993b8" : "#6b6680", letterSpacing: "0.1em" }}>
                    PROFESSIONAL PORTFOLIO
                  </span>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>
    </>
  );
}
