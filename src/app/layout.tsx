import '../styles/global.css';

export const metadata = {
  title: "Signature Moment",
  description: "Saving the moment, one signature at a time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="animated-bg" style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
