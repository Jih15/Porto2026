"use client";

import { useState } from "react";
import { Project } from "./types";
// import type { Project } from "./types";

/* ── Image Placeholder ──────────────────────────────────────────── */
export function ImagePlaceholder({
  aspectRatio = "16/9",
  label,
  index,
}: {
  aspectRatio?: string;
  label?: string;
  index?: number;
}) {
  const patternColors = [
    "rgba(184,255,63,0.06)",
    "rgba(99,184,255,0.06)",
    "rgba(255,99,184,0.06)",
  ];
  const dotColor = patternColors[(index ?? 0) % patternColors.length];

  return (
    <div
      className="w-full h-full relative flex items-center justify-center overflow-hidden"
      style={{
        aspectRatio,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 60%, rgba(184,255,63,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "inherit",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      <div style={{ position: "absolute", top: 8, left: 8, width: 12, height: 12, borderTop: "1px solid rgba(184,255,63,0.2)", borderLeft: "1px solid rgba(184,255,63,0.2)" }} />
      <div style={{ position: "absolute", top: 8, right: 8, width: 12, height: 12, borderTop: "1px solid rgba(184,255,63,0.2)", borderRight: "1px solid rgba(184,255,63,0.2)" }} />
      <div style={{ position: "absolute", bottom: 8, left: 8, width: 12, height: 12, borderBottom: "1px solid rgba(184,255,63,0.2)", borderLeft: "1px solid rgba(184,255,63,0.2)" }} />
      <div style={{ position: "absolute", bottom: 8, right: 8, width: 12, height: 12, borderBottom: "1px solid rgba(184,255,63,0.2)", borderRight: "1px solid rgba(184,255,63,0.2)" }} />

      <div className="relative flex flex-col items-center gap-2" style={{ opacity: 0.3 }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="2" y="5" width="24" height="18" rx="3" stroke="rgba(184,255,63,0.8)" strokeWidth="1" />
          <circle cx="9" cy="11" r="2.5" stroke="rgba(184,255,63,0.8)" strokeWidth="1" />
          <path d="M2 19L8 13L13 18L18 12L26 20" stroke="rgba(184,255,63,0.8)" strokeWidth="1" strokeLinejoin="round" />
        </svg>
        {label && (
          <span className="font-mono uppercase" style={{ fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(184,255,63,0.8)" }}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

/* ── Thumbnail Placeholder ──────────────────────────────────────── */
export function ThumbPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.03)", borderRadius: "inherit" }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.25 }}>
        <rect x="1" y="3" width="14" height="10" rx="2" stroke="rgba(184,255,63,0.8)" strokeWidth="0.8" />
        <circle cx="5" cy="7" r="1.5" stroke="rgba(184,255,63,0.8)" strokeWidth="0.8" />
        <path d="M1 11L5 7L8 10L11 7L15 11" stroke="rgba(184,255,63,0.8)" strokeWidth="0.8" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ── Image Gallery ──────────────────────────────────────────────── */
export function ImageGallery({ project }: { project: Project }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const allImages: string[] =
    (project.images ?? []).length > 0
      ? project.images
      : project.coverImage
      ? [project.coverImage]
      : [];

  const hasImages = allImages.length > 0;
  const hasMultiple = allImages.length > 1;

  const prev = () => setActiveIndex((i) => (i - 1 + allImages.length) % allImages.length);
  const next = () => setActiveIndex((i) => (i + 1) % allImages.length);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 md:p-14 w-full" style={{ minWidth: 0 }}>
      {/* Main image */}
      <div
        data-detail="image"
        className="w-full rounded-2xl overflow-hidden relative"
        style={{
          maxWidth: 760,
          aspectRatio: "16/10",
          clipPath: "inset(0% 100% 0% 0%)",
          flexShrink: 0,
        }}
      >
        {hasImages ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={activeIndex}
            src={allImages[activeIndex]}
            alt={`${project.title} screenshot ${activeIndex + 1}`}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <ImagePlaceholder aspectRatio="16/10" label="No screenshot" index={project.id} />
        )}

        {hasMultiple && (
          <div
            className="absolute bottom-3 right-3 font-mono text-xs"
            style={{ background: "rgba(0,0,0,0.6)", color: "#b8ff3f", padding: "2px 8px", borderRadius: 4, letterSpacing: "0.1em" }}
          >
            {activeIndex + 1} / {allImages.length}
          </div>
        )}

        {hasMultiple && (
          <>
            <NavArrow direction="prev" onClick={prev} />
            <NavArrow direction="next" onClick={next} />
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {hasMultiple && (
        <div className="flex gap-2 scrollbar-neon" style={{ maxWidth: 760, width: "100%", overflowX: "auto", paddingBottom: 4 }}>
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              style={{
                flexShrink: 0, width: 72, height: 48, borderRadius: 6, overflow: "hidden",
                border: i === activeIndex ? "1.5px solid #b8ff3f" : "1.5px solid rgba(255,255,255,0.08)",
                cursor: "pointer", padding: 0, background: "none",
                transition: "border-color 0.2s, opacity 0.2s",
                opacity: i === activeIndex ? 1 : 0.5,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </button>
          ))}
        </div>
      )}

      {/* Placeholder thumbnails when no images */}
      {!hasImages && (
        <div className="flex gap-2" style={{ maxWidth: 760, width: "100%", opacity: 0.4 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{ flexShrink: 0, width: 72, height: 48, borderRadius: 6, overflow: "hidden", border: "1.5px solid rgba(255,255,255,0.06)" }}
            >
              <ThumbPlaceholder />
            </div>
          ))}
          <div className="flex items-center font-mono text-xs" style={{ color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", paddingLeft: 8 }}>
            No images yet
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Nav Arrow helper ───────────────────────────────────────────── */
function NavArrow({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const isPrev = direction === "prev";
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute", [isPrev ? "left" : "right"]: 12, top: "50%", transform: "translateY(-50%)",
        background: "rgba(0,0,0,0.55)", border: "none", borderRadius: "50%",
        width: 36, height: 36, cursor: "pointer", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(184,255,63,0.25)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.55)"; }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d={isPrev ? "M10 3L5 8L10 13" : "M6 3L11 8L6 13"}
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}