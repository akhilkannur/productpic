import { GoogleGenAI, Modality } from "@google/genai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

const API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

const PILLARS = {
  SAFFRON: "The Saffron-Glow (Golden Rim)",
  POLAR: "The Polar-Ice (Frosted)",
  SAND: "The Sand-Storm (Textured Air)",
  COPPER: "The Copper-Skim (Warm Metal)",
  UV: "The Ultraviolet (UV/Blacklight)",
  GRID: "The High-Key-Grid (Minimalist)",
  EMERALD: "The Emerald-Mist (Forest Atmosphere)",
  DISTORTION: "The Chrome-Distortion (Reflective)",
  CLAY: "The Clay-Shadow-Soft (Terracotta)",
  RIM: "The Studio-Rim-Only (Minimalism)"
};

const batch3Styles = [
  {
    id: "saffron-glow-rim-jar",
    name: "Golden Saffron Rim Jar",
    pillar: PILLARS.SAFFRON,
    category: "Sauces/Spreads",
    masterAsset: "master-jar.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Intense 'Saffron' golden rim-lighting from directly behind. A warm, glowing amber halo surrounds the jar's silhouette.
[BACKGROUND]: A solid, dark chocolate-brown matte background (#1B1411).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "polar-ice-frosted-can",
    name: "Polar-Ice Frosted Can",
    pillar: PILLARS.POLAR,
    category: "Beverage",
    masterAsset: "master-can.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Cold, blue-white high-key lighting. The product appears to have a very fine, realistic layer of 'frost' or condensation on its surface.
[BACKGROUND]: A solid, icy-blue matte background (#F0F8FF).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface beneath the frost effect.`
  },
  {
    id: "sand-storm-textured-pouch",
    name: "Textured Sand-Storm Pouch",
    pillar: PILLARS.SAND,
    category: "Snacks/Supps",
    masterAsset: "master-pouch.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Warm, diffused light filtering through a dusty, grainy atmosphere (sand-storm effect).
[BACKGROUND]: A raw, textured sand background with subtle dunes.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "copper-skim-warm-bottle",
    name: "Copper-Skim Warm Bottle",
    pillar: PILLARS.COPPER,
    category: "Oils/Liquids",
    masterAsset: "master-bottle.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Hard side-lighting with a copper/orange tint. The light 'skims' the product face to reveal micro-textures.
[BACKGROUND]: A vertical wall of dark, oxidized copper with beautiful green/blue patina spots.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "ultraviolet-blacklight-can",
    name: "UV Blacklight Can",
    pillar: PILLARS.UV,
    category: "Beverage",
    masterAsset: "master-can.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Ultraviolet (UV) blacklight aesthetic. Neon purple and hot pink highlights on the edges. The label colors appear slightly fluoresced.
[BACKGROUND]: Deep violet-black matte background (#0F001A).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "high-key-grid-jar",
    name: "High-Key Studio Grid Jar",
    pillar: PILLARS.GRID,
    category: "Sauces/Spreads",
    masterAsset: "master-jar.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[COMPOSITION]: The product standing on a minimalist white studio grid floor.
[LIGHTING]: Perfectly even, shadowless high-key lighting.
[BACKGROUND]: Pure white void (#FFFFFF).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "emerald-mist-fog-bottle",
    name: "Emerald-Mist Fog Bottle",
    pillar: PILLARS.EMERALD,
    category: "Oils/Liquids",
    masterAsset: "master-bottle.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Deep emerald-green volumetric lighting. Soft, hazy atmosphere with a single cool-white spotlight from above.
[BACKGROUND]: A solid, dark forest-green matte background (#013220).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "chrome-distortion-reflective-can",
    name: "Chrome Distortion Reflective Can",
    pillar: PILLARS.DISTORTION,
    category: "Beverage",
    masterAsset: "master-can.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[COMPOSITION]: The product standing on a warped, liquid-chrome reflective surface.
[LIGHTING]: High-contrast studio flash creating complex, distorted reflections of the product in the floor.
[BACKGROUND]: A dark, neutral charcoal matte background (#121212).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "clay-shadow-soft-pouch",
    name: "Soft Clay Shadow Pouch",
    pillar: PILLARS.CLAY,
    category: "Snacks/Supps",
    masterAsset: "master-pouch.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Soft, diffused evening sun casting a beautiful, out-of-focus shadow of a clay vase across the product.
[BACKGROUND]: A solid terracotta-pink matte background (#E2725B).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "studio-rim-only-minimal-bottle",
    name: "Extreme Rim-Only Bottle",
    pillar: PILLARS.RIM,
    category: "Oils/Liquids",
    masterAsset: "master-bottle.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: The absolute minimum lighting. Only a 1-pixel wide white rim highlight on the left and right edges. 99% of the product face is pitch black.
[BACKGROUND]: Absolute black (#000000).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface (even if mostly invisible).`
  }
];

async function generate() {
  const libraryDir = "library";
  if (!fs.existsSync(libraryDir)) fs.mkdirSync(libraryDir);

  for (const style of batch3Styles) {
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
