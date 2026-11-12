import { useEffect, useState } from "react";

function setMeta(selector: string, value: string) {
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute("content", value);
}

function readMeta(selector: string) {
  return document.querySelector<HTMLMetaElement>(selector)?.getAttribute("content") ?? "";
}

const SELECTORS = {
  description: 'meta[name="description"]',
  ogTitle: 'meta[property="og:title"]',
  ogDescription: 'meta[property="og:description"]',
  ogUrl: 'meta[property="og:url"]',
  twTitle: 'meta[name="twitter:title"]',
  twDescription: 'meta[name="twitter:description"]',
} as const;

/** Sets route-specific title/description/social tags and restores defaults on unmount. */
export function useRouteMeta(title: string, description: string, path: string) {
  const [defaults] = useState(() => ({
    title: document.title,
    ...Object.fromEntries(Object.entries(SELECTORS).map(([k, s]) => [k, readMeta(s)])),
  }) as Record<string, string>);

  useEffect(() => {
    document.title = title;
    setMeta(SELECTORS.description, description);
    setMeta(SELECTORS.ogTitle, title);
    setMeta(SELECTORS.ogDescription, description);
    setMeta(SELECTORS.ogUrl, `https://taurusagsolution.com${path}`);
    setMeta(SELECTORS.twTitle, title);
    setMeta(SELECTORS.twDescription, description);
  }, [title, description, path]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
      if (target) target.scrollIntoView({ behavior: "instant" });
      else window.scrollTo(0, 0);
    });
    return () => {
      cancelAnimationFrame(frame);
      document.title = defaults.title;
      (Object.keys(SELECTORS) as (keyof typeof SELECTORS)[]).forEach((k) => setMeta(SELECTORS[k], defaults[k]));
    };
  }, [defaults]);
}
