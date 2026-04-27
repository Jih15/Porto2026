import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zaqaul Fikri Aziz — Web Developer | Mobile Developer | UI Design",
  description: "Portfolio of Zaqaul Fikri Aziz, a D4 Software Engineering graduate specializing in Flutter, Next.js, Laravel, and FastAPI development.",
  metadataBase: new URL("https://zaqaul-fikri-aziz.vercel.app"),
  keywords: ["Flutter developer", "Next.js developer", "mobile developer", "web developer", "Padang", "portfolio", "Laravel", "FastAPI"],
  authors: [{ name: "Zaqaul Fikri Aziz" }],
  alternates: {
    canonical: "https://zaqaul-fikri-aziz.vercel.app",
  },
  openGraph: {
    title: "Zaqaul Fikri Aziz — Web Developer | Mobile Developer | UI Design",
    description: "Portfolio of Zaqaul Fikri Aziz, a D4 Software Engineering graduate specializing in Flutter, Next.js, Laravel, and FastAPI development.",
    url: "https://zaqaul-fikri-aziz.vercel.app",
    siteName: "Zaqaul Fikri Aziz",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaqaul Fikri Aziz — Web Developer | Mobile Developer | UI Design",
    description: "Portfolio of Zaqaul Fikri Aziz, a D4 Software Engineering graduate specializing in Flutter, Next.js, Laravel, and FastAPI development.",
    images: ["/og-image.jpg"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd/>
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
