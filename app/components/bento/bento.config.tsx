import type { BentoItemDef } from "../types";
import AboutContent      from "./items/AboutContent";
import ContactContent    from "./items/ContactContent";
import ExperienceContent from "./items/ExperienceContent";
import FeaturedContent   from "./items/FeaturedContent";
import ProjectContent    from "./items/ProjectContent";
import TechContent       from "./items/TechContent";

export const bentoItems: BentoItemDef[] = [
  {
    id: 1,
    label:    "About",
    sublabel: "Me",
    expandable: true,
    bg:          "#111111",
    accentColor: "#b8ff3f",
    expandContent:  <AboutContent />,
    gridStyle:      { gridColumn: "1 / span 2", gridRow: "1 / span 8" },
    mobileHeight:   "240px",
  },
  {
    id: 2,
    label:    "Contact",
    sublabel: "Links",
    expandable: false,
    bg:          "#b8ff3f",
    accentColor: "#080808",
    gridStyle:    { gridColumn: "8 / span 2", gridRow: "1 / span 2" },
    mobileHeight: "120px",
  },
  {
    id: 3,
    label:    "Tech",
    sublabel: "Stack",
    expandable: false,
    bg:          "#141414",
    accentColor: "#b8ff3f",
    expandContent:  <TechContent />,
    gridStyle:      { gridColumn: "8 / span 2", gridRow: "3 / span 6" },
    mobileHeight:   "180px",
  },
  {
    id: 4,
    label:    "Featured",
    sublabel: "Project",
    expandable: true,
    bg:          "#0d0d0d",
    accentColor: "#b8ff3f",
    expandContent:  <FeaturedContent />,
    gridStyle:      { gridColumn: "3 / span 5", gridRow: "1 / span 3" },
    mobileHeight:   "200px",
  },
  {
    id: 5,
    label:    "Project",
    sublabel: "All Project",
    expandable: true,
    bg:          "#131313",
    accentColor: "#b8ff3f",
    expandContent:  <ProjectContent />,
    gridStyle:      { gridColumn: "3 / span 3", gridRow: "4 / span 3" },
    mobileHeight:   "180px",
  },
  {
    id: 6,
    label:    "Experience",
    sublabel: "Work",
    expandable: true,
    bg:          "#0f0f0f",
    accentColor: "#b8ff3f",
    expandContent:  <ExperienceContent />,
    gridStyle:      { gridColumn: "6 / span 2", gridRow: "4 / span 3" },
    mobileHeight:   "180px",
  },
  {
    id: 7,
    label:    "Let's Work",
    sublabel: "Together",
    expandable: true,
    bg:          "#0d0d0d",
    accentColor: "#b8ff3f",
    expandContent:  <ContactContent />,
    gridStyle:      { gridColumn: "3 / span 5", gridRow: "7 / span 2" },
    mobileHeight:   "160px",
  },
];

export const socialLinks = [
  { label: "GitHub",   href: "https://github.com/Jih15" },
  { label: "LinkedIn", href: "https://linkedin.com/in/zaqaul-fikri-aziz" },
];