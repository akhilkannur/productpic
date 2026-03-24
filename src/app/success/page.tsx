import Header from "@/components/Header";
import Link from "next/link";
import { Sparkles, CheckCircle } from "lucide-react";

export default function Success() {
  return (
    <div className="font-sans antialiased min-h-screen flex flex-col selection:bg-accent selection:text-black w-full h-full bg-background text-textMain">
      <Header />

      <main className="max-w-[800px] mx-auto px-6 py-20 text-center flex-grow flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-3xl bg-accent/10 flex items-center justify-center mb-8 border border-accent/20">
          <CheckCircle className="text-accent" size={40} />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter">
          Access <span className="text-textMuted font-light">Unlocked.</span>
        </h1>
        
        <p className="text-textMuted text-xl mb-12 font-light max-w-lg mx-auto">
          Thank you for your purchase! Your account has been upgraded. You now have full access to the entire StyleVault.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/" className="bg-accent text-background px-8 py-4 rounded-xl text-sm font-bold hover:bg-accent-hover transition-all shadow-[0_0_20px_rgba(210,180,140,0.2)] flex items-center gap-2">
            Explore the Vault <Sparkles size={16} />
          </Link>
          <Link href="/how-it-works" className="px-8 py-4 rounded-xl border border-borderSubtle text-sm font-medium hover:bg-surface transition-all">
            Read the Guide
          </Link>
        </div>

        <p className="mt-12 text-xs text-textMuted">
          Check your email for the receipt and login link.
        </p>
      </main>

      <footer className="w-full border-t border-borderSubtle bg-surface">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-textMuted text-sm font-light">
          <p>© 2026 ProductPhoto.pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
