/*
 * Generates explanatory (non-screenshot) NitroCrop NDVI figures in EN and ES.
 * Run: pnpm --filter @workspace/scripts run gen-nitrocrop-illustrations
 * No readings, map results, doses or savings figures are depicted: only concepts.
 */
import sharp from "sharp";
import { join, resolve } from "path";

const publicDir = resolve(import.meta.dirname, "../../artifacts/taurus-website/public");
const W = 1000;
const H = 660;

const NAVY = "#1e293b";
const GREEN = "#2d9b4e";
const TEAL = "#0d9488";
const BLUE = "#3b82f6";
const PAPER = "#f4f8f4";
const LINE = "#d5e3d8";
const MUTED = "#5b6b80";
const FONT = "DejaVu Sans, Arial, sans-serif";

type Lang = "en" | "es";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const text = (x: number, y: number, s: string, size = 20, fill = NAVY, weight = 400, anchor = "start") =>
  `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(s)}</text>`;
const box = (x: number, y: number, w: number, h: number, fill = "#fbfdfb", stroke = LINE, r = 18) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
const arrow = (x1: number, y1: number, x2: number, y2: number, c = TEAL) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="4" stroke-linecap="round" marker-end="url(#ah)"/>`;

const L = {
  en: {
    label: "EXPLANATORY ILLUSTRATION - NOT AN APP SCREENSHOT",
    foot: "Conceptual diagram. No measured data, map results or doses shown.",
    t1: "Set up the survey context",
    s1: ["Crop", "Variety", "Field", "Growth stage"],
    d1: ["Tobacco or durum wheat", "~1,500 varieties database", "Plot being surveyed", "Defines the reference"],
    r1: "Survey context ready",
    t2: "Five proximal NDVI readings per survey",
    r2: ["Reading", "Optional GPS position, when available", "Survey saved to history", "Proximal sensor held over the canopy"],
    t3: "Mean versus growth-stage reference",
    m3: "Mean of the 5 readings",
    ref3: "Reference for crop, variety and stage",
    dev3: "Deviation",
    n3: "The deviation is the gap between the mean and the reference.",
    t4: "From survey points to exportable maps",
    a4: "Survey points", b4: "Interpolation", c4: "Prescription map", d4: "Export",
    g4: "For GIS tools and Farm 2.0 VRT",
    t5: "How the suggested dose is bounded",
    p5: ["Below reference:", "dose proportional to the deviation"],
    q5: ["At or above reference:", "suggested dose is zero"],
    cap5: "Always capped by the remaining plan allowance",
    sav5: "Savings = plan vs projected use (an estimate)",
  },
  es: {
    label: "ILUSTRACIÓN EXPLICATIVA - NO ES UNA CAPTURA DE LA APP",
    foot: "Diagrama conceptual. Sin datos medidos, mapas reales ni dosis.",
    t1: "Configura el contexto de la medición",
    s1: ["Cultivo", "Variedad", "Parcela", "Fase fenológica"],
    d1: ["Tabaco o trigo duro", "Base de ~1.500 variedades", "Parcela que se mide", "Define la referencia"],
    r1: "Contexto de medición listo",
    t2: "Cinco lecturas NDVI proximales por medición",
    r2: ["Lectura", "Posición GPS opcional, si está disponible", "Medición guardada en el historial", "Sensor proximal sobre la cubierta vegetal"],
    t3: "Media comparada con la referencia de la fase",
    m3: "Media de las 5 lecturas",
    ref3: "Referencia por cultivo, variedad y fase",
    dev3: "Desviación",
    n3: "La desviación es la diferencia entre la media y la referencia.",
    t4: "De los puntos medidos a mapas exportables",
    a4: "Puntos medidos", b4: "Interpolación", c4: "Mapa de prescripción", d4: "Exportar",
    g4: "Para herramientas GIS y Farm 2.0 VRT",
    t5: "Cómo se limita la dosis sugerida",
    p5: ["Bajo la referencia:", "dosis proporcional a la desviación"],
    q5: ["En o sobre la referencia:", "la dosis sugerida es cero"],
    cap5: "Siempre limitada por la cantidad restante del plan",
    sav5: "Ahorro = plan frente a uso previsto (una estimación)",
  },
} satisfies Record<Lang, Record<string, unknown>>;

function frame(lang: Lang, n: number, title: string, body: string): string {
  const c = L[lang];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs><marker id="ah" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="${TEAL}"/></marker>
<pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="${LINE}"/></pattern></defs>
<rect width="${W}" height="${H}" fill="${PAPER}"/><rect width="${W}" height="${H}" fill="url(#dots)" opacity="0.6"/>
<rect x="0" y="0" width="${W}" height="46" fill="${NAVY}"/>
${text(32, 30, c.label, 17, "#ffffff", 700)}
${text(W - 32, 30, "NitroCrop NDVI", 17, "#9be3b4", 700, "end")}
<circle cx="62" cy="104" r="28" fill="${GREEN}"/>${text(62, 114, `0${n}`, 26, "#fff", 700, "middle")}
${text(108, 116, title, 32, NAVY, 700)}
${body}
<rect x="0" y="${H - 44}" width="${W}" height="44" fill="#e3eee6"/>
<rect x="0" y="${H - 44}" width="8" height="44" fill="${TEAL}"/>
${text(32, H - 16, c.foot, 17, MUTED, 400)}
</svg>`;
}

function fig1(lang: Lang) {
  const c = L[lang];
  let b = "";
  c.s1.forEach((s, i) => {
    const y = 170 + i * 98;
    b += box(60, y, 560, 80);
    b += `<rect x="60" y="${y}" width="12" height="80" rx="6" fill="${[GREEN, TEAL, BLUE, NAVY][i]}"/>`;
    b += text(96, y + 36, s, 26, NAVY, 700) + text(96, y + 64, c.d1[i], 19, MUTED);
    b += arrow(630, y + 40, 690, 392);
  });
  b += box(700, 300, 250, 184, NAVY, NAVY, 24);
  b += `<path d="M790 360 l22 22 l44 -44" stroke="#9be3b4" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const words = c.r1.split(" ");
  const half = Math.ceil(words.length / 2);
  b += text(825, 432, words.slice(0, half).join(" "), 22, "#fff", 700, "middle");
  b += text(825, 460, words.slice(half).join(" "), 22, "#fff", 700, "middle");
  return frame(lang, 1, c.t1, b);
}

function fig2(lang: Lang) {
  const c = L[lang];
  let b = "";
  // sensor over canopy
  b += box(50, 160, 380, 380, "#fbfdfb");
  b += `<rect x="150" y="200" width="180" height="60" rx="14" fill="${NAVY}"/><rect x="180" y="215" width="60" height="30" rx="6" fill="${TEAL}"/>`;
  b += `<line x1="240" y1="260" x2="240" y2="290" stroke="${NAVY}" stroke-width="8"/>`;
  b += `<path d="M180 300 L120 440 M240 300 L240 440 M300 300 L360 440" stroke="${TEAL}" stroke-width="3" stroke-dasharray="8 8"/>`;
  for (let i = 0; i < 9; i++) {
    const x = 80 + i * 40;
    b += `<path d="M${x} 500 C ${x - 14} 470, ${x - 6} 455, ${x} 440 C ${x + 6} 455, ${x + 14} 470, ${x} 500 Z" fill="${GREEN}" opacity="${0.6 + (i % 3) * 0.13}"/>`;
  }
  b += text(240, 528, c.r2[3], 16, MUTED, 400, "middle");
  // five slots
  for (let i = 0; i < 5; i++) {
    const y = 160 + i * 56;
    b += box(480, y, 470, 44, "#fff", LINE, 12);
    b += `<circle cx="508" cy="${y + 22}" r="13" fill="${GREEN}"/>` + text(508, y + 29, `${i + 1}`, 17, "#fff", 700, "middle");
    b += text(534, y + 29, `${c.r2[0]} ${i + 1}`, 19, NAVY, 700);
    b += `<rect x="760" y="${y + 13}" width="170" height="18" rx="9" fill="#e3eee6"/>` + text(845, y + 28, "NDVI", 14, MUTED, 700, "middle");
  }
  b += box(480, 450, 470, 42, "#eaf5f3", TEAL, 12) + `<circle cx="508" cy="471" r="8" fill="none" stroke="${TEAL}" stroke-width="4"/>` + text(530, 478, c.r2[1], 18, NAVY);
  b += box(480, 502, 470, 42, "#eef3fd", BLUE, 12) + `<rect x="500" y="462" width="0" height="0"/>` + text(530, 530, c.r2[2], 18, NAVY);
  b += `<path d="M500 515 h16 v16 h-16z" fill="none" stroke="${BLUE}" stroke-width="3"/>`;
  return frame(lang, 2, c.t2, b);
}

function fig3(lang: Lang) {
  const c = L[lang];
  let b = "";
  const base = 500, refY = 240, meanY = 340;
  b += box(50, 160, 900, 410, "#fbfdfb");
  b += `<line x1="110" y1="${base}" x2="900" y2="${base}" stroke="${LINE}" stroke-width="3"/>`;
  b += text(100, 196, "NDVI", 18, MUTED, 700);
  // five abstract bars (no values, no axis numbers)
  const hs = [140, 175, 150, 185, 160];
  hs.forEach((h, i) => { b += `<rect x="${140 + i * 70}" y="${base - h}" width="44" height="${h}" rx="8" fill="${GREEN}" opacity="0.35"/>`; });
  b += `<line x1="120" y1="${meanY}" x2="880" y2="${meanY}" stroke="${GREEN}" stroke-width="5"/>`;
  b += `<line x1="120" y1="${refY}" x2="880" y2="${refY}" stroke="${NAVY}" stroke-width="4" stroke-dasharray="14 10"/>`;
  b += text(520, refY - 14, c.ref3, 20, NAVY, 700);
  b += text(520, meanY + 32, c.m3, 20, GREEN, 700);
  b += `<line x1="800" y1="${refY + 8}" x2="800" y2="${meanY - 8}" stroke="${TEAL}" stroke-width="4" marker-end="url(#ah)" marker-start="url(#ah)"/>`;
  b += box(690, 268, 96, 44, TEAL, TEAL, 10) + text(738, 297, c.dev3, 15, "#fff", 700, "middle");
  b += text(500, 546, c.n3, 18, MUTED, 400, "middle");
  return frame(lang, 3, c.t3, b);
}

function fig4(lang: Lang) {
  const c = L[lang];
  let b = "";
  const pts = [[80, 60], [150, 30], [200, 110], [60, 150], [130, 180], [210, 200], [100, 100]];
  const panel = (x: number, label: string, inner: string) =>
    box(x, 170, 250, 290) + `<g transform="translate(${x + 5},${190})">${inner}</g>` + text(x + 125, 498, label, 21, NAVY, 700, "middle");
  const field = `<path d="M20 20 L220 10 L230 230 L10 220 Z" fill="#e8f1ea" stroke="${LINE}" stroke-width="2"/>`;
  b += panel(40, c.a4, field + pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="${TEAL}" stroke="#fff" stroke-width="3"/>`).join(""));
  b += arrow(296, 315, 364, 315);
  // interpolation: gradient zones, neutral (no meaning attached)
  const zones = `<clipPath id="fc"><path d="M20 20 L220 10 L230 230 L10 220 Z"/></clipPath><g clip-path="url(#fc)">
    <rect x="0" y="0" width="240" height="240" fill="#cfe7d6"/><circle cx="70" cy="70" r="90" fill="#9fd3b0" opacity="0.8"/>
    <circle cx="190" cy="180" r="80" fill="#7cc4bd" opacity="0.8"/><circle cx="160" cy="60" r="50" fill="#b9dccc"/></g>
    <path d="M20 20 L220 10 L230 230 L10 220 Z" fill="none" stroke="${NAVY}" stroke-width="2"/>`;
  b += panel(375, c.c4, zones + pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="${NAVY}"/>`).join(""));
  b += text(330, 290, c.b4, 15, TEAL, 700, "middle");
  b += arrow(631, 315, 699, 315);
  const fmts = ["PDF", "CSV", "GeoTIFF", "Shapefile"];
  b += box(710, 170, 250, 290);
  fmts.forEach((f, i) => { b += box(735, 192 + i * 64, 200, 50, i % 2 ? "#eaf5f3" : "#eef3fd", i % 2 ? TEAL : BLUE, 10) + text(835, 225 + i * 64, f, 20, NAVY, 700, "middle"); });
  b += text(835, 498, c.d4, 21, NAVY, 700, "middle");
  b += text(500, 552, c.g4, 19, MUTED, 400, "middle");
  return frame(lang, 4, c.t4, b);
}

function fig5(lang: Lang) {
  const c = L[lang];
  let b = "";
  b += box(50, 160, 440, 190, "#fbfdfb", GREEN);
  b += `<rect x="80" y="200" width="70" height="110" rx="10" fill="none" stroke="${NAVY}" stroke-width="3" stroke-dasharray="8 6"/><rect x="80" y="250" width="70" height="60" rx="10" fill="${GREEN}"/>`;
  b += text(176, 240, c.p5[0], 22, NAVY, 700) + text(176, 272, c.p5[1].split(" ").slice(0, 3).join(" "), 19, MUTED) + text(176, 298, c.p5[1].split(" ").slice(3).join(" "), 19, MUTED);
  b += box(510, 160, 440, 190, "#fbfdfb", NAVY);
  b += `<rect x="540" y="200" width="70" height="110" rx="10" fill="${GREEN}" opacity="0.35"/><line x1="530" y1="200" x2="620" y2="200" stroke="${NAVY}" stroke-width="4" stroke-dasharray="10 6"/>`;
  b += text(636, 240, c.q5[0], 22, NAVY, 700) + text(636, 272, c.q5[1], 19, MUTED);
  b += text(636, 318, "= 0", 30, TEAL, 700);
  // cap
  b += box(50, 372, 900, 92, NAVY, NAVY, 18);
  b += `<rect x="80" y="400" width="200" height="36" rx="18" fill="#2b3a52"/><rect x="80" y="400" width="140" height="36" rx="18" fill="${GREEN}"/><line x1="232" y1="392" x2="232" y2="444" stroke="#9be3b4" stroke-width="5"/>`;
  b += text(310, 426, c.cap5, 22, "#fff", 700);
  b += box(50, 484, 900, 72, "#eaf5f3", TEAL, 18);
  b += text(80, 528, c.sav5, 21, NAVY, 700);
  return frame(lang, 5, c.t5, b);
}

const FIGS: Array<[string, (l: Lang) => string]> = [
  ["crop-settings", fig1],
  ["ndvi-readings", fig2],
  ["stage-comparison", fig3],
  ["map-export", fig4],
  ["nitrogen-plan", fig5],
];

async function main() {
  for (const lang of ["en", "es"] as Lang[]) {
    for (const [slug, fn] of FIGS) {
      const out = join(publicDir, `nitrocrop-${lang}-${slug}-illustration-v1.webp`);
      await sharp(Buffer.from(fn(lang)), { density: 96 }).resize(W, H).webp({ quality: 86 }).toFile(out);
      console.log(`  wrote ${out}`);
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
