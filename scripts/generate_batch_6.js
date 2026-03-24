import { GoogleGenAI, Modality } from "@google/genai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyCD5WHzJzQJn2ZWoD63-G9OG8yf8g0UpBA";
const ai = new GoogleGenAI({ apiKey: API_KEY });

const batch6Styles = [
  { id: "prismatic-dispersion-box", name: "Prismatic Dispersion Box", pillar: "The Prismatic (Spectrum)", category: "Cereal/Bars", masterAsset: "master-box.png", prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:\n[COMPOSITION]: The box centered on a neutral, non-reflective gray surface. No props.\n[LIGHTING]: A sharp, angled beam of white light passing through a glass prism, casting a distinct, vivid rainbow spectrum (chromatic dispersion) diagonally across the matte surface of the box.\n[BACKGROUND]: Clean, minimal studio environment.\n[PRODUCT INTEGRITY]: STRICTLY PRESERVE original box surface and geometry.\n[MOOD]: Artistic, high-end, optical precision.` },
  { id: "frosted-underglow-box", name: "Frosted Underglow Box", pillar: "The Clinical (Functional)", category: "Cereal/Bars", masterAsset: "master-box.png", prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:\n[COMPOSITION]: The box sits on a thick slab of frosted glass.\n[LIGHTING]: The glass slab is illuminated entirely from below, creating a sterile, floating glow that wraps around the bottom edges of the box. Diffused, soft ambient light from above.\n[BACKGROUND]: Infinite white/gray void.\n[PRODUCT INTEGRITY]: STRICTLY PRESERVE original box surface.\n[MOOD]: Clean, futuristic, high-tech wellness.` },
  { id: "venetian-slat-box", name: "Venetian Slat Box", pillar: "The Minimalist (Shadow)", category: "Cereal/Bars", masterAsset: "master-box.png", prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:\n[LIGHTING]: Harsh, cinematic Venetian Blind lighting. Sharp horizontal slats of direct sunlight and deep shadow slicing precisely across the geometric face of the box.\n[BACKGROUND]: Minimal studio wall with subtle texture.\n[SHADOW]: High-contrast, geometric shadows.\n[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.` },
  { id: "brushed-titanium-box", name: "Brushed Titanium Box", pillar: "The Industrial (Material)", category: "Cereal/Bars", masterAsset: "master-box.png", prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:\n[COMPOSITION]: Box resting on a dark, heavily brushed titanium surface.\n[LIGHTING]: Strong side-lighting creates stretched, anisotropic metallic reflections on the surface, bouncing shimmering light onto the lower third of the box.\n[BACKGROUND]: Dark industrial environment.\n[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.` },
  { id: "thermal-gradient-box", name: "Thermal Gradient Box", pillar: "The Ethereal (Glow)", category: "Cereal/Bars", masterAsset: "master-box.png", prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:\n[LIGHTING]: Multi-colored Thermal studio setup using overlapping lighting gels (cyan, magenta, and yellow). The lights create a smooth, seamless gradient of colored light directly onto the face of the white box.\n[BACKGROUND]: Solid dark gray matte background to emphasize the colors.\n[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.` },
  { id: "neon-edge-box", name: "Neon Edge Box", pillar: "The Nocturnal (Midnight)", category: "Cereal/Bars", masterAsset: "master-box.png", prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:\n[LIGHTING]: Pitch black studio environment. A single, vibrant cyan neon rim-light is positioned behind the box, tracing its sharp geometric edges with a glowing blue halo.\n[BACKGROUND]: Absolute black (#000000).\n[PRODUCT INTEGRITY]: The face of the box remains in deep shadow but maintains its geometry.` },
  { id: "macro-ringflash-bag", name: "Macro Ringflash Bag", pillar: "The Hard-Flash (Pop)", category: "Chips/Snacks", masterAsset: "master-bag.png", prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:\n[LIGHTING]: Harsh, professional Macro Ring-Flash from the camera axis. Every crinkle and fold in the bag is sharply highlighted.\n[SHADOW]: A uniform, dark halo shadow follows the silhouette of the bag perfectly on the background.\n[BACKGROUND]: Seamless, clean white cyclorama.\n[PRODUCT INTEGRITY]: STRICTLY PRESERVE original bag surface and crinkles.` },
  { id: "wet-asphalt-bag", name: "Wet Asphalt Bag", pillar: "The Atmospheric (FX)", category: "Chips/Snacks", masterAsset: "master-bag.png", prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:\n[COMPOSITION]: Bag resting on dark, textured wet asphalt.\n[LIGHTING]: Harsh spotlight hits the wet asphalt, causing micro-caustic light reflections to bounce onto the underside of the bag.\n[BACKGROUND]: Dark, wet street environment.\n[PRODUCT INTEGRITY]: STRICTLY PRESERVE original bag surface.` },
  { id: "holographic-bounce-bag", name: "Holographic Bounce Bag", pillar: "The Ethereal (Glow)", category: "Chips/Snacks", masterAsset: "master-bag.png", prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:\n[LIGHTING]: Side-lit by a large holographic reflector panel. The natural folds and crinkles of the bag catch subtle, iridescent pastel highlights (pink, blue, and purple).\n[BACKGROUND]: Neutral studio gray.\n[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.` },
  { id: "vantablack-void-bag", name: "Vantablack Void Bag", pillar: "The Minimalist (Shadow)", category: "Chips/Snacks", masterAsset: "master-bag.png", prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:\n[LIGHTING]: Intense, high-contrast front lighting highlighting the specularity of the bag surface.\n[BACKGROUND]: The bag sits in an absolute, light-absorbing black void (Vantablack). No floor line or horizon visible.\n[PRODUCT INTEGRITY]: STRICTLY PRESERVE original bag surface.` },
  { id: "laser-intersect-bag", name: "Laser Intersect Bag", pillar: "The Atmospheric (FX)", category: "Chips/Snacks", masterAsset: "master-bag.png", prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:\n[LIGHTING]: Dark, hazy studio environment. A single, razor-thin horizontal crimson laser line intersects across the middle of the bag, highlighting its 3D topography.\n[BACKGROUND]: Dark charcoal with subtle atmospheric haze.\n[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.` },
  { id: "ice-scatter-bag", name: "Ice Scatter Bag", pillar: "The Refractive (Lab)", category: "Chips/Snacks", masterAsset: "master-bag.png", prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:\n[COMPOSITION]: Bag resting on a bed of crushed clear ice.\n[LIGHTING]: Strong light driven through the ice from below, causing sub-surface scattering that illuminates the bag with cold, crystalline light from the ground up.\n[BACKGROUND]: Cold, dark studio environment.\n[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.` },
  { id: "amber-resin-bag", name: "Amber Resin Bag", pillar: "The Ethereal (Glow)", category: "Chips/Snacks", masterAsset: "master-bag.png", prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:\n[LIGHTING]: Powerful backlight passing through a thick slab of translucent amber resin behind the bag. The bag is outlined by a warm, thick, honey-like optical glow.\n[BACKGROUND]: Warm, dark, amber-toned environment.\n[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.` },
  { id: "chromatic-fringing-bag", name: "Chromatic Fringing Bag", pillar: "The Hard-Flash (Pop)", category: "Chips/Snacks", masterAsset: "master-bag.png", prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:\n[LIGHTING]: Bright, high-contrast flash on a pure white background.\n[EFFECT]: Mimic heavy vintage lens distortion with strong chromatic aberration (red and cyan color fringing) specifically along the sharpest, high-contrast edges and highlights of the bag.\n[BACKGROUND]: Pure white seamless.\n[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.` },
  { id: "galvanized-steel-bag", name: "Galvanized Steel Bag", pillar: "The Industrial (Material)", category: "Chips/Snacks", masterAsset: "master-bag.png", prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:\n[COMPOSITION]: Bag resting on a plate of galvanized steel.\n[LIGHTING]: Hard light source creates crystalline, mottled reflections from the steel plate onto the shiny, crinkled surface of the bag.\n[BACKGROUND]: Dark industrial workshop.\n[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.` },
  { id: "silkscreen-shadow-bag", name: "Silkscreen Shadow Bag", pillar: "The Minimalist (Shadow)", category: "Chips/Snacks", masterAsset: "master-bag.png", prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:\n[LIGHTING]: Studio light filtered through a fine silk screen mesh, casting a microscopic, high-fidelity grid shadow across the highlights and crinkles of the bag.\n[BACKGROUND]: Smooth, neutral studio surface.\n[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.` },
  { id: "dichroic-glass-bag", name: "Dichroic Glass Bag", pillar: "The Refractive (Lab)", category: "Chips/Snacks", masterAsset: "master-bag.png", prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:\n[LIGHTING]: Lit through a dichroic glass filter, causing the specular highlights on the crinkled bag to shift between vibrant magenta and liquid gold depending on the angle of the fold.\n[BACKGROUND]: Clean, dark studio gray.\n[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.` }
];

async function generate() {
  const libraryRoot = "library";
  const publicLibrary = "public/library";
  
  if (!fs.existsSync(libraryRoot)) fs.mkdirSync(libraryRoot);
  if (!fs.existsSync(publicLibrary)) fs.mkdirSync(publicLibrary, { recursive: true });

  for (const style of batch6Styles) {
    const rootDir = path.join(libraryRoot, style.id);
    const publicDir = path.join(publicLibrary, style.id);

    // Skip if root library already has it
    if (fs.existsSync(path.join(rootDir, "after.png"))) {
      console.log(`Skipping ${style.id} - already exists.`);
      continue;
    }

    if (!fs.existsSync(rootDir)) fs.mkdirSync(rootDir, { recursive: true });
    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

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
          
          // Save to root library
          fs.writeFileSync(path.join(rootDir, "after.png"), buffer);
          fs.copyFileSync(masterPath, path.join(rootDir, "before.png"));
          
          // Save to public library
          fs.writeFileSync(path.join(publicDir, "after.png"), buffer);
          fs.copyFileSync(masterPath, path.join(publicDir, "before.png"));
          
          console.log(`✅ Saved: ${style.id}`);
        }
      }
    } catch (err) {
      console.error(`❌ Error ${style.id}:`, err.message || err);
    }
  }
}

generate();
