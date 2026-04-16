"use client";

import { useRef, useCallback } from "react";
import Image from "next/image";
import images from "@/public/images";
import type { BentoItemDef } from "../types";
import { socialLinks } from "./bento.config";
import TechStackCard from "./techStackCard";
import CVCard from "./cvcard";


type Props = {
  item:     BentoItemDef;
  onExpand: (id: number, rect: DOMRect) => void;
  isMobile: boolean;
};

export default function BentoCell({ item, onExpand, isMobile }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    if (!item.expandable || !ref.current) return;
    onExpand(item.id, ref.current.getBoundingClientRect());
  }, [item, onExpand]);

  const mobileStyle = {
    height:     item.mobileHeight ?? "180px",
    background: item.bg,
    border:     "1px solid rgba(255,255,255,0.06)",
  };

  const desktopStyle = {
    background: item.bg,
    border:     "1px solid rgba(255,255,255,0.06)",
    ...item.gridStyle,
  };

  return (
    <div
      ref={ref}
      className={`bento-cell relative overflow-hidden rounded-2xl ${item.expandable ? "cursor-pointer group" : ""}`}
      style={isMobile ? mobileStyle : desktopStyle}
      onClick={handleClick}
    >
      {/* ── Special: About photo card ── */}
      {item.id === 1 && <AboutCard item={item} />}

      {/* ── Special: Connect card ── */}
      {item.id === 3 && <ContactCard isMobile={isMobile} />}

      {/* ── Special: TechStack interactive card ── */}
      {item.id === 6 && <TechStackCard />}

      {/* ── Special: CV Download card ── */}
      {item.id === 8 && <CVCard />}

      {/* ── Default card ── */}
      {item.id !== 1 && item.id !== 3 && item.id !== 6 && item.id !== 8 && (
        <DefaultCard item={item} />
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function AboutCard({ item }: { item: BentoItemDef }) {
  return (
    <>
      {/* Photo — fills the card */}
      <div className="absolute inset-0">
        <Image
          src={images.img1}
          alt="Zaqaul Fikri Aziz"
          fill
          className="object-cover object-top"
          style={{ filter: "grayscale(100%)" }}
          sizes="(max-width: 768px) 100vw, 22vw"
        />
        {/* Dark overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,20,10,0.55) 0%, rgba(10,20,10,0.15) 40%, rgba(10,20,10,0.6) 100%)",
          }}
        />
      </div>

      {/* Labels */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 z-10">
        <div>
          <div
            className="font-mono text-xs tracking-[0.25em] uppercase"
            style={{ color: item.accentColor ?? "#b8ff3f" }}
          >
            {item.label}
          </div>
          <div
            className="font-bold text-2xl mt-0.5 leading-tight"
            style={{ color: "#fff", letterSpacing: "-0.02em", fontFamily: "var(--font-geist-sans)" }}
          >
            {item.sublabel}
          </div>
        </div>

        {/* Hover hint */}
        <div
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-xs tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Click to expand →
        </div>
      </div>

      {/* Hover border */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          border:       "1px solid rgba(184,255,63,0.25)",
          borderRadius: "inherit",
        }}
      />
    </>
  );
}

function ContactCard({ isMobile }: { isMobile: boolean }) {
  return (
    <div
      className={`absolute inset-0 flex ${
        isMobile ? "flex-row items-center justify-between" : "flex-col justify-between"
      } p-5`}
    >
      <div
        className="font-mono text-xs tracking-[0.25em] uppercase"
        style={{ color: "rgba(8,8,8,0.5)" }}
      >
        Connect
      </div>
      <div className={`flex ${isMobile ? "flex-row gap-6" : "flex-col gap-2"}`}>
        {socialLinks.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm font-bold"
            style={{ color: "#080808", textDecoration: "none" }}
            onClick={(e) => e.stopPropagation()}
          >
            {s.label} →
          </a>
        ))}
      </div>
    </div>
  );
}

function DefaultCard({ item }: { item: BentoItemDef }) {
  return (
    <>
      <div className="absolute inset-0 flex flex-col justify-between p-5">
        <div>
          <div
            className="font-mono text-xs tracking-[0.25em] uppercase"
            style={{ color: item.accentColor ?? "rgba(255,255,255,0.3)" }}
          >
            {item.label}
          </div>
          {item.sublabel && (
            <div
              className="font-bold text-2xl mt-1 leading-tight"
              style={{ color: "#fff", letterSpacing: "-0.02em", fontFamily: "var(--font-geist-sans)" }}
            >
              {item.sublabel}
            </div>
          )}
        </div>

        {item.expandable && (
          <div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-xs tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Click to expand →
          </div>
        )}
      </div>

      {item.expandable && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background:   "rgba(184,255,63,0.04)",
            border:       "1px solid rgba(184,255,63,0.2)",
            borderRadius: "inherit",
          }}
        />
      )}
    </>
  );
}