"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AdCarousel from "@/components/AdCarousel";
import { LS_KEYS, loadAdItems, loadNumber, loadString } from "@/lib/storage";
import { appStyles, headerStyles, linkBtn, container, sectionCard } from "@/styles/ui";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [signatures, setSignatures] = useState<number>(0);
  const [items, setItems] = useState(() => [] as ReturnType<typeof loadAdItems>);
  const [intervalSec, setIntervalSec] = useState<number>(5);
  const [about, setAbout] = useState<string>("");

  useEffect(() => {
    setSignatures(loadNumber(LS_KEYS.signatures, 0));
    setItems(loadAdItems());
    setIntervalSec(loadNumber(LS_KEYS.adIntervalSec, 5));
    setAbout(
      loadString(
        LS_KEYS.aboutText,
        "This page shows the current signature count. The advertisement banner area is fixed to the bottom of the screen and cycles through images added on the Admin page."
      )
    );
    setMounted(true);
  }, []);

  return (
    <div style={appStyles}>
      <header style={headerStyles}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: 700 }}>Petition App</span>
          <span style={{ color: "#9ca3af" }}>|</span>
          <span style={{ color: "#6b7280", fontSize: 14 }}>Next.js + TypeScript</span>
        </div>
        <nav style={{ display: "flex", gap: 8 }}>
          <Link href="/" style={linkBtn}>Home</Link>
          <Link href="/admin" style={linkBtn}>Admin</Link>
        </nav>
      </header>

      <main style={container}>
        <div style={sectionCard}>
          <h1 style={{ margin: 0, fontSize: 28 }}>Number of Signatures</h1>
          <p style={{ fontSize: 56, margin: "10px 0 0", fontWeight: 700 }}>
            {mounted ? signatures.toLocaleString("en-US") : "…"}
          </p>
        </div>

        <div style={sectionCard}>
          <h2 style={{ marginTop: 0 }}>About</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {mounted ? about : " "}
          </p>
        </div>
      </main>

      <AdCarousel items={mounted ? items : []} intervalSec={mounted ? intervalSec : 5} />
      <footer style={{ height: 12 }} />
    </div>
  );
}
