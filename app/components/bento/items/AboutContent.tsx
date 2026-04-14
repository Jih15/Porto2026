"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import images from "@/public/images";
import Image from "next/image";

const STATS = [
  { num: "D4 - TRPL", desc: "Politeknik Negeri Padang" },
  // { num: "1", desc: "Years of experience" },
  // { num: "3", desc: "Projects completed" },
];

// const SKILLS = [
//   { label: "Flutter", main: true },
//   { label: "Next.js", main: true },
//   { label: "Laravel", main: false },
//   { label: "FastAPI", main: false },
//   { label: "FIGMA", main: false },
//   { label: "UI/UX", main: false },
// ];

export default function AboutContent() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const D = 0.68;

    const ctx = gsap.context(() => {

      /* ════════════════════════════════════════
         DESKTOP animations
      ════════════════════════════════════════ */

      gsap.fromTo(
        "[data-anim='photo-d']",
        { clipPath: "inset(0% 0% 100% 0%)", scale: 1.14, transformOrigin: "center center" },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.5, ease: "expo.inOut", delay: D },
      );

      gsap.fromTo(
        "[data-anim='d-label']",
        { x: -36, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power4.out", delay: D + 0.2 },
      );

      gsap.fromTo(
        "[data-anim='d-name']",
        { y: "105%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.0, stagger: 0.14, ease: "power4.out", delay: D + 0.35 },
      );

      gsap.fromTo(
        "[data-anim='d-bio']",
        { x: 44, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.75, stagger: 0.2, ease: "power4.out", delay: D + 0.6 },
      );

      gsap.fromTo(
        "[data-anim='d-line']",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.8, ease: "expo.out", delay: D + 0.5 },
      );

      // ── Stats: slide dari kiri, stagger ──
      gsap.fromTo(
        "[data-anim='d-stat']",
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: D + 0.3 },
      );

      // ── Skill tags: slide dari kanan, stagger ──
      // gsap.fromTo(
      //   "[data-anim='d-skill']",
      //   { x: 20, opacity: 0 },
      //   { x: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power3.out", delay: D + 0.65 },
      // );

      // ── Corner brackets: fade in ──
      gsap.fromTo(
        "[data-anim='d-corner']",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out", delay: D + 1.2 },
      );

      // ── Availability badge ──
      gsap.fromTo(
        "[data-anim='d-avail']",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: D + 1.0 },
      );

      // ── Index label di tengah bawah ──
      gsap.fromTo(
        "[data-anim='d-index']",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out", delay: D + 1.4 },
      );

      // ── Photo floating ──
      gsap.to("[data-anim='photo-d']", {
        y: -14,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: D + 1.7,
      });

      /* ════════════════════════════════════════
         MOBILE animations
      ════════════════════════════════════════ */

      gsap.fromTo(
        "[data-anim='m-label']",
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", delay: D },
      );

      gsap.fromTo(
        "[data-anim='m-name']",
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: "power4.out", delay: D + 0.1 },
      );

      gsap.fromTo(
        "[data-anim='m-stats']",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: D + 0.2 },
      );

      gsap.fromTo(
        "[data-anim='photo-m']",
        { clipPath: "inset(0% 0% 100% 0%)", scale: 1.1, transformOrigin: "center top" },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.2, ease: "expo.inOut", delay: D + 0.3 },
      );

      gsap.fromTo(
        "[data-anim='m-bio']",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.16, ease: "power3.out", delay: D + 0.8 },
      );

      // gsap.fromTo(
      //   "[data-anim='m-skill']",
      //   { opacity: 0, scale: 0.9 },
      //   { opacity: 1, scale: 1, duration: 0.4, stagger: 0.06, ease: "back.out(1.5)", delay: D + 1.0 },
      // );

      gsap.fromTo(
        "[data-anim='m-avail']",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out", delay: D + 1.2 },
      );

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative w-full h-full"
      style={{ background: "#111" }}
    >

      {/* ══════════════════════════════════
          DESKTOP layout
      ══════════════════════════════════ */}
      <div className="hidden md:block absolute inset-0 overflow-hidden">

        {/* Subtle column dividers */}
        <div
          className="absolute inset-y-0 pointer-events-none"
          style={{ left: "33.33%", width: "0.5px", background: "rgba(255,255,255,0.05)", zIndex: 2 }}
        />
        <div
          className="absolute inset-y-0 pointer-events-none"
          style={{ right: "33.33%", width: "0.5px", background: "rgba(255,255,255,0.05)", zIndex: 2 }}
        />

        {/* Layer 0 — Text */}
        <div
          className="absolute w-full h-full grid"
          style={{ gridTemplateColumns: "1fr 1fr 1fr", zIndex: 0 }}
        >
          {/* LEFT: label + stats + name */}
          <div className="flex flex-col justify-between p-12 pb-72">
            <span
              data-anim="d-label"
              className="font-mono text-xs tracking-[0.35em] uppercase"
              style={{ color: "#b8ff3f" }}
            >
              About Me
            </span>

            <div>
              {/* Stats row */}
              <div className="flex flex-col gap-3 mb-8">
                {STATS.map((s, i) => (
                  <div key={i} data-anim="d-stat" className="flex flex-col gap-0.5">
                    <span
                      className="font-bold leading-none"
                      style={{ fontSize: "1.6rem", color: "#b8ff3f", letterSpacing: "-0.04em" }}
                    >
                      {s.num}
                    </span>
                    <span
                      className="font-mono uppercase"
                      style={{ fontSize: "0.6rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.3)" }}
                    >
                      {s.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* Garis aksen + nama */}
              <div
                data-anim="d-line"
                className="mb-4"
                style={{ height: 1, width: 48, background: "#b8ff3f" }}
              />
              <h2
                className="font-bold leading-none"
                style={{
                  fontSize: "clamp(2.8rem, 4.5vw, 5rem)",
                  color: "#fff",
                  letterSpacing: "-0.03em",
                  fontFamily: "var(--font-geist-sans)",
                }}
              >
                {["Zaqaul Fikri", "Aziz"].map((line, i) => (
                  <span
                    key={i}
                    style={{ display: "block", overflow: "hidden", lineHeight: "1.05" }}
                  >
                    <span data-anim="d-name" style={{ display: "block" }}>
                      {line}
                    </span>
                  </span>
                ))}
              </h2>
            </div>
          </div>

          {/* CENTER: kosong — foto overlap */}
          <div />

          {/* RIGHT: skills + bio + availability */}
          <div
            className="flex flex-col justify-between pt-70 p-16 pr-16"
            style={{ textAlign: "right" }}
          >
            {/* Skill tags */}
            {/* <div>
              <span
                className="font-mono uppercase block mb-3"
                style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.25)" }}
              >
                Stack
              </span>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {SKILLS.map((sk, i) => (
                  <span
                    key={i}
                    data-anim="d-skill"
                    className="font-mono uppercase"
                    style={{
                      fontSize: "0.55rem",
                      letterSpacing: "0.14em",
                      padding: "4px 9px",
                      border: sk.main
                        ? "0.5px solid #b8ff3f"
                        : "0.5px solid rgba(184,255,63,0.25)",
                      color: sk.main ? "#b8ff3f" : "rgba(184,255,63,0.55)",
                      borderRadius: "2px",
                    }}
                  >
                    {sk.label}
                  </span>
                ))}
              </div>
            </div> */}

            <div>
              <p
                data-anim="d-bio"
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Fresh graduate in Informatics Engineering (D4-TRPL)
                from Politeknik Negeri Padang with a strong focus on Mobile Development using Flutter,
                along with experience in Frontend (Next.js) and Backend development (Laravel, FastAPI).
                Skilled in building scalable REST APIs
                and translating UI/UX designs into functional, responsive applications.
              </p>

              {/* Availability badge */}
              <div
                data-anim="d-avail"
                className="flex items-center gap-2 justify-end mt-4"
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    background: "#b8ff3f",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                />
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.3)" }}
                >
                  Available for work
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Layer 1 — Photo */}
        <div
          data-anim="photo-d"
          className="absolute inset-0 flex items-end justify-center pointer-events-none"
          style={{ zIndex: 1, clipPath: "inset(0% 0% 100% 0%)" }}
        >
          <Image
            src={images.img1}
            alt="Zaqaul Fikri Aziz"
            width={640}
            height={900}
            style={{
              filter: "grayscale(100%)",
              display: "block",
              height: "100vh",
              width: "auto",
              maxWidth: "none",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
            style={{ background: "linear-gradient(to top, #111 0%, transparent 100%)" }}
          />
        </div>

        {/* Layer 2 — Corner brackets + index label (di atas foto) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 3 }}
        >
          {/* Top-left bracket */}
          <div
            data-anim="d-corner"
            style={{
              position: "absolute",
              top: 20,
              left: "calc(33.33% + 20px)",
              width: 20,
              height: 20,
              borderTop: "1px solid rgba(184,255,63,0.35)",
              borderLeft: "1px solid rgba(184,255,63,0.35)",
            }}
          />
          {/* Top-right bracket */}
          <div
            data-anim="d-corner"
            style={{
              position: "absolute",
              top: 20,
              right: "calc(33.33% + 20px)",
              width: 20,
              height: 20,
              borderTop: "1px solid rgba(184,255,63,0.35)",
              borderRight: "1px solid rgba(184,255,63,0.35)",
            }}
          />
          {/* Bottom-left bracket */}
          <div
            data-anim="d-corner"
            style={{
              position: "absolute",
              bottom: 20,
              left: "calc(33.33% + 20px)",
              width: 20,
              height: 20,
              borderBottom: "1px solid rgba(184,255,63,0.35)",
              borderLeft: "1px solid rgba(184,255,63,0.35)",
            }}
          />
          {/* Bottom-right bracket */}
          <div
            data-anim="d-corner"
            style={{
              position: "absolute",
              bottom: 20,
              right: "calc(33.33% + 20px)",
              width: 20,
              height: 20,
              borderBottom: "1px solid rgba(184,255,63,0.35)",
              borderRight: "1px solid rgba(184,255,63,0.35)",
            }}
          />
          {/* Index label */}
          <div
            data-anim="d-index"
            style={{
              position: "absolute",
              bottom: 28,
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "monospace",
              fontSize: "0.55rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.18)",
              whiteSpace: "nowrap",
            }}
          >
            01 / Profile
          </div>
        </div>

      </div>

      {/* ══════════════════════════════════
          MOBILE layout
      ══════════════════════════════════ */}
      <div
        className="md:hidden flex flex-col overflow-y-auto scrollbar-neon"
        style={{ height: "100%" }}
      >

        {/* Label */}
        <div data-anim="m-label" className="px-6 pt-16 pb-3">
          <span
            className="font-mono text-xs tracking-[0.35em] uppercase"
            style={{ color: "#b8ff3f" }}
          >
            About Me
          </span>
        </div>

        {/* Name */}
        <div data-anim="m-name" className="px-6 pb-4">
          <h2
            className="font-bold leading-none"
            style={{
              fontSize: "clamp(2.5rem, 12vw, 4rem)",
              color: "#fff",
              letterSpacing: "-0.03em",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            Zaqaul Fikri
            <br />
            Aziz
          </h2>
        </div>

        {/* Mobile stats */}
        <div data-anim="m-stats" className="px-6 pb-5 flex gap-6">
          {STATS.slice(1).map((s, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <span
                className="font-bold leading-none"
                style={{ fontSize: "1.6rem", color: "#b8ff3f", letterSpacing: "-0.04em" }}
              >
                {s.num}
              </span>
              <span
                className="font-mono uppercase"
                style={{ fontSize: "0.55rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)" }}
              >
                {s.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Photo */}
        <div
          data-anim="photo-m"
          className="relative w-full"
          style={{ aspectRatio: "3 / 4", clipPath: "inset(0% 0% 100% 0%)" }}
        >
          <Image
            src={images.img1}
            alt="Zaqaul Fikri Aziz"
            fill
            className="object-cover object-top"
            style={{ filter: "grayscale(100%)" }}
            sizes="100vw"
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
            style={{ background: "linear-gradient(to top, #111 0%, transparent 100%)" }}
          />
          {/* Corner brackets mobile */}
          <div style={{ position: "absolute", top: 12, left: 12, width: 16, height: 16, borderTop: "1px solid rgba(184,255,63,0.4)", borderLeft: "1px solid rgba(184,255,63,0.4)" }} />
          <div style={{ position: "absolute", top: 12, right: 12, width: 16, height: 16, borderTop: "1px solid rgba(184,255,63,0.4)", borderRight: "1px solid rgba(184,255,63,0.4)" }} />
          <div style={{ position: "absolute", bottom: 12, left: 12, width: 16, height: 16, borderBottom: "1px solid rgba(184,255,63,0.4)", borderLeft: "1px solid rgba(184,255,63,0.4)" }} />
          <div style={{ position: "absolute", bottom: 12, right: 12, width: 16, height: 16, borderBottom: "1px solid rgba(184,255,63,0.4)", borderRight: "1px solid rgba(184,255,63,0.4)" }} />
        </div>

        {/* Bio */}
        <div className="px-6 pt-6 pb-4 flex flex-col gap-4">
          <p
            data-anim="m-bio"
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Fresh graduate in Informatics Engineering (D4-TRPL)
            from Politeknik Negeri Padang with a strong focus on Mobile Development using Flutter,
            along with experience in Frontend (Next.js) and Backend development (Laravel, FastAPI).
            Skilled in building scalable REST APIs
            and translating UI/UX designs into functional, responsive applications.
          </p>
        </div>

        {/* Skill tags */}
        {/* <div className="px-6 pb-5 flex flex-wrap gap-2">
          {SKILLS.map((sk, i) => (
            <span
              key={i}
              data-anim="m-skill"
              className="font-mono uppercase"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.12em",
                padding: "4px 9px",
                border: sk.main
                  ? "0.5px solid #b8ff3f"
                  : "0.5px solid rgba(184,255,63,0.25)",
                color: sk.main ? "#b8ff3f" : "rgba(184,255,63,0.55)",
                borderRadius: "2px",
              }}
            >
              {sk.label}
            </span>
          ))}
        </div> */}

        {/* Availability badge */}
        <div data-anim="m-avail" className="px-6 pb-14 flex items-center gap-2">
          <span
            style={{
              width: 6,
              height: 6,
              background: "#b8ff3f",
              borderRadius: "50%",
              display: "inline-block",
            }}
          />
          <span
            className="font-mono uppercase"
            style={{ fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.3)" }}
          >
            Available for work
          </span>
        </div>

      </div>
    </div>
  );
}