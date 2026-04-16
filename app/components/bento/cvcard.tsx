"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

const CV_FILES = {
  en: "/cv/cv-zaqaul-en.pdf",
  id: "/cv/cv-zaqaul-id.pdf",
};

export default function CVCard() {
  const [open, setOpen] = useState(false);
  const panelRef   = useRef<HTMLDivElement>(null);
  const defaultRef = useRef<HTMLDivElement>(null);
  const btnEnRef   = useRef<HTMLAnchorElement>(null);
  const btnIdRef   = useRef<HTMLAnchorElement>(null);
  const closeRef   = useRef<HTMLButtonElement>(null);
  const iconRef    = useRef<SVGSVGElement>(null);

  /* ── Init: hide panel below card ── */
  useEffect(() => {
    if (panelRef.current) gsap.set(panelRef.current, { yPercent: 105, opacity: 0 });
  }, []);

  /* ── Open ── */
  const openPanel = useCallback(() => {
    if (open) return;
    setOpen(true);

    const tl = gsap.timeline();

    // Default content fades out
    tl.to(defaultRef.current, { opacity: 0, y: -10, duration: 0.22, ease: "power2.in" });

    // Icon rotates
    tl.to(iconRef.current, { rotate: 180, duration: 0.35, ease: "back.out(2)" }, "<");

    // Panel slides up
    tl.to(
      panelRef.current,
      { yPercent: 0, opacity: 1, duration: 0.45, ease: "expo.out" },
      "-=0.15",
    );

    // Buttons stagger in
    tl.fromTo(
      [btnEnRef.current, btnIdRef.current, closeRef.current],
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, stagger: 0.07, ease: "power3.out" },
      "-=0.25",
    );
  }, [open]);

  /* ── Close ── */
  const closePanel = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!open) return;

    const tl = gsap.timeline({ onComplete: () => setOpen(false) });

    tl.to(
      [btnEnRef.current, btnIdRef.current, closeRef.current],
      { y: 8, opacity: 0, duration: 0.2, stagger: 0.04, ease: "power2.in" },
    );
    tl.to(
      panelRef.current,
      { yPercent: 105, opacity: 0, duration: 0.38, ease: "expo.in" },
      "-=0.15",
    );
    tl.to(
      defaultRef.current,
      { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" },
      "-=0.15",
    );
    tl.to(iconRef.current, { rotate: 0, duration: 0.3, ease: "power2.out" }, "<");
  }, [open]);

  return (
    <div
      className="absolute inset-0 overflow-hidden cursor-pointer group"
      onClick={openPanel}
    >
      {/* ── Default view ── */}
      <div
        ref={defaultRef}
        className="absolute inset-0 flex flex-col justify-between p-5"
      >
        {/* Top: label + title */}
        <div>
          <div
            className="font-mono text-xs tracking-[0.25em] uppercase"
            style={{ color: "#b8ff3f" }}
          >
            Resume
          </div>
          <div
            className="font-bold text-2xl mt-1 leading-tight"
            style={{
              color: "#fff",
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            Download
            <br />CV
          </div>
        </div>

        {/* Bottom: hint + icon row */}
        <div className="flex items-end justify-between">
          <span
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-xs tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Click to choose →
          </span>

          {/* Download arrow icon */}
          <svg
            ref={iconRef}
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            style={{ color: "#b8ff3f", flexShrink: 0 }}
          >
            <circle
              cx="14"
              cy="14"
              r="12.5"
              stroke="currentColor"
              strokeOpacity="0.25"
              strokeWidth="1"
            />
            <path
              d="M14 9v9M10 15l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* ── Language selector panel ── */}
      <div
        ref={panelRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-5"
        style={{ background: "#0f1a00" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative top line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, #b8ff3f, transparent)" }}
        />

        <span
          className="font-mono text-xs tracking-[0.3em] uppercase"
          style={{ color: "rgba(184,255,63,0.55)" }}
        >
          Select Language
        </span>

        <div className="flex gap-3 w-full">
          {/* English button */}
          <a
            ref={btnEnRef}
            href={CV_FILES.en}
            download="CV-ZaqaulFikriAziz-EN.pdf"
            className="flex-1 flex items-center justify-center gap-2 py-3 font-mono text-sm tracking-widest uppercase rounded-lg transition-colors duration-200"
            style={{
              background: "#b8ff3f",
              color: "#080808",
              textDecoration: "none",
              fontWeight: 700,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setTimeout(() => closePanel(), 600);
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M3.5 5h2M3.5 7h7M3.5 9h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            EN
          </a>

          {/* Indonesia button */}
          <a
            ref={btnIdRef}
            href={CV_FILES.id}
            download="CV-ZaqaulFikriAziz-ID.pdf"
            className="flex-1 flex items-center justify-center gap-2 py-3 font-mono text-sm tracking-widest uppercase rounded-lg transition-colors duration-200"
            style={{
              background: "rgba(184,255,63,0.1)",
              border: "1px solid rgba(184,255,63,0.4)",
              color: "#b8ff3f",
              textDecoration: "none",
              fontWeight: 700,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setTimeout(() => closePanel(), 600);
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
              <path d="M3.5 5h2M3.5 7h7M3.5 9h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            ID
          </a>
        </div>

        {/* Close */}
        <button
          ref={closeRef}
          className="font-mono text-xs tracking-widest uppercase"
          style={{
            color: "rgba(255,255,255,0.25)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          onClick={closePanel}
        >
          Cancel ✕
        </button>

        {/* Decorative bottom line */}
        <div
          className="absolute bottom-0 left-0 h-px"
          style={{ width: "60%", background: "linear-gradient(to right, #b8ff3f, transparent)" }}
        />
      </div>

      {/* Hover border glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "rgba(184,255,63,0.03)",
          border: "1px solid rgba(184,255,63,0.2)",
          borderRadius: "inherit",
        }}
      />
    </div>
  );
}