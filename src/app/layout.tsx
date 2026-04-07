import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://productphoto.pro";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Product Photography Prompts | ProductPhoto.pro AI Library",
    template: "%s | Product Photography Prompts",
  },
  description:
    "The official library of 100+ professional AI product photography prompts for DTC brands. Generate high-end food & beverage product photos in Midjourney and Stable Diffusion.",
  keywords: [
    "product photography prompts",
    "AI product photography",
    "Midjourney product photo prompts",
    "Stable Diffusion product prompts",
    "DTC product photography",
    "AI food photography prompts",
    "beverage product photography AI",
    "product photo AI prompts",
    "CPG product photography AI",
  ],
  authors: [{ name: "ProductPhoto.pro" }],
  creator: "ProductPhoto.pro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "ProductPhoto.pro",
    title: "ProductPhoto.pro | AI Product Photography Prompts",
    description:
      "100+ professional AI prompts for high-end food & beverage product photos. Built for DTC brands.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ProductPhoto.pro | AI Product Photography Prompt Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ProductPhoto.pro | AI Product Photography Prompts",
    description:
      "100+ professional AI prompts for high-end food & beverage product photos. Built for DTC brands.",
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9BRP897VP3"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-9BRP897VP3');`,
          }}
        />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: "ProductPhoto.pro | AI Product Photography Prompts",
              description:
                "100+ professional AI prompts for high-end food & beverage product photos for DTC brands.",
              brand: { "@type": "Brand", name: "ProductPhoto.pro" },
              offers: {
                "@type": "Offer",
                price: "29.00",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                url: siteUrl,
              },
            }),
          }}
        />
      </head>
      <body className="antialiased selection:bg-accent selection:text-black">
        {children}
        {modal}
      </body>
    </html>
  );
}
