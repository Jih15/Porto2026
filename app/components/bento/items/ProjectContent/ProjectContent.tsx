"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { Project, PROJECTS } from "./types";
import { IconGrid, IconList } from "@/public/icons";
import { CardGrid, CardList } from "./ProjectCard";
import ProjectDetail from "./ProjectDetail";

export default function ProjectContent() {
  const [layout, setLayout]               = useState<"list" | "grid">("list");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const rootRef                           = useRef<HTMLDivElement>(null);
  const gridRef                           = useRef<HTMLDivElement>(null);
  const sidebarBorderRef                  = useRef<HTMLDivElement>(null);
  const listViewRef                       = useRef<HTMLDivElement>(null);

  /* ── Entrance animation ── */
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

  /* ── Open project ── */
  const openProject = useCallback((project: Project) => {
    if (!listViewRef.current) { setActiveProject(project); return; }
    gsap.to(listViewRef.current, {
      opacity: 0, x: -24, duration: 0.28, ease: "power2.in",
      onComplete: () => setActiveProject(project),
    });
  }, []);

  /* ── Close project ── */
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

  /* ── Layout switch ── */
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
        {/* LEFT: sidebar (desktop only) */}
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
            <h2
              className="font-bold leading-none"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em", fontFamily: "var(--font-geist-sans)" }}
            >
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
              Here are some of the projects I&apos;ve worked on
            </p>
          </div>

          {/* Footer sidebar desktop */}
          <div
            data-anim="pr-desc"
            className="font-mono text-xs tracking-[0.25em] uppercase"
            style={{ color: "rgba(255,255,255,0.12)" }}
          >
            © 2026 Zaqaul · All Rights Reserved
          </div>
        </div>

        {/* RIGHT: cards area */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ minHeight: 0 }}>

          {/* Mobile header */}
          <div className="flex sm:hidden px-6 pt-16 pb-2">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs tracking-[0.4em] uppercase" style={{ color: "#b8ff3f" }}>Project</span>
              <h2
                className="font-bold leading-none"
                style={{ fontSize: "2rem", color: "#fff", letterSpacing: "-0.03em", fontFamily: "var(--font-geist-sans)" }}
              >
                Recent Project
              </h2>
            </div>
          </div>

          {/* Layout toggle */}
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

          {/* Cards grid */}
          <div className="flex-1 overflow-y-auto scrollbar-neon px-6 md:px-8 pb-12 pt-6" style={{ minHeight: 0 }}>
            {layout === "list" ? (
              <div
                ref={gridRef}
                className="grid gap-8 md:gap-10"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
              >
                {PROJECTS.map((p) => <CardList key={p.id} project={p} onClick={() => openProject(p)} />)}
              </div>
            ) : (
              <div
                ref={gridRef}
                className="grid gap-6 md:gap-8"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}
              >
                {PROJECTS.map((p) => <CardGrid key={p.id} project={p} onClick={() => openProject(p)} />)}
              </div>
            )}
          </div>
        </div>

        {/* Fade top overlay */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: 0,
            left: "clamp(220px, 28%, 320px)",
            right: 0,
            height: 56,
            background: "linear-gradient(to bottom, #0a0a0a, transparent)",
            zIndex: 2,
          }}
        />
      </div>

      {/* ══ DETAIL VIEW ════════════════════════════════════════════ */}
      {activeProject && (
        <ProjectDetail project={activeProject} onBack={closeProject} />
      )}
    </div>
  );
}