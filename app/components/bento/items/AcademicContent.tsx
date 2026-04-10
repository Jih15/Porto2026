const ACADEMICS = [
  {
    year: "2022 – Now",
    degree: "S1 Teknik Informatika",
    institution: "Universitas Nama",
    desc: "Fokus pada software engineering, algoritma, dan pengembangan aplikasi.",
  },
  {
    year: "2019 – 2022",
    degree: "SMA IPA",
    institution: "SMA Nama Sekolah",
    desc: "Jurusan Ilmu Pengetahuan Alam dengan prestasi bidang komputer.",
  },
];

export default function AcademicContent() {
  return (
    <div className="p-12 max-w-2xl">
      <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "#b8ff3f" }}>
        Academic
      </span>

      <h2 className="mt-4 text-4xl font-bold leading-tight" style={{ color: "#fff", letterSpacing: "-0.03em" }}>
        Education
      </h2>

      <div className="mt-8 flex flex-col gap-8">
        {ACADEMICS.map((ac) => (
          <div key={ac.year} className="flex gap-6">
            <span className="font-mono text-xs shrink-0 pt-1" style={{ color: "#b8ff3f" }}>
              {ac.year}
            </span>
            <div>
              <div className="font-semibold" style={{ color: "#fff" }}>{ac.degree}</div>
              <div className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{ac.institution}</div>
              <div className="text-sm mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>{ac.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}