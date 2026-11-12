import { Link } from "wouter";
import { ArrowRight, Tractor, Satellite } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouteMeta } from "@/hooks/use-route-meta";
import { SiteHeader } from "@/components/SiteHeader";
import { GroupIntro } from "@/components/GroupIntro";
import { FarmPlanCards, NitroPlanCards, PlansContactLine } from "@/components/PlanCards";

const GREEN = "#2d9b4e";
const TEAL = "#0d9488";
const NAVY = "#1e293b";

export default function Soluzioni() {
  const { t } = useLanguage();
  const r = t.routes;
  useRouteMeta(r.solTitle, r.solDesc, "/soluzioni");

  return (
    <div className="min-h-[100dvh] overflow-x-clip bg-background text-foreground font-sans">
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-[#f3faf5]">
          <div className="container mx-auto px-5 py-10 lg:px-12 lg:py-16">
            <p className="text-sm font-semibold" style={{ color: GREEN }}>{t.nav.soluzioni}</p>
            <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl" style={{ color: NAVY }}>{t.plans.h2}</h1>
            <p className="mt-2 text-xl font-semibold" style={{ color: TEAL }}>{r.solH1}</p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t.plans.p} {r.solP}</p>
            <div className="mt-4"><PlansContactLine /></div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href="#piani-farm" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border bg-white px-4 text-sm font-semibold" style={{ color: GREEN, borderColor: `${GREEN}50` }} data-testid="link-jump-farm-plans"><Tractor className="h-4 w-4" aria-hidden="true" />{r.farmTitle}</a>
              <a href="#piani-nitrocrop" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border bg-white px-4 text-sm font-semibold" style={{ color: TEAL, borderColor: `${TEAL}50` }} data-testid="link-jump-nitro-plans"><Satellite className="h-4 w-4" aria-hidden="true" />{r.nitroTitle}</a>
            </div>
          </div>
        </section>

        <GroupIntro id="piani-farm" icon={Tractor} color={GREEN} eyebrow={r.farmEyebrow} title={r.farmTitle} text={r.farmPlansP} count={`${t.plans.plans.length}`} />
        <section className="bg-[#fafcfa] py-10 lg:py-14">
          <div className="container mx-auto px-5 lg:px-12"><FarmPlanCards /></div>
        </section>

        <GroupIntro id="piani-nitrocrop" icon={Satellite} color={TEAL} eyebrow={r.nitroEyebrow} title={r.nitroTitle} text={r.nitroPlansP} count={`${r.nitroPlans.length}`} />
        <section className="bg-[#f4f8f4] py-10 lg:py-14">
          <div className="container mx-auto px-5 lg:px-12"><NitroPlanCards /></div>
        </section>

        <section className="bg-white py-12">
          <p className="container mx-auto mb-2 px-5 text-base font-medium lg:px-12" style={{ color: NAVY }}>{t.plans.emailCta}</p>
          <div className="container mx-auto flex flex-col gap-5 px-5 lg:flex-row lg:items-center lg:justify-between lg:px-12">
            <PlansContactLine />
            <Link href="/funzionalita" className="inline-flex min-h-[48px] items-center gap-2 self-start rounded-full border px-6 font-semibold transition-colors hover:bg-muted lg:self-auto" style={{ color: NAVY }} data-testid="link-plans-to-features">
              {r.toFeatures}<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
