"use client";

import Header from "@/components/Header";
import { motion } from "framer-motion";
import { Sparkles, Zap, Mail, Camera, Box, Layers, RefreshCcw } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "OPEN GEMINI",
      description: "Open Google Gemini. Ensure you are logged in and using a multimodal-capable account.",
      icon: <Camera className="text-accent" size={24} />
    },
    {
      id: "02",
      title: "COPY THE PROMPT",
      description: "Copy the studio-tuned logic block from ProductPhoto.pro and paste it into the Gemini chat box.",
      icon: <Layers className="text-accent" size={24} />
    },
    {
      id: "03",
      title: "UPLOAD & CONFIGURE",
      description: "Upload your raw product photo. For best results, also upload the StyleVault reference photo from this site to 'anchor' the lighting.",
      note: "Make sure you're on 'Thinking' or 'Pro' mode and click 'Create Images'.",
      icon: <Box className="text-accent" size={24} />
    },
    {
      id: "04",
      title: "ENJOY & EDIT",
      description: "Enjoy your studio-grade render. Use the Gemini edit button to refine the prompt if you need a different background or color.",
      icon: <RefreshCcw className="text-accent" size={24} />
    }
  ];

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col selection:bg-accent selection:text-black w-full h-full bg-background text-textMain">
      <Header />

      <main className="max-w-[1000px] mx-auto px-6 py-20">
        {/* Concept */}
        <section className="mb-24">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-accent mb-4 font-bold">The Concept</h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter max-w-2xl leading-[1.1]">
            Curated Studio Lighting <br/>
            <span className="text-textMuted font-light">for AI-Native Operators.</span>
          </h1>
          <p className="text-textMuted text-lg leading-relaxed max-w-3xl font-light">
            ProductPhoto.pro is a curated library of premium AI product photography prompts for **DTC & e-commerce brands**. We capture high-end architectural shadows, organic wellness lighting, and aggressive hard-flash aesthetics. Members unlock the exact prompt and lighting geometry used to build every shot.
          </p>
        </section>

        {/* How to Generate */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold">How to Generate</h2>
            <div className="h-px flex-grow bg-borderSubtle"></div>
            <span className="text-[10px] text-textMuted font-mono">DESKTOP & MOBILE</span>
          </div>

          <div className="grid gap-12">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col md:flex-row gap-8 items-start group">
                <div className="flex-shrink-0">
                  <span className="text-5xl font-mono font-bold text-white/5 group-hover:text-accent/20 transition-colors">
                    {step.id}
                  </span>
                </div>
                <div className="flex-grow p-8 rounded-3xl bg-surface border border-borderSubtle group-hover:border-accent/30 transition-all shadow-2xl shadow-black/50">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 tracking-tight">{step.title}</h3>
                  <p className="text-textMuted leading-relaxed font-light mb-4">
                    {step.description}
                  </p>
                  {step.note && (
                    <div className="p-4 rounded-xl bg-background/50 border border-white/5 text-xs text-accent font-mono italic">
                      Note: {step.note}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Things to Keep in Mind */}
        <section className="mb-32 border-t border-borderSubtle pt-24">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-accent mb-12 font-bold">Things to Keep in Mind</h2>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Sparkles size={18} className="text-accent" /> Model Updates
              </h3>
              <p className="text-textMuted text-sm font-light leading-relaxed">
                Gemini updates their models frequently. As of March 2026, the engine is using <strong>Nano Banana 2</strong>. Our prompts are tuned for this specific version to ensure rim lighting and caustic physics remain consistent.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Zap size={18} className="text-accent" /> Inspiration, Not Duplication
              </h3>
              <p className="text-textMuted text-sm font-light leading-relaxed">
                AI results are probabilistic. The images on this site are the "target aesthetic." While your result will follow the lighting logic, it is inspired by, not a direct copy of, the reference.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Box size={18} className="text-accent" /> Daily Usage Limits
              </h3>
              <p className="text-textMuted text-sm font-light leading-relaxed">
                Google limits high-quality multimodal generations per 24-hour cycle:
                <br /><br />
                • Pro Users: ~20-40 images.<br />
                • Free Users: ~5-15 images.<br /><br />
                If quality suddenly drops or images become "flat," you have hit your daily limit.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Camera size={18} className="text-accent" /> Source Product Photos
              </h3>
              <div className="text-textMuted text-sm font-light leading-relaxed space-y-2">
                <p>For studio-grade results, your upload should be:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Well lit (Neutral, flat lighting is best)</li>
                  <li>Centered (Product should be the focus)</li>
                  <li>Clean (No extra clutter in the background)</li>
                  <li>Alone (Just the product you want to render)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="text-center p-16 rounded-[40px] bg-surface border border-borderSubtle shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 tracking-tight">Need to get in touch?</h2>
          <p className="text-textMuted mb-8 font-light italic">Have questions about a specific pillar or custom enterprise prompt engineering?</p>
          <div className="flex items-center justify-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-background transition-all">
              <Mail size={18} />
            </div>
            <span className="font-mono text-lg text-accent border-b border-accent/20 group-hover:border-accent transition-all">
              PROMPTMVSTR@GMAIL.COM
            </span>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-borderSubtle bg-surface mt-auto">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-textMuted text-sm font-light">
          <p>© 2026 ProductPhoto.pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
