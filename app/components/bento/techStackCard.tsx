"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useIsMobile } from "./useIsMobile";
import images from "@/public/images";

const TECHS = [
  {
    name: "Flutter",
    icon: `${images.flutter}`,
    desc: "Developing responsive mobile apps with state management, API integration, and a focus on performance and user experience.",
  },
  {
    name: "Next.js",
    icon: `${images.nextjs}`,
    desc: "Developing modern web applications using SSR and dynamic routing.",
  },
  {
    name: "Laravel",
    icon: `${images.laravel}`,
    desc: "Developing backend applications using the MVC architecture, efficient database management, and API development with Blade templating.",
  },
  {
    name: "FastAPI",
    icon: `${images.fastapi}`,
    desc: "Developing RESTful APIs with Python and integrating machine learning capabilities.",
  },
  {
    name: "Figma",
    icon: `${images.figma}`,
    desc: "Designing intuitive user interfaces with a UI/UX approach, creating interactive prototypes, and collaborating on consistent layout design."
  },
];

export default function TechStackCard() {
  const [selected, setSelected] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const iconRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = selected !== null ? TECHS[selected] : null;

  /* ── Entrance stagger ── */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const gsap = (await import("gsap")).default;
      if (cancelled) return;
      iconRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.45, delay: 0.65 + i * 0.06, ease: "back.out(2.5)" },
        );
      });
    })();
    return () => { cancelled = true; };
  }, []);

  /* ── Click: spring bounce then set state ── */
  const handleSelect = useCallback(async (i: number) => {
    const gsap = (await import("gsap")).default;
    const el = iconRefs.current[i];

    // Deselect previous
    if (selected !== null && selected !== i) {
      const prev = iconRefs.current[selected];
      if (prev) gsap.to(prev, { scale: 1, duration: 0.25, ease: "power2.out" });
    }

    if (selected === i) {
      // Toggle off
      if (el) {
        gsap.timeline()
          .to(el, { scale: 0.88, duration: 0.1,  ease: "power2.in"  })
          .to(el, { scale: 1,    duration: 0.3,  ease: "back.out(3)" });
      }
      setSelected(null);
    } else {
      // Select
      if (el) {
        gsap.timeline()
          .to(el, { scale: 0.82, duration: 0.09, ease: "power2.in"   })
          .to(el, { scale: 1.18, duration: 0.35, ease: "back.out(3.5)" })
          .to(el, { scale: 1,    duration: 0.2,  ease: "power2.out"  });
      }
      setSelected(i);
    }
  }, [selected]);

  /* ── MOBILE layout ── */
  if (isMobile) {
    return (
      <div className="absolute inset-0 flex flex-col p-5 gap-3">
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

        {/* Icons — 5 in one row */}
        <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
          {TECHS.map((tech, i) => (
            <button
              key={tech.name}
              ref={(el) => { iconRefs.current[i] = el; }}
              onClick={() => handleSelect(i)}
              className="relative flex items-center justify-center rounded-xl"
              style={{
                aspectRatio: "1",
                background: selected === i ? "rgba(184,255,63,0.15)" : "rgba(255,255,255,0.05)",
                border: selected === i
                  ? "1px solid rgba(184,255,63,0.5)"
                  : "1px solid rgba(255,255,255,0.07)",
                cursor: "pointer",
                willChange: "transform",
                transition: "background 0.25s ease, border 0.25s ease",
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

        {/* Description */}
        <div
          className="flex-1 rounded-xl p-4 scrollbar-neon"
          style={{
            overflowY: "auto",
            background: active ? "rgba(184,255,63,0.06)" : "rgba(255,255,255,0.03)",
            border: active ? "1px solid rgba(184,255,63,0.15)" : "1px solid rgba(255,255,255,0.05)",
            transition: "background 0.3s ease, border 0.3s ease",
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

  /* ── DESKTOP layout ── */
  return (
    <div className="absolute inset-0 flex flex-col p-5 gap-3">
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

      {/* Icons — 3 columns */}
      <div className="grid grid-cols-3 gap-2 shrink-0">
        {TECHS.map((tech, i) => (
          <button
            key={tech.name}
            ref={(el) => { iconRefs.current[i] = el; }}
            onClick={() => handleSelect(i)}
            className="relative flex items-center justify-center rounded-xl"
            style={{
              aspectRatio: "1",
              background: selected === i ? "rgba(184,255,63,0.15)" : "rgba(255,255,255,0.05)",
              border: selected === i
                ? "1px solid rgba(184,255,63,0.5)"
                : "1px solid rgba(255,255,255,0.07)",
              cursor: "pointer",
              willChange: "transform",
              transition: "background 0.25s ease, border 0.25s ease",
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

      {/* Description */}
      <div
        className="flex-1 rounded-xl p-4 scrollbar-neon"
        style={{
          overflowY: "auto",
          background: active ? "rgba(184,255,63,0.06)" : "rgba(255,255,255,0.03)",
          border: active ? "1px solid rgba(184,255,63,0.15)" : "1px solid rgba(255,255,255,0.05)",
          transition: "background 0.3s ease, border 0.3s ease",
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