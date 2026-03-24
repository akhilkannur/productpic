import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | AI Product Photography Prompts",
  description:
    "Learn how to use ProductPhoto.pro AI prompts with Nano Banana or Midjourney to generate studio-grade food & beverage product photography for your DTC brand.",
  alternates: {
    canonical: "https://productphoto.pro/how-it-works",
  },
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
