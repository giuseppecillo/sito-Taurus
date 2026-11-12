---
name: LazyImage race condition fix
description: Bug React onLoad non scatta per immagini già in cache browser
---

Bug: useEffect(() => setLoaded(false), [src]) scatta DOPO onLoad per immagini cached.
Risultato: loaded rimane false, immagine resta opacity:0.

Fix applicato in LazyImage.tsx:
```tsx
const imgRef = useRef<HTMLImageElement>(null);
useEffect(() => {
  setLoaded(false);
  const img = imgRef.current;
  if (img && img.complete && img.naturalWidth > 0) {
    setLoaded(true);
  }
}, [src]);
// <img ref={imgRef} ... onLoad={() => setLoaded(true)} />
```

**Why:** React 18 batches state updates; se onLoad scatta prima dell'effect, il reset a false sovrascrive il true.

**How to apply:** questo fix è già in LazyImage.tsx. Non rimuovere il check img.complete.
