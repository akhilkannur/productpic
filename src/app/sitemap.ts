import type { MetadataRoute } from "next";
import { getStyles } from "@/lib/styles";
import { getCategorySlug } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://productphoto.pro";
  const styles = await getStyles();

  const styleEntries: MetadataRoute.Sitemap = styles.map((style) => ({
    url: `${baseUrl}/ai-product-photo-prompts/${getCategorySlug(style.category)}/${style.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...styleEntries,
  ];
}
