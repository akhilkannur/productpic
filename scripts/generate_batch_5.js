import { GoogleGenAI, Modality } from "@google/genai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyCD5WHzJzQJn2ZWoD63-G9OG8yf8g0UpBA";
const ai = new GoogleGenAI({ apiKey: API_KEY });

const PILLARS = {
  INDIGO: "The Indigo-Backlight (Deep Glow)",
  SLATE: "The Slate-Texture (Materiality)",
  AMBER: "The Amber-Fluid (Refractive)",
  PEARL: "The Pearl-Softbox (Iridescent)",
  NOIR: "The Noir-Strip (Vertical Light)"
};

const batch5Styles = [
  {
    id: "indigo-backlight-glow-bottle",
    name: "Deep Indigo Backlight Bottle",
    pillar: PILLARS.INDIGO,
    category: "Oils/Liquids",
    masterAsset: "master-bottle.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Single intense deep indigo backlight. Creates a sharp, glowing blue-violet rim around the product. The face remains in soft shadow.
[BACKGROUND]: A solid, dark navy matte background (#050814).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "slate-texture-skim-can",
    name: "Textured Slate Skim Can",
    pillar: PILLARS.SLATE,
    category: "Beverage",
    masterAsset: "master-can.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Hard side-lighting that skims the background at a 5-degree angle to reveal deep pits and micro-craters.
[BACKGROUND]: A vertical wall of dark, raw volcanic slate.
[SHADOW]: Sharp horizontal contact shadow.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "amber-fluid-caustic-jar",
    name: "Refractive Amber Fluid Jar",
    pillar: PILLARS.AMBER,
    category: "Sauces/Spreads",
    masterAsset: "master-jar.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Light passing through a thick amber liquid medium. Cast complex, warm refractive caustics (dancing light) across the jar.
[BACKGROUND]: A warm sand matte background (#C2B280).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "pearl-softbox-iridescent-pouch",
    name: "Iridescent Pearl Softbox Pouch",
    pillar: PILLARS.PEARL,
    category: "Snacks/Supps",
    masterAsset: "master-pouch.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Omni-directional soft lighting with an iridescent, pearlescent quality. Rainbow-hued soft reflections on the product surface.
[BACKGROUND]: A solid, off-white satin background with extremely soft fabric ripples.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`
  },
  {
    id: "noir-strip-vertical-bottle",
    name: "Noir-Strip Vertical Bottle",
    pillar: PILLARS.NOIR,
    category: "Oils/Liquids",
    masterAsset: "master-bottle.png",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: The product is a pitch-black silhouette. It stands in front of a single, vertical strip of bright white light.
[BACKGROUND]: Absolute black (#000000) with a single vertical white light column centered behind the product.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface silhouette.`
  }
];

async function generate() {
  const libraryDir = "library";
  if (!fs.existsSync(libraryDir)) fs.mkdirSync(libraryDir);

  for (const style of batch5Styles) {
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
