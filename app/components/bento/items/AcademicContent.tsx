"use client";

import { useRef, useEffect } from "react";

/* ── Data ─────────────────────────────────────────────────────── */
const ACADEMICS = [
  {
    year: "2021 – 2025",
    degree: "D4 - Teknologi Rekayasa Perangkat Lunak",
    institution: "Politeknik Negeri Padang",
    desc: "Fokus pada software engineering, algoritma, dan pengembangan aplikasi berbasis web dan mobile.",
  },
  {
    year: "2017 – 2020",
    degree: "MA - Ilmu Pengetahuan Alam",
    institution: "MAN 1 Bukittinggi",
    desc: "Jurusan Ilmu Pengetahuan Alam dengan prestasi di bidang komputer dan teknologi informasi.",
  },
];

const PHOTOS: { src: string | null; alt: string }[] = [
  { src: null, alt: "Photo 1" },
  { src: null, alt: "Photo 2" },
  { src: null, alt: "Photo 3" },
  { src: null, alt: "Photo 4" },
  { src: null, alt: "Photo 5" },
  { src: null, alt: "Photo 6" },
  { src: null, alt: "Photo 7" },
  { src: null, alt: "Photo 8" },
];

/* ── Photo grid tile ──────────────────────────────────────────── */
function PhotoTile({ item }: { item: { src: string | null; alt: string } }) {
  return (
    <div
      className="rounded-2xl overflow-hidden shrink-0"
      style={{
        background: item.src ? "transparent" : "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.06)",
        aspectRatio: "1 / 1",
        width: "100%",
      }}
    >
      {item.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full" />
      )}
    </div>
  );
}

/* ── Scrolling column ─────────────────────────────────────────── */
interface ScrollColProps {
  photos: typeof PHOTOS;
  direction?: "up" | "down";
  speed?: number;
}

function ScrollCol({ photos, direction = "up", speed = 40 }: ScrollColProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplikasi tile untuk seamless loop
  const tiles = [...photos, ...photos];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let y = 0;
    let lastTime: number | null = null;
    let raf: number;


    function tick(now: number) {
      if (!lastTime) {
        lastTime = now;
        raf = requestAnimationFrame(tick);
        return;
      }

      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const oneSet = track!.scrollHeight / 2;

      if (oneSet === 0) {
        raf = requestAnimationFrame(tick);
        return;
      }

      if (direction === "up") {
        y -= speed * dt;
        if (y <= -oneSet) y += oneSet;
      } else {
        y += speed * dt;
        if (y >= 0) y -= oneSet;
      }

      track!.style.transform = `translateY(${y}px)`;
      raf = requestAnimationFrame(tick);
    }

    const initRaf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const oneSet = track!.scrollHeight / 2;
        if (direction === "down") y = -oneSet;
        raf = requestAnimationFrame(tick);
      });
    });

    return () => {
      cancelAnimationFrame(initRaf);
      cancelAnimationFrame(raf);
    };
  }, [direction, speed]);

  return (
    <div className="overflow-hidden flex-1" style={{ minHeight: 0 }}>
      <div ref={trackRef} className="flex flex-col gap-3" style={{ willChange: "transform" }}>
        {tiles.map((photo, i) => (
          <PhotoTile key={i} item={photo} />
        ))}
      </div>
    </div>
  );
}

/* ── Root ─────────────────────────────────────────────────────── */
export default function AcademicContent() {
  const col1 = PHOTOS.slice(0, 4);
  const col2 = PHOTOS.slice(2, 6);
  const col3 = PHOTOS.slice(4, 8);

  return (
    <div
      className="relative w-full flex overflow-hidden"
      style={{ background: "#0d0d0d", minHeight: "100vh", height: "100%" }}
    >
      {/* ── LEFT: Academic list ── */}
      <div
        className="flex flex-col justify-center shrink-0 px-10 md:px-14 py-5.5"
        style={{ width: "clamp(280px, 42%, 520px)" }}
      >
        {/* Label */}
        <span
          className="font-mono text-xs tracking-[0.35em] uppercase mb-10 pt-48"
          style={{ color: "#b8ff3f" }}
        >
          Education
        </span>

        {/* Entries */}
        <div className="flex flex-col gap-10">
          {ACADEMICS.map((ac, i) => (
            <div key={i} className="flex gap-6">
              {/* Year */}
              <span
                className="font-mono text-xs shrink-0 pt-1 tracking-wide"
                style={{ color: "#b8ff3f", minWidth: 88 }}
              >
                {ac.year}
              </span>

              {/* Content */}
              <div className="flex flex-col gap-1">
                <p
                  className="font-bold leading-snug m-0"
                  style={{
                    color: "#fff",
                    fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {ac.degree}
                </p>
                <p
                  className="font-mono text-xs tracking-wide m-0"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {ac.institution}
                </p>
                <p
                  className="text-sm leading-relaxed mt-2 m-0"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {ac.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="mt-auto pt-32 font-mono text-xs tracking-[0.25em] uppercase"
          style={{ color: "rgba(255,255,255,0.12)" }}
        >
          2026 Zaqaul – All Right Reserved
        </div>
      </div>

      {/* ── RIGHT: Scrolling photo grid ── */}
      <div
        className="flex-1 flex gap-3 p-0 overflow-hidden"
        style={{ minHeight: 0 }}
      >
        <div className="flex flex-col flex-1 gap-3 overflow-hidden">
          <ScrollCol photos={col1} direction="up" speed={35} />
        </div>
        <div className="flex flex-col flex-1 gap-3 overflow-hidden">
          <ScrollCol photos={col2} direction="down" speed={28} />
        </div>
        <div className="flex flex-col flex-1 gap-3 overflow-hidden">
          <ScrollCol photos={col3} direction="up" speed={42} />
        </div>
      </div>

      {/* Fade left edge */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          left: "clamp(280px, 42%, 520px)",
          width: 60,
          background: "linear-gradient(to right, #0d0d0d, transparent)",
          zIndex: 2,
        }}
      />

      {/* Fade top & bottom */}
      <div
        className="absolute right-0 top-0 h-16 pointer-events-none"
        style={{
          left: "clamp(280px, 42%, 520px)",
          background: "linear-gradient(to bottom, #0d0d0d, transparent)",
          zIndex: 2,
        }}
      />
      <div
        className="absolute right-0 bottom-0 h-16 pointer-events-none"
        style={{
          left: "clamp(280px, 42%, 520px)",
          background: "linear-gradient(to top, #0d0d0d, transparent)",
          zIndex: 2,
        }}
      />
      {/* Fade right edge grid foto */}
      <div
        className="absolute top-0 bottom-0 right-0 w-16 pointer-events-none"
        style={{
          background: "linear-gradient(to left, #0d0d0d, transparent)",
          zIndex: 2,
        }}
      />
    </div>
  );
}