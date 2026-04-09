"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { bentoItems } from "./bento.config";
import BentoCell       from "./BentoCell";
import ExpandedOverlay from "./ExpandedOverlay";
import { useBentoExpand } from "./useBentoExpand";
import { useIsMobile }    from "./useIsMobile";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Bento() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const gridWrapRef = useRef<HTMLDivElement>(null);

  const { expanded, open, close } = useBentoExpand();
  const isMobile = useIsMobile();

  useEffect(() => {
    const section  = sectionRef.current;
    const gridWrap = gridWrapRef.current;
    if (!section || !gridWrap) return;

    gsap.fromTo(gridWrap,
      { scale: isMobile ? 0.9 : 0.72, opacity: 0 },
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
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex items-start py-16 px-4 md:px-6 md:min-h-screen md:items-center"
      style={{ background: "#080808" }}
    >
      {/* Section label */}
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.4em] uppercase"
        style={{ color: "rgba(255,255,255,0.15)" }}
      >
        — Selected Work —
      </div>

      <div ref={gridWrapRef} className="w-full max-w-350 mx-auto mt-10 md:mt-0">
        {isMobile ? (
          /* ── MOBILE: single column stack ── */
          <div className="flex flex-col gap-3">
            {bentoItems.map((item) => (
              <BentoCell
                key={item.id}
                item={item}
                onExpand={open}
                isMobile={true}
              />
            ))}
          </div>
        ) : (
          /* ── DESKTOP: 9-col bento grid ── */
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: "repeat(9, 1fr)",
              gridTemplateRows:    "repeat(8, minmax(0, 1fr))",
              height:              "calc(100vh - 8rem)",
            }}
          >
            {bentoItems.map((item) => (
              <BentoCell
                key={item.id}
                item={item}
                onExpand={open}
                isMobile={false}
              />
            ))}
          </div>
        )}
      </div>

      <ExpandedOverlay expanded={expanded} onClose={close} />
    </section>
  );
}