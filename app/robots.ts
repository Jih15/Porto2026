import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://zaqaul-fikri-aziz.vercel.app/sitemap.xml",
  };
}