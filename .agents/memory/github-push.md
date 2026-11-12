---
name: GitHub push via Contents API
description: Come fare push su GitHub sito-Taurus dal progetto Replit
---

Usare sempre GitHub Contents API (PUT /repos/giuseppecillo/sito-Taurus/contents/{path}).
Flusso:
1. GET il file per ottenere sha corrente
2. PUT con content (base64) + sha sul ramo di destinazione.

Per sincronizzazioni di più file verso main, preparare i PUT sequenziali su un ramo temporaneo, verificare tutti gli SHA e creare un unico commit finale con quell'albero e il precedente main come genitore. Aggiornare main senza force solo a verifica completata, poi eliminare il ramo temporaneo.

**Why:** aggiornare main dopo ogni file potrebbe attivare deploy automatici con codice e immagini ancora incompleti. L'aggiornamento finale atomico evita questo rischio e non sovrascrive modifiche concorrenti.

Non usare mai git push diretto — l'ambiente Replit non ha accesso SSH configurato.
Le immagini binarie vanno pushate sequenzialmente (non in parallelo) per evitare rate limit.

**Why:** il repo sito-Taurus è separato dal progetto Replit; il deploy Netlify parte da GitHub.

**How to apply:** usare CodeExecution + listConnections('github') + proxyFetch. Se CodeExecution non è disponibile, usare il connettore tramite @replit/connectors-sdk anche da Node nella shell, senza leggere token o segreti.

**Why:** il connettore funziona anche fuori dal sandbox CodeExecution; questo consente di completare una sincronizzazione interrotta senza gestire credenziali manualmente.
