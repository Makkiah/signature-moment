"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { AdItem } from "@/lib/storage";

type Props = {
  items: AdItem[];
  intervalSec: number;
};

const bannerBarHeight = 110;          // whole bar height
const imageBoxHeight = bannerBarHeight - 26; // inner image box

export default function AdCarousel({ items, intervalSec }: Props) {
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(Math.max(1, Math.floor(intervalSec || 5)));

  const rotateRef = useRef<number | null>(null);
  const tickRef = useRef<number | null>(null);

  const safeInterval = Math.max(1, Math.floor(intervalSec || 5));

  // Rotate
  useEffect(() => {
    if (!items || items.length <= 1) return;
    if (rotateRef.current) window.clearInterval(rotateRef.current);
    rotateRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
      setTimeLeft(safeInterval);
    }, safeInterval * 1000);
    return () => { if (rotateRef.current) window.clearInterval(rotateRef.current); };
  }, [items, safeInterval]);

  // Countdown
  useEffect(() => {
    setTimeLeft(safeInterval);
    if (tickRef.current) window.clearInterval(tickRef.current);
    tickRef.current = window.setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => { if (tickRef.current) window.clearInterval(tickRef.current); };
  }, [safeInterval, index]);

  const current = items?.length ? items[index % items.length] : null;

  const content = current ? (
    <div style={{ position: "relative", width: "100%", height: imageBoxHeight }}>
      <Image
        src={current.src}
        alt="Advertisement banner"
        fill
        unoptimized
        sizes="100vw"
        style={{ objectFit: "contain" }}
      />
    </div>
  ) : (
    <span style={{ color: "#6b7280" }}>Your ad banner will appear here</span>
  );

  return (
    <div style={{
      position: "fixed",
      bottom: 0, left: 0, right: 0,
      height: bannerBarHeight,
      borderTop: "1px solid #e5e7eb",
      background: "#f9fafb",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 8, boxSizing: "border-box", zIndex: 10,
    }}>
      <div style={{
        position: "relative", width: "100%", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {current?.href ? (
          <a
            href={current.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}
          >
            {content}
          </a>
        ) : (
          content
        )}
        {items?.length > 1 && (
          <div style={{
            position: "absolute", right: 8, bottom: 8,
            background: "rgba(0,0,0,0.65)", color: "white",
            padding: "2px 8px", borderRadius: 9999, fontSize: 12,
          }}>
            Next in {timeLeft}s
          </div>
        )}
      </div>
    </div>
  );
}
