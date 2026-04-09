"use client";

import { useRef, useCallback } from "react";
import type { BentoItemDef } from "../types";
import { socialLinks } from "./bento.config";

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

  const isContact = item.id === 2;

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
      {isContact ? (
        <ContactCard isMobile={isMobile} />
      ) : (
        <DefaultCard item={item} />
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

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