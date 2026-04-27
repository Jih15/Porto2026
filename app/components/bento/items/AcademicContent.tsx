"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import photos from "@/public/assets/photo/photo";

/* ── Data ─────────────────────────────────────────────────────── */
const ACADEMICS = [
  {
    year: "2021 – 2025",
    degree: "D4 - Teknologi Rekayasa Perangkat Lunak",
    institution: "Politeknik Negeri Padang",
    desc: "As a recent graduate of Politeknik Negeri Padang with a 3.44/4.00 GPA, I have a solid skill set in Mobile and Web Development. Adaptable and detail-oriented, with a creative background in videography and photography that enhances my approach to design and user experience. Currently seeking opportunities to grow as a Mobile Developer while remaining open to Frontend and related roles.",
  },
  {
    year: "2017 – 2020",
    degree: "MA - Ilmu Pengetahuan Alam",
    institution: "MAN 1 Bukittinggi",
    desc: "Completed high school in Science (Ilmu Pengetahuan Alam) with a final grade of 86.00/100, while actively participating in academic competitions including a national scientific paper competition in technology and mathematics education as a game designer, as well as various computer science olympiads at city to provincial levels (2018–2019) focused on programming and logical problem-solving.",
  },
];

const PHOTOS: { src: string | null; alt: string }[] = [
  { src: photos.img1, alt: "Photo 1" },
  { src: photos.img2, alt: "Photo 2" },
  { src: photos.img3, alt: "Photo 3" },
  { src: photos.img4, alt: "Photo 4" },
  { src: photos.img5, alt: "Photo 5" },
  { src: photos.img6, alt: "Photo 6" },
  { src: photos.img7, alt: "Photo 7" },
  { src: photos.img8, alt: "Photo 8" },
  { src: photos.img9, alt: "Photo 9" },
  { src: photos.img10, alt: "Photo 10" },
];

/* ── Photo grid tile ──────────────────────────────────────────── */
function PhotoTile({ item }: { item: { src: string | null; alt: string } }) {
  return (
    <div
      className="rounded-2xl overflow-hidden shrink-0"
      style={{
        background: item.src ? "transparent" : "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.06)",
        aspectRatio: "2 / 3",
        width: "100%",
      }}
    >
      {item.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full" />
      )}
    </div>
  );
}

/* ── Scrolling column (vertical) ──────────────────────────────── */
interface ScrollColProps {
  photos: typeof PHOTOS;
  direction?: "up" | "down";
  speed?: number;
}

function ScrollCol({ photos, direction = "up", speed = 40 }: ScrollColProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tiles = [...photos, ...photos];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let y = 0;
    let lastTime: number | null = null;
    let raf: number;

    function tick(now: number) {
      if (!lastTime) { lastTime = now; raf = requestAnimationFrame(tick); return; }
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      const oneSet = track!.scrollHeight / 2;
      if (oneSet === 0) { raf = requestAnimationFrame(tick); return; }
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

    return () => { cancelAnimationFrame(initRaf); cancelAnimationFrame(raf); };
  }, [direction, speed]);

  return (
    <div className="overflow-hidden flex-1" style={{ minHeight: 0 }}>
      <div ref={trackRef} className="flex flex-col gap-3" style={{ willChange: "transform" }}>
        {tiles.map((photo, i) => <PhotoTile key={i} item={photo} />)}
      </div>
    </div>
  );
}

/* ── Scrolling row (horizontal — mobile) ──────────────────────── */
interface ScrollRowProps {
  photos: typeof PHOTOS;
  direction?: "left" | "right";
  speed?: number;
}

function ScrollRow({ photos, direction = "left", speed = 35 }: ScrollRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tiles = [...photos, ...photos];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let lastTime: number | null = null;
    let raf: number;

    function tick(now: number) {
      if (!lastTime) { lastTime = now; raf = requestAnimationFrame(tick); return; }
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      const oneSet = track!.scrollWidth / 2;
      if (oneSet === 0) { raf = requestAnimationFrame(tick); return; }
      if (direction === "left") {
        x -= speed * dt;
        if (x <= -oneSet) x += oneSet;
      } else {
        x += speed * dt;
        if (x >= 0) x -= oneSet;
      }
      track!.style.transform = `translateX(${x}px)`;
      raf = requestAnimationFrame(tick);
    }

    const initRaf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const oneSet = track!.scrollWidth / 2;
        if (direction === "right") x = -oneSet;
        raf = requestAnimationFrame(tick);
      });
    });

    return () => { cancelAnimationFrame(initRaf); cancelAnimationFrame(raf); };
  }, [direction, speed]);

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={trackRef}
        className="flex flex-row gap-3"
        style={{ willChange: "transform", width: "max-content" }}
      >
        {tiles.map((photo, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden shrink-0"
            style={{
              width: 80, height: 80,
              background: photo.src ? "transparent" : "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {photo.src
              ? <Image src={photo.src} alt={photo.alt} width={80} height={80} className="object-cover" />
              : <div className="w-full h-full" />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Root ─────────────────────────────────────────────────────── */
export default function AcademicContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const col1 = PHOTOS.slice(0, 4);
  const col2 = PHOTOS.slice(2, 6);
  const col3 = PHOTOS.slice(4, 10);

  useEffect(() => {
    const D = 0.68;
    const root = rootRef.current;
    if (!root) return;

    const raf = requestAnimationFrame(() => {
      const q = (sel: string) => {
        const els = root.querySelectorAll(sel);
        return els.length ? els : null;
      };

      const tl = gsap.timeline({ delay: D });

      const acLabel   = q("[data-anim='ac-label']");
      const acYear    = q("[data-anim='ac-year']");
      const acEntry   = q("[data-anim='ac-entry']");
      const acDivider = q("[data-anim='ac-divider']");
      const photoCols = q("[data-anim='photo-col']");

      if (acLabel) tl.fromTo(acLabel,
        { x: -28, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power4.out" },
      );
      if (acYear) tl.fromTo(acYear,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.18, ease: "power3.out" },
        "<",
      );
      if (acEntry) tl.fromTo(acEntry,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.18, ease: "power3.out" },
        "-=0.35",
      );
      if (acDivider) tl.fromTo(acDivider,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.6, ease: "expo.out" },
        "-=0.5",
      );
      if (photoCols) tl.fromTo(photoCols,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.14, ease: "power3.out" },
        "-=0.55",
      );

      const mLabel  = q("[data-anim='m-ac-label']");
      const mEntry  = q("[data-anim='m-ac-entry']");
      const mStrip  = q("[data-anim='m-strip']");
      const mFooter = q("[data-anim='m-footer']");

      if (mLabel) gsap.fromTo(mLabel,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", delay: D },
      );
      if (mEntry) gsap.fromTo(mEntry,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.2, ease: "power4.out", delay: D + 0.15 },
      );
      if (mStrip) gsap.fromTo(mStrip,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.2, ease: "power3.out", delay: D + 0.5 },
      );
      if (mFooter) gsap.fromTo(mFooter,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out", delay: D + 0.8 },
      );
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative w-full"
      style={{ background: "#0d0d0d", minHeight: "100vh", height: "100%" }}
    >

      {/* ══════════════════════════════════
          MOBILE layout (< md)
      ══════════════════════════════════ */}
      <div className="flex flex-col md:hidden min-h-screen">

        {/* Label */}
        <div data-anim="m-ac-label" className="px-6 pt-16 pb-2">
          <span
            className="font-mono text-xs tracking-[0.35em] uppercase"
            style={{ color: "#b8ff3f" }}
          >
            Education
          </span>
        </div>

        {/* Academic entries */}
        <div className="flex flex-col gap-8 px-6 pt-4 pb-6">
          {ACADEMICS.map((ac, i) => (
            <div key={i} data-anim="m-ac-entry" className="flex gap-4">
              {/* Accent bar */}
              <div
                className="shrink-0 mt-1"
                style={{
                  width: 2,
                  background: "rgba(184,255,63,0.3)",
                  borderRadius: 2,
                  alignSelf: "stretch",
                }}
              />
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs tracking-wide" style={{ color: "#b8ff3f" }}>
                  {ac.year}
                </span>
                <p
                  className="font-bold leading-snug m-0"
                  style={{ color: "#fff", fontSize: "1rem", letterSpacing: "-0.01em" }}
                >
                  {ac.degree}
                </p>
                <p
                  className="font-bold text-sm tracking-wide m-0"
                  style={{ color: "#b8ff3f" }}
                >
                  {ac.institution}
                </p>

                {/* Scrollable desc — mobile */}
                <div
                  className="scrollbar-neon overflow-y-auto mt-1"
                  style={{ maxHeight: "7rem" }}
                >
                  <p
                    className="text-sm leading-relaxed m-0"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {ac.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Horizontal scrolling photo strips */}
        <div className="flex flex-col gap-3 pb-6 overflow-hidden">
          <div data-anim="m-strip">
            <ScrollRow photos={PHOTOS.slice(0, 6)} direction="left"  speed={30} />
          </div>
          <div data-anim="m-strip">
            <ScrollRow photos={PHOTOS.slice(2, 10)} direction="right" speed={24} />
          </div>
        </div>

        {/* Footer mobile */}
        <div
          data-anim="m-footer"
          className="mt-auto px-6 py-5 font-mono text-xs tracking-[0.25em] uppercase"
          style={{
            color: "rgba(255,255,255,0.12)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "#0d0d0d",
          }}
        >
          © 2026 Zaqaul · All Rights Reserved
        </div>
      </div>


      {/* ══════════════════════════════════
          DESKTOP layout (≥ md)
      ══════════════════════════════════ */}
      <div
        className="hidden md:flex overflow-hidden"
        style={{ minHeight: "100vh", height: "100%" }}
      >

        {/* LEFT: Academic list */}
        <div
          className="flex flex-col shrink-0 px-10 md:px-14 py-5"
          style={{ width: "clamp(280px, 42%, 520px)" }}
        >
          <span
            data-anim="ac-label"
            className="font-mono text-xs tracking-[0.35em] uppercase mb-10 pt-6"
            style={{ color: "#b8ff3f" }}
          >
            Education
          </span>

          {/* Entries area — flex-1 + overflow-hidden agar footer tetap di bawah */}
          <div className="flex flex-col gap-10 flex-1 overflow-hidden">
            {ACADEMICS.map((ac, i) => (
              <div key={i}>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center gap-2 shrink-0" style={{ minWidth: 88 }}>
                    <span
                      data-anim="ac-year"
                      className="font-mono text-xs tracking-wide"
                      style={{ color: "#b8ff3f" }}
                    >
                      {ac.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div data-anim="ac-entry" className="flex flex-col gap-1 min-w-0">
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
                      className="font-bold text-xs tracking-wide m-0"
                      style={{ color: "#b8ff3f" }}
                    >
                      {ac.institution}
                    </p>

                    {/* Scrollable desc — desktop */}
                    <div
                      className="scrollbar-neon overflow-y-auto mt-2"
                      style={{ maxHeight: "8rem" }}
                    >
                      <p
                        className="text-sm leading-relaxed m-0"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        {ac.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer desktop — sticky bottom */}
          <div
            className="sticky bottom-0 pt-3 pb-5 font-mono text-xs tracking-[0.25em] uppercase"
            style={{
              color: "rgba(255,255,255,0.12)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              background: "#0d0d0d",
            }}
          >
            © 2026 Zaqaul · All Rights Reserved
          </div>
        </div>

        {/* RIGHT: Scrolling photo grid */}
        <div className="flex-1 flex gap-3 p-0 overflow-hidden" style={{ minHeight: 0 }}>
          <div data-anim="photo-col" className="flex flex-col flex-1 gap-3 overflow-hidden">
            <ScrollCol photos={col1} direction="up"   speed={35} />
          </div>
          <div data-anim="photo-col" className="flex flex-col flex-1 gap-3 overflow-hidden">
            <ScrollCol photos={col2} direction="down" speed={28} />
          </div>
          <div data-anim="photo-col" className="flex flex-col flex-1 gap-3 overflow-hidden">
            <ScrollCol photos={col3} direction="up"   speed={42} />
          </div>
        </div>

        {/* Fade overlays */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: "clamp(280px, 42%, 520px)",
            width: 60,
            zIndex: 2,
          }}
        />
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
        <div
          className="absolute top-0 bottom-0 right-0 w-16 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #0d0d0d, transparent)",
            zIndex: 2,
          }}
        />
      </div>

    </div>
  );
}