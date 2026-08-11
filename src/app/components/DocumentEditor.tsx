import { useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Download, FileText, Printer, Sparkles } from "lucide-react";
import {
  defaultCoverLetterDraft,
  defaultResumeDraft,
  downloadCoverLetterPdf,
  downloadResumePdf,
} from "../lib/atsDocuments";

type EditorKind = "resume" | "cover-letter";

interface Props {
  initialKind: EditorKind;
  theme: "light" | "dark";
}

export function DocumentEditor({ initialKind, theme }: Props) {
  const [kind, setKind] = useState<EditorKind>(initialKind);
  const dark = theme === "dark";
  const cardBg = dark ? "rgba(22,19,58,0.78)" : "rgba(255,255,255,0.92)";
  const border = dark ? "rgba(168,159,232,0.14)" : "rgba(45,42,110,0.1)";

  const backToSite = () => {
    window.location.assign(window.location.pathname);
  };

  const downloadPdf = async () => {
    if (kind === "resume") {
      await downloadResumePdf();
    } else {
      await downloadCoverLetterPdf();
    }
  };

  const printPreview = () => {
    window.print();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: dark
          ? "linear-gradient(135deg, #0e0c24 0%, #171336 45%, #0e0c24 100%)"
          : "linear-gradient(135deg, #faf7f2 0%, #ede9fe 45%, #faf7f2 100%)",
        color: dark ? "#f0ece3" : "#1c1a3e",
        padding: "24px",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <p
              style={{
                fontFamily: "DM Mono, monospace",
                letterSpacing: "0.18em",
                fontSize: "0.68rem",
                color: dark ? "#d4a017" : "#b8860b",
              }}
            >
              DOCUMENT PREVIEW
            </p>
            <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.8rem, 3vw, 2.8rem)", marginTop: 6 }}>
              ATS Resume Template
            </h1>
            <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#b9b2df" : "#5b5678", marginTop: 8 }}>
              Clean, print-ready layout with the same structure used in the exported PDF.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <motion.button
              type="button"
              onClick={backToSite}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full"
              style={buttonStyles(false, dark, border)}
              whileHover={{ scale: 1.03 }}
            >
              <ArrowLeft size={15} />
              Back to site
            </motion.button>
            <motion.button
              type="button"
              onClick={downloadPdf}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full"
              style={buttonStyles(true, dark)}
              whileHover={{ scale: 1.03 }}
            >
              <Download size={15} />
              Download PDF
            </motion.button>
            <motion.button
              type="button"
              onClick={printPreview}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full"
              style={buttonStyles(false, dark, border)}
              whileHover={{ scale: 1.03 }}
            >
              <Printer size={15} />
              Print
            </motion.button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: "resume" as const, label: "Resume", icon: FileText },
            { id: "cover-letter" as const, label: "Cover Letter", icon: Sparkles },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setKind(id)}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: kind === id ? (dark ? "#1e1a4a" : "#2d2a6e") : cardBg,
                color: kind === id ? "#fff" : dark ? "#c8c2e0" : "#3d3860",
                border: `1px solid ${kind === id ? "transparent" : border}`,
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.88rem",
                fontWeight: kind === id ? 700 : 500,
              }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        <div className="rounded-[28px] p-5 md:p-8 shadow-lg" style={{ background: cardBg, border: `1px solid ${border}`, backdropFilter: "blur(14px)" }}>
          <div className="mb-6">
            <p
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "0.68rem",
                letterSpacing: "0.18em",
                color: dark ? "#d4a017" : "#b8860b",
              }}
            >
              A4 PAGE PREVIEW
            </p>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "1.5rem", marginTop: 6 }}>
              {kind === "resume" ? defaultResumeDraft.name : defaultCoverLetterDraft.name}
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", color: dark ? "#a89fe8" : "#2d2a6e", fontWeight: 600 }}>
              {kind === "resume" ? defaultResumeDraft.title : defaultCoverLetterDraft.subject}
            </p>
          </div>

          {kind === "resume" ? (
            <div className="mx-auto flex flex-col gap-6" style={{ maxWidth: 760, padding: "10px 0 2px" }}>
              <PageShell>
                <div style={{ textAlign: "center", borderBottom: "2px solid #111827", paddingBottom: 12, marginBottom: 18 }}>
                  <h3 style={{ fontSize: 24, margin: 0, fontWeight: 700, letterSpacing: "0.01em" }}>{defaultResumeDraft.name}</h3>
                  <p style={{ margin: "5px 0 0", fontSize: 13, color: "#374151", fontWeight: 600 }}>{defaultResumeDraft.title}</p>
                  <div style={contactStripStyle}>
                    <a href={`tel:${defaultResumeDraft.phone.replace(/\s+/g, "")}`} style={contactLinkStyle}>
                      {defaultResumeDraft.phone}
                    </a>
                    <span style={contactDividerStyle}>|</span>
                    <a href={`mailto:${defaultResumeDraft.email}`} style={contactLinkStyle}>
                      {defaultResumeDraft.email}
                    </a>
                    <span style={contactDividerStyle}>|</span>
                    <a href={defaultResumeDraft.portfolioUrl} target="_blank" rel="noreferrer noopener" style={contactLinkStyle}>
                      Portfolio Website
                    </a>
                    <span style={contactDividerStyle}>|</span>
                    <a href={defaultResumeDraft.linkedinUrl} target="_blank" rel="noreferrer noopener" style={contactLinkStyle}>
                      LinkedIn Profile
                    </a>
                  </div>
                  <p style={{ margin: "6px 0 0", fontSize: 11.2, color: "#4b5563" }}>{defaultResumeDraft.location}</p>
                </div>

                <PreviewSection title="Professional Summary">
                  <p style={bodyText}>{defaultResumeDraft.summary}</p>
                </PreviewSection>

                <PreviewSection title="Core Competencies">
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {defaultResumeDraft.skillGroups.map((group) => (
                      <div key={group.title} style={compactBlock}>
                        <p style={blockTitle}>{group.title}</p>
                        <p style={{ margin: 0, fontSize: 12.3, color: "#374151", lineHeight: 1.55 }}>
                          {group.items.join(" | ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </PreviewSection>

                <div style={twoColGrid}>
                  <PreviewCard title="Professional Experience">
                    <p style={cardLabel}>{defaultResumeDraft.experience[0].role}</p>
                    <p style={cardMeta}>
                      {defaultResumeDraft.experience[0].org} | {defaultResumeDraft.experience[0].duration}
                    </p>
                    <p style={bodyText}>
                      Coordinated schedules, records, communication, and office workflow support while maintaining organized documentation and professional correspondence.
                    </p>
                  </PreviewCard>

                  <PreviewCard title="Research Focus">
                    <p style={bodyText}>
                      Neurolinguistics and brain-function relationships with a focus on language-focused analysis and professional communication.
                    </p>
                    <p style={{ ...bodyText, marginTop: 10 }}>
                      Evidence synthesis, documentation, and medical reporting supported by disciplined academic writing habits.
                    </p>
                  </PreviewCard>
                </div>
              </PageShell>

              <PageShell>
                <PreviewSection title="Education">
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {defaultResumeDraft.education.map((item) => (
                      <div key={`${item.degree}-${item.org}`}>
                        <p style={cardLabel}>{item.degree}</p>
                        <p style={cardMeta}>{item.org}</p>
                        <ul style={cardList}>
                          <li style={cardItem}>{item.note}</li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </PreviewSection>

                <div style={twoColGrid}>
                  <PreviewCard title="Certifications">
                    <ul style={cardList}>
                      {defaultResumeDraft.certifications.map((item) => (
                        <li key={item} style={cardItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </PreviewCard>

                  <PreviewCard title="Trainings">
                    <ul style={cardList}>
                      {defaultResumeDraft.trainings.map((item) => (
                        <li key={item} style={cardItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </PreviewCard>
                </div>

                <PreviewSection title="Languages">
                  <p style={bodyText}>{defaultResumeDraft.languagesLine}</p>
                </PreviewSection>
              </PageShell>
            </div>
          ) : (
            <div className="mx-auto" style={{ maxWidth: 760, padding: "10px 0 2px" }}>
              <PageShell>
                <div style={{ borderBottom: "1px solid #d1d5db", paddingBottom: 14, marginBottom: 18 }}>
                  <h3 style={{ fontSize: 24, margin: 0, fontWeight: 700 }}>{defaultCoverLetterDraft.name}</h3>
                  <p style={{ margin: "4px 0 0", fontSize: 13, color: "#374151" }}>{defaultCoverLetterDraft.title}</p>
                  <div style={contactStripStyle}>
                    <a href={`tel:${defaultCoverLetterDraft.phone.replace(/\s+/g, "")}`} style={contactLinkStyle}>
                      {defaultCoverLetterDraft.phone}
                    </a>
                    <span style={contactDividerStyle}>|</span>
                    <a href={`mailto:${defaultCoverLetterDraft.email}`} style={contactLinkStyle}>
                      {defaultCoverLetterDraft.email}
                    </a>
                    <span style={contactDividerStyle}>|</span>
                    <a href={defaultCoverLetterDraft.portfolioUrl} target="_blank" rel="noreferrer noopener" style={contactLinkStyle}>
                      Portfolio Website
                    </a>
                    <span style={contactDividerStyle}>|</span>
                    <a href={defaultCoverLetterDraft.linkedinUrl} target="_blank" rel="noreferrer noopener" style={contactLinkStyle}>
                      LinkedIn Profile
                    </a>
                  </div>
                  <p style={{ margin: "6px 0 0", fontSize: 11.2, color: "#4b5563" }}>{defaultCoverLetterDraft.location}</p>
                </div>

                <PreviewSection title="Details">
                  <p style={bodyText}>Date: {defaultCoverLetterDraft.date}</p>
                  <p style={bodyText}>Recipient: {defaultCoverLetterDraft.recipient}</p>
                  <p style={bodyText}>Subject: {defaultCoverLetterDraft.subject}</p>
                </PreviewSection>

                <PreviewSection title="Body">
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {defaultCoverLetterDraft.paragraphs.map((paragraph, index) => (
                      <p
                        key={`${index}-${paragraph.slice(0, 18)}`}
                        style={{
                          margin: 0,
                          ...bodyText,
                          fontWeight:
                            paragraph === "Dear Hiring Manager," || paragraph === "Sincerely," || paragraph === defaultCoverLetterDraft.name
                              ? 700
                              : 400,
                        }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </PreviewSection>
              </PageShell>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PageShell({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 595,
        background: "#fff",
        color: "#111827",
        padding: "52px 50px",
        boxShadow: "0 18px 48px rgba(0,0,0,0.18)",
        borderRadius: 2,
        fontFamily: "Arial, Helvetica, sans-serif",
        lineHeight: 1.55,
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  );
}

function PreviewSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <p style={sectionLabel}>{title}</p>
      {children}
    </div>
  );
}

function PreviewCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ border: "1px solid #dbe1ea", borderRadius: 12, padding: 14, background: "#fafafa" }}>
      <p style={sectionLabel}>{title}</p>
      {children}
    </div>
  );
}

const buttonStyles = (primary: boolean, dark: boolean, border?: string): CSSProperties => ({
  background: primary ? (dark ? "#d4a017" : "#2d2a6e") : "transparent",
  color: primary ? (dark ? "#0e0c24" : "#fff") : dark ? "#f0ece3" : "#2d2a6e",
  border: primary ? "none" : `1px solid ${border ?? "transparent"}`,
  cursor: "pointer",
  fontFamily: "Inter, sans-serif",
  fontSize: "0.9rem",
  fontWeight: primary ? 700 : 600,
});

const sectionLabel: CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#4b5563",
  marginBottom: 8,
};

const bodyText: CSSProperties = {
  fontSize: 12.5,
  color: "#111827",
  lineHeight: 1.65,
};

const compactBlock: CSSProperties = {
  padding: "10px 12px",
  border: "1px solid #e5e7eb",
  borderRadius: 10,
  background: "#fafafa",
};

const blockTitle: CSSProperties = {
  margin: "0 0 6px",
  fontSize: 12,
  fontWeight: 700,
  color: "#1f2937",
};

const twoColGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 12,
  marginBottom: 18,
};

const cardLabel: CSSProperties = {
  margin: 0,
  fontSize: 13,
  fontWeight: 700,
  color: "#111827",
};

const cardMeta: CSSProperties = {
  margin: "4px 0 8px",
  fontSize: 12,
  color: "#4f46e5",
  lineHeight: 1.5,
};

const cardList: CSSProperties = {
  margin: 0,
  paddingLeft: 18,
};

const cardItem: CSSProperties = {
  ...bodyText,
  marginBottom: 4,
};

const contactStripStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
  marginTop: 8,
  fontSize: 11.2,
  color: "#4b5563",
};

const contactLinkStyle: CSSProperties = {
  color: "#2d2a6e",
  textDecoration: "none",
  fontWeight: 600,
};

const contactDividerStyle: CSSProperties = {
  color: "#9ca3af",
};
