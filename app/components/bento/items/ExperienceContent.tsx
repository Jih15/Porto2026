"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

interface Experience {
  number: string;
  role: string;
  period: string;
  company: string;
  location: string;
  desc: string;
  bullets: string[];
  photo: string | null;
  /** Warna aksen per perusahaan (opsional, fallback ke neon) */
  accent?: string;
  /** Singkatan untuk placeholder */
  abbr: string;
}

const EXPERIENCES: Experience[] = [
  {
    number: "1",
    role: "Web Programmer",
    period: "Okt 2025 – Apr 2026",
    company: "CV. Mediatama Web Indonesia",
    abbr: "MW",
    location: "Padang, West Sumatera",
    desc: "Contributed to web application development using Laravel, with a focus on frontend implementation.",
    bullets: [
      "Developing frontend features for the Ahra Engineer website",
      "Working on a Point of Sales (POS) web application",
      "Implementing UI and features based on business requirements",
      "Collaborating with the team to ensure the app runs as expected",
    ],
    photo: null,
    accent: "#b8ff3f",
  },
  {
    number: "2",
    role: "Mobile Developer",
    period: "Nov 2024 – Jan 2025",
    company: "PT. Jaga Anugerah Giat Asa",
    abbr: "JA",
    location: "Pekanbaru, Riau",
    desc: "Worked on a mobile asset management application using Flutter, applying clean architecture and GetX state management.",
    bullets: [
      "Developing features based on asset management requirements",
      "Implementing GetX for state management",
      "Applying MVVM / clean architecture for maintainable code",
      "Building and integrating UI components according to designs",
    ],
    photo: null,
    accent: "#3fb8ff",
  },
  {
    number: "3",
    role: "Data Entry",
    period: "Aug 2024 – Nov 2024",
    company: "PT. Jaga Anugerah Giat Asa",
    abbr: "JA",
    location: "Pekanbaru, Riau",
    desc: "Performed data mapping and input of drug transaction data matched using fuzzy matching, adjusted to be stored correctly in the database.",
    bullets: [],
    photo: null,
    accent: "#3fb8ff",
  },
];

/* ─── Company Image Placeholder ──────────────────────────────── */
interface PlaceholderProps {
  company: string;
  abbr: string;
  accent?: string;
}

function CompanyPlaceholder({ company, abbr, accent = "#b8ff3f" }: PlaceholderProps) {
  const r = parseInt(accent.slice(1, 3), 16);
  const g = parseInt(accent.slice(3, 5), 16);
  const b = parseInt(accent.slice(5, 7), 16);
  const accentRgb = `${r},${g},${b}`;

  return (
    <div
      className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 40%, rgba(${accentRgb},0.07) 0%, transparent 70%),
          linear-gradient(160deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 60%)
        `,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div
        className="absolute pointer-events-none"
        style={{
          top: 0, left: 0,
          width: "40%", height: 1,
          background: `linear-gradient(to right, transparent, rgba(${accentRgb},0.3))`,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0, left: 0,
          width: 1, height: "30%",
          background: `linear-gradient(to bottom, rgba(${accentRgb},0.3), transparent)`,
        }}
      />

      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 0, right: 0,
          width: "40%", height: 1,
          background: `linear-gradient(to left, transparent, rgba(${accentRgb},0.2))`,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: 0, right: 0,
          width: 1, height: "30%",
          background: `linear-gradient(to top, rgba(${accentRgb},0.2), transparent)`,
        }}
      />

      <div className="relative flex flex-col items-center gap-4 select-none">
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: 64,
            height: 64,
            background: `rgba(${accentRgb},0.08)`,
            border: `1px solid rgba(${accentRgb},0.25)`,
          }}
        >
          <span
            className="font-bold font-mono"
            style={{
              fontSize: "1.25rem",
              color: accent,
              letterSpacing: "0.08em",
            }}
          >
            {abbr}
          </span>
        </div>

        <p
          className="font-mono text-xs tracking-[0.2em] uppercase text-center"
          style={{
            color: "rgba(255,255,255,0.2)",
            maxWidth: 240,
            lineHeight: 1.6,
          }}
        >
          {company}
        </p>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "45%",
          background: "linear-gradient(to top, #0d0d0d 20%, transparent 100%)",
        }}
      />
    </div>
  );
}

/* ─── TimelineDot ─────────────────────────────────────────────── */
interface DotProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function TimelineDot({ label, isActive, onClick }: DotProps) {
  return (
    <button
      data-anim="dot"
      onClick={onClick}
      className="shrink-0 flex items-center justify-center rounded-full font-mono text-xs font-bold transition-colors duration-300"
      style={{
        width: 32,
        height: 32,
        background: isActive ? "#b8ff3f" : "rgba(184,255,63,0.08)",
        border: isActive ? "none" : "1px solid rgba(184,255,63,0.25)",
        color: isActive ? "#080808" : "rgba(184,255,63,0.5)",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

/* ─── Desktop vertical sidebar ───────────────────────────────── */
interface VerticalTimelineProps {
  active: number;
  onSelect: (i: number) => void;
}

function VerticalTimeline({ active, onSelect }: VerticalTimelineProps) {
  return (
    <div
      data-anim="sidebar"
      className="hidden sm:flex flex-col shrink-0 pt-44 px-8 md:px-10"
      style={{
        width: "clamp(220px, 28%, 320px)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <span
        data-anim="tl-label"
        className="font-mono text-xs tracking-[0.35em] uppercase mb-10"
        style={{ color: "#b8ff3f" }}
      >
        Work Experience
      </span>

      <div className="flex flex-col">
        {EXPERIENCES.map((e, i) => {
          const isActive = i === active;
          const isLast   = i === EXPERIENCES.length - 1;
          return (
            <div key={e.number} className="flex gap-4">
              <div className="flex flex-col items-center" style={{ width: 32 }}>
                <TimelineDot label={e.number} isActive={isActive} onClick={() => onSelect(i)} />
                {!isLast && (
                  <div
                    data-anim="v-connector"
                    className="flex-1 my-1"
                    style={{
                      width: 0,
                      borderLeft: "1.5px dashed rgba(184,255,63,0.22)",
                      transformOrigin: "top center",
                    }}
                  />
                )}
              </div>

              <div
                data-anim="entry-text"
                className="cursor-pointer pb-8"
                style={{ paddingTop: 5 }}
                onClick={() => onSelect(i)}
              >
                <p
                  className="font-bold leading-tight transition-colors duration-200 m-0"
                  style={{
                    fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.35)",
                    fontFamily: "var(--font-geist-sans)",
                  }}
                >
                  {e.role}
                </p>
                <p
                  className="font-mono text-xs mt-1 tracking-wide m-0"
                  style={{ color: isActive ? "#b8ff3f" : "rgba(184,255,63,0.3)" }}
                >
                  {e.period}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Mobile horizontal timeline ─────────────────────────────── */
interface HorizontalTimelineProps {
  active: number;
  onSelect: (i: number) => void;
}

function HorizontalTimeline({ active, onSelect }: HorizontalTimelineProps) {
  return (
    <div
      className="flex sm:hidden flex-col px-5 pt-20"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <span
        data-anim="tl-label"
        className="font-mono text-xs tracking-[0.35em] uppercase mb-5"
        style={{ color: "#b8ff3f" }}
      >
        Work Experience
      </span>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${EXPERIENCES.length}, 1fr)`,
          position: "relative",
        }}
      >
        {/* Row 1: dots + connectors */}
        {EXPERIENCES.map((e, i) => {
          const isActive = i === active;
          const isLast   = i === EXPERIENCES.length - 1;
          return (
            <div
              key={`dot-${e.number}`}
              className="flex items-center"
              style={{ position: "relative", zIndex: 1, justifyContent: "center" }}
            >
              <TimelineDot label={e.number} isActive={isActive} onClick={() => onSelect(i)} />
              {!isLast && (
                <div
                  data-anim="h-connector"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "calc(50% + 16px)",
                    right: "calc(-50% + 16px)",
                    borderTop: "1.5px dashed rgba(184,255,63,0.22)",
                    height: 0,
                    transform: "translateY(-50%)",
                    transformOrigin: "left center",
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>
          );
        })}

        {/* Row 2: labels */}
        {EXPERIENCES.map((e, i) => {
          const isActive = i === active;
          return (
            <div
              key={`label-${e.number}`}
              data-anim="entry-text"
              className="cursor-pointer pt-2 pb-4"
              onClick={() => onSelect(i)}
            >
              <p
                className="font-bold leading-tight transition-colors duration-200 text-center m-0"
                style={{
                  fontSize: "0.68rem",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.35)",
                  fontFamily: "var(--font-geist-sans)",
                }}
              >
                {e.role}
              </p>
              <p
                className="font-mono text-center mt-1 tracking-wide m-0"
                style={{
                  fontSize: "0.58rem",
                  color: isActive ? "#b8ff3f" : "rgba(184,255,63,0.3)",
                }}
              >
                {e.period}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Detail panel ────────────────────────────────────────────── */
interface DetailPanelProps {
  exp: Experience;
}

function DetailPanel({ exp }: DetailPanelProps) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">

      {/* ── Hero area: photo or placeholder ── */}
      <div className="relative shrink-0" style={{ height: "38%" }}>
        {exp.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={exp.photo}
            alt={exp.company}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <CompanyPlaceholder
            company={exp.company}
            abbr={exp.abbr}
            accent={exp.accent}
          />
        )}
      </div>

      {/* ── Text content ── */}
      <div className="flex-1 px-6 sm:px-10 py-6 sm:py-8 flex flex-col justify-start overflow-auto">
        <h2
          className="font-bold leading-none"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
            color: "#fff",
            letterSpacing: "-0.03em",
            fontFamily: "var(--font-geist-sans)",
          }}
        >
          {exp.company}
        </h2>

        <p
          className="font-mono text-xs tracking-[0.3em] uppercase"
          style={{ color: "#b8ff3f", margin: "0.75rem 0 1.25rem" }}
        >
          {exp.location}
        </p>

        <p
          className="text-sm leading-relaxed max-w-xl m-0"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {exp.desc}
        </p>

        {exp.bullets.length > 0 && (
          <ul className="mt-4 flex flex-col gap-2 max-w-xl list-none p-0 m-0">
            {exp.bullets.map((b, idx) => (
              <li
                key={idx}
                className="flex gap-3 text-sm"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                <span className="shrink-0 mt-0.5" style={{ color: "#b8ff3f" }}>—</span>
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ─── Root ────────────────────────────────────────────────────── */
export default function ExperienceContent() {
  const [active, setActive] = useState<number>(0);
  const rootRef             = useRef<HTMLDivElement>(null);
  const detailWrapRef       = useRef<HTMLDivElement>(null);
  const dirRef              = useRef<number>(1);
  const isFirstRender       = useRef<boolean>(true);

  /* ── Entrance animation ─────────────────────────────────────── */
  useEffect(() => {
    const D = 0.68;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: D });

      tl.fromTo(
        "[data-anim='tl-label']",
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
      );

      tl.fromTo(
        "[data-anim='dot']",
        { scale: 0, opacity: 0, transformOrigin: "center center" },
        { scale: 1, opacity: 1, duration: 0.55, stagger: 0.13, ease: "back.out(2.2)" },
        "-=0.3",
      );

      tl.fromTo(
        "[data-anim='v-connector']",
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 0.5, stagger: 0.12, ease: "power3.out" },
        "-=0.4",
      );

      tl.fromTo(
        "[data-anim='h-connector']",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.5, stagger: 0.12, ease: "power3.out" },
        "<",
      );

      tl.fromTo(
        "[data-anim='entry-text']",
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        "-=0.5",
      );

      tl.fromTo(
        detailWrapRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.6",
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  /* ── Tab switch animation ───────────────────────────────────── */
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    if (!detailWrapRef.current) return;

    gsap.fromTo(
      detailWrapRef.current,
      { y: dirRef.current * 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
    );
  }, [active]);

  /* ── Select handler ─────────────────────────────────────────── */
  const handleSelect = useCallback((i: number) => {
    if (i === active) return;
    dirRef.current = i > active ? 1 : -1;
    setActive(i);
  }, [active]);

  const exp = EXPERIENCES[active];

  return (
    <div
      ref={rootRef}
      className="relative w-full flex flex-col"
      style={{ background: "#0d0d0d", minHeight: "100vh" }}
    >
      <HorizontalTimeline active={active} onSelect={handleSelect} />

      <div className="flex flex-1 overflow-hidden" style={{ minHeight: 0 }}>
        <VerticalTimeline active={active} onSelect={handleSelect} />

        <div
          ref={detailWrapRef}
          className="flex flex-col flex-1 overflow-hidden"
          style={{ minHeight: 0 }}
        >
          <DetailPanel exp={exp} />
        </div>
      </div>

      <div
        className="shrink-0 px-6 sm:px-10 py-5 font-mono text-xs tracking-[0.25em] uppercase"
        style={{
          color: "rgba(255,255,255,0.12)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        © 2026 Zaqaul · All Rights Reserved
      </div>
    </div>
  );
}