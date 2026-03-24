"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const pathname = usePathname();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setIsSignedIn(!!session?.user);
    }
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-background">
            <i className="ri-camera-lens-fill text-xl"></i>
          </div>
          <span className="font-bold text-2xl tracking-tighter text-textMain uppercase group-hover:opacity-80 transition-opacity">
            ProductPhoto<span className="text-accent">.pro</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-textMuted">
          <Link 
            href="/" 
            className={`transition-colors hover:text-textMain ${pathname === "/" ? "text-textMain border-b-2 border-accent pb-1" : ""}`}
          >
            Gallery
          </Link>
          <Link 
            href="/how-it-works" 
            className={`transition-colors hover:text-textMain ${pathname === "/how-it-works" ? "text-textMain border-b-2 border-accent pb-1" : ""}`}
          >
            Process
          </Link>
        </nav>

        <div className="flex items-center gap-8">
          {isSignedIn ? (
            <button 
              onClick={handleSignOut}
              className="text-[11px] font-bold uppercase tracking-widest text-textMuted hover:text-textMain transition-colors hidden sm:block"
            >
              Sign Out
            </button>
          ) : (
            <Link 
              href="/signin" 
              className="text-[11px] font-bold uppercase tracking-widest text-textMuted hover:text-textMain transition-colors hidden sm:block"
            >
              Sign In
            </Link>
          )}
          <Link 
            href="https://checkout.dodopayments.com/buy/pdt_0Nb6DxNGX1dZxvAqv6u9o?quantity=1"
            target="_blank"
            className="bg-accent text-background px-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-accent-hover transition-all shadow-[0_0_20px_rgba(210,180,140,0.15)] active:scale-95"
          >
            Unlock Vault
          </Link>
        </div>
      </div>
    </header>
  );
}
