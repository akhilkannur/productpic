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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-accent selection:text-black">
        {children}
      </body>
    </html>
  );
}