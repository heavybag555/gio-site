"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const THEME_VARS = [
  "--color-black",
  "--color-white",
  "--color-orange",
  "--color-blue",
  "--color-light-blue",
  "--color-tan",
];

function parseColor(input) {
  if (!input) return null;
  const value = String(input).trim().toLowerCase();
  if (!value || value === "transparent" || value === "none") return null;

  if (value.startsWith("#")) {
    let hex = value.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      hex = hex
        .split("")
        .map((channel) => channel + channel)
        .join("");
    }
    if (hex.length !== 6 && hex.length !== 8) return null;
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
    if ([r, g, b, a].some((channel) => Number.isNaN(channel))) return null;
    return { r, g, b, a };
  }

  const match = value.match(
    /^rgba?\(\s*([0-9.]+)\s*[,\s]\s*([0-9.]+)\s*[,\s]\s*([0-9.]+)\s*(?:[,/]\s*([0-9.]+%?)\s*)?\)$/
  );
  if (!match) return null;
  const alphaRaw = match[4];
  const a = alphaRaw
    ? alphaRaw.endsWith("%")
      ? parseFloat(alphaRaw) / 100
      : parseFloat(alphaRaw)
    : 1;
  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
    a,
  };
}

function readPalette() {
  const style = getComputedStyle(document.documentElement);
  const entries = [];
  for (const name of THEME_VARS) {
    const raw = style.getPropertyValue(name).trim();
    const parsed = parseColor(raw);
    if (!raw || !parsed || parsed.a < 0.996) continue;
    entries.push({ raw, parsed });
  }
  const fallback = style.getPropertyValue("--color-black").trim() || "#000";
  return { entries, fallback };
}

function themeMatch(parsed, palette) {
  for (const entry of palette.entries) {
    if (
      Math.abs(entry.parsed.r - parsed.r) < 1 &&
      Math.abs(entry.parsed.g - parsed.g) < 1 &&
      Math.abs(entry.parsed.b - parsed.b) < 1
    ) {
      return entry.raw;
    }
  }
  return null;
}

function toHex(parsed) {
  const channel = (value) =>
    Math.max(0, Math.min(255, Math.round(value)))
      .toString(16)
      .padStart(2, "0");
  return `#${channel(parsed.r)}${channel(parsed.g)}${channel(parsed.b)}`;
}

function backgroundOf(element, palette) {
  const parsed = parseColor(getComputedStyle(element).backgroundColor);
  if (!parsed || parsed.a < 0.996) return null;
  return themeMatch(parsed, palette) || toHex(parsed);
}

function sample(x, y, palette) {
  if (typeof document.elementsFromPoint !== "function") return palette.fallback;
  const stack = document.elementsFromPoint(x, y);
  for (const element of stack) {
    if (!(element instanceof Element)) continue;
    if (element === document.documentElement || element === document.body) continue;
    if (element.closest(".edge-top, .edge-bottom")) continue;

    let node = element;
    while (node && node !== document.body && node !== document.documentElement) {
      const color = backgroundOf(node, palette);
      if (color) return color;
      node = node.parentElement;
    }
  }
  return palette.fallback;
}

function samplePoints() {
  const viewport = window.visualViewport;
  const width = viewport?.width || window.innerWidth || 1;
  const height = viewport?.height || window.innerHeight || 1;
  const x = Math.min(Math.max(width / 2, 0), Math.max(width - 1, 0));
  const top = Math.min(1, Math.max(height - 1, 0));
  const bottom = Math.max(top, height - 2);
  return { x, top, bottom };
}

function themeMeta() {
  const existing = document.querySelector('meta[name="theme-color"]');
  if (existing) return { meta: existing, created: false };
  const meta = document.createElement("meta");
  meta.setAttribute("name", "theme-color");
  document.head.appendChild(meta);
  return { meta, created: true };
}

export default function SafariEdges() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const previousTop = root.style.getPropertyValue("--edge-top-background");
    const previousBottom = root.style.getPropertyValue("--edge-bottom-background");
    const { meta, created } = themeMeta();
    const previousMeta = created ? null : meta.getAttribute("content");

    let frame = 0;
    let alive = true;

    const apply = () => {
      frame = 0;
      if (!alive) return;

      const palette = readPalette();
      const points = samplePoints();
      const top = sample(points.x, points.top, palette);
      const bottom = sample(points.x, points.bottom, palette);

      if (root.style.getPropertyValue("--edge-top-background").trim() !== top) {
        root.style.setProperty("--edge-top-background", top);
      }
      if (root.style.getPropertyValue("--edge-bottom-background").trim() !== bottom) {
        root.style.setProperty("--edge-bottom-background", bottom);
      }
      if (meta.getAttribute("content") !== top) {
        meta.setAttribute("content", top);
      }
    };

    const schedule = () => {
      if (!alive || frame) return;
      frame = window.requestAnimationFrame(apply);
    };

    schedule();

    const onScroll = () => schedule();
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", schedule);
    window.addEventListener("orientationchange", schedule);
    window.addEventListener("popstate", schedule);

    const viewport = window.visualViewport;
    viewport?.addEventListener("resize", schedule);
    viewport?.addEventListener("scroll", schedule);

    return () => {
      alive = false;
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll, true);
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", schedule);
      window.removeEventListener("orientationchange", schedule);
      window.removeEventListener("popstate", schedule);
      viewport?.removeEventListener("resize", schedule);
      viewport?.removeEventListener("scroll", schedule);

      if (previousTop) root.style.setProperty("--edge-top-background", previousTop);
      else root.style.removeProperty("--edge-top-background");
      if (previousBottom) root.style.setProperty("--edge-bottom-background", previousBottom);
      else root.style.removeProperty("--edge-bottom-background");

      if (created) meta.remove();
      else if (previousMeta != null) meta.setAttribute("content", previousMeta);
      else meta.removeAttribute("content");
    };
  }, [pathname]);

  return (
    <>
      <div className="edge-top" aria-hidden="true" />
      <div className="edge-bottom" aria-hidden="true" />
    </>
  );
}
