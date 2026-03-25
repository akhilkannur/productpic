"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Lock, Sparkles } from "lucide-react";
import { Style } from "@/lib/styles";
import { getCategorySlug } from "@/lib/utils";
import StyleDetail from "./StyleDetail";

export default function HomeClient({ styles }: { styles: Style[] }) {
  const [shapeFilter, setShapeFilter] = useState("All");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    async function checkAccess() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setIsSignedIn(true);
        const { data: profile } = await supabase
          .from('profiles')
          .select('has_access')
          .eq('id', session.user.id)
          .single();
        setHasAccess(!!profile?.has_access);
      }
    }
    checkAccess();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(!!session?.user);
      if (!session?.user) {
        setHasAccess(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const shapes = ["All", "Jar", "Bottle", "Can", "Box", "Pouch", "Bag"];

  const getShapeFromId = (id: string) => {
    const s = id.toLowerCase();
    if (s.endsWith("jar")) return "Jar";
    if (s.endsWith("bottle")) return "Bottle";
    if (s.endsWith("can")) return "Can";
    if (s.endsWith("box")) return "Box";
    if (s.endsWith("pouch")) return "Pouch";
    if (s.endsWith("bag")) return "Bag";
    return "Other";
  };

  const filteredStyles = styles.filter((s) => {
    const matchesShape = shapeFilter === "All" || getShapeFromId(s.id) === shapeFilter;
    return matchesShape;
  });

  // Can the user see this prompt?
  const canViewPrompt = (style: Style) => {
    if (hasAccess) return true;
    if (style.isFree && isSignedIn) return true;
    return false;
  };

  // Card hover overlay
  const renderCardOverlay = (style: Style) => {
    if (canViewPrompt(style)) return null;

    return (
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center z-20 backdrop-blur-[2px] pointer-events-none">
        <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <Lock className="text-accent" size={24} />
        </div>
        <span className="text-white font-medium text-sm tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out">Unlock Prompt</span>
      </div>
    );
  };

  return (
    <>
      {/* Filter Bar */}
      <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-xl border-b border-borderSubtle w-full">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-4 md:py-8 space-y-4 md:space-y-6">
          <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4 md:gap-8">
            <div className="flex flex-col gap-4 md:gap-5 flex-grow overflow-hidden">
              {/* Shape Filter */}
              <div className="flex items-center gap-3 md:gap-4 overflow-x-auto pb-1 scrollbar-hide">
                <span className="shrink-0 text-[10px] md:text-[11px] font-bold tracking-widest uppercase text-textMuted mr-1 md:mr-2">Shape:</span>
                {shapes.map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setShapeFilter(shape)}
                    className={`shrink-0 px-4 md:px-5 py-1.5 md:py-2 rounded-full border text-xs transition-all whitespace-nowrap ${
                      shapeFilter === shape
                        ? "border-accent bg-accent text-background font-semibold shadow-[0_0_15px_rgba(210,180,140,0.2)]"
                        : "border-borderSubtle hover:border-accent/40 hover:bg-surface text-textMuted hover:text-textMain font-medium"
                    }`}
                  >
                    {shape === "All" ? "All Shapes" : shape}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Interchangeability Note */}
            <div className="shrink-0 flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-accent/5 border border-accent/10 max-w-sm relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-50" />
              <Sparkles className="text-accent shrink-0 mt-0.5" size={16} />
              <p className="text-[11px] md:text-xs leading-relaxed text-textMuted font-medium italic">
                <span className="text-accent font-bold uppercase tracking-tighter not-italic block mb-0.5 md:mb-1">Expert Tip:</span>
                Styles are <span className="text-textMain font-bold">Interchangeable</span>. A "Jar" prompt works flawlessly for Bottles or Cans.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <main className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8 md:py-12 w-full flex-grow">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-8 space-y-4 md:space-y-8">
          {filteredStyles.map((style, idx) => (
            <Link
              key={style.id}
              href={`/ai-product-photo-prompts/${getCategorySlug(style.category)}/${style.id}`}
              scroll={false}
            >
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.02 }}
                className="group relative style-card rounded-2xl overflow-hidden cursor-pointer flex flex-col"
              >
                <div className="relative w-full overflow-hidden aspect-[3/4]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
                    <i className="ri-image-circle-line text-white/5 text-6xl"></i>
                  </div>
                  
                  <Image 
                    src={style.afterImage} 
                    alt={`${style.name} AI product photo prompt`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="relative z-10 object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    priority={idx < 8}
                    quality={90}
                  />

                  {renderCardOverlay(style)}
                  
                  {style.isFree && (
                    <div className="absolute top-4 right-4 z-30">
                      <span className="bg-green-500/20 text-green-400 text-[10px] px-3 py-1.5 rounded-lg border border-green-500/30 font-bold uppercase tracking-wider backdrop-blur-md">Free</span>
                    </div>
                  )}
                </div>

                <div className="p-6 relative z-20 bg-surface border-t border-white/5">
                  <div className="flex items-center justify-end mb-3">
                    <i className="ri-arrow-right-up-line text-textMuted opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all duration-300 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></i>
                  </div>
                  <h3 className="text-textMain font-medium text-lg leading-snug group-hover:text-accent transition-colors duration-300">
                    {style.name}
                  </h3>
                  {!style.isFree && hasAccess && (
                    <div className="mt-3 flex items-center gap-2 text-[10px] text-accent uppercase font-bold tracking-widest bg-accent/5 w-fit px-3 py-1 rounded-full">
                        <i className="ri-shield-check-line text-xs" /> Unlocked
                    </div>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
