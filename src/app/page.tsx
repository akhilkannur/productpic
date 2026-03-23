"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Lock, Copy, Check, Eye, X, Sparkles } from "lucide-react";
import Header from "@/components/Header";

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [styles, setStyles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      // 1. Get User Session
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        // 2. Check Profile Access
        const { data: profile } = await supabase
          .from('profiles')
          .select('has_access')
          .eq('id', session.user.id)
          .single();
        
        setHasAccess(!!profile?.has_access);
      }

      // 3. Get Styles
      const { data: stylesData, error } = await supabase
        .from("styles")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching styles:", error);
      } else {
        const mappedData = stylesData.map((item: any) => ({
          id: item.id,
          name: item.name,
          pillar: item.pillar,
          category: item.category,
          prompt: item.prompt,
          beforeImage: item.before_image,
          afterImage: item.after_image,
          isFree: item.is_free,
        }));
        setStyles(mappedData);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const pillars = ["All", ...Array.from(new Set(styles.map((s) => s.pillar)))];

  const filteredStyles = filter === "All" 
    ? styles 
    : styles.filter((s) => s.pillar === filter);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col selection:bg-accent selection:text-black w-full h-full">
      <Header />

      {/* Hero Section */}
      <section className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-16 pb-10 w-full">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-textMain">
            Studio Quality.<br />
            <span className="text-textMuted font-light">Zero Setup.</span>
          </h1>
          <p className="text-textMuted text-lg md:text-xl leading-relaxed max-w-2xl font-light">
            The definitive prompt library for DTC brand owners. Generate photorealistic, highly-stylized product photography instantly.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-xl border-b border-borderSubtle w-full">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-5">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {pillars.map((pillar) => (
              <button
                key={pillar}
                onClick={() => setFilter(pillar)}
                className={`shrink-0 px-6 py-2.5 rounded-full border text-sm transition-all whitespace-nowrap ${
                  filter === pillar
                    ? "border-accent bg-accent text-background font-semibold shadow-[0_0_10px_rgba(210,180,140,0.1)]"
                    : "border-borderSubtle hover:border-accent/40 hover:bg-surface text-textMuted hover:text-textMain font-medium"
                }`}
              >
                {pillar === "All" ? "All Scenes" : pillar.split(" (")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <main className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 w-full flex-grow">
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {filteredStyles.map((style, idx) => (
            <motion.div
              key={style.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.02 }}
              onClick={() => setSelectedStyle(style)}
              className="group relative rounded-xl overflow-hidden bg-surface border border-borderSubtle hover:border-accent/30 transition-all duration-500 break-inside-avoid shadow-2xl shadow-black/50 cursor-pointer flex flex-col"
            >
              <div className="relative w-full overflow-hidden aspect-[3/4]">
                {/* Background placeholder if image is loading */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
                  <i className="ri-image-circle-line text-white/5 text-6xl"></i>
                </div>
                
                <img 
                  src={style.afterImage} 
                  alt={style.name}
                  className="relative z-10 object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />

                {/* Lock Overlay for non-free prompts */}
                {(!style.isFree && !hasAccess) && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center z-20 backdrop-blur-[2px] pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <i className="ri-lock-2-fill text-accent text-2xl drop-shadow-[0_0_8px_rgba(210,180,140,0.5)]"></i>
                    </div>
                    <span className="text-white font-medium text-sm tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out">Unlock Prompt</span>
                  </div>
                )}
                
                {/* Free label */}
                {style.isFree && (
                  <div className="absolute top-4 right-4 z-30">
                    <span className="bg-green-500/20 text-green-400 text-[10px] px-2 py-1 rounded border border-green-500/30 font-bold uppercase tracking-wider backdrop-blur-sm">Free</span>
                  </div>
                )}
              </div>

              <div className="p-5 relative z-20 bg-surface border-t border-borderSubtle">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/80 font-medium">
                    {style.pillar.split(" (")[0]}
                  </span>
                  <i className="ri-arrow-right-up-line text-textMuted opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all duration-300 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"></i>
                </div>
                <h3 className="text-textMain font-medium text-base leading-snug group-hover:text-accent transition-colors duration-300">
                  {style.name}
                </h3>
                {!style.isFree && hasAccess && (
                   <div className="mt-2 flex items-center gap-1 text-[9px] text-accent/50 uppercase font-bold tracking-widest">
                      <i className="ri-shield-check-line text-xs" /> UNLOCKED
                   </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-borderSubtle bg-surface mt-auto">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center text-accent">
              <i className="ri-camera-lens-fill text-sm"></i>
            </div>
            <span className="font-medium text-lg text-textMain tracking-tight">ProductPic.pro</span>
          </div>
          <p className="text-textMuted text-sm font-light">© 2024 ProductPic.pro. All rights reserved.</p>
          <div className="flex items-center gap-4 text-textMuted">
            <a href="#" className="hover:text-accent transition-colors"><i className="ri-twitter-x-line text-xl"></i></a>
            <a href="#" className="hover:text-accent transition-colors"><i className="ri-instagram-line text-xl"></i></a>
          </div>
        </div>
      </footer>

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
              className="relative w-full max-w-5xl bg-surface border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Image Side */}
              <div className="md:w-1/2 aspect-square relative bg-background flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
                <img src={selectedStyle.afterImage} className="relative z-10 object-contain w-full h-full" alt={selectedStyle.name} />
                <button 
                  onClick={() => setSelectedStyle(null)}
                  className="absolute top-4 right-4 md:hidden p-2 bg-black/50 backdrop-blur-md rounded-full text-white z-20"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content Side */}
              <div className="md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-accent font-mono text-xs mb-2 tracking-widest uppercase">{selectedStyle.pillar}</p>
                      <h2 className="text-3xl font-bold tracking-tight leading-none mb-2 text-textMain">{selectedStyle.name}</h2>
                      <p className="text-textMuted text-sm">Best for: {selectedStyle.category}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedStyle(null)}
                      className="hidden md:block p-2 hover:bg-white/5 rounded-full transition-colors text-textMuted"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5 relative group">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-textMuted">The AI Prompt</span>
                        {(selectedStyle.isFree || hasAccess) && (
                          <button 
                            onClick={() => handleCopy(selectedStyle.prompt)}
                            className="flex items-center gap-2 text-xs text-accent hover:text-white transition-colors"
                          >
                            {copied ? <Check size={14} /> : <Copy size={14} />}
                            {copied ? "Copied" : "Copy Prompt"}
                          </button>
                        )}
                      </div>
                      <div className={`text-sm leading-relaxed font-mono ${(!selectedStyle.isFree && !hasAccess) ? "filter blur-sm select-none" : "text-textMain"}`}>
                        {selectedStyle.prompt}
                      </div>

                      {(selectedStyle.isFree || hasAccess) && (
                        <div className="mt-6 p-4 rounded-xl bg-accent/5 border border-accent/10 flex items-start gap-3">
                          <div className="mt-0.5 text-accent">
                            <Sparkles size={16} />
                          </div>
                          <div className="text-[11px] leading-relaxed text-textMuted uppercase tracking-wider font-medium">
                            <span className="text-accent">Gemini/Midjourney Pro Tip:</span> Using the reference photo above as a **Multimodal Anchor** (Gemini 2.0) or an **--sref** (Midjourney) will drastically improve lighting and shadow physics. 
                            <span className="block mt-1 opacity-60 text-[9px] italic">AI results are probabilistic. These prompts are tuned for studio-grade realism but results depend on the quality of your source upload.</span>
                          </div>
                        </div>
                      )}
                      
                      {(!selectedStyle.isFree && !hasAccess) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                          <div className="text-center p-6 bg-surface/80 border border-white/10 backdrop-blur-md rounded-2xl shadow-2xl">
                            <Lock className="mx-auto mb-3 text-accent" size={24} />
                            <p className="font-bold mb-1 text-textMain">MEMBERS ONLY</p>
                            <p className="text-xs text-textMuted mb-4">Join to unlock the full vault.</p>
                            <a 
                              href="https://checkout.dodopayments.com/buy/pdt_0Nb6DxNGX1dZxvAqv6u9o?quantity=1"
                              target="_blank"
                              className="block w-full bg-accent text-background text-center font-bold py-2.5 px-6 rounded-lg text-xs hover:bg-accent-hover transition-all"
                            >
                              Unlock Vault — $29
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
