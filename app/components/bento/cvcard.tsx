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
    tl.to(defaultRef.current, { opacity: 0, y: -8, duration: 0.2, ease: "power2.in" });
    tl.to(iconRef.current, { rotate: 180, duration: 0.32, ease: "back.out(2)" }, "<");
    tl.to(
      panelRef.current,
      { yPercent: 0, opacity: 1, duration: 0.42, ease: "expo.out" },
      "-=0.1",
    );
    tl.fromTo(
      [btnEnRef.current, btnIdRef.current, closeRef.current],
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, stagger: 0.06, ease: "power3.out" },
      "-=0.2",
    );
  }, [open]);

  /* ── Close ── */
  const closePanel = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!open) return;

    const tl = gsap.timeline({ onComplete: () => setOpen(false) });
    tl.to(
      [btnEnRef.current, btnIdRef.current, closeRef.current],
      { y: 6, opacity: 0, duration: 0.18, stagger: 0.04, ease: "power2.in" },
    );
    tl.to(
      panelRef.current,
      { yPercent: 105, opacity: 0, duration: 0.35, ease: "expo.in" },
      "-=0.12",
    );
    tl.to(
      defaultRef.current,
      { opacity: 1, y: 0, duration: 0.28, ease: "power3.out" },
      "-=0.12",
    );
    tl.to(iconRef.current, { rotate: 0, duration: 0.28, ease: "power2.out" }, "<");
  }, [open]);

  return (
    <div
      className="absolute inset-0 overflow-hidden cursor-pointer group"
      onClick={openPanel}
    >
      {/* ── Default view: compact horizontal layout ── */}
      <div
        ref={defaultRef}
        className="absolute inset-0 flex items-center justify-between px-5 py-4"
      >
        {/* Left: label + title stacked compactly */}
        <div className="flex flex-col gap-0.5">
          <div
            className="font-mono text-xs tracking-[0.25em] uppercase"
            style={{ color: "rgba(8,8,8,0.5)" }}
          >
            Resume
          </div>
          <div
            className="font-bold text-xl leading-tight"
            style={{
              color: "#080808",
              letterSpacing: "-0.02em",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            Download CV
          </div>
        </div>

        {/* Right: icon + hover hint */}
        <div className="flex items-center gap-3">
          <span
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-xs tracking-widest uppercase"
            style={{ color: "rgba(8,8,8,0.45)" }}
          >
            click →
          </span>

          {/* Download arrow icon */}
          <svg
            ref={iconRef}
            width="32"
            height="32"
            viewBox="0 0 28 28"
            fill="none"
            style={{ color: "#080808", flexShrink: 0 }}
          >
            <circle
              cx="14"
              cy="14"
              r="12.5"
              stroke="currentColor"
              strokeOpacity="0.3"
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
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4"
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

        <div className="flex gap-2 w-full">
          {/* English button */}
          <a
            ref={btnEnRef}
            href={CV_FILES.en}
            download="CV-ZaqaulFikriAziz-EN.pdf"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 font-mono text-sm tracking-widest uppercase rounded-lg"
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
            EN
          </a>

          {/* Indonesia button */}
          <a
            ref={btnIdRef}
            href={CV_FILES.id}
            download="CV-ZaqaulFikriAziz-ID.pdf"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 font-mono text-sm tracking-widest uppercase rounded-lg"
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
            ID
          </a>
        </div>

        {/* Close */}
        <button
          ref={closeRef}
          className="font-mono text-xs tracking-widest uppercase"
          style={{
            color: "rgba(255,255,255,0.3)",
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
          background: "rgba(8,8,8,0.08)",
          border: "1px solid rgba(8,8,8,0.2)",
          borderRadius: "inherit",
        }}
      />
    </div>
  );
}