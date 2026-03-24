const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.json');
const styles = JSON.parse(fs.readFileSync(stylesPath, 'utf8'));

const PILLARS = {
  INDIGO: "The Indigo-Backlight (Deep Glow)",
  SLATE: "The Slate-Texture (Materiality)",
  AMBER: "The Amber-Fluid (Refractive)",
  PEARL: "The Pearl-Softbox (Iridescent)",
  NOIR: "The Noir-Strip (Vertical Light)"
};

const batch5Entries = [
  {
    id: "indigo-backlight-glow-bottle",
    name: "Deep Indigo Backlight Bottle",
    pillar: PILLARS.INDIGO,
    category: "Oils/Liquids",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Single intense deep indigo backlight. Creates a sharp, glowing blue-violet rim around the product. The face remains in soft shadow.
[BACKGROUND]: A solid, dark navy matte background (#050814).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/indigo-backlight-glow-bottle/before.png",
    afterImage: "/library/indigo-backlight-glow-bottle/after.png",
    isFree: false
  },
  {
    id: "slate-texture-skim-can",
    name: "Textured Slate Skim Can",
    pillar: PILLARS.SLATE,
    category: "Beverage",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Hard side-lighting that skims the background at a 5-degree angle to reveal deep pits and micro-craters.
[BACKGROUND]: A vertical wall of dark, raw volcanic slate.
[SHADOW]: Sharp horizontal contact shadow.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/slate-texture-skim-can/before.png",
    afterImage: "/library/slate-texture-skim-can/after.png",
    isFree: false
  },
  {
    id: "amber-fluid-caustic-jar",
    name: "Refractive Amber Fluid Jar",
    pillar: PILLARS.AMBER,
    category: "Sauces/Spreads",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Light passing through a thick amber liquid medium. Cast complex, warm refractive caustics (dancing light) across the jar.
[BACKGROUND]: A warm sand matte background (#C2B280).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/amber-fluid-caustic-jar/before.png",
    afterImage: "/library/amber-fluid-caustic-jar/after.png",
    isFree: false
  },
  {
    id: "pearl-softbox-iridescent-pouch",
    name: "Iridescent Pearl Softbox Pouch",
    pillar: PILLARS.PEARL,
    category: "Snacks/Supps",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Omni-directional soft lighting with an iridescent, pearlescent quality. Rainbow-hued soft reflections on the product surface.
[BACKGROUND]: A solid, off-white satin background with extremely soft fabric ripples.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/pearl-softbox-iridescent-pouch/before.png",
    afterImage: "/library/pearl-softbox-iridescent-pouch/after.png",
    isFree: false
  },
  {
    id: "noir-strip-vertical-bottle",
    name: "Noir-Strip Vertical Bottle",
    pillar: PILLARS.NOIR,
    category: "Oils/Liquids",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: The product is a pitch-black silhouette. It stands in front of a single, vertical strip of bright white light.
[BACKGROUND]: Absolute black (#000000) with a single vertical white light column centered behind the product.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface silhouette.`,
    beforeImage: "/library/noir-strip-vertical-bottle/before.png",
    afterImage: "/library/noir-strip-vertical-bottle/after.png",
    isFree: false
  }
];

batch5Entries.forEach(entry => {
  if (!styles.find(s => s.id === entry.id)) {
    styles.push(entry);
  }
});

fs.writeFileSync(stylesPath, JSON.stringify(styles, null, 2));
console.log(`Updated styles.json with Batch 5 (${batch5Entries.length} new entries). Milestone reached: ${styles.length} total prompts.`);
