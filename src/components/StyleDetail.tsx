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

  return (
    <div className="relative w-full max-w-6xl bg-surface border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[95vh] md:max-h-none overflow-y-auto md:overflow-hidden">
      {/* Mobile Header */}
      <div className="p-6 pb-4 md:hidden flex justify-between items-start border-b border-white/5 bg-surface sticky top-0 z-30">
        <div>
          <h2 className="text-2xl font-bold tracking-tight leading-tight text-textMain">{style.name}</h2>
        </div>
        {onClose && (
          <button 
            onClick={onClose}
            className="p-2 bg-white/5 rounded-full text-textMuted"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Image Section */}
      <div className="md:w-3/5 aspect-[3/4] md:aspect-auto relative bg-background flex items-center justify-center p-4 md:p-12 border-b md:border-b-0 md:border-r border-white/5 min-h-[400px]">
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
          <Image 
            src={style.afterImage} 
            alt={`${style.name} AI product photo prompt`}
            fill
            className="relative z-10 object-contain w-full h-full" 
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
            quality={95}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-between bg-surface overflow-y-auto">
        <div className="hidden md:flex justify-between items-start mb-10">
          <div>
            <h2 className="text-4xl font-bold tracking-tight leading-[1.1] mb-4 text-textMain">{style.name}</h2>
            <p className="text-textMuted font-medium text-sm">Best for: {style.category}</p>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full transition-colors text-textMuted"
            >
              <X size={24} />
            </button>
          )}
        </div>

        <div className="space-y-8 flex-grow">
          <div className="p-8 rounded-2xl bg-black/40 border border-white/5 relative group">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-textMuted">The AI Prompt</span>
              {canViewPrompt(style) && (
                <button 
                  onClick={() => handleCopy(style.prompt)}
                  className="flex items-center gap-2 text-xs text-accent hover:text-white transition-colors font-bold uppercase tracking-wider"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy Prompt"}
                </button>
              )}
            </div>
            <div className={`text-sm leading-relaxed font-mono ${!canViewPrompt(style) ? "filter blur-sm select-none" : "text-textMain"}`}>
              {style.prompt}
            </div>

            {canViewPrompt(style) && (
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
            
            {renderLockOverlay(style)}
          </div>
        </div>
      </div>
    </div>
  );
}
