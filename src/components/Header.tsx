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
    <header className="sticky top-0 z-50 w-full border-b border-borderSubtle bg-background/95 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 md:h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 md:gap-3 cursor-pointer group">
          <div className="w-8 h-8 md:w-10 md:h-10 border border-white flex items-center justify-center">
            <img src="/icon.svg" alt="ProductPhoto.pro Logo" className="w-4 h-4 md:w-6 md:h-6 invert" />
          </div>
          <span className="font-bold text-lg md:text-xl tracking-tighter text-textMain uppercase">
            ProductPhoto<span className="opacity-50">.pro</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-12 text-[11px] font-bold uppercase tracking-[0.2em] text-textMuted">
          <Link 
            href="/" 
            className={`transition-colors hover:text-textMain ${pathname === "/" ? "text-textMain underline underline-offset-8" : ""}`}
          >
            Gallery
          </Link>
          <Link 
            href="/how-it-works" 
            className={`transition-colors hover:text-textMain ${pathname === "/how-it-works" ? "text-textMain underline underline-offset-8" : ""}`}
          >
            Process
          </Link>
        </nav>

        <div className="flex items-center gap-4 md:gap-8">
          {isSignedIn ? (
            <button 
              onClick={handleSignOut}
              className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-textMuted hover:text-textMain transition-colors hidden sm:block"
            >
              Sign Out
            </button>
          ) : (
            <Link 
              href="/signin" 
              className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-textMuted hover:text-textMain transition-colors hidden sm:block"
            >
              Sign In
            </Link>
          )}
          <Link 
            href="https://checkout.dodopayments.com/buy/pdt_0Nb6DxNGX1dZxvAqv6u9o?quantity=1"
            target="_blank"
            className="border border-white px-4 md:px-8 py-2 md:py-3 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all active:scale-95"
          >
            Unlock Library
          </Link>
        </div>
      </div>
    </header>
  );
}
