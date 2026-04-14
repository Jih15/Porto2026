"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Project } from "./types";
import { ImageGallery } from "./ImageGallery";
// import type { Project } from "./types";
// import { ImageGallery } from "./ImageGallery";

interface Props {
  project: Project;
  onBack: () => void;
}

export default function ProjectDetail({ project, onBack }: Props) {
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!detailRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(detailRef.current, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, ease: "expo.out" });
      tl.fromTo("[data-detail='item']", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power3.out" }, "-=0.35");
      tl.fromTo("[data-detail='image']", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" }, "-=0.55");
    }, detailRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={detailRef}
      className="absolute inset-0 overflow-hidden"
      style={{ background: "#0a0a0a", zIndex: 10 }}
    >

      {/* ── MOBILE layout (< sm) ─────────────────────────────────── */}
      <div className="flex sm:hidden flex-col h-full overflow-y-auto scrollbar-neon">

        {/* Mobile sticky header */}
        <div
          className="sticky top-0 z-10 flex items-center gap-3 px-5 py-4"
          style={{ background: "rgba(10,10,10,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <button
            onClick={onBack}
            className="flex items-center justify-center shrink-0"
            style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer", color: "#fff",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="font-mono text-xs tracking-[0.25em] uppercase truncate" style={{ color: "#b8ff3f" }}>
              {project.category}
            </span>
            <p className="font-bold text-sm leading-tight truncate" style={{ color: "#fff", fontFamily: "var(--font-geist-sans)" }}>
              {project.title}
            </p>
          </div>
        </div>

        {/* Mobile image */}
        <div className="px-5 pt-5">
          <div
            data-detail="image"
            className="w-full rounded-2xl overflow-hidden"
            style={{ aspectRatio: "16/9", clipPath: "inset(0% 100% 0% 0%)" }}
          >
            {project.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.coverImage} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            ) : (
              <div
                className="w-full h-full relative"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div className="w-full h-full flex items-center justify-center" style={{ opacity: 0.3 }}>
                  <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
                    <rect x="2" y="5" width="24" height="18" rx="3" stroke="rgba(184,255,63,0.8)" strokeWidth="1" />
                    <circle cx="9" cy="11" r="2.5" stroke="rgba(184,255,63,0.8)" strokeWidth="1" />
                    <path d="M2 19L8 13L13 18L18 12L26 20" stroke="rgba(184,255,63,0.8)" strokeWidth="1" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile content */}
        <div className="flex flex-col gap-5 px-5 pt-6 pb-10">
          {/* Title + meta */}
          <div data-detail="item">
            <h2
              className="font-bold leading-tight mb-1"
              style={{ fontSize: "clamp(1.6rem, 6vw, 2.2rem)", color: "#fff", letterSpacing: "-0.03em", fontFamily: "var(--font-geist-sans)" }}
            >
              {project.title}
            </h2>
            <p className="font-mono text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
              {project.year} / {project.role}
            </p>
          </div>

          {/* Description */}
          <p data-detail="item" className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            {project.completeDesc}
          </p>

          {/* Tags */}
          <div data-detail="item" className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-3 py-1 rounded-full"
                style={{ border: "1px solid rgba(184,255,63,0.3)", color: "#b8ff3f", background: "rgba(184,255,63,0.05)", letterSpacing: "0.08em" }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Source */}
          <div data-detail="item">
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.2)" }}>
              Source
            </p>
            <a
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm break-all"
              style={{ color: "#b8ff3f", textDecoration: "none" }}
            >
              {project.source} →
            </a>
          </div>

          {/* Footer */}
          <p className="font-mono text-xs tracking-[0.25em] uppercase mt-4" style={{ color: "rgba(255,255,255,0.1)" }}>
            2026 Zaqaul - All Right Reserved
          </p>
        </div>
      </div>

      {/* ── DESKTOP layout (≥ sm) ────────────────────────────────── */}
      <div className="hidden sm:flex h-full overflow-hidden">

        {/* LEFT: project info sidebar */}
        <div
          className="flex flex-col shrink-0 px-8 md:px-12 py-10 overflow-y-auto scrollbar-neon"
          style={{ width: "clamp(260px, 32%, 400px)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Back button */}
          <button
            data-detail="item"
            onClick={onBack}
            className="group/back flex items-center gap-2 mb-10 font-mono text-xs tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", padding: 0, width: "fit-content" }}
          >
            <span className="transition-transform duration-200 group-hover/back:-translate-x-1" style={{ display: "flex" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="group-hover/back:text-[#b8ff3f] transition-colors duration-200">Back</span>
          </button>

          <span data-detail="item" className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: "#b8ff3f" }}>
            {project.category}
          </span>

          <h2
            data-detail="item"
            className="mt-3 font-bold leading-none"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "#fff", letterSpacing: "-0.03em", fontFamily: "var(--font-geist-sans)" }}
          >
            {project.title}
          </h2>

          <p data-detail="item" className="mt-3 font-mono text-xs tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
            {project.year} / {project.role}
          </p>

          <p data-detail="item" className="text-sm leading-relaxed my-4" style={{ color: "rgba(255,255,255,0.5)" }}>
            {project.completeDesc}
          </p>

          <div data-detail="item" className="mt-2 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-3 py-1 rounded-full"
                style={{ border: "1px solid rgba(184,255,63,0.3)", color: "#b8ff3f", background: "rgba(184,255,63,0.05)", letterSpacing: "0.08em" }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div data-detail="item" className="mt-8">
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-2" style={{ color: "rgba(255,255,255,0.2)" }}>
              Source
            </p>
            <a
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm break-all transition-opacity duration-200 hover:opacity-70"
              style={{ color: "#b8ff3f", textDecoration: "none" }}
            >
              {project.source}
            </a>
          </div>

          <div
            data-detail="item"
            className="mt-auto pt-10 font-mono text-xs tracking-[0.25em] uppercase"
            style={{ color: "rgba(255,255,255,0.12)" }}
          >
            2026 Zaqaul - All Right Reserved
          </div>
        </div>

        {/* RIGHT: image gallery */}
        <div className="flex-1 overflow-hidden flex items-center justify-center" style={{ minWidth: 0 }}>
          <ImageGallery project={project} />
        </div>
      </div>

    </div>
  );
}