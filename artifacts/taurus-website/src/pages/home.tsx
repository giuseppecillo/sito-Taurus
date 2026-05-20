import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight,
  Map,
  Leaf,
  Tractor,
  Satellite,
  CheckCircle2,
  LayoutDashboard,
  Cloud,
  Bug,
  FileBarChart2,
  Layers,
  Smartphone,
  Radio,
  Thermometer,
  Droplets,
  Globe
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/i18n/translations";
import { LazyImage } from "@/components/LazyImage";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

/* ─── Blur-up placeholder thumbnails (20×15px base64 JPEG) ─── */
const THUMB: Record<string, string> = {
  "img-aerial-field":      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAPABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAUGB//EACYQAAEDAwMDBQEAAAAAAAAAAAECAxEABAUSEyEGQVExMmFxkdH/xAAWAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAaEQEAAgMBAAAAAAAAAAAAAAABAAIDEjER/9oADAMBAAIRAxEAPwBH0bkcJjkvOZJnVclUIWqCEpjwe81ROZXp/f3cbYITehwLDm0Bqn3T8R/azSm7jlujEMuNrUXHE7akmenY80ZsK22Hsos+Rrk+sLhq/dbxSG0WyVEAOALJM8wRHH790VKK06jpnTPE+KK3MNA5DZn/2Q==",
  "img-tractor-tablet":    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAQCAwb/xAAmEAABAwMCBQUAAAAAAAAAAAABAgMRAAQhBRIGExQiUSMxYXHB/8QAFgEBAQEAAAAAAAAAAAAAAAAAAQME/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAERITH/2gAMAwEAAhEDEQA/AH9M1XZbIdB7oyEinW+K0JMO25Wd0dhz9R5rJ2zwwEvAGMjlx+0XTfUoR6oSUKkKCSIPmskr0vHCWpNP3V84+Lhat5nPuPiiqGmb1lJQ1qMIkkAomimNcA//2Q==",
  "img-tractor-app-botte": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQFAwb/xAAkEAABBAEFAAEFAAAAAAAAAAABAgMEEQAFEiExQXETIpGxwf/EABUBAQEAAAAAAAAAAAAAAAAAAAIB/8QAGREAAgMBAAAAAAAAAAAAAAAAAAIBAzES/9oADAMBAAIRAxEAPwBXSjp6W3zI0uE8lTm5Ljw6tIsDkCgb+LzfUm4LcN4N6LDbcLZUjag3zYsUfn8Zyjkl2SyefvV2brzv9Y1EmuQoyFoX9RKBwBxXt17hep00K2K2F2GtyNDZajxmVAIG4u1uKvfMMks6200jZIZUV3dg9g8/3DDHZD//2Q==",
  "img-iot-connect":       "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAPABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQHBv/EACQQAAIBAwMDBQAAAAAAAAAAAAECAwAEEQYSIgUhMRNxgZGh/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAME/8QAGxEAAgIDAQAAAAAAAAAAAAAAAREAAgQTMmH/2gAMAwEAAhEDEQA/ACPU0qvtiS2de3Iqw/M082prlUZVjtjgECRVOPfuan8t8ofdsCo+SFQnj904er+pYC1jjB5hizDv4waEUNiiYDtVITd2+qbgQIHjidgOTbfJ+DRU9Nwy+MUVDil9zRu8n//Z",
  "img-agronomist-tablet": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAPABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQGAf/EACcQAAIBAwIEBwEAAAAAAAAAAAECAwAEEQUhBhIxQRYiMmGBsdHw/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAME/8QAHhEAAQMEAwAAAAAAAAAAAAAAAAEDEQITITFSYaH/2gAMAwEAAhEDEQA/AGZOJb0yw6kvktI15Gt1YYdiThmJHTb+zTCcdhGxLZou3TnOfqpeHUIlmmtnflZ4t4iuz4ORuOnetXUmkdgCGZVB9O9Za3lTSDEFZ49i7WY+ZD+UVKPqkiNgsV9sUVO+5x9E9n//2Q==",
  "img-crop-disease":      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAPABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABQACBP/EACYQAAIBAwMDBAMAAAAAAAAAAAECAwAEERIhQRMiMQUUM1FxgZH/xAAWAQEBAQAAAAAAAAAAAAAAAAADBAX/xAAcEQACAQUBAAAAAAAAAAAAAAAAAQIDERIxUfD/2gAMAwEAAhEDEQA/ADLG8VUKv3Ej486ccYp/3okkjKOFUNhyPIOOaImg67JLa6ZOk2mQMuNscZ881hbZy9tBOqrFJKWkIO5+xt/az7KbKdCl56gDcFjaCTUNmAO/G+PxVXZZWVoYmSFpJ4o3Ko57Tj6x+6qZUJeYea4f/9k=",
  "farm-screen-1":         "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQFAQf/xAAlEAACAQQBAQkAAAAAAAAAAAABAgMABAURIQYSIjEzQYGSweH/xAAWAQEBAQAAAAAAAAAAAAAAAAACAQP/xAAbEQACAgMBAAAAAAAAAAAAAAAAARNRAhESYv/aAAwDAQACEQMRAD8A6NBBIlqYnlZnO++eTSVw+UgmK28CTprgs+ifYCnbeO5VyZ5UZdcBU19mo/UeTurC5hW2cKGQk7XfrU2B49KjZHzbOSluoB8NP+UVJTqHI9nzV+AopyqjOD0z/9k=",
  "farm-screen-2":         "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQFAgb/xAAkEAABAwQCAAcAAAAAAAAAAAACAQMEAAUREgYhEzI1QVFyk//EABcBAAMBAAAAAAAAAAAAAAAAAAACAwT/xAAdEQABBAIDAAAAAAAAAAAAAAASAAECAxFBE4Hw/9oADAMBAAIRAxEAPwDuZorIRtYtzSMiZQtMLtSRW+cXQcheJV9kEaxycosdxjaLvsK+QtKStzkM7o0y3EcAlXovFzjr4xTiMSfax22RaY77VNLTcMetyPzGiqgsiKYEnMfaignVuP2XX//Z",
  "farm-screen-3":         "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAIDAQf/xAAiEAACAgECBwEAAAAAAAAAAAABAgARIVFhAxITIiMxQYH/xAAVAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARAv/aAAwDAQACEQMRAD8A6LwmYrzMnTr4GvH5KCmz7k1HZVCtI60i4pRoBJzqiQ17wmeN8lVJ3EJdD//Z",
  "farm-screen-4":         "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAIGBQf/xAAnEAABAwMDAQkAAAAAAAAAAAABAgMRABITBAUhBhQjMUFCUZGhov/EABUBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFxEBAQEBAAAAAAAAAAAAAAAAAAESIf/aAAwDAQACEQMRAD8A6INTpy4W+1t5Jiy8TPtFOlvvAu5fPlxA+qndRsMbjmzMpWHVPi1Cr1eJAJmKzOnUbmredNldeLSSS5c7IPBjianVg5VkHHCJyfkUUwaUPQPmiqL/2Q==",
  "farm-screen-5":         "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAYDBAX/xAAjEAABAwMEAgMAAAAAAAAAAAABAAIDBBExBRITIQbRFEFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgT/xAAaEQADAAMBAAAAAAAAAAAAAAAAAQIDESGR/9oADAMBAAIRAxEAPwDaGtCS+zXH9GxHCfSn02rnq5opYdTlmj5ACPjOF++/rH6klr4mxbOwHEDcRgJ08Onp6aiLGve4SSkNG3GAjOWm9MnrFK7t+sY3OkDnXlfk4A9IVg08RJJYLlCRQf/Z",
  "app-vrt-maps":          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAYDBAX/xAAjEAABAwMEAgMAAAAAAAAAAAABAAIDBBExBRITIQbRFEFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgT/xAAaEQADAAMBAAAAAAAAAAAAAAAAAQIDESGR/9oADAMBAAIRAxEAPwDaGtCS+zXH9GxHCfSn02rnq5opYdTlmj5ACPjOF++/rH6klr4mxbOwHEDcRgJ08Onp6aiLGve4SSkNG3GAjOWm9MnrFK7t+sY3OkDnXlfk4A9IVg08RJJYLlCRQf/Z",
  "app-prescrizione":      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAIGBQf/xAAnEAABAwMDAQkAAAAAAAAAAAABAgMRABITBAUhBhQjMUFCUZGhov/EABUBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFxEBAQEBAAAAAAAAAAAAAAAAAAESIf/aAAwDAQACEQMRAD8A6INTpy4W+1t5Jiy8TPtFOlvvAu5fPlxA+qndRsMbjmzMpWHVPi1Cr1eJAJmKzOnUbmredNldeLSSS5c7IPBjianVg5VkHHCJyfkUUwaUPQPmiqL/2Q==",
  "app-malattie":          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAIDAQf/xAAiEAACAgECBwEAAAAAAAAAAAABAgARIVFhAxITIiMxQYH/xAAVAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAARAv/aAAwDAQACEQMRAD8A6LwmYrzMnTr4GvH5KCmz7k1HZVCtI60i4pRoBJzqiQ17wmeN8lVJ3EJdD//Z",
  "app-meteo":             "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQFAgb/xAAkEAABAwQCAAcAAAAAAAAAAAACAQMEAAUREgYhEzI1QVFyk//EABcBAAMBAAAAAAAAAAAAAAAAAAACAwT/xAAdEQABBAIDAAAAAAAAAAAAAAASAAECAxFBE4Hw/9oADAMBAAIRAxEAPwDuZorIRtYtzSMiZQtMLtSRW+cXQcheJV9kEaxycosdxjaLvsK+QtKStzkM7o0y3EcAlXovFzjr4xTiMSfax22RaY77VNLTcMetyPzGiqgsiKYEnMfaignVuP2XX//Z",
};

/* ─── Colors ─── */
const GREEN  = "#2d9b4e";
const BLUE   = "#3b82f6";
const TEAL   = "#0d9488";
const NAVY   = "#1e293b";
const AMBER  = "#f59e0b";
const RED_   = "#ef4444";
const PURPLE = "#8b5cf6";

/* Static (non-translated) properties for appFeatures */
const APP_FEATURE_STATIC = [
  { id: "appezzamenti", icon: LayoutDashboard, image: "/farm-screen-1.webp", color: GREEN, imgWidth: 4911, imgHeight: 2824, placeholder: THUMB["farm-screen-1"] },
  { id: "meteo",        icon: Cloud,           image: "/farm-screen-2.webp", color: TEAL,  imgWidth: 4517, imgHeight: 3104, placeholder: THUMB["farm-screen-2"] },
  { id: "malattie",     icon: Bug,             image: "/farm-screen-3.webp", color: AMBER, imgWidth: 4169, imgHeight: 3350, placeholder: THUMB["farm-screen-3"] },
  { id: "prescrizione", icon: FileBarChart2,   image: "/farm-screen-4.webp", color: GREEN, imgWidth: 6156, imgHeight: 3226, placeholder: THUMB["farm-screen-4"] },
  { id: "mappe",        icon: Layers,          image: "/farm-screen-5.webp", color: TEAL,  imgWidth: 6097, imgHeight: 2806, placeholder: THUMB["farm-screen-5"] },
];

/* Static crop properties */
const CROP_STATIC = [
  { icon: "🌾", risk: 72, color: AMBER  },
  { icon: "🍇", risk: 38, color: PURPLE },
  { icon: "🌿", risk: 55, color: GREEN  },
  { icon: "🍅", risk: 61, color: RED_   },
];

const LANG_OPTIONS: { code: Lang; flag: string; label: string }[] = [
  { code: "it", flag: "🇮🇹", label: "IT" },
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "es", flag: "🇪🇸", label: "ES" },
];

export default function Home() {
  const { lang, setLang, t } = useLanguage();
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const [langOpen, setLangOpen] = useState(false);
  const [demoEmail, setDemoEmail] = useState("");
  const [ctaEmail, setCtaEmail] = useState("");

  const CONTACT_EMAIL = "info@taurusagsolution.com";

  function openMailto(userEmail: string, subject: string) {
    const body = userEmail ? `Email: ${userEmail}` : "";
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const appFeatures = t.appFeatures.map((f, i) => ({
    ...APP_FEATURE_STATIC[i],
    label: f.label,
    title: f.title,
    description: f.description,
    badge: f.badge,
  }));

  const crops = t.crops.map((c, i) => ({
    ...CROP_STATIC[i],
    name: c.name,
    tag: c.tag,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 lg:px-12 bg-white/95 backdrop-blur border-b border-border shadow-sm">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/taurus-logo.webp"
            alt="Taurus Agriculture Solution"
            className="h-10 w-auto group-hover:opacity-90 transition-opacity"
            width={1952}
            height={2166}
            data-testid="img-navbar-logo"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {[
            { href: "#chi-siamo",  label: t.nav.chiSiamo    },
            { href: "#farm-vrt",   label: t.nav.ilProdotto  },
            { href: "#showcase",   label: t.nav.funzionalita },
            { href: "#malattie",   label: t.nav.malattie    },
            { href: "#solutions",  label: t.nav.soluzioni   }
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-foreground/70 hover:text-primary transition-colors"
              data-testid={`link-nav-${href.slice(1)}`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(o => !o)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm font-medium text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-colors"
              data-testid="btn-lang-switcher"
              aria-label="Select language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{LANG_OPTIONS.find(l => l.code === lang)?.flag}</span>
              <span className="hidden sm:inline">{lang.toUpperCase()}</span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-32 rounded-xl border border-border bg-white shadow-lg overflow-hidden z-50"
                >
                  {LANG_OPTIONS.map(opt => (
                    <button
                      key={opt.code}
                      onClick={() => { setLang(opt.code); setLangOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                      style={{ color: lang === opt.code ? GREEN : NAVY, fontWeight: lang === opt.code ? 700 : 500 }}
                      data-testid={`btn-lang-${opt.code}`}
                    >
                      <span>{opt.flag}</span>
                      <span>{opt.label}</span>
                      {lang === opt.code && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GREEN }} />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-end gap-1">
            <Button
              className="text-white rounded-full px-6 font-medium"
              style={{ backgroundColor: GREEN }}
              asChild
            >
              <a href={`mailto:info@taurusagsolution.com?subject=${encodeURIComponent("Richiedi Demo — Taurus 2.0 VRT")}`} data-testid="btn-nav-demo">{t.nav.richiediDemo}</a>
            </Button>
            <a href="mailto:info@taurusagsolution.com" className="text-xs" style={{ color: GREEN }}>info@taurusagsolution.com</a>
          </div>
        </div>
      </nav>

      <main>
        {/* ─── HERO ─── */}
        <section
          className="relative pt-32 pb-0 lg:pt-44 overflow-hidden"
          style={{ background: `linear-gradient(145deg, #0f1e14 0%, #1a3228 55%, #0f2430 100%)` }}
        >
          <div className="absolute right-0 top-0 w-[700px] h-[700px] rounded-full blur-[130px] opacity-20 translate-x-1/3 -translate-y-1/4" style={{ backgroundColor: GREEN }} />
          <div className="absolute left-0 bottom-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 -translate-x-1/3" style={{ backgroundColor: TEAL }} />

          <div className="container relative z-10 mx-auto px-6 lg:px-12 pb-20">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl">
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6 border"
                style={{ backgroundColor: `${GREEN}22`, borderColor: `${GREEN}55`, color: "#4ade80" }}
              >
                <Leaf className="w-4 h-4" />
                <span>{t.hero.badge}</span>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-6 mb-6">
                <img src="/taurus-logo.webp" alt="Taurus Agriculture Solution logo" className="w-44 lg:w-52 h-auto flex-shrink-0 drop-shadow-xl" width={1952} height={2166} />
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight text-white">
                  {t.hero.h1Line1}<br />
                  <span style={{ color: "#4ade80" }}>{t.hero.h1Line2}</span>
                </h1>
              </motion.div>

              <motion.p variants={fadeUp} className="text-lg lg:text-xl mb-10 max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                {t.hero.p}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="lg" className="text-white rounded-full px-8 h-14 text-base font-medium" style={{ backgroundColor: GREEN, boxShadow: `0 0 24px ${GREEN}55` }} asChild>
                    <a href="#chi-siamo" data-testid="btn-hero-discover">
                      {t.hero.btnDiscover} <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                  <div className="flex flex-col items-start gap-1">
                    <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base text-white border-white/30 hover:bg-white/10" asChild>
                      <a href={`mailto:info@taurusagsolution.com?subject=${encodeURIComponent("Parla con un esperto — Taurus 2.0 VRT")}`} data-testid="btn-hero-contact">{t.hero.btnContact}</a>
                    </Button>
                    <a href="mailto:info@taurusagsolution.com" className="text-xs ml-2" style={{ color: `${GREEN}cc` }}>info@taurusagsolution.com</a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Aerial field strip */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="relative w-full h-[300px] lg:h-[420px] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-10" />
            <LazyImage src="/img-aerial-field.webp" alt="Campi agricoli di precisione visti dall'alto" className="w-full h-full object-cover object-center" containerClassName="relative w-full h-full" loading="eager" dark width={1280} height={1244} placeholder={THUMB["img-aerial-field"]} data-testid="img-hero-aerial" />
            <div className="absolute bottom-8 left-8 z-20 hidden lg:flex gap-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-white/90 backdrop-blur rounded-xl px-5 py-3 shadow-lg border border-border">
                <div className="text-2xl font-bold" style={{ color: GREEN }}>{t.hero.stat3Val}</div>
                <div className="text-xs text-foreground/60">{t.hero.stat3Label}</div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ─── CHI SIAMO ─── */}
        <section id="chi-siamo" className="py-24 bg-white border-b border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6 border" style={{ backgroundColor: `${GREEN}12`, borderColor: `${GREEN}35`, color: GREEN }}>
                  <Leaf className="w-4 h-4" />
                  <span>{t.about.badge}</span>
                </motion.div>

                <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-bold leading-tight mb-6" style={{ color: NAVY }}>
                  {t.about.h2Line1}<br />
                  <span style={{ color: GREEN }}>{t.about.h2Line2}</span>
                </motion.h2>

                <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-5 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.about.p1 }} />
                <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-8 leading-relaxed">{t.about.p2}</motion.p>

                <motion.div variants={fadeUp} className="flex flex-col items-start gap-1">
                  <Button size="lg" className="text-white rounded-full px-8 h-12 font-medium" style={{ backgroundColor: GREEN }} asChild>
                    <a href={`mailto:info@taurusagsolution.com?subject=${encodeURIComponent("Parla con un esperto — Taurus 2.0 VRT")}`} data-testid="btn-about-demo">{t.about.cta}</a>
                  </Button>
                  <a href="mailto:info@taurusagsolution.com" className="text-xs ml-2" style={{ color: GREEN }}>info@taurusagsolution.com</a>
                </motion.div>
              </motion.div>

              {/* Pillars grid */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-2 gap-4">
                {[
                  { color: GREEN, icon: "📈" },
                  { color: BLUE,  icon: "🔗" },
                  { color: TEAL,  icon: "🔍" },
                  { color: AMBER, icon: "🌱" },
                ].map((meta, i) => {
                  const p = t.about.pillars[i];
                  return (
                    <motion.div key={p.title} variants={fadeUp} className="p-6 rounded-2xl bg-muted border border-border hover:shadow-md transition-shadow" data-testid={`card-pillar-${i}`}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4" style={{ backgroundColor: `${meta.color}15` }}>{meta.icon}</div>
                      <h3 className="font-bold text-base mb-2" style={{ color: NAVY }}>{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border"
            >
              {[GREEN, TEAL, BLUE, AMBER].map((color, i) => {
                const s = t.about.stats[i];
                return (
                  <div key={i} className="bg-white px-6 py-6 flex flex-col gap-1">
                    <span className="text-xl font-bold" style={{ color }}>{s.val}</span>
                    <span className="text-sm text-muted-foreground">{s.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ─── PRODUCT BRIDGE ─── */}
        <div id="farm-vrt" className="bg-white py-16 border-b border-border">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5 border" style={{ backgroundColor: `${GREEN}12`, borderColor: `${GREEN}40`, color: GREEN }}>
                <Leaf className="w-4 h-4" />
                <span>{t.productBridge.badge}</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold mb-4" style={{ color: NAVY }}>{t.productBridge.h2}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t.productBridge.p}</p>
            </motion.div>
          </div>
        </div>


        {/* ─── TRACTOR BANNER ─── */}
        <section className="relative h-[520px] lg:h-[620px] overflow-hidden flex items-center">
          <div className="absolute inset-0">
            <LazyImage src="/img-tractor-tablet.webp" alt="Trattorista che utilizza il software su tablet in campo" className="w-full h-full object-cover object-center" containerClassName="relative w-full h-full overflow-hidden" dark width={1280} height={853} placeholder={THUMB["img-tractor-tablet"]} data-testid="img-tractor-banner" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
          </div>
          <div className="container relative z-10 mx-auto px-6 lg:px-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-xl">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-5 border" style={{ backgroundColor: `${GREEN}18`, borderColor: `${GREEN}40`, color: GREEN }}>
                <Tractor className="w-4 h-4" />
                <span>{t.tractorBanner.badge}</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl lg:text-6xl font-bold leading-tight mb-5" style={{ color: NAVY }}>
                {t.tractorBanner.h2Line1}<br />
                <span style={{ color: GREEN }}>{t.tractorBanner.h2Line2}<br />{t.tractorBanner.h2Line3}</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg mb-8 leading-relaxed" style={{ color: `${NAVY}bb` }}>
                {t.tractorBanner.p}
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                {["Topcon", "Trimble", "GeoTIFF", "SHP"].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-mono font-semibold rounded-full border" style={{ backgroundColor: `${GREEN}12`, borderColor: `${GREEN}40`, color: GREEN }}>
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── FEATURES + SCREENSHOTS ─── */}
        <section className="py-24 bg-muted border-y border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
                <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-bold mb-4" style={{ color: NAVY }}>
                  {t.features.h2Line1}<br />{t.features.h2Line2}
                </motion.h2>
                <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-8">{t.features.p}</motion.p>
                <motion.div variants={staggerContainer} className="space-y-5">
                  {t.features.list.map((f, i) => (
                    <motion.div key={i} variants={fadeUp} className="flex gap-4">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${GREEN}18`, border: `1.5px solid ${GREEN}40` }}>
                        <CheckCircle2 className="w-5 h-5" style={{ color: GREEN }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-0.5" style={{ color: NAVY }}>{f.title}</h3>
                        <p className="text-muted-foreground text-sm">{f.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
                {/* Screenshot tabs */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {t.features.tabs.map((label, i) => {
                    const colors = [TEAL, GREEN, RED_, BLUE];
                    const c = colors[i];
                    return (
                      <button key={i} onClick={() => setActiveScreenshot(i)} className="px-4 py-1.5 rounded-full text-sm font-medium transition-all border" style={activeScreenshot === i ? { backgroundColor: c, color: "white", borderColor: c } : { backgroundColor: "transparent", color: c, borderColor: `${c}60` }} data-testid={`tab-screenshot-${i}`}>
                        {label}
                      </button>
                    );
                  })}
                </div>
                <div className="absolute inset-0 rounded-3xl blur-2xl opacity-10 pointer-events-none" style={{ backgroundColor: GREEN, top: "2.5rem" }} />
                <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl">
                  {[
                    { src: "/app-vrt-maps.webp",     alt: "Schermata VRT 2.0 e Mappe — mappa di prescrizione a zone omogenee",                              width: 6097, height: 2806, placeholder: THUMB["app-vrt-maps"]     },
                    { src: "/app-prescrizione.webp", alt: "Schermata Calcola Mappa di Prescrizione VRT — clusterizzazione K-means NDVI con dosi kg/ha",      width: 6156, height: 3226, placeholder: THUMB["app-prescrizione"] },
                    { src: "/app-malattie.webp",     alt: "Schermata Malattie — previsione rischio fitosanitario a 7 giorni",                                width: 4169, height: 3350, placeholder: THUMB["app-malattie"]     },
                    { src: "/app-meteo.webp",        alt: "Schermata Previsioni Meteo — dati agrometeorologici per appezzamento",                            width: 4517, height: 3104, placeholder: THUMB["app-meteo"]        }
                  ].map((img, i) => (
                    <div key={i} className="relative" style={{ display: activeScreenshot === i ? "block" : "none" }}>
                      <LazyImage src={img.src} alt={img.alt} className="w-full h-auto block" containerClassName="relative" width={img.width} height={img.height} placeholder={img.placeholder} data-testid={`screenshot-${i}`} />
                      {/* Hide "Esegui le tue mappe di prescrizione" text panel in both VRT maps screens */}
                      {(i === 0 || i === 1) && (
                        <div className="absolute bg-white" style={{ top: 0, right: 0, width: "37%", height: "100%" }} />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Demo request box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-14 rounded-2xl border p-8 flex flex-col lg:flex-row items-center justify-between gap-6"
              style={{ backgroundColor: `${GREEN}0e`, borderColor: `${GREEN}35` }}
            >
              <div className="lg:max-w-md">
                <h3 className="text-xl font-bold mb-1" style={{ color: NAVY }}>{t.features.demoBox.h3}</h3>
                <p className="text-muted-foreground text-sm">{t.features.demoBox.p}</p>
              </div>
              <form className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto" onSubmit={(e) => { e.preventDefault(); openMailto(demoEmail, "Richiedi Demo — Taurus 2.0 VRT"); }}>
                <input
                  type="email"
                  placeholder={t.features.demoBox.placeholder}
                  className="flex-1 lg:w-64 px-4 py-2.5 rounded-xl border border-border bg-white text-sm focus:outline-none focus:ring-2"
                  data-testid="input-demo-email-inline"
                  value={demoEmail}
                  onChange={(e) => setDemoEmail(e.target.value)}
                />
                <Button type="submit" className="text-white rounded-xl px-6 py-2.5 h-auto text-sm font-medium whitespace-nowrap" style={{ backgroundColor: GREEN }} data-testid="btn-demo-inline">
                  {t.features.demoBox.btn}
                </Button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* ─── SMARTPHONE ─── */}
        <section className="relative overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[540px]">
            <div className="relative h-[320px] lg:h-auto overflow-hidden">
              <LazyImage src="/img-tractor-app-botte.webp" alt="Agricoltore in cabina di trattore con l'app su tablet" className="w-full h-full object-cover object-center" containerClassName="relative w-full h-full" width={1408} height={768} placeholder={THUMB["img-tractor-app-botte"]} data-testid="img-tractor-app-botte" />
              <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(to right, transparent, white)" }} />
              <div className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(to top, white 30%, transparent)" }} />
            </div>
            <div className="bg-white flex items-center px-8 lg:px-16 py-16">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-lg">
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-5 border" style={{ backgroundColor: `${TEAL}12`, borderColor: `${TEAL}40`, color: TEAL }}>
                  <Smartphone className="w-4 h-4" />
                  <span>{t.smartphone.badge}</span>
                </motion.div>
                <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-bold leading-tight mb-5" style={{ color: NAVY }}>
                  {t.smartphone.h2Line1}<br />
                  <span style={{ color: GREEN }}>{t.smartphone.h2Line2}</span>
                </motion.h2>
                <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-8 leading-relaxed">{t.smartphone.p}</motion.p>
                <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Satellite,   color: BLUE  },
                    { icon: Radio,       color: TEAL  },
                    { icon: Thermometer, color: GREEN },
                    { icon: Droplets,    color: BLUE  },
                  ].map(({ icon: Icon, color }, i) => (
                    <motion.div key={i} variants={fadeUp} className="flex items-center gap-3 p-3 rounded-xl bg-muted border border-border">
                      <Icon className="w-5 h-5 shrink-0" style={{ color }} />
                      <span className="text-sm font-medium" style={{ color: NAVY }}>{t.smartphone.features[i]}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── IoT BANNER ─── */}
        <section className="relative h-[340px] lg:h-[420px] overflow-hidden flex items-center justify-center">
          <LazyImage src="/img-iot-connect.webp" alt="Rete IoT satellite drone sensori" className="w-full h-full object-cover object-center" containerClassName="absolute inset-0 overflow-hidden" dark width={1408} height={768} placeholder={THUMB["img-iot-connect"]} data-testid="img-iot-connect" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(15,30,20,0.65), rgba(15,30,20,0.85))" }} />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-10 text-center px-6 max-w-3xl">
            <p className="text-sm font-mono tracking-widest uppercase mb-3" style={{ color: "#4ade80" }}>{t.iot.overline}</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-white drop-shadow-lg">
              {t.iot.h2Line1}<br />
              <span style={{ color: "#4ade80" }}>{t.iot.h2Line2}</span>
            </h2>
          </motion.div>
        </section>

        {/* ─── DISEASE MODULE ─── */}
        <section id="malattie" className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center max-w-3xl mx-auto mb-16">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-5 border" style={{ backgroundColor: `${AMBER}15`, borderColor: `${AMBER}40`, color: AMBER }}>
                <Bug className="w-4 h-4" />
                <span>{t.disease.badge}</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-bold mb-5" style={{ color: NAVY }}>{t.disease.h2}</motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground">{t.disease.p}</motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-10 items-start mb-12">
              {/* Agronomist photo */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative rounded-3xl overflow-hidden shadow-xl border border-border">
              <LazyImage src="/img-agronomist-tablet.webp" alt="Agronomo in campo con tablet" className="w-full h-[420px] object-cover object-center" containerClassName="relative" dark width={1280} height={896} placeholder={THUMB["img-agronomist-tablet"]} data-testid="img-agronomist-disease" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(30,41,59,0.85) 0%, transparent 55%)" }} />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-sm font-mono mb-2" style={{ color: "#4ade80" }}>{t.disease.riskLabel7d}</p>
                  <div className="flex gap-3">
                    <div className="flex-1 rounded-xl p-3 border border-white/20 backdrop-blur-sm" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
                      <div className="text-2xl font-bold" style={{ color: AMBER }}>32%</div>
                      <div className="text-xs text-white/70">{t.disease.riskProtected}</div>
                    </div>
                    <div className="flex-1 rounded-xl p-3 border border-white/20 backdrop-blur-sm" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
                      <div className="text-2xl font-bold" style={{ color: RED_ }}>38%</div>
                      <div className="text-xs text-white/70">{t.disease.riskMax}</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Crop risk cards */}
              <div className="space-y-4">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
                  {crops.map((crop, i) => (
                    <motion.div key={crop.name} variants={fadeUp} className="flex items-center gap-5 p-5 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: `${crop.color}30` }} data-testid={`card-crop-${i}`}>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ backgroundColor: `${crop.color}15` }}>{crop.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-lg" style={{ color: NAVY }}>{crop.name}</h4>
                          <span className="text-sm font-mono font-bold" style={{ color: crop.color }}>{crop.risk}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{crop.tag}</p>
                        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }} whileInView={{ width: `${crop.risk}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                            className="h-full rounded-full" style={{ backgroundColor: crop.color }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="p-4 rounded-xl border text-sm" style={{ backgroundColor: `${AMBER}10`, borderColor: `${AMBER}30`, color: "#92400e" }}>
                  {t.disease.phytoAlert}
                </motion.div>
              </div>
            </div>

            {/* Disease banner */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative rounded-3xl overflow-hidden h-[240px] lg:h-[300px] border border-border">
              <LazyImage src="/img-crop-disease.webp" alt="Foglia con sintomi di malattia fungina" className="w-full h-full object-cover object-center" containerClassName="relative w-full h-full" dark width={1280} height={853} placeholder={THUMB["img-crop-disease"]} data-testid="img-crop-disease-closeup" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(30,41,59,0.88) 40%, transparent)" }} />
              <div className="absolute inset-0 flex items-center px-8 lg:px-14">
                <div className="max-w-lg">
                  <p className="text-sm font-mono mb-2 tracking-wide uppercase" style={{ color: AMBER }}>{t.disease.earlyDetection}</p>
                  <h3 className="text-2xl lg:text-4xl font-bold text-white leading-tight">
                    {t.disease.bannerH3Line1}<br />{t.disease.bannerH3Line2}
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── SHOWCASE ─── */}
        <section id="showcase" className="py-24 bg-muted border-y border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center max-w-3xl mx-auto mb-14">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-5 border" style={{ backgroundColor: `${BLUE}12`, borderColor: `${BLUE}35`, color: BLUE }}>
                <Layers className="w-4 h-4" />
                <span>{t.showcase.badge}</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-bold mb-5" style={{ color: NAVY }}>
                {t.showcase.h2Line1}<br />{t.showcase.h2Line2}
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground">{t.showcase.p}</motion.p>
            </motion.div>

            {/* Feature tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {appFeatures.map((f, i) => {
                const Icon = f.icon;
                const active = activeFeature === i;
                return (
                  <button key={f.id} onClick={() => setActiveFeature(i)} data-testid={`btn-feature-tab-${f.id}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border"
                    style={{ backgroundColor: active ? `${f.color}18` : "white", borderColor: active ? f.color : "#e5e7eb", color: active ? f.color : "#6b7280" }}
                  >
                    <Icon className="w-4 h-4" />
                    {f.label}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={`${activeFeature}-${lang}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35, ease: "easeOut" }} className="grid lg:grid-cols-5 gap-8 items-center">
                <div className="lg:col-span-2 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border" style={{ backgroundColor: `${appFeatures[activeFeature].color}12`, borderColor: `${appFeatures[activeFeature].color}35`, color: appFeatures[activeFeature].color }}>
                    {appFeatures[activeFeature].badge}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold leading-snug" style={{ color: NAVY }}>{appFeatures[activeFeature].title}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">{appFeatures[activeFeature].description}</p>
                  <div className="flex gap-3 pt-2">
                    {appFeatures.map((_, i) => (
                      <button key={i} onClick={() => setActiveFeature(i)} data-testid={`btn-feature-dot-${i}`} className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                        style={{ backgroundColor: activeFeature === i ? appFeatures[i].color : "#d1d5db", transform: activeFeature === i ? "scale(1.35)" : "scale(1)" }}
                      />
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-3 relative">
                  <div className="absolute -inset-4 rounded-3xl blur-3xl opacity-10" style={{ backgroundColor: appFeatures[activeFeature].color }} />
                  <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl bg-white">
                    <div className="h-9 flex items-center px-4 gap-2" style={{ backgroundColor: GREEN }}>
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-300/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-300/80" />
                      </div>
                      <div className="ml-2 flex-1 h-5 rounded px-3 flex items-center" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                        <span className="text-[10px] text-white/60 font-mono">Taurus Ag Solution — {appFeatures[activeFeature].label}</span>
                      </div>
                    </div>
                    <div className="relative">
                      <LazyImage src={appFeatures[activeFeature].image} alt={appFeatures[activeFeature].label} className="w-full h-auto object-cover object-top" containerClassName="relative" width={appFeatures[activeFeature].imgWidth} height={appFeatures[activeFeature].imgHeight} placeholder={appFeatures[activeFeature].placeholder} data-testid={`img-feature-screenshot-${appFeatures[activeFeature].id}`} />
                      {/* Hide side-panel text in Mappa di Prescrizione (3) and VRT 2.0 Mappe (4) */}
                      {(activeFeature === 3 || activeFeature === 4) && (
                        <div className="absolute bg-white" style={{ top: 0, right: 0, width: "37%", height: "100%" }} />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ─── REMOTE SENSING & DRONES ─── */}
        <section id="solutions" className="py-12 bg-white border-t border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6" style={{ color: NAVY }}>{t.remoteSensing.h2}</h2>
              <p className="text-lg text-muted-foreground">{t.remoteSensing.p}</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Satellite, color: TEAL },
                { icon: Map,       color: BLUE },
                { icon: Cloud,     color: AMBER },
              ].map(({ icon: Icon, color }, i) => {
                const card = t.remoteSensing.cards[i];
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-3xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${color}15` }}>
                      <Icon className="w-7 h-7" style={{ color }} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4" style={{ color: NAVY }}>{card.title}</h3>
                    <p className="text-muted-foreground">{card.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── CONTACT CTA ─── */}
        <section id="contact" className="py-28 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto rounded-[2.5rem] p-10 lg:p-16 text-center relative overflow-hidden border" style={{ background: `linear-gradient(135deg, #0f1e14 0%, #1a3228 100%)`, borderColor: `${GREEN}40` }}>
              <div className="absolute right-0 top-0 w-[400px] h-[400px] rounded-full blur-[80px] opacity-20 translate-x-1/3 -translate-y-1/3" style={{ backgroundColor: GREEN }} />
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-white">{t.contact.h2}</h2>
                <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>{t.contact.p}</p>
                <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4" onSubmit={(e) => { e.preventDefault(); openMailto(ctaEmail, "Richiedi Contatto — Taurus 2.0 VRT"); }}>
                  <Input type="email" placeholder={t.contact.placeholder} className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/40 text-base rounded-full px-6" data-testid="input-email-cta" value={ctaEmail} onChange={(e) => setCtaEmail(e.target.value)} />
                  <Button type="submit" className="h-14 text-white rounded-full px-8 text-base font-medium whitespace-nowrap" style={{ backgroundColor: GREEN }} data-testid="btn-submit-cta">
                    {t.contact.btn}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white border-t border-border py-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/taurus-logo.webp" alt="Taurus Logo" className="h-8 w-auto opacity-70" width={1952} height={2166} />
              <span className="font-medium text-sm" style={{ color: NAVY }}>Taurus Agriculture Solution</span>
            </div>
            <div className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Taurus Agriculture Solution. {t.footer.rights}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
