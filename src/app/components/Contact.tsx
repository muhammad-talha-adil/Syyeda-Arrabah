import { useState } from "react";
import { SectionWrapper, SectionHeading } from "./SectionWrapper";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";

interface Props { theme: "light" | "dark" }

export function Contact({ theme }: Props) {
  const dark = theme === "dark";
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const glass = dark
    ? "bg-[rgba(22,19,58,0.7)] border border-[rgba(168,159,232,0.12)]"
    : "bg-[rgba(255,255,255,0.85)] border border-[rgba(45,42,110,0.1)]";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: 10,
    background: dark ? "rgba(30,26,74,0.6)" : "rgba(240,236,227,0.6)",
    border: `1px solid ${dark ? "rgba(168,159,232,0.18)" : "rgba(45,42,110,0.12)"}`,
    color: dark ? "#f0ece3" : "#1c1a3e",
    fontFamily: "Inter, sans-serif",
    fontSize: "0.875rem",
    outline: "none",
  };

  return (
    <section
      id="contact"
      className="py-24 px-6"
      style={{ background: dark ? "#0a0820" : "#f5f0e8" }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionWrapper>
          <SectionHeading label="12 — Get In Touch" title="Contact" theme={theme} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact info */}
            <div className="space-y-4">
              {[
                { icon: MapPin, label: "Location", value: "Jalalpur Bhattian, Hafizabad, Pakistan" },
                { icon: Phone, label: "Phone", value: "+92 310 7683064", href: "tel:+923107683064" },
                { icon: Mail, label: "Email", value: "arrabahnaqvi514@gmail.com", href: "mailto:arrabahnaqvi514@gmail.com" },
              ].map(({ icon: Icon, label, value, href }) => (
                <motion.div
                  key={label}
                  className={`rounded-xl p-5 flex items-start gap-4 ${glass} backdrop-blur-sm`}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="flex items-center justify-center rounded-lg flex-shrink-0"
                    style={{ width: 44, height: 44, background: dark ? "rgba(212,160,23,0.12)" : "rgba(45,42,110,0.07)" }}
                  >
                    <Icon size={18} style={{ color: dark ? "#d4a017" : "#2d2a6e" }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "DM Mono, monospace", fontSize: "0.65rem", color: dark ? "#9993b8" : "#6b6680", letterSpacing: "0.12em", marginBottom: "0.2rem" }}>
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: dark ? "#a89fe8" : "#2d2a6e", fontWeight: 500, textDecoration: "none" }}
                      >
                        {value}
                      </a>
                    ) : (
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: dark ? "#f0ece3" : "#1c1a3e", fontWeight: 500 }}>{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              <div
                className={`rounded-xl p-6 ${glass} backdrop-blur-sm`}
                style={{ background: dark ? "linear-gradient(135deg, rgba(22,19,58,0.9), rgba(45,42,110,0.4))" : "linear-gradient(135deg, rgba(237,233,254,0.8), rgba(255,255,255,0.8))" }}
              >
                <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", color: dark ? "#d4a017" : "#b8860b", fontSize: "1rem", lineHeight: 1.6 }}>
                  "Committed to excellence in education, research, and administration — always ready for meaningful collaboration."
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className={`rounded-2xl p-6 ${glass} backdrop-blur-sm`}>
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 py-10">
                  <CheckCircle size={48} style={{ color: "#059669" }} />
                  <h3 style={{ fontFamily: "Playfair Display, serif", color: dark ? "#f0ece3" : "#1c1a3e", fontSize: "1.2rem" }}>
                    Message Sent!
                  </h3>
                  <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#9993b8" : "#6b6680", textAlign: "center" }}>
                    Thank you for reaching out. I'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: dark ? "#a89fe8" : "#2d2a6e", background: "none", border: "none", cursor: "pointer" }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, color: dark ? "#f0ece3" : "#1c1a3e", marginBottom: "0.5rem" }}>
                    Send a Message
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      style={inputStyle}
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                    <input
                      style={inputStyle}
                      type="email"
                      placeholder="Your email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  <input
                    style={inputStyle}
                    placeholder="Subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    required
                  />
                  <textarea
                    style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                    placeholder="Your message..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                  <motion.button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl"
                    style={{
                      background: dark ? "#d4a017" : "#2d2a6e",
                      color: dark ? "#0e0c24" : "#fff",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                    }}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? (
                      <motion.div
                        className="w-4 h-4 border-2 rounded-full border-t-transparent"
                        style={{ borderColor: dark ? "#0e0c24" : "#fff", borderTopColor: "transparent" }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  );
}
