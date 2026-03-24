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
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[1px] z-40">
          <div className="text-center p-6 bg-white border-2 border-black rounded-lg shadow-[8px_8px_0px_#000]">
            <LogIn className="mx-auto mb-3 text-accent" size={24} />
            <p className="font-bold mb-1 uppercase tracking-tighter text-black">FREE SLIDE</p>
            <p className="text-[10px] text-gray-600 mb-4 uppercase font-bold tracking-widest">Sign up to unlock prompts.</p>
            <Link
              href="/signin"
              className="block w-full bg-black text-white text-center font-bold py-2.5 px-6 rounded-sm text-xs hover:bg-accent transition-all uppercase"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      );
    }

    // Paid prompt → buy CTA
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[1px] z-40">
        <div className="text-center p-6 bg-white border-2 border-black rounded-lg shadow-[8px_8px_0px_#000]">
          <Lock className="mx-auto mb-3 text-accent" size={24} />
          <p className="font-bold mb-1 uppercase tracking-tighter text-black">VAULT ACCESS ONLY</p>
          <p className="text-[10px] text-gray-600 mb-4 uppercase font-bold tracking-widest">Lifetime access + monthly updates.</p>
          <a 
            href="https://checkout.dodopayments.com/buy/pdt_0Nb6DxNGX1dZxvAqv6u9o?quantity=1"
            target="_blank"
            className="block w-full bg-accent text-white text-center font-bold py-2.5 px-6 rounded-sm text-xs hover:bg-black transition-all uppercase"
          >
            Unlock Vault $29
          </a>
          <p className="text-[9px] text-gray-500 mt-2 uppercase font-bold tracking-widest">First 50 Users Only</p>
        </div>
      </div>
    );
  };

  // Card hover overlay
  const renderCardOverlay = (style: Style) => {
    if (canViewPrompt(style)) return null;

    return (
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center z-20 pointer-events-none">
        <div className="w-12 h-12 rounded-sm border-2 border-white flex items-center justify-center mb-4">
          <Lock className="text-white" size={20} />
        </div>
        <span className="text-white font-bold text-[10px] uppercase tracking-widest">Restricted Access</span>
      </div>
    );
  };

  return (
    <>
      {/* Filter Bar */}
      <div className="sticky top-20 z-40 bg-white border-b-2 border-black w-full shadow-[0_4px_0_rgba(0,0,0,0.05)]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-6 space-y-6">
          <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
            <div className="flex flex-col gap-4 flex-grow overflow-hidden">
              <div className="flex items-center gap-4 overflow-x-auto pb-1 scrollbar-hide">
                <span className="shrink-0 text-[10px] font-black tracking-widest uppercase bg-black text-white px-2 py-0.5">SCENE ID:</span>
                {pillars.map((pillar) => (
                  <button
                    key={pillar}
                    onClick={() => setFilter(pillar)}
                    className={`shrink-0 px-3 py-1.5 text-[11px] border-2 transition-all whitespace-nowrap uppercase font-bold ${
                      filter === pillar
                        ? "border-black bg-black text-white shadow-[4px_4px_0px_#FF4500]"
                        : "border-gray-200 hover:border-black text-gray-400 hover:text-black"
                    }`}
                  >
                    {pillar === "All" ? "ALL_PILLARS" : pillar.split(" (")[0]}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4 overflow-x-auto pb-1 scrollbar-hide">
                <span className="shrink-0 text-[10px] font-black tracking-widest uppercase bg-black text-white px-2 py-0.5">SHAPE ID:</span>
                {shapes.map((shape) => (
                  <button
                    key={shape}
                    onClick={() => setShapeFilter(shape)}
                    className={`shrink-0 px-3 py-1.5 text-[11px] border-2 transition-all whitespace-nowrap uppercase font-bold ${
                      shapeFilter === shape
                        ? "border-black bg-black text-white shadow-[4px_4px_0px_#FF4500]"
                        : "border-gray-200 hover:border-black text-gray-400 hover:text-black"
                    }`}
                  >
                    {shape === "All" ? "ALL_SHAPES" : shape}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="shrink-0 flex flex-col gap-3">
              <div className="flex items-start gap-4 p-4 border-2 border-black bg-gray-50 max-w-sm relative">
                <div className="absolute -top-3 -left-2 gaffer-tape-orange text-[9px] px-2 py-0.5 z-10">OPERATOR TIP</div>
                <Sparkles className="text-accent shrink-0 mt-0.5" size={16} />
                <p className="text-[10px] leading-relaxed text-black uppercase tracking-tight font-bold">
                  All styles are <span className="underline decoration-accent decoration-2 underline-offset-2">Interchangeable</span> across materials. Jars, Bottles, and Cans share identical physics in most scenes.
                </p>
              </div>
            </div>
          </div>

          {filter !== "All" && PILLAR_DESCRIPTIONS[filter] && (
             <motion.div 
               initial={{ opacity: 0, y: -10 }} 
               animate={{ opacity: 1, y: 0 }}
               className="p-4 border-2 border-black bg-accent text-white flex items-center gap-4 shadow-[4px_4px_0px_#000]"
             >
                <div className="shrink-0 font-black text-2xl opacity-50">#</div>
                <p className="text-xs font-bold uppercase tracking-tight leading-snug">
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
              className="group relative film-slide bg-black overflow-hidden cursor-crosshair flex flex-col transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)]"
            >
              <div className="relative w-full overflow-hidden aspect-[3/4] bg-white">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <span className="font-mono text-[80px] font-black text-black select-none">35MM</span>
                </div>
                
                <Image 
                  src={style.afterImage} 
                  alt={`${style.name} AI product photo prompt`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="relative z-10 object-cover w-full h-full transition-all duration-500 group-hover:opacity-90"
                  priority={idx < 8}
                  quality={90}
                />

                {renderCardOverlay(style)}
                
                {style.isFree && (
                  <div className="absolute top-4 right-4 z-30">
                    <div className="gaffer-tape">FREE_SLIDE</div>
                  </div>
                )}

                <div className="absolute bottom-4 left-4 z-30 pointer-events-none">
                  <div className="bg-black/80 text-[8px] text-white px-2 py-1 font-mono tracking-tighter uppercase backdrop-blur-sm border border-white/20">
                    EXP_NO_{idx + 1000}
                  </div>
                </div>
              </div>

              <div className="p-4 relative z-20 bg-black text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[9px] uppercase tracking-tighter text-gray-400 font-bold">
                    {style.pillar.split(" (")[0]}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                </div>
                <h3 className="text-white font-bold text-sm leading-tight uppercase tracking-tight group-hover:text-accent transition-colors duration-200">
                  {style.name}
                </h3>
                {!style.isFree && hasAccess && (
                   <div className="mt-3 flex items-center gap-1.5 text-[9px] text-accent uppercase font-bold tracking-widest border border-accent/30 px-2 py-0.5 rounded-sm inline-block">
                      <Check size={10} /> KEY_ACCEPTED
                   </div>
                )}
              </div>
              
              {/* Technical Crop Marks */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 z-20 pointer-events-none" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 z-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 z-20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 z-20 pointer-events-none" />
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
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl bg-[#111111] border-2 border-white/10 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row max-h-[95vh] overflow-y-auto"
            >
              {/* Mobile Header */}
              <div className="p-6 pb-4 md:hidden flex justify-between items-start border-b border-white/5 bg-[#111111] sticky top-0 z-30">
                <div>
                  <p className="text-accent font-mono text-[10px] mb-1 tracking-widest uppercase">{selectedStyle.pillar}</p>
                  <h2 className="text-2xl font-bold tracking-tighter leading-tight text-white uppercase">{selectedStyle.name}</h2>
                </div>
                <button 
                  onClick={() => setSelectedStyle(null)}
                  className="p-2 bg-white/5 rounded-full text-white/50"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Image Section - The Lightbox */}
              <div className="md:w-3/5 aspect-[3/4] md:aspect-auto relative bg-[#050505] flex items-center justify-center p-4 md:p-12 border-b md:border-b-0 md:border-r border-white/5">
                <div className="relative w-full h-full shadow-[0_0_100px_rgba(255,255,255,0.05)] border-8 border-black">
                  <Image 
                    src={selectedStyle.afterImage} 
                    alt={`${selectedStyle.name} AI product photo prompt`}
                    fill
                    className="relative z-10 object-contain w-full h-full" 
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                    quality={95}
                  />
                  {/* Focus Marks */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-white/20 rounded-full z-20 pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-accent rounded-full z-20 animate-pulse pointer-events-none" />
                </div>
              </div>

              {/* Content Section */}
              <div className="md:w-2/5 p-8 md:p-12 flex flex-col bg-[#111111] text-white">
                <div className="hidden md:flex justify-between items-start mb-8">
                  <div>
                    <div className="inline-block bg-accent text-white px-2 py-0.5 text-[9px] font-black uppercase mb-3 tracking-tighter">DATA_RECORD</div>
                    <h2 className="text-4xl font-black tracking-tighter leading-none mb-4 text-white uppercase">{selectedStyle.name}</h2>
                    <div className="flex gap-4">
                      <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest">
                        <span className="block text-white/20">AESTHETIC:</span>
                        {selectedStyle.pillar.split(" (")[0]}
                      </div>
                      <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest">
                        <span className="block text-white/20">TARGET:</span>
                        {selectedStyle.category}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedStyle(null)}
                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/30"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-8 flex-grow">
                  <div className="space-y-4">
                     <p className="text-xs text-white/60 font-bold uppercase tracking-tight leading-relaxed italic border-l-2 border-accent pl-4">
                        "{PILLAR_DESCRIPTIONS[selectedStyle.pillar] || "Advanced lighting setup with technical shadow and texture control."}"
                     </p>
                  </div>

                  <div className="p-8 rounded-sm bg-black border border-white/10 relative group shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-white/40 border-b border-white/10 pb-1">PROMPT_METADATA</span>
                      {canViewPrompt(selectedStyle) && (
                        <button 
                          onClick={() => handleCopy(selectedStyle.prompt)}
                          className="flex items-center gap-2 text-[10px] text-accent font-black uppercase tracking-tighter hover:text-white transition-colors"
                        >
                          {copied ? <Check size={12} /> : <Copy size={12} />}
                          {copied ? "COPIED" : "COPY_STRING"}
                        </button>
                      )}
                    </div>
                    <div className={`text-sm leading-relaxed font-mono ${!canViewPrompt(selectedStyle) ? "filter blur-md select-none opacity-20" : "text-white/90"}`}>
                      {selectedStyle.prompt}
                    </div>

                    {canViewPrompt(selectedStyle) && (
                      <div className="mt-8 pt-8 border-t border-white/5">
                        <div className="flex items-start gap-4">
                          <div className="mt-0.5 text-accent">
                            <i className="ri-terminal-box-line text-lg" />
                          </div>
                          <div className="text-[10px] leading-relaxed text-white/40 uppercase tracking-wider font-medium">
                            <span className="text-white font-bold block mb-1">OPERATOR_NOTE:</span>
                            Use this style as a **Multimodal Anchor** (Nano Banana) or **--sref** (Midjourney). 
                            Tune results by adjusting prompt weights in your CLI.
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {renderLockOverlay(selectedStyle)}
                  </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
                   <div className="font-mono text-[9px] text-white/20 uppercase tracking-widest">
                      FILE_ID: {selectedStyle.id.toUpperCase()}
                   </div>
                   <div className="font-mono text-[9px] text-white/20 uppercase tracking-widest">
                      SYSTEM_STATUS: ACTIVE
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
