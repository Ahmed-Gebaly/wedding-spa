import type { Metadata } from "next";
import "./globals.css";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "أحمد و سلمي | Wedding Invitation",
  description: "A family and luxury wedding invitation experience for أحمد and سلمي.",
  openGraph: {
    title: "Ahmed & Salma | Wedding Invitation",
    description: "Join us on 7/8/2026 to celebrate Ahmed and Salma.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Aref+Ruqaa:wght@400;700&family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;700&family=Scheherazade+New:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" as="image" href={assetPath("/images/hero-bg.svg")} />
        <link rel="preload" as="image" href={assetPath("/cinematic.png")} />
        <link rel="preload" as="image" href={assetPath("/assets/Bismillah.svg")} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
