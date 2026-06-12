interface Props { theme: "light" | "dark" }

export function Footer({ theme }: Props) {
  const dark = theme === "dark";
  return (
    <footer
      className="py-8 px-6 text-center"
      style={{
        background: dark ? "#070617" : "#ede9fe",
        borderTop: `1px solid ${dark ? "rgba(168,159,232,0.1)" : "rgba(45,42,110,0.08)"}`,
      }}
    >
      <p style={{ fontFamily: "Playfair Display, serif", fontStyle: "italic", fontSize: "0.95rem", color: dark ? "#d4a017" : "#b8860b", marginBottom: "0.4rem" }}>
        Syyeda Arrabah
      </p>
      <p style={{ fontFamily: "DM Mono, monospace", fontSize: "0.65rem", color: dark ? "#9993b8" : "#6b6680", letterSpacing: "0.15em" }}>
        EDUCATOR · RESEARCHER · ADMINISTRATOR
      </p>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.75rem", color: dark ? "#9993b8" : "#6b6680", marginTop: "0.75rem" }}>
        © {new Date().getFullYear()} · All rights reserved
      </p>
    </footer>
  );
}
