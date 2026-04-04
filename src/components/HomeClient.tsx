"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Style } from "@/lib/styles";
import { getCategorySlug } from "@/lib/utils";

export default function HomeClient({ styles }: { styles: Style[] }) {
  const [shapeFilter, setShapeFilter] = useState("All");
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    async function checkAccess() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
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

  return (
    <>
      {/* Filter Bar */}
      <div className="sticky top-16 md:top-24 z-40 bg-background border-b border-borderSubtle w-full">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-3 md:py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {shapes.map((shape) => (
              <button
                key={shape}
                onClick={() => setShapeFilter(shape)}
                className={`shrink-0 px-4 md:px-6 py-1.5 md:py-2 border text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  shapeFilter === shape
                    ? "border-white bg-white text-black"
                    : "border-borderSubtle hover:border-white/40 text-textMuted hover:text-white"
                }`}
              >
                {shape}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-textMuted">
            <Sparkles size={14} className="text-white" />
            <span className="truncate">Most styles are interchangeable</span>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <main className="max-w-[1600px] mx-auto px-6 lg:px-12 py-6 md:py-12 w-full flex-grow">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
          {filteredStyles.map((style, idx) => (
            <Link
              key={style.id}
              href={`/ai-product-photo-prompts/${getCategorySlug(style.category)}/${style.id}`}
              scroll={false}
              className="bg-background group relative block break-inside-avoid"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.01 }}
                className="flex flex-col h-full border border-borderSubtle"
              >
                <div className={`relative overflow-hidden transition-all duration-700 ${
                  idx % 6 === 0 ? "aspect-[3/4]" : 
                  idx % 6 === 1 ? "aspect-[4/5]" : 
                  idx % 6 === 2 ? "aspect-[1/1]" : 
                  idx % 6 === 3 ? "aspect-[2/3]" :
                  idx % 6 === 4 ? "aspect-[3/2]" :
                  "aspect-[4/3]"
                }`}>
                  <Image 
                    src={style.afterImage} 
                    alt={`${style.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    priority={idx < 8}
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {style.isFree && (
                    <div className="absolute top-4 md:top-6 right-4 md:right-6 z-30">
                      <span className="bg-white text-black text-[9px] px-2 md:px-3 py-1 font-black uppercase tracking-[0.2em]">Free</span>
                    </div>
                  )}
                </div>

                <div className="p-8 space-y-4 border-t border-borderSubtle group-hover:bg-white transition-colors duration-300">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold leading-tight group-hover:text-black transition-colors uppercase tracking-tight">
                      {style.name}
                    </h3>
                    <ArrowUpRight size={18} className="text-textMuted group-hover:text-black transition-colors" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-textMuted group-hover:text-black/60 transition-colors">
                    <span>{style.category}</span>
                    {!style.isFree && hasAccess && (
                      <span className="text-white group-hover:text-black">Unlocked</span>
                    )}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
