import type { ReactNode, CSSProperties } from "react";

export type BentoItemDef = {
  id: number;
  label: string;
  sublabel?: string;
  expandable: boolean;
  bg?: string;
  accentColor?: string;
  expandContent?: ReactNode;
  gridStyle: CSSProperties;
  /** Tinggi card di mobile (default "180px") */
  mobileHeight?: string;
};

export type CoverConfig = {
  tagline: string;
  firstName: string;
  lastName: string;
  role: string;
  siteLabel: string;
  year: string;
  discipline: string;
};