"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-borderSubtle bg-background/80 backdrop-blur-xl">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 cursor-pointer group">
          <div className="w-8 h-8 rounded bg-accent flex items-center justify-center text-background">
            <i className="ri-camera-lens-fill text-xl"></i>
          </div>
          <span className="font-bold text-2xl tracking-tight text-textMain group-hover:opacity-80 transition-opacity">
            ProductPic<span className="text-accent">.pro</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-textMuted">
          <Link 
            href="/" 
            className={`transition-colors hover:text-textMain ${pathname === "/" ? "text-textMain hover:text-accent" : "hover:text-textMain"}`}
          >
            Gallery
          </Link>
          <Link 
            href="/how-it-works" 
            className={`transition-colors hover:text-textMain ${pathname === "/how-it-works" ? "text-textMain hover:text-accent" : "hover:text-textMain"}`}
          >
            How it Works
          </Link>
          {/* Mockup placeholders removed for now to keep it clean */}
        </nav>

        <div className="flex items-center gap-5">
          <Link 
            href="/signin" 
            className="text-sm font-medium text-textMuted hover:text-textMain transition-colors hidden sm:block"
          >
            Sign In
          </Link>
          <Link 
            href="https://checkout.dodopayments.com/buy/pdt_0Nb6DxNGX1dZxvAqv6u9o?quantity=1"
            target="_blank"
            className="bg-accent text-background px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-accent-hover transition-colors shadow-[0_0_15px_rgba(210,180,140,0.15)]"
          >
            Get Access
          </Link>
        </div>
      </div>
    </header>
  );
}
