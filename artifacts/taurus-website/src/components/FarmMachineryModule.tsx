import { Tractor, Cloud, FileBarChart2, CalendarClock, Radio, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LazyImage } from "@/components/LazyImage";
import { THUMBNAILS } from "@/generated/thumbnails";

const GREEN = "#2d9b4e";
const TEAL = "#0d9488";
const BLUE = "#3b82f6";
const NAVY = "#1e293b";

/** Seventh Farm 2.0 VRT module, shown in detail on /funzionalita. */
export function FarmMachineryModule() {
  const { t } = useLanguage();
  const statusMeta = [
    { icon: CalendarClock, color: BLUE, text: BLUE },
    { icon: Radio, color: "#f59e0b", text: "#b7791f" },
    { icon: CheckCircle2, color: GREEN, text: GREEN },
  ];
  return (
    <section id="farm-macchine" aria-labelledby="farm-machinery-heading" className="scroll-mt-28 bg-[#f3faf5] py-14 lg:py-20">
      <div className="container mx-auto px-5 lg:px-12">
        <article className="grid overflow-hidden rounded-3xl border border-border bg-white shadow-sm lg:grid-cols-2">
          <div className="min-w-0 p-6 sm:p-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: GREEN }}>{t.routes.moduleLabel} 7 · {t.machinery.badge}</p>
            <h3 id="farm-machinery-heading" className="mb-4 text-2xl font-bold lg:text-3xl" style={{ color: NAVY }}>{t.routes.machineryModule}</h3>
            <p className="mb-6 text-base leading-relaxed text-muted-foreground">{t.machinery.p}</p>
            <ul className="space-y-3">
              {t.machinery.features.map((f, i) => {
                const Icon = [Tractor, Cloud, FileBarChart2][i] ?? Tractor;
                const c = [GREEN, TEAL, BLUE][i] ?? GREEN;
                return (
                  <li key={f.title} className="flex gap-3 rounded-2xl border border-border bg-[#fafcfa] p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${c}15`, color: c }}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-semibold" style={{ color: NAVY }}>{f.title}</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <h4 className="mb-3 mt-7 text-sm font-semibold" style={{ color: NAVY }}>{t.machinery.activityTitle}</h4>
            <ol className="grid gap-2 sm:grid-cols-3">
              {t.machinery.activityStatuses.map((status, i) => {
                const m = statusMeta[i] ?? statusMeta[0];
                const Icon = m.icon;
                return (
                  <li key={status} className="rounded-xl p-3" style={{ backgroundColor: `${m.color}10` }}>
                    <span className="mb-1 flex items-center gap-1.5 text-sm font-semibold" style={{ color: m.text }}>
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />{status}
                    </span>
                    <span className="block text-xs leading-relaxed text-muted-foreground">{t.routes.activityDescs[i]}</span>
                  </li>
                );
              })}
            </ol>
          </div>
          <figure className="min-w-0 bg-[#eef4ef] p-4 sm:p-8 lg:flex lg:flex-col lg:justify-center">
            <LazyImage
              src="/farm-machinery-activities.webp"
              alt={t.machinery.imageAlt}
              className="block h-auto w-full"
              containerClassName="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-2xl border border-border bg-white"
              width={1800}
              height={1657}
              placeholder={THUMBNAILS["farm-machinery-activities"]}
              data-testid="img-features-machinery"
            />
            <figcaption className="mt-4 text-center text-sm text-muted-foreground">{t.machinery.imageCaption}</figcaption>
          </figure>
        </article>
      </div>
    </section>
  );
}
