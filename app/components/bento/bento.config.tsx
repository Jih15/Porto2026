import type { BentoItemDef } from "../types";
import AboutContent      from "./items/AboutContent";
import AcademicContent from "./items/AcademicContent";
import ContactContent    from "./items/ContactContent";
import ExperienceContent from "./items/ExperienceContent";
import ProjectContent    from "./items/ProjectContent/ProjectContent";

export const bentoItems: BentoItemDef[] = [
  // ── Col 1-2 ─────────────────────────────────────────
  {
    id: 1,
    label:      "About",
    sublabel:   "Me",
    expandable: true,
    bg:         "#111111",
    accentColor: "#b8ff3f",
    expandContent: <AboutContent />,
    gridStyle:  { gridColumn: "1 / span 2", gridRow: "1 / span 8" },
    mobileHeight: "320px",
  },

  // ── Col 3-7 top ──────────────────────────────────────
  {
    id: 2,
    label:      "Work",
    sublabel:   "Experience",
    expandable: true,
    bg:         "#111111",
    accentColor: "#b8ff3f",
    expandContent: <ExperienceContent />,
    gridStyle:  { gridColumn: "3 / span 5", gridRow: "1 / span 3" },
    mobileHeight: "200px",
  },

  // ── Col 8-9 top ──────────────────────────────────────
  {
    id: 3,
    label:      "Connect",
    sublabel:   "",
    expandable: false,
    bg:         "#b8ff3f",
    accentColor: "#080808",
    gridStyle:  { gridColumn: "8 / span 2", gridRow: "1 / span 2" },
    mobileHeight: "130px",
  },

  // ── Col 3-5 mid ──────────────────────────────────────
  {
    id: 4,
    label:      "Project",
    sublabel:   "My Project",
    expandable: true,
    bg:         "#111111",
    accentColor: "#b8ff3f",
    expandContent: <ProjectContent />,
    gridStyle:  { gridColumn: "3 / span 3", gridRow: "4 / span 3" },
    mobileHeight: "180px",
  },

  // ── Col 6-7 mid — CV di atas Academic ────────────────
  // CV Download: highlight kuning, row kecil di atas Academic
  {
    id: 8,
    label:      "Resume",
    sublabel:   "Download CV",
    expandable: false,
    bg:         "#b8ff3f",
    accentColor: "#080808",
    gridStyle:  { gridColumn: "6 / span 2", gridRow: "4 / span 2" },
    mobileHeight: "110px",
  },

  // ── Col 6-7 mid — Academic di bawah CV ───────────────
  {
    id: 5,
    label:      "Academic",
    sublabel:   "Education",
    expandable: true,
    bg:         "#111111",
    accentColor: "#b8ff3f",
    expandContent: <AcademicContent />,
    gridStyle:  { gridColumn: "6 / span 2", gridRow: "6 / span 3" },
    mobileHeight: "200px",
  },

  // ── Col 8-9 mid+bottom ───────────────────────────────
  // TechStack: special rendering via id=6 in BentoCell
  {
    id: 6,
    label:      "Tech",
    sublabel:   "Stack",
    expandable: false,
    bg:         "#111111",
    accentColor: "#b8ff3f",
    gridStyle:  { gridColumn: "8 / span 2", gridRow: "3 / span 6" },
    mobileHeight: "380px",
  },

  // ── Col 3-5 bottom ───────────────────────────────────
  {
    id: 7,
    label:      "Let's Work",
    sublabel:   "Together",
    expandable: true,
    bg:         "#111111",
    accentColor: "#b8ff3f",
    expandContent: <ContactContent />,
    gridStyle:  { gridColumn: "3 / span 3", gridRow: "7 / span 2" },
    mobileHeight: "160px",
  },
];

export const socialLinks = [
  { label: "GitHub",   href: "https://github.com/Jih15" },
  { label: "LinkedIn", href: "https://linkedin.com/in/zaqaul-fikri-aziz" },
];