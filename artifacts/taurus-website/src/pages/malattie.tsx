import { motion, type Variants } from "framer-motion";
import { Bug } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouteMeta } from "@/hooks/use-route-meta";
import { SiteHeader } from "@/components/SiteHeader";
import { LazyImage } from "@/components/LazyImage";
import { THUMBNAILS } from "@/generated/thumbnails";

const NAVY = "#1e293b";
const AMBER = "#f59e0b";
const RED = "#ef4444";
const CROP_STATIC = [
  { risk: 72, color: AMBER },
  { risk: 38, color: "#8b5cf6" },
  { risk: 55, color: "#2d9b4e" },
  { risk: 61, color: RED },
];
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

export default function Malattie() {
  const { t } = useLanguage();
  useRouteMeta(`${t.nav.malattie} | Farm 2.0 VRT | Taurus`, t.disease.p, "/malattie");
  const crops = t.crops.map((crop, i) => ({ ...crop, ...CROP_STATIC[i] }));

  return (
    <div className="min-h-[100dvh] overflow-x-clip bg-background text-foreground font-sans">
      <SiteHeader />
      <main>
        <section id="malattie" className="bg-white py-12 lg:py-20">
          <div className="container mx-auto px-5 lg:px-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="mx-auto mb-12 max-w-3xl text-center">
              <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium" style={{ backgroundColor: `${AMBER}15`, borderColor: `${AMBER}40`, color: "#a16207" }}>
                <Bug className="h-4 w-4" aria-hidden="true" />
                <span>{t.disease.badge}</span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="mb-5 text-3xl font-bold lg:text-5xl" style={{ color: NAVY }}>{t.disease.h2}</motion.h1>
              <motion.p variants={fadeUp} className="mb-4 text-lg font-semibold text-primary" data-testid="text-disease-farm-inclusion">{t.disease.includedIn}</motion.p>
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground">{t.disease.p}</motion.p>
            </motion.div>

            <div className="mb-12 grid items-start gap-10 lg:grid-cols-2">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative overflow-hidden rounded-3xl border border-border shadow-xl">
                <LazyImage src="/img-agronomist-tablet.webp" alt={t.disease.agronomistImageAlt} className="h-[260px] w-full object-cover object-center sm:h-[340px] lg:h-[420px]" containerClassName="relative" dark width={1280} height={896} placeholder={THUMBNAILS["img-agronomist-tablet"]} data-testid="img-agronomist-disease" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(30,41,59,0.85) 0%, transparent 55%)" }} />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="mb-2 font-mono text-sm" style={{ color: "#4ade80" }}>{t.disease.riskLabel7d}</p>
                  <div className="flex gap-3">
                    {[{ value: "32%", label: t.disease.riskProtected, color: AMBER }, { value: "38%", label: t.disease.riskMax, color: RED }].map((risk) => (
                      <div key={risk.label} className="flex-1 rounded-xl border border-white/20 p-3 backdrop-blur-sm" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
                        <div className="text-2xl font-bold" style={{ color: risk.color }}>{risk.value}</div>
                        <div className="text-xs text-white/70">{risk.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <div className="space-y-4">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
                  {crops.map((crop, i) => (
                    <motion.div key={crop.name} variants={fadeUp} className="flex items-center gap-5 rounded-2xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md" style={{ borderColor: `${crop.color}30` }} data-testid={`card-crop-${i}`}>
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-bold" style={{ backgroundColor: `${crop.color}15`, color: crop.color }}>{crop.name.slice(0, 1)}</div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center justify-between gap-2">
                          <h2 className="text-lg font-bold" style={{ color: NAVY }}>{crop.name}</h2>
                          <span className="font-mono text-sm font-bold" style={{ color: crop.color }}>{crop.risk}%</span>
                        </div>
                        <p className="mb-2 text-xs text-muted-foreground">{crop.tag}</p>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${crop.risk}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }} className="h-full rounded-full" style={{ backgroundColor: crop.color }} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                <div className="rounded-xl border p-4 text-sm" style={{ backgroundColor: `${AMBER}10`, borderColor: `${AMBER}30`, color: "#92400e" }}>{t.disease.phytoAlert}</div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative h-[240px] overflow-hidden rounded-3xl border border-border lg:h-[300px]">
              <LazyImage src="/img-crop-disease.webp" alt={t.disease.diseaseImageAlt} className="h-full w-full object-cover object-center" containerClassName="relative w-full h-full" dark width={1280} height={853} placeholder={THUMBNAILS["img-crop-disease"]} data-testid="img-crop-disease-closeup" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(30,41,59,0.88) 40%, transparent)" }} />
              <div className="absolute inset-0 flex items-center px-8 lg:px-14">
                <div className="max-w-lg">
                  <p className="mb-2 font-mono text-sm uppercase tracking-wide" style={{ color: AMBER }}>{t.disease.earlyDetection}</p>
                  <h2 className="text-2xl font-bold leading-tight text-white lg:text-4xl">{t.disease.bannerH3Line1}<br />{t.disease.bannerH3Line2}</h2>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
