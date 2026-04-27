/**
 * Edit detail proyek unggulan di sini.
 */
const PROJECT = {
  title:       "Project Name\nGoes Here",
  description: "Deskripsi lengkap proyek unggulan Anda. Jelaskan masalah yang dipecahkan, teknologi yang digunakan, dan dampak yang dihasilkan.",
  liveUrl:     "#",
  githubUrl:   "#",
};

export default function FeaturedContent() {
  return (
    <div className="p-12 max-w-3xl">
      <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "#b8ff3f" }}>
        Featured Project
      </span>

      <h2 className="mt-4 text-5xl font-bold leading-tight" style={{ color: "#fff", letterSpacing: "-0.03em" }}>
        {PROJECT.title.split("\n").map((line, i) => (
          <span key={i}>{line}{i === 0 && <br />}</span>
        ))}
      </h2>

      <p className="mt-6 text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
        {PROJECT.description}
      </p>

      <div className="mt-8 flex gap-4">
        <a
          href={PROJECT.liveUrl}
          className="px-6 py-3 font-mono text-sm tracking-widest uppercase"
          style={{ background: "#b8ff3f", color: "#080808", borderRadius: 4, textDecoration: "none" }}
        >
          Live Demo
        </a>
        <a
          href={PROJECT.githubUrl}
          className="px-6 py-3 font-mono text-sm tracking-widest uppercase"
          style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: 4, textDecoration: "none" }}
        >
          GitHub
        </a>
      </div>
    </div>
  );
}