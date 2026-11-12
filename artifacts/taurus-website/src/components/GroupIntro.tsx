import type { LucideIcon } from "lucide-react";

/** Clear group label used to separate the two software products. */
export function GroupIntro({ id, icon: Icon, color, eyebrow, title, text, count }: {
  id: string; icon: LucideIcon; color: string; eyebrow: string; title: string; text: string; count: string;
}) {
  return (
    <div id={id} className="scroll-mt-28 border-y border-border bg-white">
      <div className="container mx-auto flex flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:gap-6 lg:px-12 lg:py-10">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: `${color}15`, color }}>
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color }}>{eyebrow}</p>
          <h2 className="mt-1 text-2xl font-bold text-[#1e293b] sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-muted-foreground">{text}</p>
        </div>
        <span className="self-start rounded-full border px-3 py-1.5 text-sm font-semibold sm:self-center" style={{ color, borderColor: `${color}40` }}>{count}</span>
      </div>
    </div>
  );
}
