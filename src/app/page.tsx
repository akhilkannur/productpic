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
    <div className="font-sans antialiased min-h-screen flex flex-col selection:bg-accent selection:text-black w-full h-full">
      <Header />

      {/* Hero Section */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-16 pb-10 w-full">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-textMain">
            AI Product Photography.<br />
            <span className="text-textMuted font-light">Studio Quality. Zero Setup.</span>
          </h1>
          <p className="text-textMuted text-lg md:text-xl leading-relaxed max-w-2xl font-light">
            100+ studio-grade AI prompts for photorealistic food & beverage product photography. $29 lifetime access for first 50 users. Includes monthly prompt updates. Works with Nano Banana & Midjourney.
          </p>
        </div>
      </section>

      <HomeClient styles={styles} />

      {/* Footer */}
      <footer className="w-full border-t border-borderSubtle bg-surface mt-auto">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center text-accent">
              <i className="ri-camera-lens-fill text-sm"></i>
            </div>
            <span className="font-medium text-lg text-textMain tracking-tight">ProductPhoto.pro</span>
          </div>
          <p className="text-textMuted text-sm font-light">© 2026 ProductPhoto.pro. All rights reserved.</p>

        </div>
      </footer>
    </div>
  );
}
