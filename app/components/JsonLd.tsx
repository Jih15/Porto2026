export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Zaqaul Fikri Aziz",
          url: "https://zaqaul-fikri-aziz.vercel.app",
          jobTitle: "Web & Mobile Developer",
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Politeknik Negeri Padang",
          },
          knowsAbout: ["Flutter", "Next.js", "Laravel", "FastAPI"],
          sameAs: [
            "https://github.com/Jih15",
            "https://linkedin.com/in/zaqaul-fikri-aziz",
          ],
        }),
      }}
    />
  );
}