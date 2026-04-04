"use client";

import Header from "@/components/Header";
import { Sparkles, Zap, Camera, Box, Layers, RefreshCcw, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "OPEN GEMINI",
      description: "Use Gemini 3.1 Flash (Nano Banana 2) or Gemini 3 Pro (Nano Banana Pro) for multimodal capabilities.",
      icon: <Camera size={20} />
    },
    {
      id: "02",
      title: "COPY PROMPT",
      description: "Copy the technical prompt anchor from our library to lock in high-end shadow and lighting physics.",
      icon: <Layers size={20} />
    },
    {
      id: "03",
      title: "UPLOAD ASSET",
      description: "Upload your raw product photo + our style reference. This acts as a visual 'multimodal' guide for the model.",
      icon: <Box size={20} />
    },
    {
      id: "04",
      title: "ITERATE",
      description: "The result is a studio-grade render. Use the model's native editing tools to refine textures or swap backgrounds.",
      icon: <RefreshCcw size={20} />
    }
  ];

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col selection:bg-white selection:text-black w-full h-full bg-background text-white">
      <Header />

      <main className="max-w-[1200px] mx-auto px-6 py-24">
        {/* Concept */}
        <section className="mb-32">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-textMuted mb-6 font-bold italic">The Methodology</h2>
          <h1 className="text-5xl md:text-8xl font-bold mb-12 tracking-[-0.04em] leading-[0.9] uppercase">
            Multimodal <br/>
            <span className="text-textMuted italic">Visual Anchors.</span>
          </h1>
          <p className="text-textMuted text-lg md:text-2xl leading-tight max-w-2xl font-medium tracking-tight uppercase">
            ProductPhoto.pro is not a prompt generator. It is a technical library of <strong>Visual Anchors</strong>—curated images and prompt logic that guide multimodal models to replicate complex studio physics.
          </p>
        </section>

        {/* Process Grid */}
        <section className="mb-48">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-borderSubtle border border-borderSubtle">
            {steps.map((step) => (
              <div key={step.id} className="bg-background p-12 space-y-8 flex flex-col group hover:bg-white transition-colors duration-300">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-bold text-textMuted group-hover:text-black">STEP — {step.id}</span>
                  <div className="text-white group-hover:text-black">{step.icon}</div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold tracking-tighter uppercase group-hover:text-black">{step.title}</h3>
                  <p className="text-textMuted text-xs uppercase tracking-widest leading-relaxed group-hover:text-black/70">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Principles */}
        <section className="mb-48 border-t border-borderSubtle pt-24">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-textMuted mb-16 font-bold italic">Technical Principles</h2>
          
          <div className="grid md:grid-cols-2 gap-24">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold tracking-tighter flex items-center gap-4 uppercase">
                <Sparkles size={20} /> Model Fidelity
              </h3>
              <p className="text-textMuted text-sm uppercase tracking-widest leading-relaxed">
                Google updates their models frequently. Our prompts are tuned specifically for the <strong>Nano Banana</strong> architecture to ensure caustic rim lighting and texture accuracy.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold tracking-tighter flex items-center gap-4 uppercase">
                <Zap size={20} /> Probabilistic Lighting
              </h3>
              <p className="text-textMuted text-sm uppercase tracking-widest leading-relaxed">
                AI results are probabilistic. The library acts as the &quot;target aesthetic.&quot; Use the anchors to lock in the lighting logic while allowing the model to adapt to your specific product shape.
              </p>
            </div>
          </div>
        </section>

        {/* Contact/Support */}
        <section className="p-16 border border-white text-center space-y-8 bg-white text-black">
          <h2 className="text-3xl font-bold tracking-tighter uppercase">Support & Custom Integration</h2>
          <p className="text-sm max-w-sm mx-auto uppercase tracking-widest leading-relaxed font-bold">
            Need custom prompt tuning or bulk multimodal integration for your enterprise brand?
          </p>
          <div className="flex items-center justify-center">
             <a href="mailto:AKHIL@LISNAGENCY.ONLINE" className="flex items-center gap-4 text-xl font-bold uppercase tracking-tight group">
                AKHIL@LISNAGENCY.ONLINE
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
             </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-borderSubtle bg-background mt-auto">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-24 flex flex-col md:flex-row items-center justify-between gap-6 text-textMuted text-[10px] font-bold uppercase tracking-[0.3em]">
          <p>© 2026 ProductPhoto.pro</p>
          <p>BUILT FOR DTC OPERATORS</p>
        </div>
      </footer>
    </div>
  );
}
