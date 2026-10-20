import type { Metadata } from "next";
import {
  geistSans,
  geistMono,
  chillax,
  satoshi,
  generalSans,
  bespoke,
  newTitle,
} from "@/lib/fonts";
import "./globals.css";
import Header from "./components/header";

export const metadata: Metadata = {
  title: "afive Music Publishing",
  description:
    "Stockholm-based music publishing company representing songwriters and composers.",
  keywords: ["music publishing", "songwriters", "composers", "music catalog", "royalties", "sync licensing"],
  authors: [{ name: "afive Music Publishing" }],
  creator: "afive Music Publishing",
  publisher: "afive Music Publishing",
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
  openGraph: {
    type: "website",
    locale: "en_EU",
    url: "https://afivepublishing.com",
    siteName: "afive Music Publishing",
    title: "afive Music Publishing",
    description:
      "Stockholm-based music publishing company representing songwriters and composers.",
    images: [
      {
        url: "/logos/afive-fi-stepped-dark.png",
        width: 1200,
        height: 630,
        alt: "afive Music Publishing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "afive Music Publishing",
    description:
      "Stockholm-based music publishing company representing songwriters and composers.",
    images: ["/logos/afive-fi-stepped-dark.png"],
  },
  metadataBase: new URL("https://afivepublishing.com"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${chillax.variable} ${satoshi.variable} ${generalSans.variable} ${bespoke.variable} ${newTitle.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
