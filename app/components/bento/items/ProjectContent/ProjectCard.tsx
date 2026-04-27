"use client";

// import type { Project } from "./types";
import { ImagePlaceholder } from "./ImageGallery";
import { Project } from "./types";

/* ── Card: List layout ──────────────────────────────────────────── */
export function CardList({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <div data-anim="card" className="group flex flex-col gap-3 cursor-pointer" onClick={onClick}>
      <div className="overflow-hidden rounded-xl">
        <div className="transition-transform duration-500 group-hover:scale-[1.03]" style={{ willChange: "transform" }}>
          <div className="rounded-xl overflow-hidden">
            {project.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.coverImage}
                alt={project.title}
                style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }}
              />
            ) : (
              <ImagePlaceholder aspectRatio="16/9" label="No preview" index={project.id} />
            )}
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

/* ── Card: Grid layout ──────────────────────────────────────────── */
export function CardGrid({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <div data-anim="card" className="group flex flex-col gap-3 cursor-pointer" onClick={onClick}>
      <div className="overflow-hidden rounded-xl">
        <div className="transition-transform duration-500 group-hover:scale-[1.03]" style={{ willChange: "transform" }}>
          <div className="rounded-xl overflow-hidden">
            {project.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.coverImage}
                alt={project.title}
                style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }}
              />
            ) : (
              <ImagePlaceholder aspectRatio="3/4" label="No preview" index={project.id} />
            )}
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