export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function deslugifyCategory(slug: string) {
  const mapping: Record<string, string> = {
    "beverage": "Beverage",
    "beverages-cans": "Beverages/Cans",
    "cereal-bars": "Cereal/Bars",
    "chips-snacks": "Chips/Snacks",
    "jars-spreads": "Jars/Spreads",
    "oils-liquids": "Oils/Liquids",
    "sauces-spreads": "Sauces/Spreads",
    "snacks-pouches": "Snacks/Pouches",
    "snacks-supps": "Snacks/Supps",
  };
  return mapping[slug] || slug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

export function getCategorySlug(category: string) {
  const mapping: Record<string, string> = {
    "Beverage": "beverage",
    "Beverages/Cans": "beverages-cans",
    "Cereal/Bars": "cereal-bars",
    "Chips/Snacks": "chips-snacks",
    "Jars/Spreads": "jars-spreads",
    "Oils/Liquids": "oils-liquids",
    "Sauces/Spreads": "sauces-spreads",
    "Snacks/Pouches": "snacks-pouches",
    "Snacks/Supps": "snacks-supps",
  };
  return mapping[category] || slugify(category);
}
