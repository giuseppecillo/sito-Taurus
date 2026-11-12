import { Link, useLocation } from "wouter";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Lang } from "@/i18n/translations";

const GREEN = "#2d9b4e";
const NAVY = "#1e293b";
const LANGS: Lang[] = ["it", "en", "es"];
const LANG_LABEL: Record<Lang, string> = { it: "Lingua", en: "Language", es: "Idioma" };

/** Shared header for secondary routes (/funzionalita, /soluzioni). */
export function SiteHeader() {
  const { lang, setLang, t } = useLanguage();
  const [location] = useLocation();
  const links = [
    { href: "/", label: t.routes.navHome, id: "home" },
    { href: "/funzionalita", label: t.nav.funzionalita, id: "funzionalita" },
    { href: "/malattie", label: t.nav.malattie, id: "malattie" },
    { href: "/soluzioni", label: t.nav.soluzioni, id: "soluzioni" },
  ];

  const nav = (cls: string) => (
    <nav aria-label={t.routes.pageNav} className={cls}>
      {links.map((l) => {
        const active = location === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full px-3 text-sm font-semibold transition-colors hover:bg-muted sm:flex-none sm:px-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            style={active ? { backgroundColor: `${GREEN}14`, color: GREEN } : { color: NAVY }}
            data-testid={`link-header-${l.id}`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 lg:px-12">
        <Link href="/" className="flex min-h-[44px] items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="link-header-logo">
          <img src="/taurus-logo.webp" alt="Taurus Agriculture Solution" className="h-9 w-auto" width={1952} height={2166} />
        </Link>
        {nav("hidden md:flex items-center gap-1")}
        <div role="group" aria-label={LANG_LABEL[lang]} className="flex items-center gap-0.5 rounded-full border border-border p-1">
          <Globe className="mx-1 h-3.5 w-3.5 text-foreground/60" aria-hidden="true" />
          {LANGS.map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              aria-pressed={lang === code}
              className="min-h-[44px] min-w-[44px] rounded-full px-2 text-xs font-semibold transition-colors"
              style={lang === code ? { backgroundColor: GREEN, color: "white" } : { color: NAVY }}
              data-testid={`btn-header-lang-${code}`}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      {nav("grid grid-cols-2 sm:grid-cols-4 md:hidden items-center gap-1 border-t border-border px-2 py-1")}
    </header>
  );
}
