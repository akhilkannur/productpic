const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.json');
const styles = JSON.parse(fs.readFileSync(stylesPath, 'utf8'));

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

const batch3Entries = [
  {
    id: "saffron-glow-rim-jar",
    name: "Golden Saffron Rim Jar",
    pillar: PILLARS.SAFFRON,
    category: "Sauces/Spreads",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Intense 'Saffron' golden rim-lighting from directly behind. A warm, glowing amber halo surrounds the jar's silhouette.
[BACKGROUND]: A solid, dark chocolate-brown matte background (#1B1411).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/saffron-glow-rim-jar/before.png",
    afterImage: "/library/saffron-glow-rim-jar/after.png",
    isFree: false
  },
  {
    id: "polar-ice-frosted-can",
    name: "Polar-Ice Frosted Can",
    pillar: PILLARS.POLAR,
    category: "Beverage",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Cold, blue-white high-key lighting. The product appears to have a very fine, realistic layer of 'frost' or condensation on its surface.
[BACKGROUND]: A solid, icy-blue matte background (#F0F8FF).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface beneath the frost effect.`,
    beforeImage: "/library/polar-ice-frosted-can/before.png",
    afterImage: "/library/polar-ice-frosted-can/after.png",
    isFree: false
  },
  {
    id: "sand-storm-textured-pouch",
    name: "Textured Sand-Storm Pouch",
    pillar: PILLARS.SAND,
    category: "Snacks/Supps",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Warm, diffused light filtering through a dusty, grainy atmosphere (sand-storm effect).
[BACKGROUND]: A raw, textured sand background with subtle dunes.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/sand-storm-textured-pouch/before.png",
    afterImage: "/library/sand-storm-textured-pouch/after.png",
    isFree: false
  },
  {
    id: "copper-skim-warm-bottle",
    name: "Copper-Skim Warm Bottle",
    pillar: PILLARS.COPPER,
    category: "Oils/Liquids",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Hard side-lighting with a copper/orange tint. The light 'skims' the product face to reveal micro-textures.
[BACKGROUND]: A vertical wall of dark, oxidized copper with beautiful green/blue patina spots.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/copper-skim-warm-bottle/before.png",
    afterImage: "/library/copper-skim-warm-bottle/after.png",
    isFree: false
  },
  {
    id: "ultraviolet-blacklight-can",
    name: "UV Blacklight Can",
    pillar: PILLARS.UV,
    category: "Beverage",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Ultraviolet (UV) blacklight aesthetic. Neon purple and hot pink highlights on the edges. The label colors appear slightly fluoresced.
[BACKGROUND]: Deep violet-black matte background (#0F001A).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/ultraviolet-blacklight-can/before.png",
    afterImage: "/library/ultraviolet-blacklight-can/after.png",
    isFree: false
  },
  {
    id: "high-key-grid-jar",
    name: "High-Key Studio Grid Jar",
    pillar: PILLARS.GRID,
    category: "Sauces/Spreads",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[COMPOSITION]: The product standing on a minimalist white studio grid floor.
[LIGHTING]: Perfectly even, shadowless high-key lighting.
[BACKGROUND]: Pure white void (#FFFFFF).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/high-key-grid-jar/before.png",
    afterImage: "/library/high-key-grid-jar/after.png",
    isFree: false
  },
  {
    id: "emerald-mist-fog-bottle",
    name: "Emerald-Mist Fog Bottle",
    pillar: PILLARS.EMERALD,
    category: "Oils/Liquids",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Deep emerald-green volumetric lighting. Soft, hazy atmosphere with a single cool-white spotlight from above.
[BACKGROUND]: A solid, dark forest-green matte background (#013220).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/emerald-mist-fog-bottle/before.png",
    afterImage: "/library/emerald-mist-fog-bottle/after.png",
    isFree: false
  },
  {
    id: "chrome-distortion-reflective-can",
    name: "Chrome Distortion Reflective Can",
    pillar: PILLARS.DISTORTION,
    category: "Beverage",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[COMPOSITION]: The product standing on a warped, liquid-chrome reflective surface.
[LIGHTING]: High-contrast studio flash creating complex, distorted reflections of the product in the floor.
[BACKGROUND]: A dark, neutral charcoal matte background (#121212).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/chrome-distortion-reflective-can/before.png",
    afterImage: "/library/chrome-distortion-reflective-can/after.png",
    isFree: false
  },
  {
    id: "clay-shadow-soft-pouch",
    name: "Soft Clay Shadow Pouch",
    pillar: PILLARS.CLAY,
    category: "Snacks/Supps",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Soft, diffused evening sun casting a beautiful, out-of-focus shadow of a clay vase across the product.
[BACKGROUND]: A solid terracotta-pink matte background (#E2725B).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/clay-shadow-soft-pouch/before.png",
    afterImage: "/library/clay-shadow-soft-pouch/after.png",
    isFree: false
  },
  {
    id: "studio-rim-only-minimal-bottle",
    name: "Extreme Rim-Only Bottle",
    pillar: PILLARS.RIM,
    category: "Oils/Liquids",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: The absolute minimum lighting. Only a 1-pixel wide white rim highlight on the left and right edges. 99% of the product face is pitch black.
[BACKGROUND]: Absolute black (#000000).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface (even if mostly invisible).`,
    beforeImage: "/library/studio-rim-only-minimal-bottle/before.png",
    afterImage: "/library/studio-rim-only-minimal-bottle/after.png",
    isFree: false
  }
];

batch3Entries.forEach(entry => {
  if (!styles.find(s => s.id === entry.id)) {
    styles.push(entry);
  }
});

fs.writeFileSync(stylesPath, JSON.stringify(styles, null, 2));
console.log(`Updated styles.json with Batch 3 (${batch3Entries.length} new entries).`);
