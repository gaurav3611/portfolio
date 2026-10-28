import { ImageResponse } from "next/og";
import { site } from "@/lib/data";

export const alt = `${site.name} — manga-style developer portfolio cover`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const RAYS = Array.from({ length: 28 }, (_, i) => (i / 28) * 360);

/** A21: social share card. */
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f3f0e8", border: "6px solid #0b0b0b", position: "relative", overflow: "hidden" }}>
        <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", left: 0, top: 0 }}>
          {RAYS.map((a) => {
            const r = (a * Math.PI) / 180;
            return <line key={a} x1={950 + Math.cos(r) * 140} y1={315 + Math.sin(r) * 140} x2={950 + Math.cos(r) * 900} y2={315 + Math.sin(r) * 900} stroke="#0b0b0b" strokeWidth={a % 3 ? 1.5 : 4} />;
          })}
          <circle cx="950" cy="315" r="26" fill="#0b0b0b" stroke="#f3f0e8" strokeWidth="5" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 64px", gap: 18, position: "relative" }}>
          <div style={{ display: "flex", background: "#0b0b0b", color: "#f3f0e8", fontSize: 26, padding: "6px 14px", letterSpacing: 4, width: 520 }}>CHAPTER 00 — THE DEVELOPER</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 112, fontWeight: 900, lineHeight: 0.95, color: "#0b0b0b", background: "#f3f0e8", padding: "8px 8px 8px 0" }}>
            <span>GAURAV NITESH</span>
            <span>GANDHI</span>
          </div>
          <div style={{ display: "flex", fontSize: 34, border: "5px solid #0b0b0b", background: "#f3f0e8", padding: "10px 18px", width: 760 }}>
            I build systems. I turn ideas into software.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
