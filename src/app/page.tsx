import { createClient } from "@supabase/supabase-js";
import Header from "@/components/Header";
import HomeClient from "@/components/HomeClient";

export const revalidate = 60;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function getStyles() {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await supabase
    .from("styles")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching styles:", error);
    return [];
  }

  const mappedStyles = data.map((item: any) => ({
    id: item.id,
    name: item.name,
    pillar: item.pillar,
    category: item.category,
    prompt: item.prompt,
    beforeImage: item.before_image,
    afterImage: item.after_image,
    isFree: item.is_free,
  }));

  const freeStyles = mappedStyles.filter((s: any) => s.isFree);
  const paidStyles = mappedStyles.filter((s: any) => !s.isFree);

  // Disperse free styles every ~6 items
  const dispersedStyles: any[] = [];
  const totalCount = mappedStyles.length;
  // Use a fixed interval or calculate based on current density
  const freeInterval = Math.max(2, Math.floor(totalCount / (freeStyles.length || 1)));
  
  let freeIdx = 0;
  let paidIdx = 0;

  for (let i = 0; i < totalCount; i++) {
    // If we have free styles and hit the interval, or we are out of paid styles
    if ((i % freeInterval === 0 && freeIdx < freeStyles.length) || (paidIdx >= paidStyles.length && freeIdx < freeStyles.length)) {
      dispersedStyles.push(freeStyles[freeIdx++]);
    } else if (paidIdx < paidStyles.length) {
      dispersedStyles.push(paidStyles[paidIdx++]);
    }
  }

  return dispersedStyles;
}

export default async function Home() {
  const styles = await getStyles();

  return (
    <div className="font-mono antialiased min-h-screen flex flex-col selection:bg-accent selection:text-white w-full h-full bg-[#B0B0B0]">
      <Header />

      {/* Hero Section */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-16 pb-12 w-full">
        <div className="max-w-3xl">
          <div className="inline-block bg-black text-white px-3 py-1 text-[11px] font-black uppercase tracking-widest mb-6">OPERATIONAL_PROTOCOL_V.1.0</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9] text-black uppercase">
            STUDIO_GRADE.<br />
            ZERO_SETUP.<br />
            <span className="text-accent underline decoration-4 underline-offset-8">AI_PROMPTS.</span>
          </h1>
          <p className="text-gray-800 text-lg md:text-xl leading-relaxed max-w-2xl font-bold uppercase tracking-tight">
            100+ precision-engineered prompts for photorealistic food & beverage product photography. $29 lifetime access. works with nano banana & midjourney.
          </p>
        </div>
      </section>

      <HomeClient styles={styles} />

      {/* Footer */}
      <footer className="w-full border-t-2 border-black bg-white mt-auto">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black flex items-center justify-center text-white">
              <i className="ri-camera-lens-fill text-xl"></i>
            </div>
            <span className="font-black text-2xl tracking-tighter text-black uppercase">ProductPhoto<span className="text-accent">.pro</span></span>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">© 2026_EST. PRODUCTPHOTO_PRO. ALL_RIGHTS_RESERVED.</p>
            <div className="text-[10px] text-accent font-black uppercase tracking-widest">SYSTEM_STABLE_VER_2.5</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
