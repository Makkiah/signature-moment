import '../styles/global.css';

export const metadata = {
  title: "Petition App",
  description: "Signatures + Ads carousel (localStorage)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="animated-bg" style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
