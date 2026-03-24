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
    <header className="sticky top-0 z-50 w-full border-b-2 border-black bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 bg-black flex items-center justify-center text-white">
            <i className="ri-camera-lens-fill text-xl"></i>
          </div>
          <span className="font-black text-2xl tracking-tighter text-black uppercase group-hover:opacity-80 transition-opacity">
            ProductPhoto<span className="text-accent">.pro</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-gray-400">
          <Link 
            href="/" 
            className={`transition-colors hover:text-black ${pathname === "/" ? "text-black border-b-2 border-accent" : ""}`}
          >
            Gallery_Index
          </Link>
          <Link 
            href="/how-it-works" 
            className={`transition-colors hover:text-black ${pathname === "/how-it-works" ? "text-black border-b-2 border-accent" : ""}`}
          >
            User_Manual
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          {isSignedIn ? (
            <button 
              onClick={handleSignOut}
              className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors hidden sm:block"
            >
              Sign_Out
            </button>
          ) : (
            <Link 
              href="/signin" 
              className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors hidden sm:block"
            >
              Auth_Login
            </Link>
          )}
          <Link 
            href="https://checkout.dodopayments.com/buy/pdt_0Nb6DxNGX1dZxvAqv6u9o?quantity=1"
            target="_blank"
            className="bg-black text-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-all shadow-[4px_4px_0px_#FF4500] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            Unlock_Vault_$29
          </Link>
        </div>
      </div>
    </header>
  );
}
