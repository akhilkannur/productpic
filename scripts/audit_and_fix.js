const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.json');
const styles = JSON.parse(fs.readFileSync(stylesPath, 'utf8'));

const PILLAR_MAP = {
  "The Monolith (Architectural Luxury)": "The Monolith (Architectural)",
  "The Monolith (Architectural)": "The Monolith (Architectural)",
  "The Limestone-Sun (Architectural)": "The Monolith (Architectural)",
  
  "The Nocturnal (Midnight Editorial)": "The Nocturnal (Midnight)",
  "The Dusk (Deep Golden Hour)": "The Nocturnal (Midnight)",
  "The Aurora (Polar)": "The Nocturnal (Midnight)",
  "The Moonlight (Silver)": "The Nocturnal (Midnight)",
  "The Indigo-Backlight (Deep Glow)": "The Nocturnal (Midnight)",
  "The Noir-Strip (Vertical Light)": "The Nocturnal (Midnight)",
  "The Saffron-Glow (Golden Rim)": "The Nocturnal (Midnight)",
  
  "The Botanical (High-End Wellness)": "The Botanical (Organic)",
  
  "The Clinical (High-Tech Functional)": "The Clinical (Functional)",
  "The Polar-Ice (Frosted)": "The Clinical (Functional)",
  
  "The Hard-Flash (Hyper-Pop)": "The Hard-Flash (Pop)",
  "The Cyber-Neon (High-Contrast)": "The Hard-Flash (Pop)",
  "The Ultraviolet (UV/Blacklight)": "The Hard-Flash (Pop)",
  
  "The Chroma-Gradient (Ethereal)": "The Ethereal (Glow)",
  "The Soft-Focus (Dreamscape)": "The Ethereal (Glow)",
  "The Pearl-Softbox (Iridescent)": "The Ethereal (Glow)",
  
  "The Caustic Lab (Refractive)": "The Refractive (Lab)",
  "The Dark-Prism (Refractive)": "The Refractive (Lab)",
  "The Amber-Fluid (Refractive)": "The Refractive (Lab)",
  
  "The Industrial Matte (Texture)": "The Industrial (Material)",
  "The Slate-Texture (Materiality)": "The Industrial (Material)",
  "The Graphite (Matte)": "The Industrial (Material)",
  "The Copper-Skim (Warm Metal)": "The Industrial (Material)",
  "The Liquid-Metal (Reflective)": "The Industrial (Material)",
  "The Chrome-Distortion (Reflective)": "The Industrial (Material)",
  
  "The Negative Space (Chiaroscuro)": "The Minimalist (Shadow)",
  "The Fog-Wall (Silhouette)": "The Minimalist (Shadow)",
  "The Zenith (Overhead)": "The Minimalist (Shadow)",
  "The Studio-Rim-Only (Minimalism)": "The Minimalist (Shadow)",
  "The High-Key-Grid (Minimalist)": "The Minimalist (Shadow)",
  "The Obsidian-Pool (Reflection)": "The Minimalist (Shadow)",
  
  "The Volumetric (Atmosphere)": "The Atmospheric (FX)",
  "The Solar-Flare (Direct)": "The Atmospheric (FX)",
  "The Mirage (Heat Haze)": "The Atmospheric (FX)",
  "The Sand-Storm (Textured Air)": "The Atmospheric (FX)",
  "The Emerald-Mist (Forest Atmosphere)": "The Atmospheric (FX)",
  
  "The Studio-Softbox (Commercial)": "The Studio (Commercial)",
  "Uncategorized": "The Studio (Commercial)"
};

// Audit and Fix
const updatedStyles = styles.map(s => {
  // 1. Fix missing prompt for Liquid Death
  if (s.id === 'liquid-death-can' && (!s.prompt || s.prompt === "")) {
    s.prompt = "Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:\n[COMPOSITION]: The product must be the ONLY object in the frame. Maintain original angle and focal length.\n[LIGHTING]: Apply aggressive, directional 'Hard-Flash' lighting. High-contrast reflections on the metallic can surface.\n[BACKGROUND]: A solid, dark slate gray matte background (#2F4F4F).\n[SHADOW]: Sharp, dense contact shadow.\n[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface. DO NOT add any new text, logos, or branding.";
    s.pillar = "The Hard-Flash (Pop)";
  }

  // 2. Map Pillars
  if (PILLAR_MAP[s.pillar]) {
    s.pillar = PILLAR_MAP[s.pillar];
  }

  // 3. Assign specific uncategorized ones
  if (s.id === 'oats-overnight-pouch' || s.id === 'olipop-can') {
    s.pillar = "The Studio (Commercial)";
  }
  if (s.id === 'magic-spoon-box') {
    s.pillar = "The Hard-Flash (Pop)";
  }
  if (s.id === 'momofuku-jar') {
    s.pillar = "The Minimalist (Shadow)";
  }

  // 4. Ensure name is Title Case
  s.name = s.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  // 5. Ensure before/after paths are consistent
  s.beforeImage = `/library/${s.id}/before.png`;
  s.afterImage = `/library/${s.id}/after.png`;

  return s;
});

fs.writeFileSync(stylesPath, JSON.stringify(updatedStyles, null, 2));
console.log("Quality Audit and Fix Complete.");
console.log(`Unique Pillars after consolidation: ${new Set(updatedStyles.map(s => s.pillar)).size}`);
console.log(Array.from(new Set(updatedStyles.map(s => s.pillar))).sort());
