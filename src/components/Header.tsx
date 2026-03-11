import Link from "next/link";
import { headerStyles, linkBtn } from "@/styles/ui";


type PageTitle = {
    title: string;
}

const Header = ({title}: PageTitle ) => {

  return (
    <header style={headerStyles}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link href="/"><span style={{ fontWeight: 700 }}>Signature Moment</span></Link>
            <span style={{ color: "#9ca3af" }}>|</span>
            <span style={{ color: "#6b7280", fontSize: 14 }}>{title}</span>
        </div>
        <nav style={{ display: "flex", gap: 8 }}>
            <Link href="/" style={linkBtn}>Home</Link>
            <Link href="/admin" style={linkBtn}>Admin</Link>
        </nav>
    </header>
  )
}

export default Header