import images from "@/public/images";
import Image from "next/image";

export default function AboutContent() {
  return (
    <div
      className="relative overflow-hidden flex flex-col pt-32"
      style={{ background: "#111", minHeight: "100vh" }}
    >
    
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2"
      style={{ width: "500px", zIndex: 1 }} 
    >
      <Image
        src={images.img1}
        alt="Zaqaul Fikri Aziz"
        width={520}   
        height={740}  
        className="object-cover object-top"
        style={{ filter: "grayscale(100%)", display: "block" }}
      />
    </div>

      {/* Bottom row */}
      <div
        className="relative grid items-end pb-16" 
        style={{
          gridTemplateColumns: "1fr 360px 1fr",
          zIndex: 2,
        }}
      >
        {/* Kiri */}
        <div className="px-16">
          <span
            className="font-mono text-xs tracking-[0.3em] uppercase block mb-4"
            style={{ color: "#b8ff3f" }}
          >
            About Me
          </span>
          <h2
            className="text-7xl font-bold leading-none"
            style={{ color: "#fff", letterSpacing: "-0.02em", zIndex: 3, position: "relative" }}
          >
            Zaqaul Fikri
            <br />
            <span style={{ color: "rgba(255,255,255,0.85)" }}>Aziz</span>
          </h2>
        </div>

        <div />

        {/* Kanan */}
        <div
          className="px-16 flex flex-col gap-4 text-right"
          style={{ minHeight: "160px" }} 
        >
          <p className="text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Saya adalah seorang full-stack developer dan UI designer yang
            berfokus pada membangun produk digital yang estetik, fungsional,
            dan memberikan pengalaman pengguna yang luar biasa.
          </p>
          <p className="text-[14px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
            Dengan passion di intersection antara desain dan teknologi, setiap
            project saya dekati dengan perhatian penuh pada detail dan inovasi.
          </p>
        </div>
      </div>
    </div>
  );
}