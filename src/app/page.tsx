"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Lock, Copy, Check, Eye } from "lucide-react";

export default function Home() {
  const [filter, setFilter] = useState("All");
  const [selectedStyle, setSelectedStyle] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [styles, setStyles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStyles() {
      const { data, error } = await supabase
        .from("styles")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching styles:", error);
      } else {
        // Map database snake_case to camelCase for the frontend
        const mappedData = data.map((item: any) => ({
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
    fetchStyles();
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
    <main className="min-h-screen bg-background text-foreground px-6 py-12">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-16 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter"
        >
          ProductPic<span className="text-accent">.pro</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto mb-10"
        >
          The High-End Scene Vault for DTC Brands. 55+ Studio-grade prompts for photorealistic AI product renders.
        </motion.p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {pillars.map((pillar) => (
            <button
              key={pillar}
              onClick={() => setFilter(pillar)}
              className={`px-6 py-2 rounded-full border text-sm transition-all ${
                filter === pillar 
                  ? "bg-accent text-background border-accent" 
                  : "border-white/10 hover:border-accent/50 text-gray-400"
              }`}
            >
              {pillar.split(" (")[0]}
            </button>
          ))}
        </div>
      </header>

      {/* Grid */}
      <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredStyles.map((style, idx) => (
          <motion.div
            key={style.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => setSelectedStyle(style)}
            className="relative group cursor-pointer break-inside-avoid rounded-2xl overflow-hidden border border-white/5 bg-card hover:border-accent/30 transition-all"
          >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <img 
                src={style.afterImage} 
                alt={style.name}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-accent text-xs font-mono mb-1">{style.pillar.toUpperCase()}</p>
                    <h3 className="text-xl font-bold">{style.name}</h3>
                  </div>
                  {style.isFree ? (
                    <span className="bg-green-500/20 text-green-400 text-[10px] px-2 py-1 rounded border border-green-500/30 font-bold uppercase tracking-wider">Free</span>
                  ) : (
                    <Lock size={18} className="text-accent" />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedStyle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStyle(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-card border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Image Side */}
              <div className="md:w-1/2 aspect-square relative bg-background flex items-center justify-center">
                <img src={selectedStyle.afterImage} className="object-contain w-full h-full" />
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest border border-white/10 uppercase">Render</div>
              </div>

              {/* Content Side */}
              <div className="md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-accent font-mono text-xs mb-2 tracking-widest uppercase">{selectedStyle.pillar}</p>
                      <h2 className="text-3xl font-bold tracking-tight leading-none mb-2">{selectedStyle.name}</h2>
                      <p className="text-gray-500 text-sm">Best for: {selectedStyle.category}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedStyle(null)}
                      className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500"
                    >
                      <Eye size={20} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5 relative group">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">The AI Prompt</span>
                        <button 
                          onClick={() => handleCopy(selectedStyle.prompt)}
                          className="flex items-center gap-2 text-xs text-accent hover:text-white transition-colors"
                        >
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                          {copied ? "Copied" : "Copy Prompt"}
                        </button>
                      </div>
                      <div className={`text-sm leading-relaxed font-mono ${!selectedStyle.isFree ? "filter blur-sm select-none" : ""}`}>
                        {selectedStyle.prompt}
                      </div>
                      {!selectedStyle.isFree && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                          <div className="text-center p-6 glass rounded-2xl">
                            <Lock className="mx-auto mb-3 text-accent" size={24} />
                            <p className="font-bold mb-1">MEMBERS ONLY</p>
                            <p className="text-xs text-gray-400 mb-4">Join to unlock the full 55-prompt vault.</p>
                            <button className="w-full bg-accent text-background font-bold py-2 rounded-lg text-xs hover:brightness-110 transition-all">
                              Unlock the Vault — $29
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex gap-4">
                   <div className="flex-1 text-center">
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Stability</p>
                      <p className="text-xs">High</p>
                   </div>
                   <div className="flex-1 text-center border-x border-white/5">
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Lighting</p>
                      <p className="text-xs">Studio</p>
                   </div>
                   <div className="flex-1 text-center">
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Aesthetic</p>
                      <p className="text-xs">Premium</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}