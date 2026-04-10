import images from "@/public/images";
import Image from "next/image";

export default function AboutContent() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ background: "#111", minHeight: "100vh", height: "100%" }}
    >

      {/* ── DESKTOP layout ── */}
      <div className="hidden md:block absolute inset-0">

        {/* Layer 0 — Text (kiri & kanan) */}
        <div
          className="absolute grid pt-32"
          style={{ gridTemplateColumns: "1fr 1fr 1fr", zIndex: 0 }}
        >
          {/* LEFT: label + name */}
          <div className="flex flex-col justify-between p-12 pb-16">
            <span
              className="font-mono text-xs tracking-[0.35em] uppercase"
              style={{ color: "#b8ff3f" }}
            >
              About Me
            </span>
            <h2
              className="font-bold leading-none"
              style={{
                fontSize: "clamp(2.8rem, 4.5vw, 5rem)",
                color: "#fff",
                letterSpacing: "-0.03em",
                fontFamily: "var(--font-geist-sans)",
              }}
            >
              Zaqaul Fikri
              <br />
              Aziz
            </h2>
          </div>

          {/* CENTER: kosong — foto overlap di sini */}
          <div />

          {/* RIGHT: bio text */}
          <div
            className="flex flex-col justify-center p-12 pr-16"
            style={{ textAlign: "right" }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
              Saya adalah seorang full-stack developer dan UI designer yang
              berfokus pada membangun produk digital yang estetik, fungsional,
              dan memberikan pengalaman pengguna yang luar biasa.
            </p>
            <p className="text-sm leading-relaxed mt-5" style={{ color: "rgba(255,255,255,0.5)" }}>
              Dengan passion di intersection antara desain dan teknologi, setiap
              project saya dekati dengan perhatian penuh pada detail, ketelitian,
              dan inovasi yang menghasilkan solusi yang bermakna.
            </p>
          </div>
        </div>

        {/* Layer 1 — Photo (di atas text, bebas melebar) */}
        <div
          className="absolute inset-0 flex items-end justify-center pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <Image
            src={images.img1}
            alt="Zaqaul Fikri Aziz"
            width={640}
            height={900}
            style={{
              filter: "grayscale(100%)",
              display: "block",
              height: "100vh",
              width: "auto",
              maxWidth: "none",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
          {/* Fade bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
            style={{ background: "linear-gradient(to top, #111 0%, transparent 100%)" }}
          />
        </div>

      </div>

      {/* ── MOBILE layout ── */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* Label */}
        <div className="px-6 pt-16 pb-4">
          <span
            className="font-mono text-xs tracking-[0.35em] uppercase"
            style={{ color: "#b8ff3f" }}
          >
            About Me
          </span>
        </div>

        {/* Name */}
        <div className="px-6 pb-6">
          <h2
            className="font-bold leading-none"
            style={{
              fontSize: "clamp(2.5rem, 12vw, 4rem)",
              color: "#fff",
              letterSpacing: "-0.03em",
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            Zaqaul Fikri
            <br />
            Aziz
          </h2>
        </div>

        {/* Photo */}
        <div className="relative flex justify-center overflow-hidden" style={{ maxHeight: "50vh" }}>
          <Image
            src={images.img1}
            alt="Zaqaul Fikri Aziz"
            width={400}
            height={540}
            className="object-cover object-top w-full"
            style={{ filter: "grayscale(100%)", maxHeight: "50vh" }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
            style={{ background: "linear-gradient(to top, #111 0%, transparent 100%)" }}
          />
        </div>

        {/* Bio text */}
        <div className="px-6 pt-6 pb-16 flex flex-col gap-4">
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Saya adalah seorang full-stack developer dan UI designer yang
            berfokus pada membangun produk digital yang estetik, fungsional,
            dan memberikan pengalaman pengguna yang luar biasa.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Dengan passion di intersection antara desain dan teknologi, setiap
            project saya dekati dengan perhatian penuh pada detail dan inovasi.
          </p>
        </div>
      </div>

    </div>
  );
}