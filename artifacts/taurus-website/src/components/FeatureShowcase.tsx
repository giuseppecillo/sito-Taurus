import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { LayoutDashboard, Cloud, Bug, FileBarChart2, Layers, Droplets } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LazyImage } from "@/components/LazyImage";
import { THUMBNAILS } from "@/generated/thumbnails";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const GREEN = "#2d9b4e";
const BLUE  = "#3b82f6";
const TEAL  = "#0d9488";
const NAVY  = "#1e293b";
const AMBER = "#f59e0b";

/* Static (non-translated) properties for appFeatures */
const APP_FEATURE_STATIC = [
  { id: "appezzamenti", icon: LayoutDashboard, color: GREEN, imgWidth: { it: 4911, en: 1408, es: 1408 }, imgHeight: { it: 2824, en: 768, es: 768 } },
  { id: "meteo",        icon: Cloud,           color: TEAL,  imgWidth: { it: 4517, en: 1408, es: 1408 }, imgHeight: { it: 3104, en: 768, es: 768 } },
  { id: "malattie",     icon: Bug,             color: AMBER, imgWidth: { it: 4169, en: 1408, es: 1408 }, imgHeight: { it: 3350, en: 768, es: 768 } },
  { id: "prescrizione", icon: FileBarChart2,   color: GREEN, imgWidth: { it: 6156, en: 1408, es: 1408 }, imgHeight: { it: 3226, en: 768, es: 768 } },
  { id: "mappe",        icon: Layers,          color: TEAL,  imgWidth: { it: 6097, en: 1408, es: 1408 }, imgHeight: { it: 2806, en: 768, es: 768 } },
  { id: "irrigazione",  icon: Droplets,        color: BLUE,  imgWidth: { it: 2488, en: 1408, es: 1408 }, imgHeight: { it: 2725, en: 768, es: 768 } },
];

const APP_FEATURE_IMAGES: Record<string, string[]> = {
  it: ["/farm-screen-1.webp", "/farm-screen-2.webp", "/farm-screen-3.webp", "/farm-screen-4.webp", "/farm-screen-5.webp", "/app-irrigazione.webp"],
  en: ["/screen-en-plots.webp", "/screen-en-weather.webp", "/screen-en-diseases.webp", "/screen-en-prescription.webp", "/screen-en-maps.webp", "/screen-en-irrigation.webp"],
  es: ["/screen-es-plots.webp", "/screen-es-weather.webp", "/screen-es-diseases.webp", "/screen-es-prescription.webp", "/screen-es-maps.webp", "/screen-es-irrigation.webp"],
};

const APP_FEATURE_THUMBS: Record<string, (string | undefined)[]> = {
  it: [THUMBNAILS["farm-screen-1"], THUMBNAILS["farm-screen-2"], THUMBNAILS["farm-screen-3"], THUMBNAILS["farm-screen-4"], THUMBNAILS["farm-screen-5"], THUMBNAILS["app-irrigazione"]],
  en: [THUMBNAILS["screen-en-plots"], THUMBNAILS["screen-en-weather"], THUMBNAILS["screen-en-diseases"], THUMBNAILS["screen-en-prescription"], THUMBNAILS["screen-en-maps"], THUMBNAILS["screen-en-irrigation"]],
  es: [THUMBNAILS["screen-es-plots"], THUMBNAILS["screen-es-weather"], THUMBNAILS["screen-es-diseases"], THUMBNAILS["screen-es-prescription"], THUMBNAILS["screen-es-maps"], THUMBNAILS["screen-es-irrigation"]],
};

export function FeatureShowcase({ headingLevel = 2 }: { headingLevel?: 1 | 2 | 3 }) {
  const { lang, t } = useLanguage();
  const [activeFeature, setActiveFeature] = useState(0);
  const Heading = headingLevel === 1 ? motion.h1 : headingLevel === 3 ? motion.h3 : motion.h2;
  const soilMoistureAlt = {
    it: "Agricoltore che misura l'umidità del suolo con un sensore e consulta i dati sullo smartphone",
    en: "Farmer measuring soil moisture with a sensor and checking readings on a smartphone",
    es: "Agricultor que mide la humedad del suelo con un sensor y consulta los datos en el móvil",
  }[lang];

  const appFeatures = t.appFeatures.map((f, i) => ({
    ...APP_FEATURE_STATIC[i],
    image: APP_FEATURE_IMAGES[lang][i],
    placeholder: APP_FEATURE_THUMBS[lang][i],
    imgWidth: APP_FEATURE_STATIC[i].imgWidth[lang],
    imgHeight: APP_FEATURE_STATIC[i].imgHeight[lang],
    label: f.label,
    title: f.title,
    description: f.description,
    badge: f.badge,
  }));

  return (

        <section id="showcase" className="scroll-mt-28 py-16 lg:py-24 bg-muted border-y border-border">
          <div className="container mx-auto px-5 lg:px-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="text-center max-w-3xl mx-auto mb-14">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-5 border" style={{ backgroundColor: `${BLUE}12`, borderColor: `${BLUE}35`, color: BLUE }}>
                <Layers className="w-4 h-4" />
                <span>{t.showcase.badge}</span>
              </motion.div>
              <Heading variants={fadeUp} className="text-3xl lg:text-5xl font-bold mb-5" style={{ color: NAVY }}>
                {t.showcase.h2Line1}<br />{t.showcase.h2Line2}
              </Heading>
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground">{t.showcase.p}</motion.p>
            </motion.div>

            {/* Feature tabs */}
            <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2 mb-10 justify-start lg:justify-center flex-nowrap lg:flex-wrap">
              {appFeatures.map((f, i) => {
                const Icon = f.icon;
                const active = activeFeature === i;
                return (
                  <button key={f.id} onClick={() => setActiveFeature(i)} aria-pressed={active} data-testid={`btn-feature-tab-${f.id}`}
                    className="flex min-h-[44px] shrink-0 items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border"
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
                <div className="lg:col-span-2 flex flex-col gap-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border self-start" style={{ backgroundColor: `${appFeatures[activeFeature].color}12`, borderColor: `${appFeatures[activeFeature].color}35`, color: appFeatures[activeFeature].color }}>
                    {appFeatures[activeFeature].badge}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold leading-snug" style={{ color: NAVY }}>{appFeatures[activeFeature].title}</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">{appFeatures[activeFeature].description}</p>
                  <div className="flex flex-wrap gap-1">
                    {appFeatures.map((_, i) => (
                      <button key={i} onClick={() => setActiveFeature(i)} data-testid={`btn-feature-dot-${i}`} aria-label={appFeatures[i].label} aria-pressed={activeFeature === i} className="inline-flex h-11 w-11 items-center justify-center">
                        <span className="block w-2.5 h-2.5 rounded-full transition-transform duration-300" style={{ backgroundColor: activeFeature === i ? appFeatures[i].color : "#d1d5db", transform: activeFeature === i ? "scale(1.35)" : "scale(1)" }} />
                      </button>
                    ))}
                  </div>
                  {/* Farmer photo — shown only for Irrigazione module */}
                  {activeFeature === 5 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }} className="rounded-xl overflow-hidden shadow-lg border border-border w-full">
                      <LazyImage src="/farmer-soil-moisture-v8.webp" alt={soilMoistureAlt} className="w-full h-full object-cover object-center" containerClassName="relative w-full aspect-[3/4] max-h-[420px] lg:max-h-none" width={896} height={1280} placeholder={THUMBNAILS["farmer-soil-moisture-v8"]} />
                    </motion.div>
                  )}
                </div>
                <div className="lg:col-span-3 relative min-w-0">
                  <div className="absolute -inset-4 rounded-3xl blur-3xl opacity-10" style={{ backgroundColor: appFeatures[activeFeature].color }} />
                  <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl bg-white">
                    <div className="h-9 flex items-center px-4 gap-2" style={{ backgroundColor: GREEN }}>
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-300/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-300/80" />
                      </div>
                      <div className="ml-2 min-w-0 flex-1 h-5 rounded px-3 flex items-center" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                        <span className="truncate text-[10px] text-white/70 font-mono">Taurus Ag Solution — {appFeatures[activeFeature].label}</span>
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
  );
}
