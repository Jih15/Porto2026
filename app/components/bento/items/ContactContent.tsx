/**
 * Edit kontak di sini.
 */
const CONTACT = {
  email: "zaqazaqaul@gmail.com",
};

export default function ContactContent() {
  return (
    <div className="p-12 max-w-2xl">
      <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "#b8ff3f" }}>
        Contact
      </span>

      <h2 className="mt-4 text-5xl font-bold leading-tight" style={{ color: "#fff", letterSpacing: "-0.03em" }}>
        Let&apos;s work
        <br />together
      </h2>

      <p className="mt-6 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
        Tertarik berkolaborasi? Saya selalu terbuka untuk proyek baru, ide
        kreatif, atau kesempatan untuk menjadi bagian dari visi Anda.
      </p>

      <a
        href={`mailto:${CONTACT.email}`}
        className="inline-block mt-8 font-mono text-sm tracking-widest "
        style={{
          color: "#b8ff3f",
          textDecoration: "none",
          borderBottom: "1px solid #b8ff3f",
          paddingBottom: 4,
        }}
      >
        {CONTACT.email} →
      </a>
    </div>
  );
}