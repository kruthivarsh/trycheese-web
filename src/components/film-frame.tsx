"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { type Frame, pad } from "@/lib/roll";

type Props = {
  frame: Frame;
  className?: string;
  /** Hide the small placeholder caption (e.g. on tiny roll thumbnails). */
  bare?: boolean;
  /** `sizes` hint for next/image. */
  sizes?: string;
  priority?: boolean;
};

/**
 * A photo frame that develops when it comes into view: it starts as a dim,
 * safelight-tinted latent image and comes up to full exposure.
 */
export function FilmFrame({ frame, className = "", bare = false, sizes = "100vw", priority = false }: Props) {
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
          src={frame.src}
          alt={`Placeholder frame ${pad(frame.n)}, ${frame.look} look`}
          fill
          sizes={sizes}
          priority={priority}
          quality={90}
          className="object-cover"
          style={{ objectPosition: frame.focus }}
        />
      </div>
      {!bare && (
        <span className="rebate absolute bottom-3 left-3 z-10 rounded-full bg-darkroom/55 px-2.5 py-1 text-[12px] text-paper/80 backdrop-blur-sm">
          Placeholder · {frame.look}
        </span>
      )}
    </div>
  );
}
