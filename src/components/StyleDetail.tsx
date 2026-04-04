"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Lock, Copy, Check, X, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Style } from "@/lib/styles";

interface StyleDetailProps {
  style: Style;
  onClose?: () => void;
}

export default function StyleDetail({ style, onClose }: StyleDetailProps) {
  const [copied, setCopied] = useState(false);
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
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const canViewPrompt = (style: Style) => {
    if (hasAccess) return true;
    if (style.isFree) return true;
    return false;
  };

  const renderLockOverlay = (style: Style) => {
    if (canViewPrompt(style)) return null;

    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-40 p-6">
        <div className="text-center p-12 bg-black border border-white/20 max-w-sm w-full">
          <Lock className="mx-auto mb-6 text-white" size={32} />
          <h3 className="font-bold mb-2 text-white tracking-tight text-xl uppercase">LIBRARY ACCESS</h3>
          <p className="text-xs text-textMuted mb-8 uppercase tracking-widest leading-relaxed">
            Unlock lifetime access to all 100+ technical prompt anchors.
          </p>
          <a 
            href="https://checkout.dodopayments.com/buy/pdt_0Nb6DxNGX1dZxvAqv6u9o?quantity=1"
            target="_blank"
            className="block w-full bg-white text-black text-center font-bold py-4 text-[11px] uppercase tracking-[0.2em] hover:bg-white/90 transition-all"
          >
            Unlock $29
          </a>
          <p className="text-[10px] text-textMuted mt-6 font-bold uppercase tracking-widest opacity-40">Batch 01 — 50 Slots</p>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-7xl bg-background border border-borderSubtle flex flex-col md:flex-row max-h-[95vh] md:max-h-none overflow-y-auto md:overflow-hidden">
      {/* Mobile Header */}
      <div className="p-8 pb-4 md:hidden flex justify-between items-start border-b border-borderSubtle bg-background sticky top-0 z-30">
        <div>
          <h2 className="text-xl font-bold tracking-tighter text-textMain uppercase">{style.name}</h2>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-2 border border-borderSubtle text-textMuted"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 aspect-[4/5] md:aspect-auto relative bg-background border-b md:border-b-0 md:border-r border-borderSubtle min-h-[400px]">
        <Image 
          src={style.afterImage} 
          alt={`${style.name}`}
          fill
          className="object-contain p-8 md:p-12" 
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          quality={95}
        />
      </div>

      {/* Content Section */}
      <div className="md:w-1/2 flex flex-col bg-background">
        <div className="hidden md:flex justify-between items-start p-12 border-b border-borderSubtle">
          <div>
            <h2 className="text-4xl font-bold tracking-tighter leading-none mb-4 uppercase">{style.name}</h2>
            <div className="flex gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-textMuted">
              <span>CAT: {style.category}</span>
              <span>TYPE: {style.pillar}</span>
            </div>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-3 border border-borderSubtle hover:border-white transition-colors text-textMuted hover:text-white"
            >
              <X size={24} />
            </button>
          )}
        </div>

        <div className="flex-grow flex flex-col min-h-0">
          <div className="p-12 relative flex-grow flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-textMuted">Technical Prompt</span>
              {canViewPrompt(style) && (
                <button 
                  onClick={() => handleCopy(style.prompt)}
                  className="flex items-center gap-2 text-[10px] text-white hover:opacity-70 transition-opacity font-bold uppercase tracking-[0.2em]"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              )}
            </div>
            
            <div className={`text-sm leading-relaxed font-mono whitespace-pre-wrap flex-grow ${!canViewPrompt(style) ? "filter blur-md select-none opacity-20" : "text-white"}`}>
              {style.prompt}
            </div>

            {canViewPrompt(style) && (
              <div className="mt-12 pt-8 border-t border-borderSubtle">
                <div className="flex items-start gap-4">
                  <Sparkles size={16} className="text-white mt-1 shrink-0" />
                  <div className="text-[10px] leading-relaxed text-textMuted uppercase tracking-widest font-bold">
                    <span className="text-white block mb-1">Anchor Methodology:</span>
                    Use this photo as a **Multimodal Anchor** in Gemini or an **--sref** in Midjourney to replicate these specific caustic physics.
                  </div>
                </div>
              </div>
            )}
            
            {renderLockOverlay(style)}
          </div>
        </div>
      </div>
    </div>
  );
}
