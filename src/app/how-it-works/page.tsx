"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Zap, ShieldCheck, Sparkles, X } from "lucide-react";
import Header from "@/components/Header";

export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Select Your Aesthetic",
      description: "Browse the StyleVault pillars. Whether you need the organic soft light of 'The Botanical' or the brutalist stone shadows of 'The Monolith', choose the scene that fits your brand identity.",
      icon: <Sparkles className="text-accent" size={24} />
    },
    {
      id: "02",
      title: "Copy the Pillar Prompt",
      description: "Unlike generic prompts, ours are studio-tuned for specific product geometries. Copy the logic directly from the Vault.",
      icon: <Zap className="text-accent" size={24} />
    },
    {
      id: "03",
      title: "Upload & Configure",
      description: "Open your AI tool (Gemini or Midjourney), upload your raw product photo, and paste the prompt. The AI uses our scene logic to wrap your product in premium lighting.",
      icon: <ArrowRight className="text-accent" size={24} />
    },
    {
      id: "04",
      title: "Export Studio Results",
      description: "Get high-resolution, studio-grade product photography in seconds. Ready for your Shopify store, Instagram, or ad creatives.",
      icon: <Check className="text-accent" size={24} />
    }
  ];

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col selection:bg-accent selection:text-black w-full h-full bg-background text-textMain">
      <Header />

      <main className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter"
          >
            How it <span className="text-textMuted font-light">Works.</span>
          </h1>
          <p className="text-textMuted text-xl max-w-2xl mx-auto font-light">
            Go from a raw smartphone photo to studio-grade editorial photography in under 60 seconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 gap-12 mb-32">
          {steps.map((step, idx) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-surface border border-borderSubtle relative group"
            >
              <div className="text-5xl font-mono text-white/5 absolute top-6 right-8 group-hover:text-accent/10 transition-colors">
                {step.id}
              </div>
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-textMain">{step.title}</h3>
              <p className="text-textMuted leading-relaxed font-light">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Concept Section */}
        <section className="mb-32">
          <div className="p-12 rounded-[40px] bg-accent/5 border border-accent/10 relative overflow-hidden">
             <div className="relative z-10 max-w-3xl">
                <h2 className="text-3xl font-bold mb-6 text-textMain">The "Pillar" Concept</h2>
                <p className="text-textMuted text-lg leading-relaxed mb-8 font-light">
                  Most AI prompts fail because they don't understand how light interacts with specific materials. Our **Aesthetic Pillars** are engineered with "Spatial Logic"—pre-tuned tokens for **Refraction, Rim Lighting, and Caustics**. We don't just describe a scene; we define the physics of the environment.
                </p>
                <div className="flex flex-wrap gap-8">
                   <div className="flex items-center gap-2 text-sm text-accent">
                      <ShieldCheck size={18} />
                      <span>Volumetric Shadow Logic</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm text-accent">
                      <ShieldCheck size={18} />
                      <span>High-Dynamic Range (HDR) Rim Lighting</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm text-accent">
                      <ShieldCheck size={18} />
                      <span>Preserved Surface Integrity</span>
                   </div>
                </div>
             </div>
             <div className="absolute right-[-10%] top-[-10%] text-[200px] font-bold text-accent/[0.03] select-none pointer-events-none">
                PILLAR
             </div>
          </div>
        </section>

        {/* Tips Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-textMain">
            <Zap className="text-accent" /> Gemini & Midjourney Pro-Tips
          </h2>
          <div className="space-y-8 text-textMuted font-light leading-relaxed">
            <div className="border-l-2 border-accent/30 pl-6">
              <strong className="text-textMain block mb-2 font-medium">1. For Gemini 2.0 Users (Visual Reasoning)</strong>
              <p>Upload the <strong>Reference Image</strong> (the 'After' render) along with your product photo. Gemini 2.0's multimodal reasoning will 'anchor' the lighting from the reference directly onto your product's specific geometry.</p>
            </div>
            
            <div className="border-l-2 border-accent/30 pl-6">
              <strong className="text-textMain block mb-2 font-medium">2. For Midjourney Users (Style Reference)</strong>
              <p>Use the <code className="text-accent bg-accent/5 px-1.5 py-0.5 rounded text-xs">--sref [URL]</code> parameter with the Reference Image link. Set <code className="text-accent bg-accent/5 px-1.5 py-0.5 rounded text-xs">--sw 100</code> to ensure the aesthetic transfers perfectly without altering your product's shape.</p>
            </div>

            <div className="border-l-2 border-accent/30 pl-6">
              <strong className="text-textMain block mb-2 font-medium">3. Controlling "Hallucination"</strong>
              <p>If the AI adds extra caps or labels, use the prompt anchor: <code className="text-accent italic">"strictly maintain the silhouette and label structure of the source image"</code>. This acts as a spatial constraint for the model.</p>
            </div>
          </div>
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
        </div>
      </footer>
    </div>
  );
}
