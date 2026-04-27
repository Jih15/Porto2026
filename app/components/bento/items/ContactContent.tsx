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
        Interested in collaborating? I’m always open to new projects, creative ideas, or opportunities to be part of your vision.
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