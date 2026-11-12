import { Link } from "wouter";
import { ArrowRight, Tractor, Satellite } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouteMeta } from "@/hooks/use-route-meta";
import { SiteHeader } from "@/components/SiteHeader";
import { GroupIntro } from "@/components/GroupIntro";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { FarmMachineryModule } from "@/components/FarmMachineryModule";
import { NitrocropDetails } from "@/components/NitrocropDetails";

const GREEN = "#2d9b4e";
const TEAL = "#0d9488";
const NAVY = "#1e293b";

const DESCRIPTIONS = {
  it: "Esplora i moduli di Taurus 2.0 VRT e le funzionalità di NitroCrop NDVI per il confronto fenologico e il piano azotato.",
  en: "Explore Taurus 2.0 VRT modules and NitroCrop NDVI features for growth-stage comparison and nitrogen planning.",
  es: "Explora los módulos de Taurus 2.0 VRT y las funciones de NitroCrop NDVI para la comparación fenológica y el plan de nitrógeno.",
};

export default function Funzionalita() {
  const { lang, t } = useLanguage();
  const r = t.routes;
  useRouteMeta(r.featTitle, DESCRIPTIONS[lang], "/funzionalita");

  return (
    <div className="min-h-[100dvh] overflow-x-clip bg-background text-foreground font-sans">
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-white">
          <div className="container mx-auto px-5 py-10 lg:px-12 lg:py-14">
            <p className="text-sm font-semibold" style={{ color: GREEN }}>{t.nav.funzionalita}</p>
            <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl" style={{ color: NAVY }}>
              {r.farmTitle} <span className="text-muted-foreground font-medium">·</span> <span style={{ color: TEAL }}>{r.nitroTitle}</span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{DESCRIPTIONS[lang]}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:max-w-3xl">
              {[
                { href: "#farm-vrt-group", icon: Tractor, color: GREEN, title: r.farmTitle, count: r.farmCount, id: "farm" },
                { href: "#nitrocrop-group", icon: Satellite, color: TEAL, title: r.nitroTitle, count: r.nitroCount, id: "nitrocrop" },
              ].map(({ href, icon: Icon, color, title, count, id }) => (
                <a key={id} href={href} className="group flex min-h-[64px] items-center gap-3 rounded-2xl border border-border bg-[#fafcfa] px-4 py-3 transition-colors hover:border-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" style={{ color }} data-testid={`link-jump-${id}`}>
                  <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold" style={{ color: NAVY }}>{title}</span>
                    <span className="block text-sm text-muted-foreground">{count}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <GroupIntro id="farm-vrt-group" icon={Tractor} color={GREEN} eyebrow={r.farmEyebrow} title={r.farmTitle} text={r.farmP} count={r.farmCount} />
        <FeatureShowcase headingLevel={3} />
        <FarmMachineryModule />

        <GroupIntro id="nitrocrop-group" icon={Satellite} color={TEAL} eyebrow={r.nitroEyebrow} title={r.nitroTitle} text={r.nitroP} count={r.nitroCount} />
        <NitrocropDetails />

        <section className="bg-white py-12">
          <div className="container mx-auto flex flex-col items-start gap-4 px-5 sm:flex-row sm:items-center sm:justify-between lg:px-12">
            <p className="text-lg font-semibold" style={{ color: NAVY }}>{r.teaserTitle}</p>
            <Link href="/soluzioni" className="inline-flex min-h-[48px] items-center gap-2 rounded-full px-6 font-semibold text-white transition-colors hover:opacity-90" style={{ backgroundColor: GREEN }} data-testid="link-features-to-plans">
              {r.toPlans}<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
