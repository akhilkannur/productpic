const fs = require('fs');
const path = require('path');

const stylesPath = path.join(__dirname, '../styles.json');
const styles = JSON.parse(fs.readFileSync(stylesPath, 'utf8'));

const freeIds = [
  "botanical-gobo-shadow-can",
  "botanical-linen-box",
  "clinical-frosted-glass-glow-can",
  "clinical-silver-rim-light-pouch",
  "hard-flash-saturated-pink-box",
  "hard-flash-white-seamless-can",
  "monolith-concrete-box",
  "monolith-travertine-can",
  "nocturnal-obsidian-can",
  "nocturnal-velvet-pouch",
  "chroma-ethereal-blue-can",
  "negative-rim-strobe-bottle",
  "caustic-water-ripple-jar",
  "industrial-brushed-steel-can",
  "dusk-purple-indigo-bottle"
];

const updatedStyles = styles.map(s => {
  s.isFree = freeIds.includes(s.id);
  return s;
});

fs.writeFileSync(stylesPath, JSON.stringify(updatedStyles, null, 2));
console.log(`Updated styles.json with ${freeIds.length} free prompts.`);
