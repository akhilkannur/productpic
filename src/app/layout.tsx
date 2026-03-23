import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProductPic.pro | Premium DTC Style Vault",
  description: "Unlock 55+ studio-grade AI product photography prompts for DTC brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-accent selection:text-background">
        {children}
      </body>
    </html>
  );
}