import ProjectAsset from "@/public/assets/project/project_asset";

export interface Project {
  id: number;
  category: string;
  title: string;
  year: string;
  role: string;
  desc: string;
  completeDesc: string;
  tags: string[];
  source: string;
  coverImage: string | null;
  images: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    category: "Mobile Project",
    title: "TAlign - Generate Project Title",
    year: "2024",
    role: "Fullstack Developer",
    desc: "An AI-powered application for generating thesis or project titles and classifying their difficulty levels.",
    completeDesc:
      "An AI-powered application for generating thesis or project titles and classifying their difficulty levels. The app uses the Gemini API to create relevant and creative titles based on user input, and categorizes them into Easy, Medium, or Hard difficulty levels. Built with Flutter for a smooth mobile experience and FastAPI for efficient backend processing.",
    tags: ["Flutter", "FastAPI", "ML", "Gemini API"],
    source: "https://github.com/Jih15/TAlign",
    coverImage: ProjectAsset.taalign_com1,
    images: [
      ProjectAsset.taalign_com1,
      ProjectAsset.taalign_com2
    ],
  },
  {
    id: 2,
    category: "Web Project",
    title: "Web POS Diata",
    year: "2025",
    role: "Web Programmer",
    desc: "A web-based point-of-sale (POS) application used to manage a store.",
    completeDesc:
      "A web-based point-of-sale (POS) application used to manage a store. Built with Laravel and MySQL for a robust and scalable solution.",
    tags: ["Laravel", "MySQL"],
    source: "https://preview.diatakasir.com/",
    coverImage: ProjectAsset.diata1,
    images: [
      ProjectAsset.diata1,
      ProjectAsset.diata2
    ],
  },
  {
    id: 3,
    category: "Web Project",
    title: "Ahra Engineer Website",
    year: "2025",
    role: "Frontend Developer",
    desc: "The company profile website was built using Bootstrap, Blade, and Bootstrap CSS with a responsive design.",
    completeDesc:
      "The company profile website was built using Bootstrap, Blade, and Bootstrap CSS with a responsive design.",
    tags: ["Laravel", "Bootstrap", "Blade"],
    source: "https://ahraengineer.com/",
    coverImage: ProjectAsset.ahra1,
    images: [
      ProjectAsset.ahra1,
      ProjectAsset.ahra2,
      ProjectAsset.ahra3
    ],
  },
];