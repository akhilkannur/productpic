import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | AI Product Photography Prompts",
  description:
    "Learn how to use ProductPhoto.pro AI prompts to generate professional food & beverage product photos for your DTC brand.",
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
