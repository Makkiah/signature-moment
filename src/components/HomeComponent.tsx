import React, {useState, useEffect} from 'react';
import { container, sectionCard } from "@/styles/ui";
import supabase from '../config/supabaseClient';
import AdCarousel from "@/components/AdCarousel";
import { LS_KEYS, loadAdItems, loadNumber } from "@/lib/storage";


const HomeComponent = () => {
    const [signatures, setSignatures] = useState<number>(0);
    const [about, setAbout] = useState<string>("");
    const [mounted, setMounted] = useState(false);
    const [intervalSec, setIntervalSec] = useState<number>(5);
    const [items, setItems] = useState(() => [] as ReturnType<typeof loadAdItems>);
    


    useEffect(() => {
        setItems(loadAdItems());
        setIntervalSec(loadNumber(LS_KEYS.adIntervalSec, 5));
  
        setMounted(true);
        async function getMetaData(){
        const {data} = await supabase.from('Site_Metadata').select();
        setAbout(data ? data[0].site_about : "No About")
        setSignatures(data ? data[0].site_signatures : 0)
        }
        getMetaData();
    }, []);

    return (<>
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
    </>
  )
}

export default HomeComponent;