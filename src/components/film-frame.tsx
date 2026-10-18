"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Look } from "@/lib/looks";

type Props = {
  look: Look;
  className?: string;
  /** Hide the small "Sample" caption (e.g. on tiny thumbnails or when the parent labels it). */
  bare?: boolean;
  /** `sizes` hint for next/image. */
  sizes?: string;
  /** Above the fold: load eagerly at high priority (Next 16 replaces `priority` with this). */
  eager?: boolean;
  /** next/image quality; 75 for most frames, 90 for the hero print. */
  quality?: 75 | 90;
};

/**
 * A photo frame that develops when it comes into view: it starts as a dim,
 * blue negative and comes up to full exposure.
 */
export function FilmFrame({ look, className = "", bare = false, sizes = "100vw", eager = false, quality = 75 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [developed, setDeveloped] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDeveloped(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-state={developed ? "developed" : "latent"}
      className={`relative overflow-hidden bg-darkroom ${className}`}
    >
      <div className="develop absolute inset-0">
        <Image
          src={look.src}
          alt={`Sample image in the ${look.name} look`}
          fill
          sizes={sizes}
          loading={eager ? "eager" : undefined}
          fetchPriority={eager ? "high" : undefined}
          quality={quality}
          className="object-cover"
          style={{ objectPosition: look.focus }}
        />
      </div>
      {!bare && <SampleTag look={look} className="absolute bottom-3 left-3 z-10" />}
    </div>
  );
}

/** The honest label every sample image carries until real trycheese shots exist. */
export function SampleTag({ look, className = "" }: { look: Look; className?: string }) {
  return (
    <span
      className={`rebate rounded-full bg-darkroom/60 px-2.5 py-1 text-[12px] text-paper/85 backdrop-blur-sm ${className}`}
    >
      Sample · {look.name}
    </span>
  );
}
