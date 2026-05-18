import { useState } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
  dark?: boolean;
  "data-testid"?: string;
}

export function LazyImage({
  src,
  alt,
  className,
  containerClassName = "relative overflow-hidden",
  style,
  loading = "lazy",
  dark = false,
  "data-testid": testId,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={containerClassName}>
      <div
        className={[
          "img-skeleton",
          dark ? "img-skeleton--dark" : "",
          loaded ? "img-skeleton--hidden" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-hidden="true"
      />
      <img
        src={src}
        alt={alt}
        className={className}
        style={{
          ...style,
          transition: "opacity 0.4s ease",
          opacity: loaded ? 1 : 0,
        }}
        loading={loading}
        onLoad={() => setLoaded(true)}
        data-testid={testId}
      />
    </div>
  );
}
