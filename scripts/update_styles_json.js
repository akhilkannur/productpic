const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.json');
const styles = JSON.parse(fs.readFileSync(stylesPath, 'utf8'));

const PILLARS = {
  CHROMA: "The Chroma-Gradient (Ethereal)",
  NEGATIVE: "The Negative Space (Chiaroscuro)",
  CAUSTIC: "The Caustic Lab (Refractive)",
  INDUSTRIAL: "The Industrial Matte (Texture)",
  DUSK: "The Dusk (Deep Golden Hour)"
};

const newEntries = [
  {
    id: "chroma-ethereal-blue-can",
    name: "Ethereal Blue Chroma Can",
    pillar: PILLARS.CHROMA,
    category: "Beverage",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[COMPOSITION]: The product must be the ONLY object in the frame. Maintain original angle and focal length.
[LIGHTING]: Apply soft, multi-directional 'Chroma Lighting' with a dominant ethereal blue backlight. Use Subsurface Scattering logic to create a soft, glowing halo around the product's silhouette.
[BACKGROUND]: A seamless, infinite gradient transitioning from deep navy (#0A0E1A) to soft electric blue (#4A90E2). No horizon line.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface. DO NOT add any new text, logos, or branding.
[MOOD]: Tech-forward, premium, clean and ethereal.`,
    beforeImage: "/library/chroma-ethereal-blue-can/before.png",
    afterImage: "/library/chroma-ethereal-blue-can/after.png",
    isFree: false
  },
  {
    id: "chroma-sunset-pouch",
    name: "Sunset Chroma Pouch",
    pillar: PILLARS.CHROMA,
    category: "Snacks/Supps",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[COMPOSITION]: The product centered, no props.
[LIGHTING]: Warm 'Internal Glow' lighting. Multi-tone soft gradients hitting the edges from the back.
[BACKGROUND]: A smooth gradient of burnt orange (#CC5500) to deep violet (#2E0854).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.
[MOOD]: Vibrant, high-energy, modern wellness.`,
    beforeImage: "/library/chroma-sunset-pouch/before.png",
    afterImage: "/library/chroma-sunset-pouch/after.png",
    isFree: false
  },
  {
    id: "chroma-neon-mint-jar",
    name: "Neon Mint Chroma Jar",
    pillar: PILLARS.CHROMA,
    category: "Sauces/Spreads",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Soft neon mint rim lighting. High-key diffused glow.
[BACKGROUND]: Infinite gradient of charcoal (#121212) to bright mint green (#98FF98).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.
[MOOD]: Fresh, futuristic, clean.`,
    beforeImage: "/library/chroma-neon-mint-jar/before.png",
    afterImage: "/library/chroma-neon-mint-jar/after.png",
    isFree: false
  },
  {
    id: "negative-rim-strobe-bottle",
    name: "Rim Strobe Negative Bottle",
    pillar: PILLARS.NEGATIVE,
    category: "Oils/Liquids",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: High-contrast 'Hard Strobe' lighting from the far-left and far-right only. 90% of the product remains in deep shadow, with only the extreme edges (rims) illuminated by sharp, cool-white highlights.
[BACKGROUND]: A solid, light-absorbing 'Vantablack' matte background (#000000).
[SHADOW]: Infinite black void. No visible floor surface.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/negative-rim-strobe-bottle/before.png",
    afterImage: "/library/negative-rim-strobe-bottle/after.png",
    isFree: false
  },
  {
    id: "negative-top-down-can",
    name: "Top-Down Negative Can",
    pillar: PILLARS.NEGATIVE,
    category: "Beverage",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Single sharp 'God-ray' spotlight from directly above. The base of the product disappears into total darkness.
[BACKGROUND]: Midnight black (#000000).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/negative-top-down-can/before.png",
    afterImage: "/library/negative-top-down-can/after.png",
    isFree: false
  },
  {
    id: "caustic-water-ripple-jar",
    name: "Water Ripple Caustic Jar",
    pillar: PILLARS.CAUSTIC,
    category: "Sauces/Spreads",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Single-source 'Caustic Strobe' passing through an unseen water medium. Cast dynamic, 'dancing' light patterns (caustics) across the face of the product and the background wall.
[BACKGROUND]: A solid, neutral studio-gray matte wall (#808080).
[PRODUCT INTEGRITY]: Preserve label clarity while allowing refractive light patterns to skim the surface.`,
    beforeImage: "/library/caustic-water-ripple-jar/before.png",
    afterImage: "/library/caustic-water-ripple-jar/after.png",
    isFree: false
  },
  {
    id: "caustic-glass-prism-bottle",
    name: "Glass Prism Caustic Bottle",
    pillar: PILLARS.CAUSTIC,
    category: "Oils/Liquids",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Sharp refractive light passing through a prism. Rainbow-edged caustics reflecting off the glass surface.
[BACKGROUND]: Off-white minimal wall (#F5F5F5).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/caustic-glass-prism-bottle/before.png",
    afterImage: "/library/caustic-glass-prism-bottle/after.png",
    isFree: false
  },
  {
    id: "industrial-brushed-steel-can",
    name: "Brushed Steel Industrial Can",
    pillar: PILLARS.INDUSTRIAL,
    category: "Beverage",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Hard side-lighting that skims the background to reveal heavy texture.
[BACKGROUND]: A vertical wall of heavily brushed gunmetal steel.
[SHADOW]: Sharp, horizontal contact shadow.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/industrial-brushed-steel-can/before.png",
    afterImage: "/library/industrial-brushed-steel-can/after.png",
    isFree: false
  },
  {
    id: "industrial-matte-resin-pouch",
    name: "Matte Resin Industrial Pouch",
    pillar: PILLARS.INDUSTRIAL,
    category: "Snacks/Supps",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Soft, top-down warehouse lighting.
[BACKGROUND]: A raw, sand-blasted matte resin surface in deep forest green (#1B2622).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/industrial-matte-resin-pouch/before.png",
    afterImage: "/library/industrial-matte-resin-pouch/after.png",
    isFree: false
  },
  {
    id: "dusk-purple-indigo-bottle",
    name: "Purple Indigo Dusk Bottle",
    pillar: PILLARS.DUSK,
    category: "Oils/Liquids",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Temperature contrast. Warm orange light on the product face, cool purple/indigo shadows on the side.
[BACKGROUND]: A soft-focus dusk sky transitioning from deep orange to midnight indigo.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/dusk-purple-indigo-bottle/before.png",
    afterImage: "/library/dusk-purple-indigo-bottle/after.png",
    isFree: false
  }
];

// Add only if not exists
newEntries.forEach(entry => {
  if (!styles.find(s => s.id === entry.id)) {
    styles.push(entry);
  }
});

fs.writeFileSync(stylesPath, JSON.stringify(styles, null, 2));
console.log(`Updated styles.json with ${newEntries.length} new entries.`);
