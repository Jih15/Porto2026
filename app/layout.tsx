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
  title: "Zaqaul Fikri Aziz — Web & Mobile Developer",
  description: "Portfolio of Zaqaul Fikri Aziz",
  metadataBase: new URL("https://zaqaul-fikri-aziz.vercel.app"),
  keywords: ["Flutter developer", "Next.js developer", "mobile developer", "web developer", "Padang", "portfolio", "Laravel", "FastAPI"],
  authors: [{ name: "Zaqaul Fikri Aziz" }],
  alternates: {
    canonical: "https://zaqaul-fikri-aziz.vercel.app",
  },
  openGraph: {
    title: "Zaqaul Fikri Aziz — Web & Mobile Developer",
    description: "D4 Software Engineering graduate specializing in Flutter, Next.js, and Laravel.",
    url: "https://zaqaul-fikri-aziz.vercel.app",
    siteName: "Zaqaul Fikri Aziz",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaqaul Fikri Aziz — Web & Mobile Developer",
    images: ["/og-image.png"],
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
