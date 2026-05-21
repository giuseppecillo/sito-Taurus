import { useState, useEffect } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  dark?: boolean;
  width?: number;
  height?: number;
  placeholder?: string;
  "data-testid"?: string;
}

export function LazyImage({
  src,
  alt,
  className,
  containerClassName = "relative overflow-hidden",
  style,
  loading = "lazy",
  fetchPriority,
  dark = false,
  width,
  height,
  placeholder,
  "data-testid": testId,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <div className={containerClassName}>
      {placeholder ? (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${placeholder})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(12px)",
            transform: "scale(1.08)",
            transition: "opacity 0.4s ease",
            opacity: loaded ? 0 : 1,
            pointerEvents: "none",
          }}
        />
      ) : (
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
      )}
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
        fetchPriority={fetchPriority}
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
        data-testid={testId}
      />
    </div>
  );
}
