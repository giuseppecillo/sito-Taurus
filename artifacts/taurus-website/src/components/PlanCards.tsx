import { Leaf, Layers, Tractor, CheckCircle2, Mail, Satellite, Database } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const GREEN = "#2d9b4e";
const BLUE = "#3b82f6";
const TEAL = "#0d9488";
const NAVY = "#1e293b";
const EMAIL = "info@taurusagsolution.com";

function mailto(subject: string) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
}

function CardCta({ label, subject, color, id }: { label: string; subject: string; color: string; id: string }) {
  return (
    <a href={mailto(subject)} className="mt-6 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
      style={{ borderColor: color, color }}
      data-testid={`link-plan-contact-${id}`}>
      <Mail className="h-4 w-4" aria-hidden="true" />{label}
    </a>
  );
}

/** Farm 2.0 VRT Lite / Standard / Pro — content reused unchanged from t.plans. */
export function FarmPlanCards() {
  const { t } = useLanguage();
  return (
    <div className="grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {t.plans.plans.map((plan, i) => {
        const PlanIcon = [Leaf, Layers, Tractor][i] ?? Leaf;
        const color = [TEAL, BLUE, GREEN][i] ?? GREEN;
        return (
          <article key={plan.name} className="relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white p-6 shadow-sm lg:p-7" style={{ borderColor: i === 2 ? `${GREEN}70` : "#e2e8f0" }} data-testid={`plan-card-farm-${plan.name.toLowerCase()}`}>
            <div className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: color }} />
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${color}15`, color }}><PlanIcon className="h-5 w-5" aria-hidden="true" /></span>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">Farm 2.0 VRT</p>
                  <h3 className="text-2xl font-bold leading-tight" style={{ color: NAVY }}>{plan.name}</h3>
                </div>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color }}>{plan.modules.length} {t.plans.modulesLabel}</span>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>
            {plan.inheritance && <div className="mb-4 rounded-xl px-3 py-2 text-xs font-semibold" style={{ backgroundColor: `${color}10`, color }}>{plan.inheritance}</div>}
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.plans.modulesLabel}</div>
            <ul className="flex-1 space-y-3">
              {plan.modules.map((m) => (
                <li key={m} className="flex items-start gap-2.5 text-sm leading-snug" style={{ color: NAVY }}>
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} aria-hidden="true" /><span>{m}</span>
                </li>
              ))}
            </ul>
            <CardCta label={t.routes.cardCta} subject={`Farm 2.0 VRT ${plan.name}`} color={color} id={`farm-${plan.name.toLowerCase()}`} />
          </article>
        );
      })}
    </div>
  );
}

/** NitroCrop NDVI Standard / Pro — only the stated inclusions, no prices or extra claims. */
export function NitroPlanCards() {
  const { t } = useLanguage();
  return (
    <div className="grid items-stretch gap-5 md:grid-cols-2 lg:max-w-4xl lg:gap-6">
      {t.routes.nitroPlans.map((plan, i) => {
        const Icon = [Satellite, Database][i] ?? Satellite;
        const color = i === 0 ? TEAL : NAVY;
        return (
          <article key={plan.name} className="relative flex h-full flex-col overflow-hidden rounded-3xl border bg-white p-6 shadow-sm lg:p-7" style={{ borderColor: `${TEAL}45` }} data-testid={`plan-card-nitrocrop-${plan.name.toLowerCase()}`}>
            <div className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: color }} />
            <div className="mb-5 flex items-center gap-3 pt-1">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${TEAL}15`, color: TEAL }}><Icon className="h-5 w-5" aria-hidden="true" /></span>
              <div>
                <p className="text-xs font-semibold text-muted-foreground">NitroCrop NDVI</p>
                <h3 className="text-2xl font-bold leading-tight" style={{ color: NAVY }}>{plan.name}</h3>
              </div>
            </div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.routes.included}</div>
            <p className="flex flex-1 items-start gap-2.5 text-base font-medium leading-snug" style={{ color: NAVY }}>
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: TEAL }} aria-hidden="true" /><span>{plan.feature}</span>
            </p>
            <CardCta label={t.routes.cardCta} subject={`NitroCrop NDVI ${plan.name}`} color={TEAL} id={`nitrocrop-${plan.name.toLowerCase()}`} />
          </article>
        );
      })}
    </div>
  );
}

export function PlansContactLine() {
  const { t } = useLanguage();
  return (
    <p className="text-base text-muted-foreground" data-testid="text-plans-contact">
      {t.routes.contactLine}{" "}
      <a href={`mailto:${EMAIL}`} className="inline-flex min-h-[44px] items-center font-semibold underline-offset-4 hover:underline" style={{ color: GREEN }} data-testid="link-plans-email">{EMAIL}</a>
    </p>
  );
}
