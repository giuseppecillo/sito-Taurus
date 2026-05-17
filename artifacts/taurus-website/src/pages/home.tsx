import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Map,
  Leaf,
  Tractor,
  Satellite,
  CheckCircle2,
  LayoutDashboard,
  Cloud,
  Bug,
  FileBarChart2,
  Layers,
  Smartphone,
  Radio,
  Thermometer,
  Droplets
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

/* ─── Colors extracted directly from Farm 2.0 VRT screenshots ─── */
/* Green  #2d9b4e  → primary brand (sidebar active, buttons)       */
/* Blue   #3b82f6  → data cards (Appezzamenti, Superficie)          */
/* Teal   #0d9488  → prescription/NDVI header                       */
/* Navy   #1e293b  → sidebar text, headings                         */
/* Amber  #f59e0b  → medium-risk indicators                         */
/* Red    #ef4444  → high-risk indicators                           */

const GREEN   = "#2d9b4e";
const BLUE    = "#3b82f6";
const TEAL    = "#0d9488";
const NAVY    = "#1e293b";
const AMBER   = "#f59e0b";
const RED_    = "#ef4444";
const PURPLE  = "#8b5cf6";

const appFeatures = [
  {
    id: "appezzamenti",
    icon: LayoutDashboard,
    label: "Gestione Appezzamenti",
    title: "I tuoi campi, sempre sotto controllo",
    description: "Visualizza e gestisci tutti i tuoi appezzamenti in un'unica dashboard. Carica file o disegna i poligoni direttamente sulla mappa. Monitora superficie totale, coltura, tipo suolo e date di semina per ogni campo.",
    image: "/farm-screen-1.png",
    color: GREEN,
    badge: "22 appezzamenti · 66.7 ha"
  },
  {
    id: "meteo",
    icon: Cloud,
    label: "Previsioni Meteo",
    title: "Dati agrometeorologici in tempo reale",
    description: "Previsioni meteo specifiche per il centroide di ogni appezzamento. Temperatura, umidità, precipitazioni e vento per i prossimi 7 giorni. Analisi bagnatura fogliare per anticipare condizioni favorevoli alle malattie fungine.",
    image: "/farm-screen-2.png",
    color: TEAL,
    badge: "7 giorni di previsione · Aggiornamento live"
  },
  {
    id: "malattie",
    icon: Bug,
    label: "Monitoraggio Malattie",
    title: "Previeni prima che sia troppo tardi",
    description: "Monitoraggio e previsione del rischio fitosanitario basato su dati meteo e modelli patologici. Traccia il rischio nel tempo per Grano, Vite, Tabacco e Pomodoro. Verifica l'efficacia e la durata dei fitofarmaci applicati.",
    image: "/farm-screen-3.png",
    color: AMBER,
    badge: "Peronospora · Fusariosi · Alternaria"
  },
  {
    id: "prescrizione",
    icon: FileBarChart2,
    label: "Mappa di Prescrizione",
    title: "VRT: la giusta dose nel posto giusto",
    description: "Calcola mappe di prescrizione a rateo variabile con clustering K-means su dati NDVI. Identifica zone omogenee Alto / Medio / Basso. Esporta in GeoTIFF o SHP — compatibile con Topcon e Trimble.",
    image: "/farm-screen-4.png",
    color: GREEN,
    badge: "GeoTIFF · SHP · Topcon · Trimble"
  },
  {
    id: "mappe",
    icon: Layers,
    label: "VRT 2.0 Mappe",
    title: "Visibilità millimetrica sul vigore vegetativo",
    description: "Visualizza indici NDVI e mappe di classificazione direttamente sull'immagine satellitare. Interroga ogni pixel per conoscere DN value e classe. Attiva il tracciamento GPS in tempo reale per navigare in campo.",
    image: "/farm-screen-5.png",
    color: TEAL,
    badge: "NDVI · Sentinel-2 · GPS attivo"
  }
];

const crops = [
  { name: "Grano",    icon: "🌾", risk: 72, color: AMBER,  tag: "Fusariosi della spiga" },
  { name: "Vite",     icon: "🍇", risk: 38, color: PURPLE, tag: "Peronospora della vite" },
  { name: "Tabacco",  icon: "🌿", risk: 55, color: GREEN,  tag: "Peronospora tabacina" },
  { name: "Pomodoro", icon: "🍅", risk: 61, color: RED_,   tag: "Peronospora del pomodoro" }
];

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">

      {/* ─── NAVBAR — white, matches Farm 2.0 VRT header ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 lg:px-12 bg-white/95 backdrop-blur border-b border-border shadow-sm">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/taurus-logo.png"
            alt="Taurus AgriTech Solutions"
            className="h-10 w-auto group-hover:opacity-90 transition-opacity"
            data-testid="img-navbar-logo"
          />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {[
            { href: "#farm-vrt",  label: "Farm 2.0" },
            { href: "#showcase",  label: "Funzionalità" },
            { href: "#malattie",  label: "Malattie" },
            { href: "#solutions", label: "Soluzioni" }
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-foreground/70 hover:text-primary transition-colors"
              data-testid={`link-nav-${href.slice(1)}`}
            >
              {label}
            </a>
          ))}
        </div>
        <Button
          className="text-white rounded-full px-6 font-medium"
          style={{ backgroundColor: GREEN }}
          asChild
        >
          <a href="#contact" data-testid="btn-nav-demo">Richiedi Demo</a>
        </Button>
      </nav>

      <main>
        {/* ─── HERO — deep green-navy, matches the sidebar dark feel ─── */}
        <section
          className="relative pt-32 pb-0 lg:pt-44 overflow-hidden"
          style={{ background: `linear-gradient(145deg, #0f1e14 0%, #1a3228 55%, #0f2430 100%)` }}
        >
          {/* subtle glow blobs */}
          <div className="absolute right-0 top-0 w-[700px] h-[700px] rounded-full blur-[130px] opacity-20 translate-x-1/3 -translate-y-1/4"
            style={{ backgroundColor: GREEN }} />
          <div className="absolute left-0 bottom-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-15 -translate-x-1/3"
            style={{ backgroundColor: TEAL }} />

          <div className="container relative z-10 mx-auto px-6 lg:px-12 pb-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6 border"
                style={{ backgroundColor: `${GREEN}22`, borderColor: `${GREEN}55`, color: "#4ade80" }}
              >
                <Leaf className="w-4 h-4" />
                <span>Il futuro della terra, oggi.</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight text-white">
                L'Agricoltura di Precisione <br />
                <span style={{ color: "#4ade80" }}>per chi vuole di più.</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg lg:text-xl mb-10 max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                Software multisorgente che integra dati satellitari, sensori IoT e modelli agronomici avanzati. Il controllo totale della tua azienda agricola, dal campo al cloud.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  className="text-white rounded-full px-8 h-14 text-base font-medium"
                  style={{ backgroundColor: GREEN, boxShadow: `0 0 24px ${GREEN}55` }}
                  asChild
                >
                  <a href="#farm-vrt" data-testid="btn-hero-discover">
                    Scopri Farm 2.0 <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 h-14 text-base text-white border-white/30 hover:bg-white/10"
                  asChild
                >
                  <a href="#contact" data-testid="btn-hero-contact">Parla con un esperto</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Aerial field strip at bottom of hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative w-full h-[300px] lg:h-[420px] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-10" />
            <img
              src="/img-aerial-field.jpg"
              alt="Campi agricoli di precisione visti dall'alto"
              className="w-full h-full object-cover object-center"
              data-testid="img-hero-aerial"
            />
            {/* Floating stat badges */}
            <div className="absolute bottom-8 left-8 z-20 hidden lg:flex gap-4">
              {[
                { label: "Appezzamenti gestiti", val: "22" },
                { label: "Superficie monitorata", val: "66.7 ha" },
                { label: "Aggiornamento rischio", val: "Ogni 24h" }
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.15 }}
                  className="bg-white/90 backdrop-blur rounded-xl px-5 py-3 shadow-lg border border-border"
                >
                  <div className="text-2xl font-bold" style={{ color: GREEN }}>{s.val}</div>
                  <div className="text-xs text-foreground/60">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── CHI SIAMO ─── */}
        <section className="py-24 bg-white border-b border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left — company intro */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.div
                  variants={fadeUp}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6 border"
                  style={{ backgroundColor: `${GREEN}12`, borderColor: `${GREEN}35`, color: GREEN }}
                >
                  <Leaf className="w-4 h-4" />
                  <span>Chi siamo</span>
                </motion.div>

                <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-bold leading-tight mb-6" style={{ color: NAVY }}>
                  Soluzioni integrate<br />
                  <span style={{ color: GREEN }}>per l'agroindustria moderna.</span>
                </motion.h2>

                <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-5 leading-relaxed">
                  Taurus AgriTech Solutions nasce per rispondere alle esigenze reali dell'agroindustria: sviluppiamo soluzioni software <strong className="text-foreground font-semibold">integrate e auto-consolidate</strong> che aggregano dati da fonti multiple, li elaborano con modelli agronomici validati e li restituiscono in forma immediatamente operativa.
                </motion.p>

                <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Non vendiamo strumenti isolati. Costruiamo ecosistemi digitali che accompagnano l'imprenditore agricolo — e il suo tecnico — in ogni fase del ciclo colturale, dal monitoraggio del campo alla decisione in cabina.
                </motion.p>

                <motion.div variants={fadeUp}>
                  <Button
                    size="lg"
                    className="text-white rounded-full px-8 h-12 font-medium"
                    style={{ backgroundColor: GREEN }}
                    asChild
                  >
                    <a href="#contact" data-testid="btn-about-demo">Parla con noi</a>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right — pillars grid */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  {
                    color: GREEN,
                    icon: "📈",
                    title: "Produttività",
                    desc: "Ottimizza risorse, input e tempistiche operative su ogni appezzamento."
                  },
                  {
                    color: BLUE,
                    icon: "🔗",
                    title: "Scalabilità",
                    desc: "Da una singola azienda a reti di consulenza multi-cliente, senza compromessi."
                  },
                  {
                    color: TEAL,
                    icon: "🔍",
                    title: "Tracciabilità",
                    desc: "Ogni operazione registrata, ogni trattamento documentato. Conformità garantita."
                  },
                  {
                    color: AMBER,
                    icon: "🌱",
                    title: "Sostenibilità",
                    desc: "Agricoltura consapevole: meno sprechi, meno chimica, più valore per ettaro."
                  }
                ].map((p, i) => (
                  <motion.div
                    key={p.title}
                    variants={fadeUp}
                    className="p-6 rounded-2xl bg-muted border border-border hover:shadow-md transition-shadow"
                    data-testid={`card-pillar-${p.title.toLowerCase()}`}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4"
                      style={{ backgroundColor: `${p.color}15` }}
                    >
                      {p.icon}
                    </div>
                    <h3 className="font-bold text-base mb-2" style={{ color: NAVY }}>{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Bottom stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border"
            >
              {[
                { val: "Multi-sorgente", label: "Integrazione dati", color: GREEN },
                { val: "Validati", label: "Modelli agronomici", color: TEAL },
                { val: "End-to-end", label: "Copertura del ciclo colturale", color: BLUE },
                { val: "Business-ready", label: "Orientato al risultato", color: AMBER }
              ].map((s, i) => (
                <div key={i} className="bg-white px-6 py-6 flex flex-col gap-1">
                  <span className="text-xl font-bold" style={{ color: s.color }}>{s.val}</span>
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── TRACTOR / TABLET CINEMATIC BANNER ─── */}
        <section id="farm-vrt" className="relative h-[520px] lg:h-[620px] overflow-hidden flex items-center">
          <div className="absolute inset-0">
            <img
              src="/img-tractor-tablet.jpg"
              alt="Trattorista che utilizza Farm 2.0 VRT su tablet in campo"
              className="w-full h-full object-cover object-center"
              data-testid="img-tractor-banner"
            />
            {/* white-to-transparent gradient for editorial look */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
          </div>

          <div className="container relative z-10 mx-auto px-6 lg:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="max-w-xl"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-5 border"
                style={{ backgroundColor: `${GREEN}18`, borderColor: `${GREEN}40`, color: GREEN }}
              >
                <Tractor className="w-4 h-4" />
                <span>Prescrizione a bordo trattore</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl lg:text-6xl font-bold leading-tight mb-5" style={{ color: NAVY }}>
                Farm 2.0 VRT.<br />
                <span style={{ color: GREEN }}>Guida il campo,<br />non l'istinto.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg mb-8 leading-relaxed" style={{ color: `${NAVY}bb` }}>
                Il trattorista ha la mappa di prescrizione sul tablet, il terminale GNSS riceve la dose variabile in automatico. Meno sprechi, più produzione, zero margine di errore.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                {["Topcon", "Trimble", "GeoTIFF", "SHP"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono font-semibold rounded-full border"
                    style={{ backgroundColor: `${GREEN}12`, borderColor: `${GREEN}40`, color: GREEN }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── FARM 2.0 FEATURES + VIDEO ─── */}
        <section className="py-24 bg-muted border-y border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-bold mb-4" style={{ color: NAVY }}>
                  Una piattaforma.<br />Ogni aspetto del campo.
                </motion.h2>
                <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-8">
                  Fertilizzazione, semina e difesa delle colture in un'unica interfaccia progettata per l'agricoltura professionale.
                </motion.p>
                <motion.div variants={staggerContainer} className="space-y-5">
                  {[
                    { title: "Mappatura Intelligente",        desc: "Aggiungi appezzamenti caricando file o disegnandoli su mappa satellitare." },
                    { title: "Mappe di Prescrizione VRT",    desc: "Zone omogenee NDVI — export compatibile con Topcon e Trimble." },
                    { title: "Previsione Malattie",           desc: "Monitora rischio per Grano, Vite, Tabacco e Pomodoro." },
                    { title: "Verifica Copertura Fitofarmaco", desc: "Traccia la durata protettiva degli agrofarmaci applicati." }
                  ].map((f, i) => (
                    <motion.div key={i} variants={fadeUp} className="flex gap-4">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${GREEN}18`, border: `1.5px solid ${GREEN}40` }}
                      >
                        <CheckCircle2 className="w-5 h-5" style={{ color: GREEN }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-0.5" style={{ color: NAVY }}>{f.title}</h3>
                        <p className="text-muted-foreground text-sm">{f.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div
                  className="absolute inset-0 rounded-3xl blur-2xl opacity-15"
                  style={{ backgroundColor: GREEN }}
                />
                <div className="relative rounded-3xl overflow-hidden border border-border shadow-xl">
                  {/* Negative margin-top clips the browser chrome (tabs, address bar, bookmarks)
                      that appears at the top of the screen recording. overflow-hidden on the
                      parent ensures the clipped area is never visible. */}
                  <video
                    src="/farm-vrt-demo.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full block"
                    style={{ marginTop: "-13%", display: "block" }}
                    data-testid="video-farm-demo"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── SMARTPHONE / CONNECTIVITY ─── */}
        <section className="relative overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[540px]">
            <div className="relative h-[320px] lg:h-auto overflow-hidden">
              <img
                src="/img-tractor-sprayer.png"
                alt="Trattore con barra irroratrice che effettua trattamento fitosanitario in campo"
                className="w-full h-full object-cover object-center"
                data-testid="img-tractor-sprayer"
              />
              <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(to right, transparent, white)" }} />
              <div className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(to top, white 30%, transparent)" }} />
            </div>

            <div className="bg-white flex items-center px-8 lg:px-16 py-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="max-w-lg"
              >
                <motion.div
                  variants={fadeUp}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-5 border"
                  style={{ backgroundColor: `${TEAL}12`, borderColor: `${TEAL}40`, color: TEAL }}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Sempre connesso, ovunque sei</span>
                </motion.div>
                <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-bold leading-tight mb-5" style={{ color: NAVY }}>
                  La salute della pianta<br />
                  <span style={{ color: GREEN }}>nel palmo della mano.</span>
                </motion.h2>
                <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Consulta indici NDVI, rischio malattie e previsioni meteo dallo smartphone — sia in campo che da casa o ufficio. Taurus ti porta i dati ovunque, in tempo reale.
                </motion.p>
                <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Satellite, label: "Dati satellitari live",    color: BLUE },
                    { icon: Radio,     label: "Sensori IoT connessi",     color: TEAL },
                    { icon: Thermometer, label: "Meteo per appezzamento", color: GREEN },
                    { icon: Droplets,  label: "Stress idrico previsto",   color: BLUE }
                  ].map(({ icon: Icon, label, color }, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted border border-border"
                    >
                      <Icon className="w-5 h-5 shrink-0" style={{ color }} />
                      <span className="text-sm font-medium" style={{ color: NAVY }}>{label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── IoT CONNECTIVITY BANNER ─── */}
        <section className="relative h-[340px] lg:h-[420px] overflow-hidden flex items-center justify-center">
          <img
            src="/img-iot-connect.png"
            alt="Rete IoT che connette satellite, drone e sensori alla piattaforma Taurus"
            className="absolute inset-0 w-full h-full object-cover object-center"
            data-testid="img-iot-connect"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(15,30,20,0.65), rgba(15,30,20,0.85))" }} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-6 max-w-3xl"
          >
            <p className="text-sm font-mono tracking-widest uppercase mb-3" style={{ color: "#4ade80" }}>Ecosistema integrato</p>
            <h2 className="text-3xl lg:text-5xl font-bold text-white drop-shadow-lg">
              Satellite, Drone, IoT.<br />
              <span style={{ color: "#4ade80" }}>Un'unica visione.</span>
            </h2>
          </motion.div>
        </section>

        {/* ─── DISEASE MODULE ─── */}
        <section id="malattie" className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-5 border"
                style={{ backgroundColor: `${AMBER}15`, borderColor: `${AMBER}40`, color: AMBER }}
              >
                <Bug className="w-4 h-4" />
                <span>Modulo Malattie</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-bold mb-5" style={{ color: NAVY }}>
                Il tecnico che non dorme mai.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground">
                Modelli agronomici validati calcolano il rischio fitosanitario ogni 24 ore per ogni appezzamento. Intervieni nel momento giusto, con il prodotto giusto, alla dose giusta.
              </motion.p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-10 items-start mb-12">
              {/* Agronomist photo */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative rounded-3xl overflow-hidden shadow-xl border border-border"
              >
                <img
                  src="/img-agronomist-tablet.png"
                  alt="Tecnico agronomo che monitora la coltura in campo con tablet e Farm 2.0 VRT"
                  className="w-full h-[420px] object-cover object-center"
                  data-testid="img-agronomist-disease"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(30,41,59,0.85) 0%, transparent 55%)" }} />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-sm font-mono mb-2" style={{ color: "#4ade80" }}>Previsioni Rischio — 7 Giorni</p>
                  <div className="flex gap-3">
                    <div className="flex-1 rounded-xl p-3 border border-white/20 backdrop-blur-sm" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
                      <div className="text-2xl font-bold" style={{ color: AMBER }}>32%</div>
                      <div className="text-xs text-white/70">Rischio Protetto</div>
                    </div>
                    <div className="flex-1 rounded-xl p-3 border border-white/20 backdrop-blur-sm" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
                      <div className="text-2xl font-bold" style={{ color: RED_ }}>38%</div>
                      <div className="text-xs text-white/70">Rischio Massimo</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Crop risk cards */}
              <div className="space-y-4">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="space-y-4"
                >
                  {crops.map((crop, i) => (
                    <motion.div
                      key={crop.name}
                      variants={fadeUp}
                      className="flex items-center gap-5 p-5 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow"
                      style={{ borderColor: `${crop.color}30` }}
                      data-testid={`card-crop-${crop.name.toLowerCase()}`}
                    >
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                        style={{ backgroundColor: `${crop.color}15` }}
                      >
                        {crop.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-lg" style={{ color: NAVY }}>{crop.name}</h4>
                          <span className="text-sm font-mono font-bold" style={{ color: crop.color }}>{crop.risk}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{crop.tag}</p>
                        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${crop.risk}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: crop.color }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="p-4 rounded-xl border text-sm"
                  style={{ backgroundColor: `${AMBER}10`, borderColor: `${AMBER}30`, color: "#92400e" }}
                >
                  Verifica anche la durata di protezione del fitofarmaco applicato e ricevi l'allerta quando la finestra protettiva sta per scadere.
                </motion.div>
              </div>
            </div>

            {/* Crop disease visual banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden h-[240px] lg:h-[300px] border border-border"
            >
              <img
                src="/img-crop-disease.jpg"
                alt="Dettaglio foglia con sintomi di malattia fungina"
                className="w-full h-full object-cover object-center"
                data-testid="img-crop-disease-closeup"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(30,41,59,0.88) 40%, transparent)" }} />
              <div className="absolute inset-0 flex items-center px-8 lg:px-14">
                <div className="max-w-lg">
                  <p className="text-sm font-mono mb-2 tracking-wide uppercase" style={{ color: AMBER }}>Rilevamento precoce</p>
                  <h3 className="text-2xl lg:text-4xl font-bold text-white leading-tight">
                    Intercetta il patogeno<br />prima che si veda ad occhio nudo.
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── APP SCREENSHOT SHOWCASE ─── */}
        <section id="showcase" className="py-24 bg-muted border-y border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center max-w-3xl mx-auto mb-14"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-5 border"
                style={{ backgroundColor: `${BLUE}12`, borderColor: `${BLUE}35`, color: BLUE }}
              >
                <Layers className="w-4 h-4" />
                <span>Esplora l'interfaccia</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-bold mb-5" style={{ color: NAVY }}>
                Tutto ciò che ti serve,<br />in un'unica piattaforma.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground">
                Dalla gestione degli appezzamenti alla previsione delle malattie, passando per le mappe VRT.
              </motion.p>
            </motion.div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {appFeatures.map((f, i) => {
                const Icon = f.icon;
                const active = activeFeature === i;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFeature(i)}
                    data-testid={`btn-feature-tab-${f.id}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border"
                    style={{
                      backgroundColor: active ? `${f.color}18` : "white",
                      borderColor: active ? f.color : "#e5e7eb",
                      color: active ? f.color : "#6b7280"
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {f.label}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid lg:grid-cols-5 gap-8 items-center"
              >
                {/* Text */}
                <div className="lg:col-span-2 space-y-5">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border"
                    style={{
                      backgroundColor: `${appFeatures[activeFeature].color}12`,
                      borderColor: `${appFeatures[activeFeature].color}35`,
                      color: appFeatures[activeFeature].color
                    }}
                  >
                    {appFeatures[activeFeature].badge}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold leading-snug" style={{ color: NAVY }}>
                    {appFeatures[activeFeature].title}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {appFeatures[activeFeature].description}
                  </p>
                  <div className="flex gap-3 pt-2">
                    {appFeatures.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveFeature(i)}
                        data-testid={`btn-feature-dot-${i}`}
                        className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: activeFeature === i ? appFeatures[i].color : "#d1d5db",
                          transform: activeFeature === i ? "scale(1.35)" : "scale(1)"
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Screenshot */}
                <div className="lg:col-span-3 relative">
                  <div
                    className="absolute -inset-4 rounded-3xl blur-3xl opacity-10"
                    style={{ backgroundColor: appFeatures[activeFeature].color }}
                  />
                  <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl bg-white">
                    {/* Fake browser chrome styled like the Farm 2.0 VRT app */}
                    <div className="h-9 flex items-center px-4 gap-2" style={{ backgroundColor: GREEN }}>
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-300/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-300/80" />
                      </div>
                      <div className="ml-2 flex-1 h-5 rounded px-3 flex items-center" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                        <span className="text-[10px] text-white/60 font-mono">app.farm20vrt.it — {appFeatures[activeFeature].label}</span>
                      </div>
                    </div>
                    <img
                      src={appFeatures[activeFeature].image}
                      alt={appFeatures[activeFeature].label}
                      className="w-full h-auto object-cover object-top"
                      data-testid={`img-feature-screenshot-${appFeatures[activeFeature].id}`}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ─── REMOTE SENSING & DRONES ─── */}
        <section id="solutions" className="py-24 bg-white border-t border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-bold mb-6" style={{ color: NAVY }}>Telerilevamento & Droni</h2>
              <p className="text-lg text-muted-foreground">
                Soluzioni innovative di remote sensing satellitare e da drone per un monitoraggio millimetrico del vigore vegetativo e dello stress idrico.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Satellite, color: TEAL,
                  title: "Dati Satellitari",
                  desc: "Indici multispettrali aggiornati costantemente per analizzare la biomassa, ottimizzare le concimazioni e rilevare anomalie in campo aperto."
                },
                {
                  icon: Map, color: BLUE,
                  title: "Voli Drone",
                  desc: "I dati telerilevati da drone — termici, RGB e multispettrali — alimentano applicazioni sito-specifiche lungo tutto il ciclo colturale: dal monitoraggio dello stato vegetativo e dell'uniformità del campo, fino alla generazione di mappe VRT per concimazioni, trattamenti e semine a dose variabile."
                }
              ].map(({ icon: Icon, color, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-3xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${color}15` }}>
                    <Icon className="w-7 h-7" style={{ color }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: NAVY }}>{title}</h3>
                  <p className="text-muted-foreground">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CONTACT CTA ─── */}
        <section id="contact" className="py-28 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            <div
              className="max-w-4xl mx-auto rounded-[2.5rem] p-10 lg:p-16 text-center relative overflow-hidden border"
              style={{ background: `linear-gradient(135deg, #0f1e14 0%, #1a3228 100%)`, borderColor: `${GREEN}40` }}
            >
              <div
                className="absolute right-0 top-0 w-[400px] h-[400px] rounded-full blur-[80px] opacity-20 translate-x-1/3 -translate-y-1/3"
                style={{ backgroundColor: GREEN }}
              />
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-white">
                  Pronto a trasformare la tua azienda?
                </h2>
                <p className="text-xl mb-10 max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Richiedi una demo gratuita di Farm 2.0 o parla con un nostro agronomo per capire come supportare la tua realtà.
                </p>
                <form
                  className="max-w-md mx-auto flex flex-col sm:flex-row gap-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <Input
                    type="email"
                    placeholder="La tua email"
                    className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/40 text-base rounded-full px-6"
                    data-testid="input-email-cta"
                  />
                  <Button
                    type="submit"
                    className="h-14 text-white rounded-full px-8 text-base font-medium whitespace-nowrap"
                    style={{ backgroundColor: GREEN }}
                    data-testid="btn-submit-cta"
                  >
                    Richiedi Contatto
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white border-t border-border py-10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/taurus-logo.png" alt="Taurus Logo" className="h-8 w-auto opacity-70" />
              <span className="font-medium text-sm" style={{ color: NAVY }}>TAURUS AgriTech Solutions</span>
            </div>
            <div className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Taurus AgriTech Solutions. Tutti i diritti riservati.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
