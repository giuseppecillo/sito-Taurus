const originalSizes: Record<string, { width: number; height: number }> = {
  "nitrocrop-overview": { width: 787, height: 1113 },
  "nitrocrop-crop-settings": { width: 933, height: 587 },
  "nitrocrop-ndvi-readings": { width: 517, height: 618 },
  "nitrocrop-map-analysis": { width: 1036, height: 553 },
  "nitrocrop-nitrogen-savings": { width: 1088, height: 532 },
  "nitrocrop-field-sensors": { width: 1397, height: 1103 },
};

export function nitrocropImageInfo(image: string) {
  const key = image.replace(/^\/|\.webp$/g, "");
  const size = /^nitrocrop-(en|es)-.+-illustration-v1$/.test(key)
    ? { width: 1000, height: 660 }
    : originalSizes[key];
  if (!size) throw new Error(`Unknown NitroCrop image: ${image}`);
  return { key, ...size };
}
