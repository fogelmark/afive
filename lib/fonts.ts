import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const chillax = localFont({
  src: [
    {
      path: "../public/fonts/Chillax-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/Chillax-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Chillax-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Chillax-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Chillax-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Chillax-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-chillax",
});
