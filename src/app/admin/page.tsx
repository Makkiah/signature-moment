"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  appStyles, headerStyles, linkBtn, container, sectionCard,
  labelStyle, inputStyle, smallBtn, dangerBtn, pillBtn,
} from "@/styles/ui";
import {
  LS_KEYS, type AdItem, loadAdItems, loadNumber, loadString, save,
} from "@/lib/storage";

const saveBtnEnabled: React.CSSProperties = {
  border: "1px solid #111827",
  padding: "10px 16px",
  borderRadius: 8,
  background: "#111827",
  color: "white",
  cursor: "pointer",
  fontWeight: 600,
};

const saveBtnDisabled: React.CSSProperties = {
  border: "1px solid #d1d5db",
  padding: "10px 16px",
  borderRadius: 8,
  background: "#9ca3af",
  color: "white",
  cursor: "not-allowed",
  fontWeight: 600,
  opacity: 0.9,
};

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);

  const [signatures, setSignatures] = useState(0);
  const [intervalSec, setIntervalSec] = useState(5);
  const [items, setItems] = useState<AdItem[]>([]);
  const [about, setAbout] = useState("");

  const [newImage, setNewImage] = useState("");
  const [newLink, setNewLink] = useState("");

  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setSignatures(loadNumber(LS_KEYS.signatures, 0));
    setIntervalSec(loadNumber(LS_KEYS.adIntervalSec, 5));
    setItems(loadAdItems());
    setAbout(loadString(LS_KEYS.aboutText, ""));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setDirty(true);
  }, [mounted, signatures, intervalSec, items, about]);

  const previewCount = useMemo(() => items.length, [items]);

  const addItem = () => {
    const src = newImage.trim();
    const href = newLink.trim();
    if (!src) return alert("Please enter an image URL.");
    try {
      new URL(src);
      if (href) new URL(href);
      const next = [...items, { src, href }];
      setItems(next);
      setNewImage("");
      setNewLink("");
    } catch {
      alert("Please enter valid URL(s). Example: https://example.com/banner.jpg and https://advertiser.com");
    }
  };

  const removeItem = (idx: number) => {
    const next = items.filter((_, i) => i !== idx);
    setItems(next);
  };

  const moveItem = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const next = [...items];
    const [spliced] = next.splice(from, 1);
    next.splice(to, 0, spliced);
    setItems(next);
  };

  const onSaveAll = () => {
    save(LS_KEYS.signatures, Math.max(0, Math.floor(signatures)));
    save(LS_KEYS.adIntervalSec, Math.max(1, Math.floor(intervalSec)));
    save(LS_KEYS.adItems, items);
    save(LS_KEYS.aboutText, about);
    setDirty(false);
    alert("Saved settings.");
  };

  return (
    <div style={appStyles}>
      <header style={headerStyles}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontWeight: 700 }}>Petition App</span>
          <span style={{ color: "#9ca3af" }}>|</span>
          <span style={{ color: "#6b7280", fontSize: 14 }}>Admin</span>
        </div>
        <nav style={{ display: "flex", gap: 8 }}>
          <Link href="/" style={linkBtn}>Home</Link>
          <Link href="/admin" style={linkBtn}>Admin</Link>
        </nav>
      </header>

      <main style={container}>
        <div style={sectionCard}>
          <h1 style={{ marginTop: 0 }}>Admin</h1>
          <p style={{ color: "#6b7280" }}>
            Update the public home page data and manage advertisements.
          </p>
        </div>

        <div style={sectionCard}>
          <h2 style={{ marginTop: 0 }}>Signature Count</h2>
          <label style={labelStyle} htmlFor="sigCount">Signatures</label>
          <input
            id="sigCount"
            type="number"
            min={0}
            value={mounted ? signatures : 0}
            onChange={(e) => setSignatures(Number(e.currentTarget.value))}
            style={inputStyle}
          />
        </div>

        <div style={sectionCard}>
          <h2 style={{ marginTop: 0 }}>About (Home Page)</h2>
          <label style={labelStyle} htmlFor="aboutText">About Content</label>
          <textarea
            id="aboutText"
            value={mounted ? about : ""}
            onChange={(e) => setAbout(e.currentTarget.value)}
            style={{ ...inputStyle, minHeight: 120, fontFamily: "inherit" }}
            placeholder="Write the About text that appears on the Home page..."
          />
        </div>

        <div style={sectionCard}>
          <h2 style={{ marginTop: 0 }}>Ad Carousel Settings</h2>

          <label style={labelStyle} htmlFor="interval">Cycle Interval (seconds)</label>
          <input
            id="interval"
            type="number"
            min={1}
            value={mounted ? intervalSec : 5}
            onChange={(e) => setIntervalSec(Number(e.currentTarget.value))}
            style={{ ...inputStyle, maxWidth: 200 }}
          />

          <div style={{ height: 12 }} />

          <label style={labelStyle} htmlFor="imgUrl">Add Banner Image URL</label>
          <input
            id="imgUrl"
            type="url"
            placeholder="https://example.com/banner.jpg"
            value={newImage}
            onChange={(e) => setNewImage(e.currentTarget.value)}
            style={inputStyle}
          />
          <div style={{ height: 8 }} />
          <label style={labelStyle} htmlFor="linkUrl">Advertiser Link (optional)</label>
          <input
            id="linkUrl"
            type="url"
            placeholder="https://advertiser.com"
            value={newLink}
            onChange={(e) => setNewLink(e.currentTarget.value)}
            style={inputStyle}
          />
          <div style={{ height: 8 }} />
          <button onClick={addItem} style={smallBtn}>Add</button>

          {mounted && items.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong>Current Ads ({previewCount})</strong>
                <span style={{ color: "#6b7280", fontSize: 12 }}>First item shows first in the rotation</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, marginTop: 8 }}>
                {items.map((it, idx) => (
                  <li
                    key={it.src + idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: 8,
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  >
                    <Image
                      src={it.src}
                      alt={`banner-${idx}`}
                      width={120}
                      height={60}
                      unoptimized
                      style={{ objectFit: "contain", background: "#f3f4f6", borderRadius: 6 }}
                    />
                    <div style={{ flex: 1, overflow: "hidden" }}>
                      <div style={{ fontSize: 12, color: "#6b7280" }}>Image</div>
                      <div style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{it.src}</div>
                      {it.href && (
                        <div style={{ marginTop: 4 }}>
                          <span style={{ fontSize: 12, color: "#6b7280" }}>Link:</span> {it.href}
                        </div>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <button
                        style={pillBtn}
                        onClick={() => moveItem(idx, idx - 1)}
                        disabled={idx === 0}
                        aria-label="Move up"
                      >
                        ▲
                      </button>
                      <button
                        style={pillBtn}
                        onClick={() => moveItem(idx, idx + 1)}
                        disabled={idx === items.length - 1}
                        aria-label="Move down"
                      >
                        ▼
                      </button>
                      <button onClick={() => removeItem(idx)} style={dangerBtn}>Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Save button inline with cards */}
        <div style={{ marginTop: 8 }}>
          <button
            onClick={onSaveAll}
            disabled={!dirty}
            style={dirty ? saveBtnEnabled : saveBtnDisabled}
            aria-disabled={!dirty}
          >
            Save Changes
          </button>
        </div>

        <div style={sectionCard}>
          <h3 style={{ marginTop: 0 }}>Preview (Bottom Banner)</h3>
          <p style={{ color: "#6b7280", marginTop: 0 }}>
            Open the Home page to see the live banner rotation with countdown.
          </p>
        </div>
      </main>
    </div>
  );
}
