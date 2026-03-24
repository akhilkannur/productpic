const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.json');
const styles = JSON.parse(fs.readFileSync(stylesPath, 'utf8'));

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

const batch2Entries = [
  {
    id: "cyber-neon-pink-blue-can",
    name: "Pink & Blue Cyber Can",
    pillar: PILLARS.CYBER,
    category: "Beverage",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: High-contrast dual-tone lighting. Vibrant neon pink rim-lighting from the left, electric blue key-lighting from the right.
[BACKGROUND]: A solid, midnight-black matte background (#000000).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.
[MOOD]: Cyberpunk, high-energy, nightlife editorial.`,
    beforeImage: "/library/cyber-neon-pink-blue-can/before.png",
    afterImage: "/library/cyber-neon-pink-blue-can/after.png",
    isFree: false
  },
  {
    id: "soft-focus-dreamscape-bottle",
    name: "Dreamscape Soft-Focus Bottle",
    pillar: PILLARS.SOFT,
    category: "Oils/Liquids",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Ultra-soft, high-key white wash. Extremely diffused light with zero visible shadow edges. A slight 'bloom' effect on the product edges.
[BACKGROUND]: A pure white silk-textured background with soft, out-of-focus fabric ripples.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.
[MOOD]: Pure, ethereal, high-end beauty.`,
    beforeImage: "/library/soft-focus-dreamscape-bottle/before.png",
    afterImage: "/library/soft-focus-dreamscape-bottle/after.png",
    isFree: false
  },
  {
    id: "volumetric-fog-pouch",
    name: "Atmospheric Volumetric Pouch",
    pillar: PILLARS.VOLUMETRIC,
    category: "Snacks/Supps",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Single 'God-ray' light beam cutting through a heavy, hazy atmosphere (volumetric lighting).
[BACKGROUND]: A dark, moody charcoal-gray setting with visible dust particles in the light beam.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.
[MOOD]: Cinematic, dramatic, high-performance.`,
    beforeImage: "/library/volumetric-fog-pouch/before.png",
    afterImage: "/library/volumetric-fog-pouch/after.png",
    isFree: false
  },
  {
    id: "solar-flare-direct-can",
    name: "Direct Solar-Flare Can",
    pillar: PILLARS.SOLAR,
    category: "Beverage",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Harsh, direct overhead sunlight. A realistic horizontal anamorphic lens flare cutting across the top third of the product.
[BACKGROUND]: A solid, warm-sand matte background (#C2B280).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.
[MOOD]: Summer, high-noon, refreshing.`,
    beforeImage: "/library/solar-flare-direct-can/before.png",
    afterImage: "/library/solar-flare-direct-can/after.png",
    isFree: false
  },
  {
    id: "monolith-window-shadow-jar",
    name: "Geometric Window Shadow Jar",
    pillar: PILLARS.MONOLITH,
    category: "Sauces/Spreads",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Sharp morning sun passing through a repeating geometric window frame (slatted shadows).
[BACKGROUND]: A clean, light-beige plaster wall (#F5F5DC).
[SHADOW]: Long, repeating horizontal shadows stretching across the jar and the floor.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/monolith-window-shadow-jar/before.png",
    afterImage: "/library/monolith-window-shadow-jar/after.png",
    isFree: false
  },
  {
    id: "liquid-metal-mercury-bottle",
    name: "Mercury Liquid-Metal Bottle",
    pillar: PILLARS.LIQUID,
    category: "Oils/Liquids",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[COMPOSITION]: The product standing in the center of a shallow pool of liquid mercury.
[LIGHTING]: High-key studio lighting reflecting perfectly in the metallic liquid surface.
[BACKGROUND]: A solid, dark slate matte background (#2F4F4F).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/liquid-metal-mercury-bottle/before.png",
    afterImage: "/library/liquid-metal-mercury-bottle/after.png",
    isFree: false
  },
  {
    id: "dark-prism-rainbow-jar",
    name: "Dark Prism Rainbow Jar",
    pillar: PILLARS.PRISM,
    category: "Sauces/Spreads",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: A single rainbow-colored light refraction (prism effect) hitting the face of the jar at a 45-degree angle.
[BACKGROUND]: A pitch-black velvet background (#050505).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/dark-prism-rainbow-jar/before.png",
    afterImage: "/library/dark-prism-rainbow-jar/after.png",
    isFree: false
  },
  {
    id: "studio-softbox-commercial-pouch",
    name: "Commercial Softbox Pouch",
    pillar: PILLARS.STUDIO,
    category: "Snacks/Supps",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Classic 3-point studio lighting. Large rectangular softbox reflections visible on the product surface. Perfectly even fill light.
[BACKGROUND]: A seamless, light-gray gradient background (#E0E0E0 to #FFFFFF).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/studio-softbox-commercial-pouch/before.png",
    afterImage: "/library/studio-softbox-commercial-pouch/after.png",
    isFree: false
  },
  {
    id: "moonlight-silver-can",
    name: "Silver Moonlight Can",
    pillar: PILLARS.MOONLIGHT,
    category: "Beverage",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[LIGHTING]: Cold, silver-toned moonlight from high above. Deep, midnight-blue shadows.
[BACKGROUND]: A dark, textured stone surface under a night sky.
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.
[MOOD]: Mystical, premium, nocturnal.`,
    beforeImage: "/library/moonlight-silver-can/before.png",
    afterImage: "/library/moonlight-silver-can/after.png",
    isFree: false
  },
  {
    id: "obsidian-pool-reflection-bottle",
    name: "Obsidian Pool Reflection Bottle",
    pillar: PILLARS.POOL,
    category: "Oils/Liquids",
    prompt: `Using the uploaded product photo, generate a high-resolution mockup with these exact specifications:
[COMPOSITION]: The product standing on a black mirror surface. A subtle, circular water ripple emanating from the base.
[LIGHTING]: Soft rim-lighting that reflects in the dark water.
[BACKGROUND]: A solid, obsidian-black matte background (#0A0A0A).
[PRODUCT INTEGRITY]: STRICTLY PRESERVE original surface.`,
    beforeImage: "/library/obsidian-pool-reflection-bottle/before.png",
    afterImage: "/library/obsidian-pool-reflection-bottle/after.png",
    isFree: false
  }
];

batch2Entries.forEach(entry => {
  if (!styles.find(s => s.id === entry.id)) {
    styles.push(entry);
  }
});

fs.writeFileSync(stylesPath, JSON.stringify(styles, null, 2));
console.log(`Updated styles.json with Batch 2 (${batch2Entries.length} new entries).`);
