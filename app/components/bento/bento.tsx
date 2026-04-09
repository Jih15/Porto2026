"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { bentoItems } from "./bento.config";
import BentoCell       from "./BentoCell";
import ExpandedOverlay from "./ExpandedOverlay";
import { useBentoExpand } from "./useBentoExpand";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Bento section: scroll zoom-in + grid of expandable cards.
 * Tidak perlu diedit kecuali ingin mengubah animasi atau layout grid.
 * Untuk menambah/mengubah item → edit bento.config.tsx
 */
export default function Bento() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const gridWrapRef = useRef<HTMLDivElement>(null);

  const { expanded, open, close } = useBentoExpand();

  // ── Scroll animations ────────────────────────────────────────────────
  useEffect(() => {
    const section  = sectionRef.current;
    const gridWrap = gridWrapRef.current;
    if (!section || !gridWrap) return;

    // Grid zoom-in on scroll enter
    gsap.fromTo(gridWrap,
      { scale: 0.72, opacity: 0 },
      {
        scale: 1, opacity: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end:   "top 10%",
          scrub: 1.5,
        },
      },
    );

    // Stagger each cell
    const cells = gridWrap.querySelectorAll(".bento-cell");
    gsap.fromTo(cells,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
        },
      },
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center py-16 px-6"
      style={{ background: "#080808" }}
    >
      {/* Section label */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.4em] uppercase"
        style={{ color: "rgba(255,255,255,0.15)" }}
      >
        — Selected Work —
      </div>

      <div ref={gridWrapRef} className="w-full max-w-350 mx-auto">
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(9, 1fr)",
            gridTemplateRows:    "repeat(8, minmax(0, 1fr))",
            height:              "calc(100vh - 8rem)",
          }}
        >
          {bentoItems.map((item) => (
            <BentoCell key={item.id} item={item} onExpand={open} />
          ))}
        </div>
      </div>

      <ExpandedOverlay expanded={expanded} onClose={close} />
    </section>
  );
}