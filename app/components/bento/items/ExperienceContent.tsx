"use client";

import { useState } from "react";

interface Experience {
  number: string;
  role: string;
  period: string;
  company: string;
  location: string;
  desc: string;
  bullets: string[];
  photo: string | null;
}

const EXPERIENCES: Experience[] = [
  {
    number: "1",
    role: "Web Programmer",
    period: "Okt 2025 – Apr 2026",
    company: "CV. Mediatama Web Indonesia",
    location: "Padang, West Sumatera",
    desc: "Contributed to web application development using Laravel, with a focus on frontend implementation.",
    bullets: [
      "Developing frontend features for the Ahra Engineer website",
      "Working on a Point of Sales (POS) web application",
      "Implementing UI and features based on business requirements",
      "Collaborating with the team to ensure the app runs as expected",
    ],
    photo: null,
  },
  {
    number: "2",
    role: "Mobile Developer",
    period: "Nov 2024 – Jan 2025",
    company: "PT. Jaga Anugerah Giat Asa (Assist.id)",
    location: "Pekanbaru, Riau",
    desc: "Worked on a mobile asset management application using Flutter, applying clean architecture and GetX state management.",
    bullets: [
      "Developing features based on asset management requirements",
      "Implementing GetX for state management",
      "Applying MVVM / clean architecture for maintainable code",
      "Building and integrating UI components according to designs",
    ],
    photo: null,
  },
  {
    number: "3",
    role: "Data Entry",
    period: "Aug 2024 – Nov 2024",
    company: "PT. Jaga Anugerah Giat Asa (Assist.id)",
    location: "Pekanbaru, Riau",
    desc: "Performed data mapping and input of drug transaction data that had previously been matched using fuzzy matching, and adjusted the data to be stored correctly in the database.",
    bullets: [],
    photo: null,
  },
];

/* ─── TimelineDot ─────────────────────────────────────────────── */

interface DotProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function TimelineDot({ label, isActive, onClick }: DotProps) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 flex items-center justify-center rounded-full font-mono text-xs font-bold transition-all duration-300"
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
      className="hidden sm:flex flex-col shrink-0 pt-44 px-8 md:px-10"
      style={{
        width: "clamp(220px, 28%, 320px)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <span
        className="font-mono text-xs tracking-[0.35em] uppercase mb-10"
        style={{ color: "#b8ff3f" }}
      >
        Work Experience
      </span>

      <div className="flex flex-col">
        {EXPERIENCES.map((e, i) => {
          const isActive = i === active;
          const isLast = i === EXPERIENCES.length - 1;
          return (
            <div key={e.number} className="flex gap-4">
              <div className="flex flex-col items-center" style={{ width: 32 }}>
                <TimelineDot
                  label={e.number}
                  isActive={isActive}
                  onClick={() => onSelect(i)}
                />
                {!isLast && (
                  <div
                    className="flex-1 my-1"
                    style={{
                      width: 0,
                      borderLeft: "1.5px dashed rgba(184,255,63,0.22)",
                    }}
                  />
                )}
              </div>

              <div
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
      className="flex sm:hidden flex-col px-5 pt-8"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
    >
      <span
        className="font-mono text-xs tracking-[0.35em] uppercase mb-5"
        style={{ color: "#b8ff3f" }}
      >
        Work Experience
      </span>

      {/* Dots row + Labels row — same grid so columns are identical width */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${EXPERIENCES.length}, 1fr)`,
          position: "relative",
        }}
      >
        {/* Row 1: dots with per-segment connectors */}
        {EXPERIENCES.map((e, i) => {
          const isActive = i === active;
          const isLast = i === EXPERIENCES.length - 1;
          return (
            <div
              key={`dot-${e.number}`}
              className="flex items-center"
              style={{ position: "relative", zIndex: 1, justifyContent: "center" }}
            >
              <TimelineDot
                label={e.number}
                isActive={isActive}
                onClick={() => onSelect(i)}
              />
              {/* connector goes from right edge of this dot to left edge of next dot */}
              {!isLast && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "calc(50% + 16px)",
                    right: "calc(-50% + 16px)",
                    borderTop: "1.5px dashed rgba(184,255,63,0.22)",
                    height: 0,
                    transform: "translateY(-50%)",
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
      {/* Photo / gradient hero */}
      <div className="relative shrink-0" style={{ height: "38%" }}>
        {exp.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={exp.photo}
            alt={exp.company}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 60%, #0d0d0d 100%)",
            }}
          />
        )}
      </div>

      {/* Text content */}
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
                <span className="shrink-0 mt-0.5" style={{ color: "#b8ff3f" }}>
                  —
                </span>
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
  const exp = EXPERIENCES[active];

  return (
    <div
      className="relative w-full flex flex-col"
      style={{ background: "#0d0d0d", minHeight: "100vh" }}
    >
      {/* Mobile: horizontal timeline sits above everything */}
      <HorizontalTimeline active={active} onSelect={setActive} />

      {/* Desktop: sidebar + detail side by side */}
      <div className="flex flex-1 overflow-hidden" style={{ minHeight: 0 }}>
        <VerticalTimeline active={active} onSelect={setActive} />
        <DetailPanel exp={exp} />
      </div>

      {/* Footer */}
      <div
        className="shrink-0 px-6 sm:px-10 py-5 font-mono text-xs tracking-[0.25em] uppercase"
        style={{
          color: "rgba(255,255,255,0.15)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        2026 Zaqaul · All Right Reserved
      </div>
    </div>
  );
}