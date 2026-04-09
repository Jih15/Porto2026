import type { BentoItemDef } from "../types";
import AboutContent from "./items/AboutContent";
import ContactContent from "./items/ContactContent";
import ExperienceContent from "./items/ExperienceContent";
import FeaturedContent from "./items/FeaturedContent";
import ProjectContent from "./items/ProjectContent";
import TechContent from "./items/TechContent";

/**
 * ─────────────────────────────────────────────────────────────────────
 *  BENTO CONFIG
 *
 *  Tambah, hapus, atau atur ulang item di sini.
 *  Setiap item punya:
 *    id          → unik, bebas angka berapa saja
 *    label       → teks kecil di atas card (kategori)
 *    sublabel    → judul besar di card
 *    expandable  → true = bisa diklik expand fullscreen
 *    bg          → warna background card
 *    accentColor → warna aksen (label, hover border)
 *    expandContent → komponen yang tampil saat expand
 *    gridStyle   → posisi di CSS Grid (gridColumn & gridRow)
 *
 *  Grid layout: 9 kolom × 8 baris
 *  Contoh gridStyle:
 *    { gridColumn: "1 / span 2", gridRow: "1 / span 8" }
 *    → mulai kolom 1, lebar 2; mulai baris 1, tinggi 8
 * ─────────────────────────────────────────────────────────────────────
 */
export const bentoItems: BentoItemDef[] = [
  {
    id: 1,
    label:    "About",
    sublabel: "Me",
    expandable: true,
    bg:          "#111111",
    accentColor: "#b8ff3f",
    expandContent: <AboutContent />,
    gridStyle: { gridColumn: "1 / span 2", gridRow: "1 / span 8" },
  },
  {
    id: 2,
    label:    "Contact",
    sublabel: "Links",
    expandable: false,           
    bg:          "#b8ff3f",
    accentColor: "#080808",
    gridStyle: { gridColumn: "8 / span 2", gridRow: "1 / span 2" },
  },
  {
    id: 3,
    label:    "Tech",
    sublabel: "Stack",
    expandable: true,
    bg:          "#141414",
    accentColor: "#b8ff3f",
    expandContent: <TechContent />,
    gridStyle: { gridColumn: "8 / span 2", gridRow: "3 / span 6" },
  },
  {
    id: 4,
    label:    "Featured",
    sublabel: "Project",
    expandable: true,
    bg:          "#0d0d0d",
    accentColor: "#b8ff3f",
    expandContent: <FeaturedContent />,
    gridStyle: { gridColumn: "3 / span 5", gridRow: "1 / span 3" },
  },
  {
    id: 5,
    label:    "Project",
    sublabel: "All Project",
    expandable: true,
    bg:          "#131313",
    accentColor: "#b8ff3f",
    expandContent: <ProjectContent />,
    gridStyle: { gridColumn: "3 / span 3", gridRow: "4 / span 3" },
  },
  {
    id: 6,
    label:    "Experience",
    sublabel: "Work",
    expandable: true,
    bg:          "#0f0f0f",
    accentColor: "#b8ff3f",
    expandContent: <ExperienceContent />,
    gridStyle: { gridColumn: "6 / span 2", gridRow: "4 / span 3" },
  },
  {
    id: 7,
    label:    "Let's Work",
    sublabel: "Together",
    expandable: true,
    bg:          "#0d0d0d",
    accentColor: "#b8ff3f",
    expandContent: <ContactContent />,
    gridStyle: { gridColumn: "3 / span 5", gridRow: "7 / span 2" },
  },
];

/**
 * Social links untuk card Contact (id: 2).
 * Tambah atau hapus sesuai platform Anda.
 */
export const socialLinks = [
  { label: "GitHub",   href: "https://github.com/Jih15" },
  { label: "LinkedIn", href: "https://linkedin.com/in/zaqaul-fikri-aziz" },
  // { label: "Twitter",  href: "https://twitter.com/username" },
];