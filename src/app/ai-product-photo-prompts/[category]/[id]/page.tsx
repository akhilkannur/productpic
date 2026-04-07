import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import StyleDetail from "@/components/StyleDetail";
import { getStyleById, getStyles } from "@/lib/styles";
import { getCategorySlug } from "@/lib/utils";

interface PageProps {
  params: Promise<{
    category: string;
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const style = await getStyleById(id);

  if (!style) return {};

  const title = `AI Product Photo Prompt: ${style.name} for ${style.category}`;
  const description = `The official AI product photography prompt for ${style.name} style. Optimized for ${style.category} products. 100% photorealistic results with Midjourney and Nano Banana.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [style.afterImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [style.afterImage],
    },
    alternates: {
      canonical: `https://productphoto.pro/ai-product-photo-prompts/${getCategorySlug(style.category)}/${style.id}`,
    },
  };
}

export default async function StylePage({ params }: PageProps) {
  const { category, id } = await params;
  const style = await getStyleById(id);

  if (!style || getCategorySlug(style.category) !== category) {
    notFound();
  }

  return (
    <div className="font-sans antialiased min-h-screen flex flex-col selection:bg-accent selection:text-black w-full h-full bg-background">
      <Header />
      <main className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 md:py-24 w-full flex-grow flex items-center justify-center">
        <StyleDetail style={style} />
      </main>
      <footer className="w-full border-t border-borderSubtle bg-surface mt-auto">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 text-center">
          <p className="text-textMuted text-xs font-medium uppercase tracking-[0.2em]">© 2026 ProductPhoto.pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export async function generateStaticParams() {
  const styles = await getStyles();
  return styles.map((style) => ({
    category: getCategorySlug(style.category),
    id: style.id,
  }));
}
