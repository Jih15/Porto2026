"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

/* ── Project data ─────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    category: "Mobile Project",
    title: "TAlign - Generate Project Title",
    year: "2024",
    role: "Fullstack Developer",
    desc: "An AI-powered application for generating thesis or project titles and classifying their difficulty levels.",
    completeDesc : "An AI-powered application for generating thesis or project titles and classifying their difficulty levels. The app uses the Gemini API to create relevant and creative titles based on user input, and categorizes them into Easy, Medium, or Hard difficulty levels. Built with Flutter for a smooth mobile experience and FastAPI for efficient backend processing.",
    tags: ["Flutter","FastAPI", "ML" , "Gemini API"],
    source: "https://github.com/Jih15/TAlign",
    image: null,
  },
  {
    id: 2,
    category: "Web Project",
    title: "Web POS Diata",
    year: "2025",
    role: "Web Programmer",
    desc: "a web-based point-of-sale (POS) application used to manage a store.",
    completeDesc: "a web-based point-of-sale (POS) application used to manage a store. Built with Laravel and MySQL for a robust and scalable solution.",
    tags: ["Laravel", "MySQL"],
    source: "https://preview.diatakasir.com/",
    image: null,
  },
  {
    id: 3,
    category: "Web Project",
    title: "Ahra Engineer Website",
    year: "2025",
    role: "Frontend Developer",
    desc: "The company profile website was built using Bootstrap, Blade, and Bootstrap CSS with a responsive design.",
    completeDesc: "The company profile website was built using Bootstrap, Blade, and Bootstrap CSS with a responsive design. ",
    tags: ["Laravel", "Bootstrap", "Blade"],
    source: "https://ahraengineer.com/",
    image: null,
  },
  // {
  //   id: 4,
  //   category: "Web Project",
  //   title: "Portfolio Website",
  //   year: "2026",
  //   role: "Fullstack Developer",
  //   desc: "Personal portfolio dengan animasi GSAP ScrollTrigger, bento grid layout, dan arsitektur modular Next.js yang mudah di-maintain.",
  //   tags: ["Next.js", "GSAP", "TypeScript", "Figma"],
  //   source: "https://github.com/Jih15",
  //   image: null,
  // },
  // {
  //   id: 5,
  //   category: "ML Project",
  //   title: "Drug Matching API",
  //   year: "2024",
  //   role: "Backend Developer",
  //   desc: "REST API berbasis FastAPI untuk fuzzy matching data transaksi obat menggunakan algoritma NLP, digunakan untuk data entry automation.",
  //   tags: ["FastAPI", "Python", "ML", "NLP"],
  //   source: "https://github.com/Jih15",
  //   image: null,
  // },
  // {
  //   id: 6,
  //   category: "Mobile Project",
  //   title: "E-Commerce App",
  //   year: "2025",
  //   role: "Mobile Developer",
  //   desc: "Aplikasi belanja mobile dengan fitur cart, checkout, payment gateway integration, dan push notification menggunakan Flutter dan Firebase.",
  //   tags: ["Flutter", "Firebase", "Dart"],
  //   source: "https://github.com/Jih15",
  //   image: null,
  // },
];

type Project = (typeof PROJECTS)[0];

/* ── Icons ────────────────────────────────────────────────────── */
function IconList() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="2"   width="14" height="3" rx="1" fill="currentColor" opacity="0.85" />
      <rect x="1" y="6.5" width="14" height="3" rx="1" fill="currentColor" opacity="0.85" />
      <rect x="1" y="11"  width="14" height="3" rx="1" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

function IconGrid() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.85" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.85" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.85" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

/* ── Image placeholder ────────────────────────────────────────── */
function ImagePlaceholder({ aspectRatio = "16/9" }: { aspectRatio?: string }) {
  return (
    <div
      className="w-full h-full"
      style={{
        aspectRatio,
        background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 50%, rgba(184,255,63,0.025) 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "inherit",
      }}
    >
      <div
        className="w-full h-full"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          borderRadius: "inherit",
        }}
      />
    </div>
  );
}

/* ── Card: List layout ────────────────────────────────────────── */
function CardList({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <div
      data-anim="card"
      className="group flex flex-col gap-3 cursor-pointer"
      onClick={onClick}
    >
      <div className="overflow-hidden rounded-xl">
        <div className="transition-transform duration-500 group-hover:scale-[1.03]" style={{ willChange: "transform" }}>
          <div className="rounded-xl overflow-hidden">
            <ImagePlaceholder aspectRatio="16/9" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 px-1">
        <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "#b8ff3f" }}>
          {project.category}
        </span>
        <h3
          className="font-bold leading-tight transition-colors duration-200 group-hover:opacity-70"
          style={{ color: "#fff", fontSize: "clamp(1rem, 1.4vw, 1.25rem)", letterSpacing: "-0.02em", fontFamily: "var(--font-geist-sans)" }}
        >
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed line-clamp-2" style={{ color: "rgba(255,255,255,0.4)" }}>
          {project.desc}
        </p>
      </div>
    </div>
  );
}

/* ── Card: Grid layout ────────────────────────────────────────── */
function CardGrid({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <div
      data-anim="card"
      className="group flex flex-col gap-3 cursor-pointer"
      onClick={onClick}
    >
      <div className="overflow-hidden rounded-xl">
        <div className="transition-transform duration-500 group-hover:scale-[1.03]" style={{ willChange: "transform" }}>
          <div className="rounded-xl overflow-hidden">
            <ImagePlaceholder aspectRatio="3/4" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-0.5">
        <h3
          className="font-bold leading-tight transition-opacity duration-200 group-hover:opacity-70"
          style={{ color: "#fff", fontSize: "clamp(0.95rem, 1.3vw, 1.2rem)", letterSpacing: "-0.02em", fontFamily: "var(--font-geist-sans)" }}
        >
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-2.5 py-0.5 rounded-full"
              style={{ border: "1px solid rgba(184,255,63,0.35)", color: "#b8ff3f", background: "rgba(184,255,63,0.04)", letterSpacing: "0.08em" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Project Detail View ──────────────────────────────────────── */
function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!detailRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Whole panel slides in from right
      tl.fromTo(
        detailRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.55, ease: "expo.out" },
      );

      // Left content items stagger in
      tl.fromTo(
        "[data-detail='item']",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power3.out" },
        "-=0.35",
      );

      // Image: curtain wipe from left
      tl.fromTo(
        "[data-detail='image']",
        { clipPath: "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" },
        "-=0.55",
      );
    }, detailRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={detailRef}
      className="absolute inset-0 flex overflow-hidden"
      style={{ background: "#0a0a0a", zIndex: 10 }}
    >
      {/* LEFT: project info */}
      <div
        className="flex flex-col shrink-0 px-8 md:px-12 py-10 overflow-y-auto scrollbar-neon"
        style={{
          width: "clamp(280px, 32%, 400px)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Back button */}
        <button
          data-detail="item"
          onClick={onBack}
          className="group/back flex items-center gap-2 mb-10 font-mono text-xs tracking-widest uppercase transition-colors duration-200"
          style={{ color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", padding: 0, width: "fit-content" }}
        >
          <span
            className="transition-transform duration-200 group-hover/back:-translate-x-1"
            style={{ display: "flex" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="group-hover/back:text-[#b8ff3f] transition-colors duration-200">Back</span>
        </button>

        {/* Category */}
        <span
          data-detail="item"
          className="font-mono text-xs tracking-[0.35em] uppercase"
          style={{ color: "#b8ff3f" }}
        >
          {project.category}
        </span>

        {/* Title */}
        <h2
          data-detail="item"
          className="mt-3 font-bold leading-none"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            color: "#fff",
            letterSpacing: "-0.03em",
            fontFamily: "var(--font-geist-sans)",
          }}
        >
          {project.title}
        </h2>

        {/* Year / Role */}
        <p
          data-detail="item"
          className="mt-3 font-mono text-xs tracking-widest"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          {project.year} / {project.role}
        </p>

        {/* Divider */}
        {/* <div
          data-detail="item"
          className="my-5"
          style={{ height: 1, background: "rgba(255,255,255,0.06)" }}
        /> */}

        {/* Description */}
        <p
          data-detail="item"
          className="text-sm leading-relaxed my-4"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {project.completeDesc}
        </p>

        {/* Tags */}
        <div data-detail="item" className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-3 py-1 rounded-full"
              style={{
                border: "1px solid rgba(184,255,63,0.3)",
                color: "#b8ff3f",
                background: "rgba(184,255,63,0.05)",
                letterSpacing: "0.08em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Source */}
        <div data-detail="item" className="mt-8">
          <p
            className="font-mono text-xs tracking-[0.25em] uppercase mb-2"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
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

        {/* Footer */}
        <div
          data-detail="item"
          className="mt-auto pt-10 font-mono text-xs tracking-[0.25em] uppercase"
          style={{ color: "rgba(255,255,255,0.12)" }}
        >
          2026 Zaqaul - All Right Reserved
        </div>
      </div>

      {/* RIGHT: image */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-14" style={{ minWidth: 0 }}>
        <div
          data-detail="image"
          className="w-full rounded-2xl overflow-hidden"
          style={{
            maxWidth: 760,
            aspectRatio: "16/10",
            clipPath: "inset(0% 100% 0% 0%)",
          }}
        >
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <ImagePlaceholder aspectRatio="16/10" />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Root ─────────────────────────────────────────────────────── */
export default function ProjectContent() {
  const [layout, setLayout]               = useState<"list" | "grid">("list");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const rootRef                           = useRef<HTMLDivElement>(null);
  const gridRef                           = useRef<HTMLDivElement>(null);
  const sidebarBorderRef                  = useRef<HTMLDivElement>(null);
  const listViewRef                       = useRef<HTMLDivElement>(null);

  /* ── Entrance ───────────────────────────────────────────────── */
  useEffect(() => {
    const D = 0.68;
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: D });

      tl.fromTo(sidebarBorderRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 0.9, ease: "expo.out" },
      );
      tl.fromTo("[data-anim='pr-label']",
        { x: -28, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.55, ease: "power4.out" },
        "-=0.65",
      );
      tl.fromTo("[data-anim='pr-heading']",
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.85, stagger: 0.12, ease: "power4.out" },
        "-=0.3",
      );
      tl.fromTo("[data-anim='pr-desc']",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" },
        "-=0.45",
      );
      tl.fromTo("[data-anim='pr-toggle']",
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "back.out(2.2)" },
        "-=0.5",
      );
      tl.fromTo("[data-anim='card']",
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.07, ease: "power3.out" },
        "-=0.3",
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  /* ── Open project ───────────────────────────────────────────── */
  const openProject = useCallback((project: Project) => {
    if (!listViewRef.current) { setActiveProject(project); return; }
    gsap.to(listViewRef.current, {
      opacity: 0, x: -24, duration: 0.28, ease: "power2.in",
      onComplete: () => setActiveProject(project),
    });
  }, []);

  /* ── Close project ──────────────────────────────────────────── */
  const closeProject = useCallback(() => {
    setActiveProject(null);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (!listViewRef.current) return;
      gsap.fromTo(listViewRef.current,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.38, ease: "power3.out" },
      );
    }));
  }, []);

  /* ── Layout switch ──────────────────────────────────────────── */
  const handleLayoutSwitch = useCallback((next: "list" | "grid") => {
    if (next === layout || !gridRef.current) return;
    gsap.to(gridRef.current, {
      opacity: 0, scale: 0.97, duration: 0.2, ease: "power2.in",
      onComplete: () => {
        setLayout(next);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          if (!gridRef.current) return;
          gsap.fromTo(gridRef.current, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" });
          const cards = gridRef.current.querySelectorAll("[data-anim='card']");
          gsap.fromTo(cards, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" });
        }));
      },
    });
  }, [layout]);

  return (
    <div
      ref={rootRef}
      className="relative w-full flex overflow-hidden"
      style={{ background: "#0a0a0a", minHeight: "100vh", height: "100%" }}
    >

      {/* ══ LIST VIEW ══════════════════════════════════════════════ */}
      <div
        ref={listViewRef}
        className="absolute inset-0 flex"
        style={{ pointerEvents: activeProject ? "none" : "auto" }}
      >
        {/* LEFT: sidebar */}
        <div
          className="hidden sm:flex flex-col justify-between shrink-0 px-8 md:px-12 py-12 relative"
          style={{ width: "clamp(220px, 28%, 360px)" }}
        >
          <div
            ref={sidebarBorderRef}
            className="absolute top-0 right-0 bottom-0"
            style={{ width: 1, background: "rgba(255,255,255,0.06)", transformOrigin: "top center" }}
          />

          <div className="flex flex-col gap-6 pt-12">
            <span
              data-anim="pr-label"
              className="font-mono text-xs tracking-[0.4em] uppercase"
              style={{ color: "#b8ff3f" }}
            >
              Project
            </span>

            <h2 className="font-bold leading-none" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em", fontFamily: "var(--font-geist-sans)" }}>
              {["Recent", "Project"].map((line, i) => (
                <span key={i} style={{ display: "block", overflow: "hidden", lineHeight: "1.08" }}>
                  <span data-anim="pr-heading" style={{ display: "block", color: "#fff" }}>{line}</span>
                </span>
              ))}
            </h2>

            <p
              data-anim="pr-desc"
              className="text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.35)", maxWidth: 240 }}
            >
              Here are some of the projects I’ve worked on
            </p>
          </div>

          <div data-anim="pr-desc" className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: "rgba(255,255,255,0.12)" }}>
            2026 Zaqaul - All Right Reserved
          </div>
        </div>

        {/* RIGHT: cards */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ minHeight: 0 }}>

          {/* Mobile header */}
          <div className="flex sm:hidden px-6 pt-16 pb-2">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: "#b8ff3f" }}>Project</span>
              <h2 className="font-bold leading-none" style={{ fontSize: "2rem", color: "#fff", letterSpacing: "-0.03em", fontFamily: "var(--font-geist-sans)" }}>
                Recent Project
              </h2>
            </div>
          </div>

          {/* Toggle */}
          <div data-anim="pr-toggle" className="flex justify-end px-6 md:px-8 pt-6 md:pt-16 shrink-0">
            <div
              className="flex items-center gap-1 p-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {([["list", IconList], ["grid", IconGrid]] as const).map(([key, Icon]) => (
                <button
                  key={key}
                  onClick={() => handleLayoutSwitch(key)}
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 32, height: 32,
                    background: layout === key ? "#b8ff3f" : "transparent",
                    color: layout === key ? "#080808" : "rgba(255,255,255,0.4)",
                    border: "none", cursor: "pointer",
                    transition: "background 0.25s ease, color 0.25s ease",
                  }}
                >
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto scrollbar-neon px-6 md:px-8 pb-12 pt-6" style={{ minHeight: 0 }}>
            {layout === "list" ? (
              <div ref={gridRef} className="grid gap-8 md:gap-10" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
                {PROJECTS.map((p) => <CardList key={p.id} project={p} onClick={() => openProject(p)} />)}
              </div>
            ) : (
              <div ref={gridRef} className="grid gap-6 md:gap-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
                {PROJECTS.map((p) => <CardGrid key={p.id} project={p} onClick={() => openProject(p)} />)}
              </div>
            )}
          </div>
        </div>

        {/* Fade top */}
        <div
          className="absolute pointer-events-none"
          style={{ top: 0, left: "clamp(220px, 28%, 320px)", right: 0, height: 56, background: "linear-gradient(to bottom, #0a0a0a, transparent)", zIndex: 2 }}
        />
      </div>

      {/* ══ DETAIL VIEW ════════════════════════════════════════════ */}
      {activeProject && (
        <ProjectDetail project={activeProject} onBack={closeProject} />
      )}
    </div>
  );
}