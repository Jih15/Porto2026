/**
 * Edit list teknologi di sini.
 */
const TECHS = [
  "Next.js", "React", "TypeScript", "TailwindCSS",
  "Node.js", "PostgreSQL", "Prisma", "GSAP",
  "Figma", "Docker", "Git", "Supabase",
];

export default function TechContent() {
  return (
    <div className="p-12 max-w-2xl">
      <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "#b8ff3f" }}>
        Tech Stack
      </span>

      <h2 className="mt-4 text-5xl font-bold leading-tight" style={{ color: "#fff", letterSpacing: "-0.03em" }}>
        Tools &amp;
        <br />Technologies
      </h2>

      <div className="mt-8 grid grid-cols-2 gap-4">
        {TECHS.map((tech) => (
          <div key={tech} className="flex items-center gap-3 font-mono text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            <span style={{ color: "#b8ff3f" }}>—</span>
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}