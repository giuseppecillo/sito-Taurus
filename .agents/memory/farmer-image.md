---
name: Farmer image versioning
description: Versione corrente della foto agricoltore e tecnica di compositing schermo
---

Farmer photo attuale: **farmer-soil-moisture-v6.webp** (896×1280px, aspect 3:4)
- Contadino chino in campo (schiena piegata), mano sinistra sul sensore misol a forchetta (bianco, display LCD, prongs nel suolo), mano destra con smartphone che mostra Gestione Irrigazione.
- Generato con AI (farmer-base-v6.png) + rimozione background Immagine4 + compositing 4-point perspective.
- Coordinate schermo telefono (896×1280): TL(506,358), TR(638,370), BR(638,535), BL(506,525).
- Screenshot sorgente: Immagine4_1780241180619.png, no-bg salvato in attached_assets/Immagine4_final_nobg.png.
- Debug tecnica: crea debug_v6.png con griglia 50px per trovare coordinate del telefono.

**Why:** cache Netlify immutable → rinominare a ogni cambio immagine.

**How to apply:** per aggiornare: incrementare versione (v7…), rigenerare con AI, composite, aggiornare home.tsx + thumbnails, push GitHub, eliminare versione precedente.
