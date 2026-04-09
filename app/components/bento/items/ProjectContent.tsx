/**
 * Edit detail proyek pertama di sini.
 */
const PROJECT = {
  number:      "01",
  title:       "Project Title",
  description: "Deskripsi proyek pertama. Ceritakan tentang tantangan teknis, solusi kreatif, dan hasil yang dicapai.",
  tags:        ["Next.js", "TypeScript", "Figma"],
  url:         "#",
};

export default function ProjectContent() {
  return (
    <div className="p-12 max-w-2xl">
      <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "#b8ff3f" }}>
        Project {PROJECT.number}
      </span>

      <h2 className="mt-4 text-4xl font-bold leading-tight" style={{ color: "#fff", letterSpacing: "-0.03em" }}>
        {PROJECT.title}
      </h2>

      <p className="mt-6 text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
        {PROJECT.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {PROJECT.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 font-mono text-xs rounded-full"
            style={{ background: "rgba(184,255,63,0.08)", color: "#b8ff3f", border: "1px solid rgba(184,255,63,0.2)" }}
          >
            {tag}
          </span>
        ))}
      </div>

      {PROJECT.url !== "#" && (
        <a
          href={PROJECT.url}
          className="inline-block mt-8 font-mono text-sm tracking-widest uppercase"
          style={{ color: "#b8ff3f", textDecoration: "none", borderBottom: "1px solid #b8ff3f", paddingBottom: 4 }}
        >
          View Project →
        </a>
      )}
    </div>
  );
}