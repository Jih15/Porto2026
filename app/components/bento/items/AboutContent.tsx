
export default function AboutContent() {
  return (
    <div className="p-12 max-w-2xl">
      <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "#b8ff3f" }}>
        About Me
      </span>

      <h2 className="mt-4 text-5xl font-bold leading-tight" style={{ color: "#fff", letterSpacing: "-0.03em" }}>
        Crafting digital
        <br />experiences
      </h2>

      <p className="mt-6 text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
        Saya adalah seorang full-stack developer dan UI designer yang berfokus
        pada membangun produk digital yang estetik, fungsional, dan memberikan
        pengalaman pengguna yang luar biasa.
      </p>

      <p className="mt-4 text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
        Dengan passion di intersection antara desain dan teknologi, setiap
        project saya dekati dengan perhatian penuh pada detail dan inovasi.
      </p>
    </div>
  );
}