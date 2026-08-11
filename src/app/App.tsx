import { useState, useEffect, useCallback } from "react";
import { Loader } from "./components/Loader";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Education } from "./components/Education";
import { Research } from "./components/Research";
import { Skills } from "./components/Skills";
import { Certifications } from "./components/Certifications";
import { Trainings } from "./components/Trainings";
import { Languages } from "./components/Languages";
import { Experience } from "./components/Experience";
import { Hobbies } from "./components/Hobbies";
import { PersonalQR } from "./components/PersonalQR";
import { Contact } from "./components/Contact";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { Footer } from "./components/Footer";
import { DocumentEditor } from "./components/DocumentEditor";

type Theme = "light" | "dark";
type EditorKind = "resume" | "cover-letter";

function getInitialTheme(): Theme {
  const saved = localStorage.getItem("portfolio-theme") as Theme | null;
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const initialEditorKind = (() => {
    const params = new URLSearchParams(window.location.search);
    const editor = params.get("editor");
    return editor === "resume" || editor === "cover-letter" ? editor : null;
  })();

  const [loading, setLoading] = useState(!initialEditorKind);
  const [theme, setTheme] = useState<Theme>("dark");
  const [editorKind, setEditorKind] = useState<EditorKind | null>(initialEditorKind);

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const editor = params.get("editor");
      const nextEditor = editor === "resume" || editor === "cover-letter" ? editor : null;
      setEditorKind(nextEditor);
      setLoading(!nextEditor);
    };

    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("portfolio-theme", theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && !editorKind && <Loader onComplete={handleLoaderComplete} />}

      {!loading && !editorKind && (
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            minHeight: "100vh",
            background: theme === "dark" ? "#0e0c24" : "#faf7f2",
            transition: "background 0.3s ease, color 0.3s ease",
          }}
        >
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          <main>
            <Hero theme={theme} />
            <About theme={theme} />
            <Education theme={theme} />
            <Research theme={theme} />
            <Skills theme={theme} />
            <Certifications theme={theme} />
            <Trainings theme={theme} />
            <Languages theme={theme} />
            <Experience theme={theme} />
            <Hobbies theme={theme} />
            <PersonalQR theme={theme} />
            <Contact theme={theme} />
          </main>

          <Footer theme={theme} />
          <FloatingWhatsApp />
        </div>
      )}

      {!loading && editorKind && <DocumentEditor initialKind={editorKind} theme={theme} />}
    </>
  );
}
