"use client";

import { useState } from "react";
import { useIsMobile } from "./useIsMobile";
import images from "@/public/images";

const TECHS = [
  {
    name: "Flutter",
    icon: `${images.flutter}`,
    desc: "Mengembangkan aplikasi mobile yang responsif dengan pengelolaan state yang baik, integrasi API, serta fokus pada performa dan pengalaman pengguna.",
  },
  {
    name: "Next.js",
    icon: `${images.nextjs}`,
    desc: "Membangun aplikasi web modern menggunakan SSR dan routing dinamis.",
  },
  {
    name: "Laravel",
    icon: `${images.laravel}`,
    desc: "Membangun aplikasi backend menggunakan arsitektur MVC, pengelolaan database yang efisien, serta pengembangan API dan tampilan dengan Blade.",
  },
  {
    name: "FastAPI",
    icon: `${images.fastapi}`,
    desc: "Membuat API RESTful dengan Python dan menambahkan machine learning.",
  },
  {
    name: "Figma",
    icon: `${images.figma}`,
    desc: "Mendesain antarmuka pengguna yang intuitif dengan pendekatan UI/UX, membuat prototype interaktif, serta berkolaborasi dalam perancangan layout yang konsisten.",
  },
];

export default function TechStackCard() {
  const [selected, setSelected] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const active = selected !== null ? TECHS[selected] : null;

  /* ── MOBILE layout ───────────────────────────────────────── */
  if (isMobile) {
    return (
      <div className="absolute inset-0 flex flex-col p-5 gap-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: "#b8ff3f" }}>
              Tech
            </div>
            <div
              className="font-bold text-xl leading-tight"
              style={{ color: "#fff", letterSpacing: "-0.02em", fontFamily: "var(--font-geist-sans)" }}
            >
              Stack
            </div>
          </div>
          {active && (
            <span className="font-mono text-xs tracking-widest uppercase mt-1" style={{ color: "#b8ff3f" }}>
              {active.name}
            </span>
          )}
        </div>

        {/* Icons — 5 dalam satu baris */}
        <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
          {TECHS.map((tech, i) => (
            <button
              key={tech.name}
              onClick={() => setSelected(selected === i ? null : i)}
              className="relative flex items-center justify-center rounded-xl transition-all duration-200"
              style={{
                aspectRatio: "1",
                background: selected === i ? "rgba(184,255,63,0.15)" : "rgba(255,255,255,0.05)",
                border: selected === i
                  ? "1px solid rgba(184,255,63,0.5)"
                  : "1px solid rgba(255,255,255,0.07)",
                cursor: "pointer",
              }}
              title={tech.name}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tech.icon}
                alt={tech.name}
                style={{ width: "46%", height: "46%", objectFit: "contain", filter: "brightness(0) invert(1)" }}
              />
              {selected === i && (
                <div className="absolute bottom-1 left-0 right-0 flex justify-center">
                  <div style={{ width: 3, height: 3, borderRadius: "50%", background: "#b8ff3f" }} />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Description panel */}
        <div
          // className="flex-1 rounded-xl flex items-center justify-center p-4 transition-all duration-300"
          className="flex-1 rounded-xl p-4 scrollbar-neon transition-all duration-300"
          style={{
            overflowY: "scroll",   // ← paksa scroll selalu aktif biar scrollbar visible untuk test
            background: active ? "rgba(184,255,63,0.06)" : "rgba(255,255,255,0.03)",
            border: active ? "1px solid rgba(184,255,63,0.15)" : "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {active ? (
            <p className="font-mono text-xs leading-relaxed text-center pt-1" style={{ color: "rgba(255,255,255,0.55)" }}>
              {active.desc}
            </p>
          ) : (
            <p className="font-mono text-xs text-center leading-relaxed" style={{ color: "rgba(255,255,255,0.2)" }}>
              Klik icon untuk melihat detail
            </p>
          )}
        </div>
      </div>
    );
  }

  /* ── DESKTOP layout ──────────────────────────────────────── */
  return (
    <div className="absolute inset-0 flex flex-col p-5 gap-3">
      {/* Header */}
      <div>
        <div className="font-mono text-xs tracking-[0.25em] uppercase mb-1" style={{ color: "#b8ff3f" }}>
          Tech
        </div>
        <div
          className="font-bold text-2xl leading-tight"
          style={{ color: "#fff", letterSpacing: "-0.02em", fontFamily: "var(--font-geist-sans)" }}
        >
          Stack
        </div>
      </div>

      {/* Icons — 3 kolom */}
      <div className="grid grid-cols-3 gap-2 shrink-0">
        {TECHS.map((tech, i) => (
          <button
            key={tech.name}
            onClick={() => setSelected(selected === i ? null : i)}
            className="relative flex items-center justify-center rounded-xl transition-all duration-200"
            style={{
              aspectRatio: "1",
              background: selected === i ? "rgba(184,255,63,0.15)" : "rgba(255,255,255,0.05)",
              border: selected === i
                ? "1px solid rgba(184,255,63,0.5)"
                : "1px solid rgba(255,255,255,0.07)",
              cursor: "pointer",
            }}
            title={tech.name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tech.icon}
              alt={tech.name}
              style={{ width: "44%", height: "44%", objectFit: "contain", filter: "brightness(0) invert(1)" }}
            />
            {selected === i && (
              <div className="absolute bottom-1.5 left-0 right-0 flex justify-center">
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#b8ff3f" }} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Description panel */}
      <div
        // className="flex-1 rounded-xl flex items-center justify-center p-4 transition-all duration-300"
          className="flex-1 rounded-xl p-4 scrollbar-neon transition-all duration-300"
          style={{
            overflowY: "scroll",   // ← paksa scroll selalu aktif biar scrollbar visible untuk test
            background: active ? "rgba(184,255,63,0.06)" : "rgba(255,255,255,0.03)",
            border: active ? "1px solid rgba(184,255,63,0.15)" : "1px solid rgba(255,255,255,0.05)",
          }}
      >
        {active ? (
          <div className="text-center w-full">
            <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "#b8ff3f" }}>
              {active.name}
            </div>
            <p className="font-mono text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              {active.desc}
            </p>
          </div>
        ) : (
          <p className="font-mono text-xs text-center leading-relaxed" style={{ color: "rgba(255,255,255,0.2)" }}>
            Klik salah satu
            <br />
            icon untuk
            <br />
            melihat detail
          </p>
        )}
      </div>
    </div>
  );
}