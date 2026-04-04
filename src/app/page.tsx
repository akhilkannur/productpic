import Link from "next/link";
import Header from "@/components/Header";
import HomeClient from "@/components/HomeClient";
import { getStyles, disperseStyles } from "@/lib/styles";

export const revalidate = 60;

export default async function Home() {
  const allStyles = await getStyles();
  const styles = disperseStyles(allStyles);

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col selection:bg-white selection:text-black w-full h-full bg-background text-white">
      <Header />

      {/* Hero Section */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-24 pb-16 w-full border-b border-borderSubtle">
        <div className="max-w-5xl">
          <h1 className="text-5xl sm:text-7xl md:text-[12rem] font-bold tracking-[-0.06em] mb-16 leading-[0.8] uppercase">
            Better<br />
            Product<br />
            Photos<span className="text-textMuted">.</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="text-textMuted text-lg md:text-2xl leading-tight max-w-xl font-medium tracking-tight uppercase">
              100+ Studio-tuned AI prompts for food & beverage photorealism. Built for marketers & founders.
            </p>
            <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-textMuted">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Library Updated March 2026
            </div>
          </div>
        </div>
      </section>

      <HomeClient styles={styles} />

      {/* Footer */}
      <footer className="w-full border-t border-borderSubtle bg-background mt-auto">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-24 flex flex-col md:flex-row items-start justify-between gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-white flex items-center justify-center">
                <img src="/icon.svg" alt="ProductPhoto.pro Logo" className="w-6 h-6 invert" />
              </div>
              <span className="font-bold text-2xl tracking-tighter uppercase">ProductPhoto<span className="opacity-50">.pro</span></span>
            </div>
            <p className="text-textMuted text-xs max-w-xs leading-relaxed uppercase tracking-widest">
              A curated library of technical prompt logic for multimodal image models.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">Platform</h4>
              <nav className="flex flex-col gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-textMuted">
                <Link href="/" className="hover:text-white transition-colors">Gallery</Link>
                <Link href="/how-it-works" className="hover:text-white transition-colors">Process</Link>
                <Link href="/signin" className="hover:text-white transition-colors">Sign In</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">Legal</h4>
              <nav className="flex flex-col gap-2 text-[11px] font-medium uppercase tracking-[0.1em] text-textMuted">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
              </nav>
            </div>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8 border-t border-borderSubtle flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em] text-textMuted opacity-50">
          <span>© 2026 ProductPhoto.pro</span>
          <span>Designed for the Craft</span>
        </div>
      </footer>
    </div>
  );
}
