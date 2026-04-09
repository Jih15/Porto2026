import type { ReactNode, CSSProperties } from "react";

export type BentoItemDef = {
  id: number;
  /** Label kecil di atas (kategori) */
  label: string;
  /** Judul besar di card */
  sublabel?: string;
  /** Apakah card bisa di-expand fullscreen */
  expandable: boolean;
  /** Warna background card */
  bg?: string;
  /** Warna aksen (label, border hover, dsb.) */
  accentColor?: string;
  /** Konten saat card di-expand */
  expandContent?: ReactNode;
  /** Override style grid (gridColumn, gridRow) */
  gridStyle: CSSProperties;
};

export type CoverConfig = {
  /** Label kecil di atas nama */
  tagline: string;
  /** Nama depan */
  firstName: string;
  /** Nama belakang (dirender dengan warna aksen) */
  lastName: string;
  /** Role/subtitle */
  role: string;
  /** Teks pojok kiri atas */
  siteLabel: string;
  /** Teks pojok kanan atas */
  year: string;
  /** Teks pojok kiri bawah */
  discipline: string;
};