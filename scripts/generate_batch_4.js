import { GoogleGenAI, Modality } from "@google/genai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

const API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

const PILLARS = {
  LAVA: "The Lava-Glow (Magmatic)",
  AURORA: "The Aurora (Polar)",
  ZENITH: "The Zenith (Overhead)",
  MIRAGE: "The Mirage (Heat Haze)",
  GRAPHITE: "The Graphite (Matte)",
  PRISMATIC: "The Prismatic (Spectrum)",
  VELVET: "The Velvet-Noir (Luxury)",
  LIMESTONE: "The Limestone-Sun (Architectural)",
  NEON: "The Neon-Flux (Tracing)",
  FOG: "The Fog-Wall (Silhouette)"
};

const batch4Styles = [
  {
    id: "lava-glow-magmatic-jar",
    name: "Magmatic Lava-Glow Jar",
    pillar: PILLARS.LAVA,
    category: "Sauces/Spreads",
    masterAsset: "master-jar.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Intense 'Magmatic' red and orange under-lighting. The product appears to be sitting on a surface that is glowing from within.
[BACKGROUND]: A solid, dark obsidian matte background (#0A0A0A).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "aurora-polar-can",
    name: "Polar Aurora Can",
    pillar: PILLARS.AURORA,
    category: "Beverage",
    masterAsset: "master-can.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Soft, multi-colored light trails (green and purple) mimicking the Aurora Borealis, reflecting off the product surface.
[BACKGROUND]: A dark, starless night sky matte background (#000000).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "zenith-overhead-pouch",
    name: "Direct Zenith Pouch",
    pillar: PILLARS.ZENITH,
    category: "Snacks/Supps",
    masterAsset: "master-pouch.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Extreme 'High Noon' lighting from directly above. Zero horizontal shadows. Bright, crisp highlights on the top surfaces.
[BACKGROUND]: A neutral, off-white studio floor (#F0F0F0).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "mirage-heat-haze-bottle",
    name: "Mirage Heat-Haze Bottle",
    pillar: PILLARS.MIRAGE,
    category: "Oils/Liquids",
    masterAsset: "master-bottle.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Harsh desert sun. The air at the base of the product appears distorted by 'Heat Haze' waves.
[BACKGROUND]: A solid, warm ocher matte background (#CC7722).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "graphite-matte-can",
    name: "Matte Graphite Can",
    pillar: PILLARS.GRAPHITE,
    category: "Beverage",
    masterAsset: "master-can.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Hard side-lighting reveal the micro-texture of a graphite wall.
[BACKGROUND]: A dark, textured matte graphite surface (#2B2B2B).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "prismatic-spectrum-jar",
    name: "Prismatic Spectrum Jar",
    pillar: PILLARS.PRISMATIC,
    category: "Sauces/Spreads",
    masterAsset: "master-jar.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: A single, sharp white light beam hitting a prism, casting a full spectrum of color (rainbow) across the product.
[BACKGROUND]: A solid, neutral light-gray matte background (#D3D3D3).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "velvet-noir-luxury-pouch",
    name: "Luxury Velvet-Noir Pouch",
    pillar: PILLARS.VELVET,
    category: "Snacks/Supps",
    masterAsset: "master-pouch.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Low-key dramatic spotlight from the side, highlighting the rich fabric texture of deep red velvet.
[BACKGROUND]: Luxurious deep red velvet with heavy fabric folds (#800000).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "limestone-sun-arch-can",
    name: "Limestone Architectural Can",
    pillar: PILLARS.LIMESTONE,
    category: "Beverage",
    masterAsset: "master-can.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[COMPOSITION]: The product centered on a raw limestone block.
[LIGHTING]: High-contrast, sharp sunlight casting geometric architectural shadows.
[BACKGROUND]: A solid white plaster wall (#FFFFFF).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "neon-flux-tracing-bottle",
    name: "Tracing Neon-Flux Bottle",
    pillar: PILLARS.NEON,
    category: "Oils/Liquids",
    masterAsset: "master-bottle.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Continuous neon-cyan light trails 'tracing' the product silhouette.
[BACKGROUND]: A pitch-black infinite void (#000000).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "fog-wall-silhouette-jar",
    name: "Silhouette Fog-Wall Jar",
    pillar: PILLARS.FOG,
    category: "Sauces/Spreads",
    masterAsset: "master-jar.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: The product is a dark silhouette against a brightly lit, thick white fog wall. Rim lighting only.
[BACKGROUND]: A solid, luminous white fog wall (#FFFFFF).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface silhouette.`
  }
];

async function generate() {
  const libraryDir = "library";
  if (!fs.existsSync(libraryDir)) fs.mkdirSync(libraryDir);

  for (const style of batch4Styles) {
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
