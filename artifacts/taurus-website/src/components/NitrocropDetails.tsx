import { useLanguage } from "@/contexts/LanguageContext";
import { LazyImage } from "@/components/LazyImage";
import { THUMBNAILS } from "@/generated/thumbnails";
import { nitrocropImageInfo } from "@/lib/nitrocrop-images";

const COMPACT_TABLE = "max-w-[340px] sm:max-w-[400px] rounded-xl border border-border bg-white shadow-sm overflow-hidden";

export function NitrocropDetails() {
  const { t } = useLanguage();
  const f = t.nitrocrop.features;
  const details = f.map((feature, i) => {
    const { key, width, height } = nitrocropImageInfo(feature.image);
    return {
      feature, src: feature.image, alt: feature.alt, width, height, thumbnail: key,
      frame: i === 4 ? COMPACT_TABLE : "max-w-[560px] rounded-xl overflow-hidden",
    };
  });

  return (
    <section id="nitrocrop-details" aria-labelledby="nitrocrop-details-heading" className="scroll-mt-28 bg-[#f4f8f4] py-14 lg:py-20">
      <div className="container mx-auto max-w-6xl px-5 lg:px-12">
        <header className="mb-8 max-w-3xl">
          <p className="mb-3 text-sm font-semibold text-[#0d9488]">{t.nitrocrop.badge}</p>
          <h3 id="nitrocrop-details-heading" className="mb-4 text-3xl font-bold text-[#1e293b] lg:text-4xl">{t.nitrocrop.detailsHeading}</h3>
          <p className="text-lg leading-relaxed text-muted-foreground">{t.nitrocrop.slogan}</p>
        </header>
        <ol className="mb-8 flex gap-2 overflow-x-auto pb-1" aria-label={t.routes.jump}>
          {details.map(({ feature }, i) => (
            <li key={feature.title} className="shrink-0">
              <a href={`#nitrocrop-feature-${i + 1}`} className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#0d9488]/30 bg-white px-4 text-sm font-medium text-[#1e293b] transition-colors hover:border-[#0d9488]" data-testid={`link-nitrocrop-feature-${i + 1}`}>
                <span className="font-mono text-xs text-[#0d9488]">{String(i + 1).padStart(2, "0")}</span>{feature.title}
              </a>
            </li>
          ))}
        </ol>
        <div className="space-y-6">
          {details.map(({ feature, src, alt, width, height, thumbnail, frame }, i) => (
            <article id={`nitrocrop-feature-${i + 1}`} key={feature.title} className={`grid scroll-mt-28 items-center overflow-hidden rounded-3xl border border-border bg-white shadow-sm lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <figure className="min-w-0 bg-[#eef4ef] p-4 sm:p-8">
                <LazyImage
                  src={src}
                  alt={alt}
                  className="mx-auto block h-auto max-h-[480px] w-full object-contain"
                  containerClassName={`relative mx-auto w-full ${frame}`}
                  width={width}
                  height={height}
                  placeholder={THUMBNAILS[thumbnail]}
                  data-testid={`img-nitrocrop-detail-${i + 1}`}
                />
                <figcaption className="mt-4 text-center text-sm text-muted-foreground">{feature.caption}</figcaption>
              </figure>
              <div className="min-w-0 p-6 sm:p-10">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#0d9488]">{t.routes.featureLabel} {i + 1} / 5</p>
                <h4 className="mb-4 text-2xl font-bold text-[#1e293b]">{feature.title}</h4>
                <p className="text-base leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">{t.nitrocrop.screenshotNote}</p>
      </div>
    </section>
  );
}
