"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { Lock, Copy, Check, X, Sparkles, LogIn } from "lucide-react";

interface Style {
  id: string;
  name: string;
  pillar: string;
  category: string;
  prompt: string;
  beforeImage: string;
  afterImage: string;
  isFree: boolean;
}

const PILLAR_DESCRIPTIONS: Record<string, string> = {
  "The Monolith (Architectural)": "Minimalist, structural, and expensive. Focus on stone textures, marble slabs, and sharp architectural sunlight.",
  "The Nocturnal (Midnight)": "Dark, moody, and opulent. Focus on spotlighting, deep shadows, velvet, and glass reflections.",
  "The Botanical (Organic)": "Soft, organic, and clean. Focus on 'Gobo' leaf shadows, morning light, and natural textures.",
  "The Clinical (Functional)": "High-tech and sterile. Focus on frosted glass, high-key lighting, and precision-engineered clean aesthetics.",
  "The Hard-Flash (Pop)": "Bold, aggressive, and commercial. Focus on direct strobe flash, sharp shadows, and saturated color pop.",
  "The Atmospheric (FX)": "Moody and cinematic environments. Focus on volumetric fog, smoke, and complex light-beam physics.",
  "The Ethereal (Glow)": "Soft, glowing highlights and dreamy depth. Focus on bloom, under-glow, and soft-focus physics.",
  "The Refractive (Lab)": "Laboratory-grade lighting with prism effects. Focus on caustic reflections, rainbows, and dispersion.",
  "The Industrial (Material)": "Raw and mechanical. Focus on brushed steel, concrete, and heavy-duty manufacturing aesthetics.",
  "The Studio (Commercial)": "Standard high-end retail lighting. Focus on softbox rims, seamless backgrounds, and zero-distraction focus.",
};

export default function HomeClient({ styles }: { styles: Style[] }) {
  const [filter, setFilter] = useState("All");
  const [shapeFilter, setShapeFilter] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
  const [copied, setCopied] = useState(false);
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

  const pillars = ["All", ...Array.from(new Set(styles.map((s) => s.pillar)))];
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
    const matchesPillar = filter === "All" || s.pillar === filter;
    const matchesShape = shapeFilter === "All" || getShapeFromId(s.id) === shapeFilter;
    return matchesPillar && matchesShape;
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Can the user see this prompt?
  const canViewPrompt = (style: Style) => {
    if (hasAccess) return true;
    if (style.isFree && isSignedIn) return true;
    return false;
  };

  // What lock message to show?
  const renderLockOverlay = (style: Style) => {
    if (canViewPrompt(style)) return null;

    // Free prompt but not signed in → sign up CTA
    if (style.isFree && !isSignedIn) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-40">
          <div className="text-center p-8 bg-surface border border-white/10 rounded-2xl shadow-2xl">
            <LogIn className="mx-auto mb-4 text-accent" size={28} />
            <p className="font-bold mb-1 text-textMain tracking-tight text-lg">FREE PROMPT</p>
            <p className="text-sm text-textMuted mb-6 font-medium">Sign up to unlock prompts.</p>
            <Link
              href="/signin"
              className="block w-full bg-accent text-background text-center font-bold py-3 px-8 rounded-xl hover:bg-accent-hover transition-all"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      );
    }

    // Paid prompt → buy CTA
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-40">
        <div className="text-center p-8 bg-surface border border-white/10 rounded-2xl shadow-2xl">
          <Lock className="mx-auto mb-4 text-accent" size={28} />
          <p className="font-bold mb-1 text-textMain tracking-tight text-lg">VAULT ACCESS</p>
          <p className="text-sm text-textMuted mb-6 font-medium">Lifetime access + monthly updates.</p>
          <a 
            href="https://checkout.dodopayments.com/buy/pdt_0Nb6DxNGX1dZxvAqv6u9o?quantity=1"
            target="_blank"
            className="block w-full bg-accent text-background text-center font-bold py-3 px-8 rounded-xl hover:bg-accent-hover transition-all"
          >
            Unlock Vault $29
          </a>
          <p className="text-[11px] text-textMuted mt-3 font-medium opacity-60">First 50 Users Only</p>
        </div>
      </div>
    );
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
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8 space-y-6">
          <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-8">
            <div className="flex flex-col gap-5 flex-grow overflow-hidden">
              {/* Pillar Filter */}
              <div className="flex items-center gap-4 overflow-x-auto pb-1 scrollbar-hide">
                <span className="shrink-0 text-[11px] font-bold tracking-widest uppercase text-textMuted mr-2">Scene:</span>
                {pillars.map((pillar) => (
                  <button
                    key={pillar}
                    onClick={() => setFilter(pillar)}
                    className={`shrink-0 px-5 py-2 rounded-full border text-sm transition-all whitespace-nowrap ${
                      filter === pillar
                        ? "border-accent bg-accent text-background font-semibold shadow-[0_0_15px_rgba(210,180,140,0.2)]"
                        : "border-borderSubtle hover:border-accent/40 hover:bg-surface text-textMuted hover:text-textMain font-medium"
                    }`}
                  >
                    {pillar === "All" ? "All Scenes" : pillar.split(" (")[0]}
                  </button>
                ))}
              </div>

              {/* Shape Filter */}
              <div className="flex items-center gap-4 overflow-x-auto pb-1 scrollbar-hide">
                <span className="shrink-0 text-[11px] font-bold tracking-widest uppercase text-textMuted mr-2">Shape:</span>
                {shapes.map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setShapeFilter(shape)}
                    className={`shrink-0 px-5 py-2 rounded-full border text-sm transition-all whitespace-nowrap ${
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
            <div className="shrink-0 flex items-start gap-4 p-4 rounded-2xl bg-accent/5 border border-accent/10 max-w-sm relative group overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-50" />
              <Sparkles className="text-accent shrink-0 mt-0.5" size={18} />
              <p className="text-xs leading-relaxed text-textMuted font-medium italic">
                <span className="text-accent font-bold uppercase tracking-tighter not-italic block mb-1">Expert Tip:</span>
                Styles are fully <span className="text-textMain font-bold">Interchangeable</span>. A "Jar" prompt works flawlessly for Bottles or Cans.
              </p>
            </div>
          </div>

          {/* Description Bar */}
          {filter !== "All" && PILLAR_DESCRIPTIONS[filter] && (
             <motion.div 
               initial={{ opacity: 0, y: -10 }} 
               animate={{ opacity: 1, y: 0 }}
               className="p-5 rounded-2xl bg-surface border border-white/5 flex items-center gap-5"
             >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <i className="ri-information-line text-accent text-xl" />
                </div>
                <p className="text-sm text-textMuted font-medium leading-relaxed max-w-4xl">
                  <span className="text-textMain font-bold uppercase tracking-widest text-[10px] block mb-0.5 opacity-50">Style Aesthetic:</span>
                  {PILLAR_DESCRIPTIONS[filter]}
                </p>
             </motion.div>
          )}
        </div>
      </div>

      {/* Main Grid Content */}
      <main className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 w-full flex-grow">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
          {filteredStyles.map((style, idx) => (
            <motion.div
              key={style.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.02 }}
              onClick={() => setSelectedStyle(style)}
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
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                    {style.pillar.split(" (")[0]}
                  </span>
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
          ))}
        </div>
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedStyle && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStyle(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl bg-surface border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[95vh] overflow-y-auto"
            >
              {/* Mobile Header */}
              <div className="p-6 pb-4 md:hidden flex justify-between items-start border-b border-white/5 bg-surface sticky top-0 z-30">
                <div>
                  <p className="text-accent font-mono text-[10px] mb-1 tracking-widest uppercase">{selectedStyle.pillar}</p>
                  <h2 className="text-2xl font-bold tracking-tight leading-tight text-textMain">{selectedStyle.name}</h2>
                </div>
                <button 
                  onClick={() => setSelectedStyle(null)}
                  className="p-2 bg-white/5 rounded-full text-textMuted"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Image Section */}
              <div className="md:w-3/5 aspect-[3/4] md:aspect-auto relative bg-background flex items-center justify-center p-4 md:p-12 border-b md:border-b-0 md:border-r border-white/5">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image 
                    src={selectedStyle.afterImage} 
                    alt={`${selectedStyle.name} AI product photo prompt`}
                    fill
                    className="relative z-10 object-contain w-full h-full" 
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                    quality={95}
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-between bg-surface">
                <div className="hidden md:flex justify-between items-start mb-10">
                  <div>
                    <p className="text-accent font-mono text-xs mb-3 tracking-[0.2em] uppercase font-bold">{selectedStyle.pillar}</p>
                    <h2 className="text-4xl font-bold tracking-tight leading-[1.1] mb-4 text-textMain">{selectedStyle.name}</h2>
                    <p className="text-textMuted font-medium text-sm">Best for: {selectedStyle.category}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedStyle(null)}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-textMuted"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-8 flex-grow">
                  <div className="p-6 rounded-2xl bg-accent/5 border border-accent/10 relative">
                     <p className="text-sm text-textMuted font-medium leading-relaxed italic">
                        "{PILLAR_DESCRIPTIONS[selectedStyle.pillar] || "Advanced lighting setup with technical shadow and texture control."}"
                     </p>
                  </div>

                  <div className="p-8 rounded-2xl bg-black/40 border border-white/5 relative group">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-textMuted">The AI Prompt</span>
                      {canViewPrompt(selectedStyle) && (
                        <button 
                          onClick={() => handleCopy(selectedStyle.prompt)}
                          className="flex items-center gap-2 text-xs text-accent hover:text-white transition-colors font-bold uppercase tracking-wider"
                        >
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                          {copied ? "Copied" : "Copy Prompt"}
                        </button>
                      )}
                    </div>
                    <div className={`text-sm leading-relaxed font-mono ${!canViewPrompt(selectedStyle) ? "filter blur-sm select-none" : "text-textMain"}`}>
                      {selectedStyle.prompt}
                    </div>

                    {canViewPrompt(selectedStyle) && (
                      <div className="mt-8 pt-8 border-t border-white/5">
                        <div className="flex items-start gap-4">
                          <div className="mt-0.5 text-accent">
                            <Sparkles size={20} />
                          </div>
                          <div className="text-[11px] leading-relaxed text-textMuted uppercase tracking-wider font-semibold">
                            <span className="text-accent font-bold block mb-1">PRO TIP:</span>
                            Use this photo as a **Multimodal Anchor** (Nano Banana) or an **--sref** (Midjourney) to lock in the lighting and shadow physics.
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {renderLockOverlay(selectedStyle)}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
