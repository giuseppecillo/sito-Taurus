---
name: GitHub push via Contents API
description: Come fare push su GitHub sito-Taurus dal progetto Replit
---

Usare sempre GitHub Contents API (PUT /repos/giuseppecillo/sito-Taurus/contents/{path}).
Flusso:
1. GET il file per ottenere sha corrente
2. PUT con content (base64) + sha + branch=main

Non usare mai git push diretto — l'ambiente Replit non ha accesso SSH configurato.
Le immagini binarie vanno pushate sequenzialmente (non in parallelo) per evitare rate limit.

**Why:** il repo sito-Taurus è separato dal progetto Replit; il deploy Netlify parte da GitHub.

**How to apply:** usare code_execution + listConnections('github') + fetch GitHub API.
