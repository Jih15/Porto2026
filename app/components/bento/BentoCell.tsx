"use client";

import { useRef, useCallback } from "react";
import type { BentoItemDef } from "../types";
import { socialLinks } from "./bento.config";

type Props = {
  item:     BentoItemDef;
  onExpand: (id: number, rect: DOMRect) => void;
};

/**
 * Satu card di bento grid.
 * Styling & hover logic ada di sini.
 * Konten yang di-expand ada di masing-masing file items/.
 */
export default function BentoCell({ item, onExpand }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(() => {
    if (!item.expandable || !ref.current) return;
    onExpand(item.id, ref.current.getBoundingClientRect());
  }, [item, onExpand]);

  // Card khusus contact: tampilkan social links
  const isContact = item.id === 2;

  return (
    <div
      ref={ref}
      className={`bento-cell relative overflow-hidden rounded-2xl ${item.expandable ? "cursor-pointer group" : ""}`}
      style={{
        background: item.bg,
        border: "1px solid rgba(255,255,255,0.06)",
        ...item.gridStyle,
      }}
      onClick={handleClick}
    >
      {isContact ? (
        <ContactCard />
      ) : (
        <DefaultCard item={item} />
      )}
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ContactCard() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-5">
      <div className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: "rgba(8,8,8,0.5)" }}>
        Connect
      </div>
      <div className="flex flex-col gap-2">
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

      {/* Hover highlight */}
      {item.expandable && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: "rgba(184,255,63,0.04)",
            border: "1px solid rgba(184,255,63,0.2)",
            borderRadius: "inherit",
          }}
        />
      )}
    </>
  );
}