import React from "react";

export const appStyles: React.CSSProperties = {
  fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
  color: "#1a1a1a",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

export const headerStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 18px",
  borderBottom: "1px solid #e5e7eb",
  background: "#fafafa",
  position: "sticky",
  top: 0,
  zIndex: 5,
};

export const linkBtn: React.CSSProperties = {
  border: "1px solid #d1d5db",
  padding: "8px 12px",
  borderRadius: 8,
  background: "white",
  cursor: "pointer",
  textDecoration: "none",
  color: "inherit",
};

export const container: React.CSSProperties = {
  maxWidth: 960,
  width: "100%",
  margin: "0 auto",
  padding: 20,
  paddingBottom: 160, // space for the fixed ad bar
  boxSizing: "border-box",
  flex: 1,
};

export const sectionCard: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 16,
  marginBottom: 16,
  background: "white",
};

export const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  marginBottom: 6,
  color: "#374151",
};

export const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #d1d5db",
  boxSizing: "border-box",
};

export const smallBtn: React.CSSProperties = {
  ...linkBtn,
  padding: "6px 10px",
  fontSize: 14,
};

export const dangerBtn: React.CSSProperties = {
  ...smallBtn,
  borderColor: "#ef4444",
  color: "#b91c1c",
};

export const primaryBtn: React.CSSProperties = {
  ...linkBtn,
  background: "#111827",
  color: "white",
};

export const disabledBtn: React.CSSProperties = {
  ...primaryBtn,
  opacity: 0.5,
  cursor: "not-allowed",
};

export const pillBtn: React.CSSProperties = {
  border: "1px solid #d1d5db",
  background: "white",
  borderRadius: 9999,
  padding: "4px 8px",
  fontSize: 12,
  cursor: "pointer",
};
