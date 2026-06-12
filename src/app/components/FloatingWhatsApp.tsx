import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  const phone = "923107683064";
  const message = encodeURIComponent("Hi Syyeda Arrabah! I visited your portfolio and would like to connect.");
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center rounded-full"
      style={{
        width: 56,
        height: 56,
        background: "#25D366",
        boxShadow: "0 0 0 0 rgba(37,211,102,0.4)",
        textDecoration: "none",
      }}
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(37,211,102,0.4)",
          "0 0 0 12px rgba(37,211,102,0)",
          "0 0 0 0 rgba(37,211,102,0)",
        ],
      }}
      transition={{ duration: 2, repeat: Infinity }}
      whileHover={{ scale: 1.12, boxShadow: "0 8px 30px rgba(37,211,102,0.4)" }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} color="#fff" fill="#fff" />
    </motion.a>
  );
}
