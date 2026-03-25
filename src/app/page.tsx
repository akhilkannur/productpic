import Header from "@/components/Header";
import HomeClient from "@/components/HomeClient";
import { getStyles, disperseStyles } from "@/lib/styles";

export const revalidate = 60;

export default async function Home() {
  const allStyles = await getStyles();
  const styles = disperseStyles(allStyles);

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col selection:bg-accent selection:text-black w-full h-full bg-background">
      <Header />

      {/* Hero Section */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-12 md:pt-20 pb-10 md:pb-12 w-full">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter mb-6 md:mb-8 leading-[0.95] md:leading-[0.9] text-textMain uppercase">
            AI IMAGE PROMPTS FOR<br />
            <span className="text-accent underline decoration-2 md:decoration-4 underline-offset-4 md:underline-offset-8 text-balance">FOOD & BEVERAGE PRODUCTS.</span>
          </h1>
          <p className="text-textMuted text-base md:text-2xl leading-relaxed max-w-2xl font-medium tracking-tight">
            Skip the expensive product shoot. 100+ AI prompts for Food & Beverage brands to get studio-grade photorealism in seconds.
          </p>
        </div>
      </section>

      <HomeClient styles={styles} />

      {/* Footer */}
      <footer className="w-full border-t border-borderSubtle bg-surface mt-auto">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-background">
              <i className="ri-camera-lens-fill text-xl"></i>
            </div>
            <span className="font-bold text-2xl tracking-tighter text-textMain">ProductPhoto<span className="text-accent">.pro</span></span>
          </div>
          <p className="text-textMuted text-xs font-medium uppercase tracking-[0.2em]">© 2026 ProductPhoto.pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
