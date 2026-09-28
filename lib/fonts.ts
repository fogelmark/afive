import { Geist, Geist_Mono, Special_Gothic_Expanded_One, Matangi } from "next/font/google";
import localFont from "next/font/local";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const specialGothic = Special_Gothic_Expanded_One({
  weight: "400",
  variable: "--font-special-gothic",
  subsets: ["latin"],
});

export const matangi = Matangi({
  weight: "400",
  variable: "--font-matangi",
  subsets: ["latin"],
});

export const centralStation = localFont({
  src: "../public/fonts/Central Station.ttf",
  variable: "--font-central-station",
});
