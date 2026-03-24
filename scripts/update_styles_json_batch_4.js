const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.json');
const styles = JSON.parse(fs.readFileSync(stylesPath, 'utf8'));

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

const batch4Entries = [
  {
    id: "lava-glow-magmatic-jar",
    name: "Magmatic Lava-Glow Jar",
    pillar: PILLARS.LAVA,
    category: "Sauces/Spreads",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Intense 'Magmatic' red and orange under-lighting. The product appears to be sitting on a surface that is glowing from within.
[BACKGROUND]: A solid, dark obsidian matte background (#0A0A0A).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/lava-glow-magmatic-jar/before.png",
    afterImage: "/library/lava-glow-magmatic-jar/after.png",
    isFree: false
  },
  {
    id: "aurora-polar-can",
    name: "Polar Aurora Can",
    pillar: PILLARS.AURORA,
    category: "Beverage",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Soft, multi-colored light trails (green and purple) mimicking the Aurora Borealis, reflecting off the product surface.
[BACKGROUND]: A dark, starless night sky matte background (#000000).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/aurora-polar-can/before.png",
    afterImage: "/library/aurora-polar-can/after.png",
    isFree: false
  },
  {
    id: "zenith-overhead-pouch",
    name: "Direct Zenith Pouch",
    pillar: PILLARS.ZENITH,
    category: "Snacks/Supps",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Extreme 'High Noon' lighting from directly above. Zero horizontal shadows. Bright, crisp highlights on the top surfaces.
[BACKGROUND]: A neutral, off-white studio floor (#F0F0F0).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/zenith-overhead-pouch/before.png",
    afterImage: "/library/zenith-overhead-pouch/after.png",
    isFree: false
  },
  {
    id: "mirage-heat-haze-bottle",
    name: "Mirage Heat-Haze Bottle",
    pillar: PILLARS.MIRAGE,
    category: "Oils/Liquids",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Harsh desert sun. The air at the base of the product appears distorted by 'Heat Haze' waves.
[BACKGROUND]: A solid, warm ocher matte background (#CC7722).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/mirage-heat-haze-bottle/before.png",
    afterImage: "/library/mirage-heat-haze-bottle/after.png",
    isFree: false
  },
  {
    id: "graphite-matte-can",
    name: "Matte Graphite Can",
    pillar: PILLARS.GRAPHITE,
    category: "Beverage",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Hard side-lighting reveal the micro-texture of a graphite wall.
[BACKGROUND]: A dark, textured matte graphite surface (#2B2B2B).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/graphite-matte-can/before.png",
    afterImage: "/library/graphite-matte-can/after.png",
    isFree: false
  },
  {
    id: "prismatic-spectrum-jar",
    name: "Prismatic Spectrum Jar",
    pillar: PILLARS.PRISMATIC,
    category: "Sauces/Spreads",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: A single, sharp white light beam hitting a prism, casting a full spectrum of color (rainbow) across the product.
[BACKGROUND]: A solid, neutral light-gray matte background (#D3D3D3).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/prismatic-spectrum-jar/before.png",
    afterImage: "/library/prismatic-spectrum-jar/after.png",
    isFree: false
  },
  {
    id: "velvet-noir-luxury-pouch",
    name: "Luxury Velvet-Noir Pouch",
    pillar: PILLARS.VELVET,
    category: "Snacks/Supps",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Low-key dramatic spotlight from the side, highlighting the rich fabric texture of deep red velvet.
[BACKGROUND]: Luxurious deep red velvet with heavy fabric folds (#800000).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/velvet-noir-luxury-pouch/before.png",
    afterImage: "/library/velvet-noir-luxury-pouch/after.png",
    isFree: false
  },
  {
    id: "limestone-sun-arch-can",
    name: "Limestone Architectural Can",
    pillar: PILLARS.LIMESTONE,
    category: "Beverage",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[COMPOSITION]: The product centered on a raw limestone block.
[LIGHTING]: High-contrast, sharp sunlight casting geometric architectural shadows.
[BACKGROUND]: A solid white plaster wall (#FFFFFF).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/limestone-sun-arch-can/before.png",
    afterImage: "/library/limestone-sun-arch-can/after.png",
    isFree: false
  },
  {
    id: "neon-flux-tracing-bottle",
    name: "Tracing Neon-Flux Bottle",
    pillar: PILLARS.NEON,
    category: "Oils/Liquids",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Continuous neon-cyan light trails 'tracing' the product silhouette.
[BACKGROUND]: A pitch-black infinite void (#000000).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/neon-flux-tracing-bottle/before.png",
    afterImage: "/library/neon-flux-tracing-bottle/after.png",
    isFree: false
  },
  {
    id: "fog-wall-silhouette-jar",
    name: "Silhouette Fog-Wall Jar",
    pillar: PILLARS.FOG,
    category: "Sauces/Spreads",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: The product is a dark silhouette against a brightly lit, thick white fog wall. Rim lighting only.
[BACKGROUND]: A solid, luminous white fog wall (#FFFFFF).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface silhouette.`,
    beforeImage: "/library/fog-wall-silhouette-jar/before.png",
    afterImage: "/library/fog-wall-silhouette-jar/after.png",
    isFree: false
  }
];

batch4Entries.forEach(entry => {
  if (!styles.find(s => s.id === entry.id)) {
    styles.push(entry);
  }
});

fs.writeFileSync(stylesPath, JSON.stringify(styles, null, 2));
console.log(`Updated styles.json with Batch 4 (${batch4Entries.length} new entries).`);
