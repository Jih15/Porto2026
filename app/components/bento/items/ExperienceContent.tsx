/**
 * Edit daftar pengalaman kerja di sini.
 */
const EXPERIENCES = [
  { year: "2024 – Now",  role: "Frontend Developer", company: "Company Name" },
  { year: "2022 – 2024", role: "UI/UX Designer",     company: "Company Name" },
  { year: "2021 – 2022", role: "Junior Developer",   company: "Company Name" },
];

export default function ExperienceContent() {
  return (
    <div className="p-12 max-w-2xl">
      <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "#b8ff3f" }}>
        Experience
      </span>

      <h2 className="mt-4 text-4xl font-bold leading-tight" style={{ color: "#fff", letterSpacing: "-0.03em" }}>
        Work History
      </h2>

      <div className="mt-8 flex flex-col gap-6">
        {EXPERIENCES.map((exp) => (
          <div key={exp.year} className="flex gap-6">
            <span className="font-mono text-xs shrink-0 pt-1" style={{ color: "#b8ff3f" }}>
              {exp.year}
            </span>
            <div>
              <div className="font-semibold" style={{ color: "#fff" }}>{exp.role}</div>
              <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{exp.company}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}