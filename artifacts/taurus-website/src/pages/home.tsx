import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Map, 
  Leaf, 
  Tractor, 
  Satellite, 
  CloudRain, 
  Wifi, 
  ShieldCheck, 
  CheckCircle2,
  ChevronRight,
  LayoutDashboard,
  Cloud,
  Bug,
  FileBarChart2,
  Layers
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
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const appFeatures = [
  {
    id: "appezzamenti",
    icon: LayoutDashboard,
    label: "Gestione Appezzamenti",
    title: "I tuoi campi, sempre sotto controllo",
    description: "Visualizza e gestisci tutti i tuoi appezzamenti in un'unica dashboard. Carica file o disegna i poligoni direttamente sulla mappa. Monitora superficie totale, coltura, tipo suolo e date di semina per ogni campo.",
    image: "/farm-screen-1.png",
    color: "#2d9b4e",
    badge: "22 appezzamenti · 66.7 ha"
  },
  {
    id: "meteo",
    icon: Cloud,
    label: "Previsioni Meteo",
    title: "Dati agrometeorologici in tempo reale",
    description: "Previsioni meteo specifiche per il centroide di ogni appezzamento. Temperatura, umidità, precipitazioni e vento per i prossimi 7 giorni. Analisi bagnatura fogliare per anticipare le condizioni favorevoli allo sviluppo di malattie fungine.",
    image: "/farm-screen-2.png",
    color: "#0ea5e9",
    badge: "7 giorni di previsione · Aggiornamento live"
  },
  {
    id: "malattie",
    icon: Bug,
    label: "Monitoraggio Malattie",
    title: "Previeni prima che sia troppo tardi",
    description: "Monitoraggio e previsione del rischio fitosanitario basato su dati meteo e modelli patologici. Traccia il rischio nel tempo per Grano, Vite, Tabacco e Pomodoro. Verifica l'efficacia e la durata di protezione dei trattamenti fitosanitari applicati.",
    image: "/farm-screen-3.png",
    color: "#f59e0b",
    badge: "Peronospora · Fusariosi · Alternaria"
  },
  {
    id: "prescrizione",
    icon: FileBarChart2,
    label: "Mappa di Prescrizione",
    title: "VRT: la giusta dose nel posto giusto",
    description: "Calcola mappe di prescrizione a rateo variabile con clustering K-means su dati NDVI. Identifica zone omogenee Alto / Medio / Basso per ottimizzare fertilizzazione e semina. Esporta in formato GeoTIFF o SHP, compatibile con terminali GNSS Topcon e Trimble.",
    image: "/farm-screen-4.png",
    color: "#22c55e",
    badge: "GeoTIFF · SHP · Topcon · Trimble"
  },
  {
    id: "mappe",
    icon: Layers,
    label: "VRT 2.0 Mappe",
    title: "Visibilità millimetrica sul vigore vegetativo",
    description: "Visualizza indici NDVI e mappe di classificazione direttamente sull'immagine satellitare del campo. Interroga ogni pixel per conoscere DN value e classe di appartenenza. Attiva il tracciamento GPS in tempo reale per navigare in campo con la mappa aperta.",
    image: "/farm-screen-5.png",
    color: "#14b8a6",
    badge: "NDVI · Sentinel-2 · GPS attivo"
  }
];

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-white">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 lg:px-12 backdrop-blur-md bg-background/80 border-b border-border">
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src="/taurus-logo.png" 
            alt="Taurus AgriTech Solutions" 
            className="h-10 w-auto group-hover:opacity-90 transition-opacity"
            data-testid="img-navbar-logo"
          />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#farm-vrt" className="text-foreground/80 hover:text-accent transition-colors" data-testid="link-nav-product">Farm 2.0</a>
          <a href="#showcase" className="text-foreground/80 hover:text-accent transition-colors" data-testid="link-nav-showcase">Funzionalità</a>
          <a href="#solutions" className="text-foreground/80 hover:text-accent transition-colors" data-testid="link-nav-solutions">Soluzioni</a>
          <a href="#iot" className="text-foreground/80 hover:text-accent transition-colors" data-testid="link-nav-iot">Ecosistema IoT</a>
        </div>
        <Button className="bg-accent hover:bg-accent/90 text-white font-medium rounded-full px-6" asChild>
          <a href="#contact" data-testid="btn-nav-demo">Richiedi Demo</a>
        </Button>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background z-10" />
            <div className="absolute right-0 top-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4" />
            <div className="absolute left-0 bottom-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/4" />
          </div>
          
          <div className="container relative z-10 mx-auto px-6 lg:px-12">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-4xl"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/30 border border-accent/30 text-accent text-sm font-medium mb-6">
                <Leaf className="w-4 h-4" />
                <span>Il futuro della terra, oggi.</span>
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-balance leading-tight">
                L'Agricoltura di Precisione <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">per chi vuole di più.</span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                Software multisorgente che integra dati satellitari, sensori IoT e modelli agronomici avanzati. Il controllo totale della tua azienda agricola, dal campo al cloud.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 h-14 text-base font-medium shadow-[0_0_20px_rgba(0,190,190,0.3)]" asChild>
                  <a href="#farm-vrt" data-testid="btn-hero-discover">Scopri Farm 2.0 <ArrowRight className="w-5 h-5 ml-2" /></a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base border-border hover:bg-white/5" asChild>
                  <a href="#contact" data-testid="btn-hero-contact">Parla con un esperto</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Farm 2.0 VRT Intro Section */}
        <section id="farm-vrt" className="py-24 bg-card border-y border-border relative overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2d9b4e]/20 border border-[#2d9b4e]/40 text-[#4ade80] text-sm font-medium mb-5">
                  <Leaf className="w-4 h-4" />
                  <span>Piattaforma di Consulenza Avanzata</span>
                </motion.div>
                <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-bold mb-6">
                  Farm 2.0 VRT
                </motion.h2>
                <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-8">
                  Il cuore pulsante di Taurus AgriTech. Una piattaforma completa per la gestione dell'agricoltura di precisione: fertilizzazione, semina e difesa delle colture in un'unica interfaccia.
                </motion.p>

                <motion.div variants={staggerContainer} className="space-y-6">
                  {[
                    { title: "Mappatura Intelligente", desc: "Aggiungi appezzamenti caricando file o disegnandoli direttamente su mappa." },
                    { title: "Mappe di Prescrizione VRT", desc: "Genera mappe per zone omogenee, compatibili con i principali formati GNSS (Topcon, Trimble)." },
                    { title: "Previsione Malattie", desc: "Monitora lo stress colturale e previeni malattie in Grano, Vite, Tabacco e Pomodoro." },
                    { title: "Verifica Copertura Fitofarmaco", desc: "Traccia il rischio nel tempo e verifica la durata protettiva degli agrofarmaci applicati." }
                  ].map((feature, i) => (
                    <motion.div key={i} variants={fadeUp} className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/40 flex items-center justify-center shrink-0 border border-primary">
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-3xl blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden border border-border/50 bg-background shadow-2xl">
                  <div className="h-10 bg-muted border-b border-border flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/80" />
                    <div className="w-3 h-3 rounded-full bg-secondary/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-xs text-muted-foreground font-mono">Farm 2.0 VRT — Demo</span>
                  </div>
                  <video 
                    src="/farm-vrt-demo.mp4" 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-auto object-cover"
                    data-testid="video-farm-demo"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* App Screenshot Showcase Section */}
        <section id="showcase" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0f2318]/60 to-background pointer-events-none" />
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="text-center max-w-3xl mx-auto mb-14"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0ea5e9]/15 border border-[#0ea5e9]/30 text-[#38bdf8] text-sm font-medium mb-5">
                <Layers className="w-4 h-4" />
                <span>Esplora l'interfaccia</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-bold mb-5">
                Tutto ciò che ti serve, in un'unica piattaforma
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-muted-foreground">
                Dalla gestione degli appezzamenti alla previsione delle malattie, passando per le mappe di prescrizione NDVI. Farm 2.0 VRT copre ogni aspetto dell'agricoltura di precisione.
              </motion.p>
            </motion.div>

            {/* Feature Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {appFeatures.map((feature, i) => {
                const Icon = feature.icon;
                const isActive = activeFeature === i;
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(i)}
                    data-testid={`btn-feature-tab-${feature.id}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border"
                    style={{
                      backgroundColor: isActive ? `${feature.color}22` : "transparent",
                      borderColor: isActive ? feature.color : "rgba(255,255,255,0.1)",
                      color: isActive ? feature.color : "rgba(255,255,255,0.6)"
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {feature.label}
                  </button>
                );
              })}
            </div>

            {/* Screenshot + Description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid lg:grid-cols-5 gap-8 items-center"
              >
                {/* Text side */}
                <div className="lg:col-span-2 space-y-5">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border"
                    style={{
                      backgroundColor: `${appFeatures[activeFeature].color}18`,
                      borderColor: `${appFeatures[activeFeature].color}40`,
                      color: appFeatures[activeFeature].color
                    }}
                  >
                    {appFeatures[activeFeature].badge}
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold leading-snug">
                    {appFeatures[activeFeature].title}
                  </h3>
                  
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {appFeatures[activeFeature].description}
                  </p>

                  <div className="flex items-center gap-2 pt-2">
                    <div
                      className="h-1 w-12 rounded-full"
                      style={{ backgroundColor: appFeatures[activeFeature].color }}
                    />
                    <div className="h-1 w-4 rounded-full bg-white/10" />
                    <div className="h-1 w-4 rounded-full bg-white/10" />
                  </div>

                  {/* Step dots */}
                  <div className="flex gap-3 pt-2">
                    {appFeatures.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveFeature(i)}
                        data-testid={`btn-feature-dot-${i}`}
                        className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: activeFeature === i ? appFeatures[i].color : "rgba(255,255,255,0.2)",
                          transform: activeFeature === i ? "scale(1.3)" : "scale(1)"
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Screenshot side */}
                <div className="lg:col-span-3 relative">
                  <div
                    className="absolute inset-0 rounded-2xl blur-3xl opacity-20"
                    style={{ backgroundColor: appFeatures[activeFeature].color }}
                  />
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#f8f9fa]">
                    {/* Fake browser chrome */}
                    <div className="h-9 bg-[#1a2332] border-b border-white/10 flex items-center px-4 gap-2 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                      <div className="ml-3 flex-1 h-5 bg-white/5 rounded px-3 flex items-center">
                        <span className="text-[10px] text-white/30 font-mono">app.farm20vrt.it</span>
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

        {/* Remote Sensing & Drones */}
        <section id="solutions" className="py-24 relative border-t border-border">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">Telerilevamento & Droni</h2>
              <p className="text-lg text-muted-foreground">
                Sviluppiamo soluzioni innovative integrando dati satellitari e voli drone per un monitoraggio millimetrico del vigore vegetativo e dello stress idrico.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-card border border-border hover:border-accent/50 transition-colors"
              >
                <Satellite className="w-12 h-12 text-accent mb-6" />
                <h3 className="text-2xl font-bold mb-4">Dati Satellitari</h3>
                <p className="text-muted-foreground">
                  Indici multispettrali aggiornati costantemente per analizzare la biomassa, ottimizzare le concimazioni e rilevare anomalie in campo aperto senza muovere un trattore.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-3xl bg-card border border-border hover:border-secondary/50 transition-colors"
              >
                <Map className="w-12 h-12 text-secondary mb-6" />
                <h3 className="text-2xl font-bold mb-4">Voli Drone</h3>
                <p className="text-muted-foreground">
                  Rilievi termici e multispettrali ad altissima risoluzione per colture ad alto reddito. Identificazione precisa dei focolai di malattia e stress idrico.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* IoT Ecosystem */}
        <section id="iot" className="py-24 bg-primary/10 border-y border-primary/20 relative overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-accent/10 rounded-full" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent/20 rounded-full" />
          
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="p-6 rounded-2xl bg-card border border-border shadow-lg">
                    <CloudRain className="w-8 h-8 text-accent mb-4" />
                    <h4 className="font-semibold">Stazioni Meteo</h4>
                  </div>
                  <div className="p-6 rounded-2xl bg-card border border-border shadow-lg">
                    <Wifi className="w-8 h-8 text-secondary mb-4" />
                    <h4 className="font-semibold">Sensori Suolo</h4>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-card border border-border shadow-lg">
                    <Tractor className="w-8 h-8 text-accent mb-4" />
                    <h4 className="font-semibold">Tracking Macchine</h4>
                  </div>
                  <div className="p-6 rounded-2xl bg-card border border-border shadow-lg">
                    <ShieldCheck className="w-8 h-8 text-green-500 mb-4" />
                    <h4 className="font-semibold">Telemetria CAN</h4>
                  </div>
                </div>
              </div>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.h2 variants={fadeUp} className="text-3xl lg:text-5xl font-bold mb-6">Ecosistema Connesso</motion.h2>
                <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-8">
                  Taurus non è solo software. Integra l'hardware esistente o espandi la tua rete con i nostri sensori. Stazioni meteo, tracciamento GPS e sensori aftermarket per macchinari comunicano in tempo reale con Farm 2.0.
                </motion.p>
                <motion.ul variants={staggerContainer} className="space-y-3">
                  {[
                    "Modelli previsionali basati su micro-clima locale",
                    "Ottimizzazione dei turni di irrigazione",
                    "Tracciabilità delle operazioni meccaniche",
                    "Integrazione dati da flotte miste"
                  ].map((item, i) => (
                    <motion.li key={i} variants={fadeUp} className="flex items-center gap-3">
                      <ChevronRight className="w-5 h-5 text-secondary" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="py-32 relative">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto bg-card border border-border rounded-[2.5rem] p-10 lg:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
              
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">Pronto a trasformare la tua azienda?</h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                  Richiedi una demo gratuita di Farm 2.0 o parla con un nostro agronomo per capire come possiamo supportare la tua realtà.
                </p>
                
                <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                  <Input 
                    type="email" 
                    placeholder="La tua email" 
                    className="h-14 bg-background border-border text-base rounded-full px-6"
                    data-testid="input-email-cta"
                  />
                  <Button type="submit" className="h-14 bg-accent hover:bg-accent/90 text-white rounded-full px-8 text-base font-medium whitespace-nowrap" data-testid="btn-submit-cta">
                    Richiedi Contatto
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/taurus-logo.png" alt="Taurus Logo" className="h-8 w-auto opacity-50 grayscale" />
              <span className="text-muted-foreground font-medium">TAURUS AgriTech Solutions</span>
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
