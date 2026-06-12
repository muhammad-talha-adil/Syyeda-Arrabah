import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "trainings", label: "Trainings" },
  { id: "languages", label: "Languages" },
  { id: "experience", label: "Experience" },
  { id: "hobbies", label: "Hobbies" },
  { id: "contact", label: "Contact" },
];

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navItems.map((n) => document.getElementById(n.id));
      let current = "home";
      for (const el of sections) {
        if (el && window.scrollY >= el.offsetTop - 120) current = el.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const glass =
    theme === "dark"
      ? "bg-[#0e0c24]/80 border-b border-violet-900/30"
      : "bg-[#faf7f2]/80 border-b border-[#2d2a6e]/10";

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${scrolled ? glass : "bg-transparent"}`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2"
          style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, color: theme === "dark" ? "#d4a017" : "#2d2a6e" }}
        >
          <span style={{ fontSize: "1.1rem" }}>S.A</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="relative px-3 py-1.5 transition-colors duration-200"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.78rem",
                fontWeight: active === item.id ? 600 : 400,
                color:
                  active === item.id
                    ? theme === "dark" ? "#d4a017" : "#2d2a6e"
                    : theme === "dark" ? "#9993b8" : "#6b6680",
                letterSpacing: "0.04em",
              }}
            >
              {item.label}
              {active === item.id && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute bottom-0 left-3 right-3 h-px rounded-full"
                  style={{ background: theme === "dark" ? "#d4a017" : "#2d2a6e" }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-200"
            style={{ color: theme === "dark" ? "#d4a017" : "#2d2a6e" }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2"
            style={{ color: theme === "dark" ? "#d4a017" : "#2d2a6e" }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
            style={{ background: theme === "dark" ? "#0e0c24" : "#faf7f2" }}
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="py-2 text-left transition-colors"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.875rem",
                    color: active === item.id
                      ? theme === "dark" ? "#d4a017" : "#2d2a6e"
                      : theme === "dark" ? "#9993b8" : "#6b6680",
                    fontWeight: active === item.id ? 600 : 400,
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
