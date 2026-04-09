"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { coverConfig as cfg } from "./cover.config";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Cover() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const innerRef    = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const inner   = innerRef.current;
    const hint    = scrollHintRef.current;
    if (!section || !inner || !hint) return;

    // ── Set state awal visible — GSAP pegang semua state ──
    gsap.set(inner, { opacity: 1, scale: 1, y: 0 });
    gsap.set(hint,  { opacity: 1, y: 0 });

    // ── Entrance: sekali saat mount ────────────────────────
    const ctx = gsap.context(() => {
      gsap.timeline()
        .from(inner, { opacity: 0, y: 30, duration: 1.2, ease: "expo.out", delay: 0.2 })
        .from(hint,  { opacity: 0,        duration: 1,   ease: "power2.out" }, "-=0.4");
    });

    // ── Scroll: fromTo eksplisit ───────────────────────────
    // fromTo memastikan saat scroll balik ke atas,
    // GSAP selalu restore ke nilai "from": opacity:1, scale:1
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=80%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.fromTo(inner,
        { scale: 1,   opacity: 1, y: 0  },
        { scale: 1.6, opacity: 0, ease: "none" },
      )
      .fromTo(hint,
        { opacity: 1, y: 0  },
        { opacity: 0, y: 20, ease: "none" },
        "<",
      );

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ background: "#080808" }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          opacity: 0.5,
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(184,255,63,0.06) 0%, transparent 70%)" }}
      />

      {/* Corners */}
      <Corner pos="top-left"    text={cfg.siteLabel}   />
      <Corner pos="top-right"   text={cfg.year}        />
      <Corner pos="bottom-left" text={cfg.discipline}  />

      {/* Main content */}
      <div ref={innerRef} className="relative text-center select-none">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-12" style={{ background: "#b8ff3f" }} />
          <p className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: "#b8ff3f" }}>
            {cfg.tagline}
          </p>
          <div className="h-px w-12" style={{ background: "#b8ff3f" }} />
        </div>

        <h1
          className="leading-[0.9] tracking-tight"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 8rem)",
            fontFamily: "var(--font-geist-sans)",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.03em",
          }}
        >
          {cfg.firstName}
          <br />
          <span style={{ color: "#b8ff3f" }}>{cfg.lastName}</span>
        </h1>

        <p className="mt-6 font-mono text-sm tracking-[0.3em] uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>
          {cfg.role}
        </p>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2"
        style={{ transform: "translateX(-50%)" }}
      >
        <p className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: "rgba(255,255,255,0.25)" }}>
          Scroll
        </p>
        <div className="w-px h-12" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
      </div>
    </section>
  );
}

// ── Helper ────────────────────────────────────────────────────────────────────
// Ganti fungsi Corner di cover.tsx
function Corner({ pos, text }: { pos: "top-left"|"top-right"|"bottom-left"; text: string }) {
  const cls = {
    "top-left":    "absolute top-6 left-5 md:top-8 md:left-8",
    "top-right":   "absolute top-6 right-5 md:top-8 md:right-8",
    "bottom-left": "absolute bottom-6 left-5 md:bottom-8 md:left-8",
  }[pos];

  const hiddenOnMobile = pos !== "top-left" ? "hidden md:block" : "";

  return (
    <div className={`${cls} ${hiddenOnMobile} font-mono text-xs tracking-[0.25em] uppercase`} style={{ color: "rgba(255,255,255,0.2)" }}>
      {text}
    </div>
  );
}