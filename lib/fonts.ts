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

export const satoshi = localFont({
  src: [
    {
      path: "../public/fonts/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Satoshi-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
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

export const generalSans = localFont({
  src: [
    {
      path: "../public/fonts/GeneralSans-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-ExtralightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/GeneralSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/GeneralSans-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-SemiboldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/GeneralSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-general-sans",
});

export const bespoke = localFont({
  src: [
    {
      path: "../public/fonts/BespokeSerif-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/BespokeSerif-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/BespokeSerif-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/BespokeSerif-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/BespokeSerif-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/BespokeSerif-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/BespokeSerif-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/BespokeSerif-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/BespokeSerif-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/BespokeSerif-ExtraboldItalic.woff2",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-bespoke",
});

export const newTitle = localFont({
  src: [
    {
      path: "../public/fonts/NewTitle-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/NewTitle-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/NewTitle-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/NewTitle-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/NewTitle-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-new-title",
});
