"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { bentoItems } from "./bento.config";
import { ExpandState } from "./useBentoExpand";

type Props = {
  expanded: ExpandState;
  onClose:  () => void;
};

/**
 * Overlay fullscreen yang muncul saat bento item di-klik.
 * Animasi: card position → fullscreen (GSAP expo.inOut).
 * Tutup dengan klik tombol Close atau tekan ESC.
 */
export default function ExpandedOverlay({ expanded, onClose }: Props) {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const activeItem = bentoItems.find((i) => i.id === expanded.id);

  // ── Open animation ──────────────────────────────────────────────────
  useEffect(() => {
    const { id, rect } = expanded;
    if (!id || !rect || !overlayRef.current || !contentRef.current) return;
    if (isAnimating.current) return;

    isAnimating.current = true;
    const overlay = overlayRef.current;
    const content = contentRef.current;

    gsap.set(overlay, {
      display:      "block",
      left:         rect.left,
      top:          rect.top,
      width:        rect.width,
      height:       rect.height,
      borderRadius: "16px",
      opacity:      1,
    });
    gsap.set(content, { opacity: 0, y: 12 });

    gsap.to(overlay, {
      left: 0, top: 0,
      width: "100vw", height: "100vh",
      borderRadius: 0,
      duration: 0.65,
      ease: "expo.inOut",
      onComplete: () => {
        gsap.to(content, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
        isAnimating.current = false;
      },
    });
  }, [expanded]);

  // ── Close animation ─────────────────────────────────────────────────
  const handleClose = useCallback(() => {
    const { rect } = expanded;
    if (!overlayRef.current || !contentRef.current || isAnimating.current) return;
    if (!rect) { onClose(); return; }

    isAnimating.current = true;
    const overlay = overlayRef.current;
    const content = contentRef.current;

    gsap.to(content, { opacity: 0, duration: 0.2, ease: "power2.in" });
    gsap.to(overlay, {
      delay:        0.1,
      left:         rect.left,
      top:          rect.top,
      width:        rect.width,
      height:       rect.height,
      borderRadius: "16px",
      duration:     0.55,
      ease:         "expo.inOut",
      onComplete: () => {
        gsap.set(overlay, { display: "none" });
        isAnimating.current = false;
        onClose();
      },
    });
  }, [expanded, onClose]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed z-50 overflow-hidden"
      style={{
        display:    "none",
        background: activeItem?.bg ?? "#111",
        border:     "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Close button */}
      <button
        className="absolute top-6 right-6 z-10 font-mono text-xs tracking-widest uppercase"
        style={{ color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer" }}
        onClick={handleClose}
      >
        Close ✕
      </button>

      {/* Expand content (from items/) */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex items-center justify-start overflow-auto"
        style={{ opacity: 0 }}
      >
        {activeItem?.expandContent}
      </div>

      {/* Decorative bottom line */}
      <div
        className="absolute bottom-0 left-0 h-px pointer-events-none"
        style={{ width: "40%", background: "linear-gradient(to right, #b8ff3f, transparent)" }}
      />
    </div>
  );
}