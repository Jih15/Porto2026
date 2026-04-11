"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import images from "@/public/images";
import Image from "next/image";

export default function AboutContent() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Delay base: tunggu overlay expand selesai (~0.65s) + sedikit margin
    const D = 0.68;

    const ctx = gsap.context(() => {

      /* ════════════════════════════════════════
         DESKTOP animations
      ════════════════════════════════════════ */

      // ── Photo: curtain lift dari bawah + scale settle ──
      gsap.fromTo(
        "[data-anim='photo-d']",
        { clipPath: "inset(0% 0% 100% 0%)", scale: 1.14, transformOrigin: "center center" },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.5, ease: "expo.inOut", delay: D },
      );

      // ── Label slide dari kiri ──
      gsap.fromTo(
        "[data-anim='d-label']",
        { x: -36, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power4.out", delay: D + 0.2 },
      );

      // ── Name lines: reveal dari bawah (classic magazine effect) ──
      gsap.fromTo(
        "[data-anim='d-name']",
        { y: "105%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.0, stagger: 0.14, ease: "power4.out", delay: D + 0.35 },
      );

      // ── Bio paragraphs: slide dari kanan ──
      gsap.fromTo(
        "[data-anim='d-bio']",
        { x: 44, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.75, stagger: 0.2, ease: "power4.out", delay: D + 0.6 },
      );

      // ── Garis aksen horizontal di bawah nama ──
      gsap.fromTo(
        "[data-anim='d-line']",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.8, ease: "expo.out", delay: D + 0.5 },
      );

      // ── Photo: subtle floating setelah masuk ──
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
        "[data-anim='photo-m']",
        { clipPath: "inset(0% 0% 100% 0%)", scale: 1.1, transformOrigin: "center top" },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.2, ease: "expo.inOut", delay: D + 0.25 },
      );

      gsap.fromTo(
        "[data-anim='m-bio']",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.16, ease: "power3.out", delay: D + 0.75 },
      );

    }, rootRef); // semua selector di-scope ke rootRef

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

        {/* Layer 0 — Text (z-index di bawah foto) */}
        <div
          className="absolute w-full h-full grid"
          style={{ gridTemplateColumns: "1fr 1fr 1fr", zIndex: 0 }}
        >
          {/* LEFT: label + name */}
          <div className="flex flex-col justify-between p-12 pb-72">
            <span
              data-anim="d-label"
              className="font-mono text-xs tracking-[0.35em] uppercase"
              style={{ color: "#b8ff3f" }}
            >
              About Me
            </span>

            <div>
              {/* Garis aksen sebelum nama */}
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
                {/* Setiap baris dibungkus overflow:hidden untuk efek reveal dari bawah */}
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

          {/* CENTER: kosong — foto overlap di sini */}
          <div />

          {/* RIGHT: bio text */}
          <div
            className="flex flex-col justify-center p-12 pr-16"
            style={{ textAlign: "right" }}
          >
            <p
              data-anim="d-bio"
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Saya adalah seorang full-stack developer dan UI designer yang
              berfokus pada membangun produk digital yang estetik, fungsional,
              dan memberikan pengalaman pengguna yang luar biasa.
            </p>
            <p
              data-anim="d-bio"
              className="text-sm leading-relaxed mt-5"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              Dengan passion di intersection antara desain dan teknologi, setiap
              project saya dekati dengan perhatian penuh pada detail, ketelitian,
              dan inovasi yang menghasilkan solusi yang bermakna.
            </p>
          </div>
        </div>

        {/* Layer 1 — Photo (di atas text) */}
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
          {/* Fade bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
            style={{ background: "linear-gradient(to top, #111 0%, transparent 100%)" }}
          />
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
        <div data-anim="m-label" className="px-6 pt-16 pb-4">
          <span
            className="font-mono text-xs tracking-[0.35em] uppercase"
            style={{ color: "#b8ff3f" }}
          >
            About Me
          </span>
        </div>

        {/* Name */}
        <div data-anim="m-name" className="px-6 pb-6">
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
        </div>

        {/* Bio text */}
        <div className="px-6 pt-6 pb-16 flex flex-col gap-4">
          <p
            data-anim="m-bio"
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Saya adalah seorang full-stack developer dan UI designer yang
            berfokus pada membangun produk digital yang estetik, fungsional,
            dan memberikan pengalaman pengguna yang luar biasa.
          </p>
          <p
            data-anim="m-bio"
            className="text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Dengan passion di intersection antara desain dan teknologi, setiap
            project saya dekati dengan perhatian penuh pada detail dan inovasi.
          </p>
        </div>

      </div>
    </div>
  );
}