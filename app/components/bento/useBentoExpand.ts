"use client";

import { useState, useCallback } from "react";

export type ExpandState = {
  id:   number | null;
  rect: DOMRect | null;
};

/**
 * Hook yang mengatur state expand/close bento item.
 * Pisahkan dari UI agar mudah di-test atau diganti logiknya.
 */
export function useBentoExpand() {
  const [expanded, setExpanded] = useState<ExpandState>({ id: null, rect: null });

  const open = useCallback((id: number, rect: DOMRect) => {
    setExpanded({ id, rect });
  }, []);

  const close = useCallback(() => {
    setExpanded({ id: null, rect: null });
  }, []);

  return { expanded, open, close };
}