import { GoogleGenAI, Modality } from "@google/genai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyCD5WHzJzQJn2ZWoD63-G9OG8yf8g0UpBA";
const ai = new GoogleGenAI({ apiKey: API_KEY });

const PILLARS = {
  CYBER: "The Cyber-Neon (High-Contrast)",
  SOFT: "The Soft-Focus (Dreamscape)",
  VOLUMETRIC: "The Volumetric (Atmosphere)",
  SOLAR: "The Solar-Flare (Direct)",
  MONOLITH: "The Monolith (Architectural)",
  LIQUID: "The Liquid-Metal (Reflective)",
  PRISM: "The Dark-Prism (Refractive)",
  STUDIO: "The Studio-Softbox (Commercial)",
  MOONLIGHT: "The Moonlight (Silver)",
  POOL: "The Obsidian-Pool (Reflection)"
};

const batch2Styles = [
  {
    id: "cyber-neon-pink-blue-can",
    name: "Pink & Blue Cyber Can",
    pillar: PILLARS.CYBER,
    category: "Beverage",
    masterAsset: "master-can.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: High-contrast dual-tone lighting. Vibrant neon pink rim-lighting from the left, electric blue key-lighting from the right.
[BACKGROUND]: A solid, midnight-black matte background (#000000).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.
[MOOD]: Cyberpunk, high-energy, nightlife editorial.`
  },
  {
    id: "soft-focus-dreamscape-bottle",
    name: "Dreamscape Soft-Focus Bottle",
    pillar: PILLARS.SOFT,
    category: "Oils/Liquids",
    masterAsset: "master-bottle.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Ultra-soft, high-key white wash. Extremely diffused light with zero visible shadow edges. A slight 'bloom' effect on the product edges.
[BACKGROUND]: A pure white silk-textured background with soft, out-of-focus fabric ripples.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.
[MOOD]: Pure, ethereal, high-end beauty.`
  },
  {
    id: "volumetric-fog-pouch",
    name: "Atmospheric Volumetric Pouch",
    pillar: PILLARS.VOLUMETRIC,
    category: "Snacks/Supps",
    masterAsset: "master-pouch.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Single 'God-ray' light beam cutting through a heavy, hazy atmosphere (volumetric lighting).
[BACKGROUND]: A dark, moody charcoal-gray setting with visible dust particles in the light beam.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.
[MOOD]: Cinematic, dramatic, high-performance.`
  },
  {
    id: "solar-flare-direct-can",
    name: "Direct Solar-Flare Can",
    pillar: PILLARS.SOLAR,
    category: "Beverage",
    masterAsset: "master-can.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Harsh, direct overhead sunlight. A realistic horizontal anamorphic lens flare cutting across the top third of the product.
[BACKGROUND]: A solid, warm-sand matte background (#C2B280).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.
[MOOD]: Summer, high-noon, refreshing.`
  },
  {
    id: "monolith-window-shadow-jar",
    name: "Geometric Window Shadow Jar",
    pillar: PILLARS.MONOLITH,
    category: "Sauces/Spreads",
    masterAsset: "master-jar.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Sharp morning sun passing through a repeating geometric window frame (slatted shadows).
[BACKGROUND]: A clean, light-beige plaster wall (#F5F5DC).
[SHADOW]: Long, repeating horizontal shadows stretching across the jar and the floor.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "liquid-metal-mercury-bottle",
    name: "Mercury Liquid-Metal Bottle",
    pillar: PILLARS.LIQUID,
    category: "Oils/Liquids",
    masterAsset: "master-bottle.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[COMPOSITION]: The product standing in the center of a shallow pool of liquid mercury.
[LIGHTING]: High-key studio lighting reflecting perfectly in the metallic liquid surface.
[BACKGROUND]: A solid, dark slate matte background (#2F4F4F).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "dark-prism-rainbow-jar",
    name: "Dark Prism Rainbow Jar",
    pillar: PILLARS.PRISM,
    category: "Sauces/Spreads",
    masterAsset: "master-jar.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: A single rainbow-colored light refraction (prism effect) hitting the face of the jar at a 45-degree angle.
[BACKGROUND]: A pitch-black velvet background (#050505).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "studio-softbox-commercial-pouch",
    name: "Commercial Softbox Pouch",
    pillar: PILLARS.STUDIO,
    category: "Snacks/Supps",
    masterAsset: "master-pouch.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Classic 3-point studio lighting. Large rectangular softbox reflections visible on the product surface. Perfectly even fill light.
[BACKGROUND]: A seamless, light-gray gradient background (#E0E0E0 to #FFFFFF).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "moonlight-silver-can",
    name: "Silver Moonlight Can",
    pillar: PILLARS.MOONLIGHT,
    category: "Beverage",
    masterAsset: "master-can.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Cold, silver-toned moonlight from high above. Deep, midnight-blue shadows.
[BACKGROUND]: A dark, textured stone surface under a night sky.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.
[MOOD]: Mystical, premium, nocturnal.`
  },
  {
    id: "obsidian-pool-reflection-bottle",
    name: "Obsidian Pool Reflection Bottle",
    pillar: PILLARS.POOL,
    category: "Oils/Liquids",
    masterAsset: "master-bottle.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[COMPOSITION]: The product standing on a black mirror surface. A subtle, circular water ripple emanating from the base.
[LIGHTING]: Soft rim-lighting that reflects in the dark water.
[BACKGROUND]: A solid, obsidian-black matte background (#0A0A0A).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  }
];

async function generate() {
  const libraryDir = "library";
  if (!fs.existsSync(libraryDir)) fs.mkdirSync(libraryDir);

  for (const style of batch2Styles) {
    const styleDir = path.join(libraryDir, style.id);
    if (fs.existsSync(path.join(styleDir, "after.png"))) {
      console.log(`Skipping ${style.id} - already exists.`);
      continue;
    }

    if (!fs.existsSync(styleDir)) fs.mkdirSync(styleDir, { recursive: true });

    console.log(`Generating: ${style.id}...`);
    const masterPath = path.join("master-assets", style.masterAsset);
    if (!fs.existsSync(masterPath)) {
      console.error(`Missing master: ${masterPath}`);
      continue;
    }

    const imageBuffer = fs.readFileSync(masterPath);
    const imagePart = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png"
      }
    };

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: [style.prompt, imagePart],
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });

      const parts = response.candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData) {
          const buffer = Buffer.from(part.inlineData.data, "base64");
          fs.writeFileSync(path.join(styleDir, "after.png"), buffer);
          fs.copyFileSync(masterPath, path.join(styleDir, "before.png"));
          console.log(`✅ Saved: ${style.id}`);
        }
      }
    } catch (err) {
      console.error(`❌ Error ${style.id}:`, err.message || err);
    }
  }
}

generate();
