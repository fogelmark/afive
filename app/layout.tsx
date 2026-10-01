import type { Metadata } from "next";
import { geistSans, geistMono, chillax, satoshi, generalSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "A5 Music Publishing",
  description: "Discover extraordinary musical compositions that push boundaries and create timeless moments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${chillax.variable} ${satoshi.variable} ${generalSans.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
