import type { Metadata } from "next";
import { geistSans, geistMono, specialGothic, matangi, centralStation } from "@/lib/fonts";
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
      className={`${geistSans.variable} ${geistMono.variable} ${specialGothic.variable} ${matangi.variable} ${centralStation.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
