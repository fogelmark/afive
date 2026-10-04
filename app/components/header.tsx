"use client";

import Image from "next/image";
import logo_dark_stripes from "@/public/logos/afive-fi-stripes-dark.png";
import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ButtonFlip } from "./button-flip";
import { FaInstagram, FaSpotify, FaYoutube } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";

export const drawerVariants = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.15,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
};

const menuItems = [
  { text: "listen", href: "" },
  { text: "watch", hre: "" },
  { text: "shop", href: "" },
  { text: "tour", href: "" },
  { text: "news", href: "" },
];

const socialLinks = [
  {
    href: "https://music.apple.com/se/artist/l%C3%A9on/1065692205?l=en-GB",
    label: "Open Apple Music (opens in a new tab)",
    Icon: SiApplemusic,
  },
  {
    href: "https://www.instagram.com/leon/",
    label: "Open Instagram (opens in a new tab)",
    Icon: FaInstagram,
  },
  {
    href: "https://open.spotify.com/artist/4SqTiwOEdYrNayaGMkc7ia?si=U1ig4JftQm-kCDbByBkTCA",
    label: "Open Spotify (opens in a new tab)",

    Icon: FaSpotify,
  },
  {
    href: "https://www.youtube.com/@itsleonmusic",
    label: "Open YouTube (opens in a new tab)",
    Icon: FaYoutube,
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="px-6 md:px-12 py-6 grid grid-cols-12 items-center justify-items-center w-full z-20">
      <motion.div
        className={cn(
          "relative z-40 flex w-fit justify-self-start col-start-1 col-span-2 gap-4 text-[#3c3c3c] max-sm:block",
          {
            "text-[#F1EEE9]": isOpen,
          },
        )}
      >
        <div
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          className="focus-visible:border-leon-yellow flex cursor-pointer items-center gap-2 focus:outline-none"
        >
          <div
            className={cn(
              "relative flex h-8 w-8 cursor-pointer items-center justify-center",
            )}
          >
            <motion.span
              className="absolute top-1/2 left-1/2 h-px w-7.5 -translate-x-1/2 bg-current"
              animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="absolute top-1/2 left-1/2 h-px w-7.5 -translate-x-1/2 bg-current"
              animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
              transition={{ duration: 0.15 }}
            />
          </div>
          <p
            className={cn("uppercase text-xs", {
              "text-[#F1EEE9]": isOpen,
            })}
          >
            {isOpen ? "close" : "menu"}
          </p>
        </div>
      </motion.div>

      <motion.aside
        role="presentation"
        onClick={(e) => e.stopPropagation()}
        animate={isOpen ? "open" : "closed"}
        variants={drawerVariants}
        initial="closed"
        className={cn(
          "bg-[#3c3c3c] text-secondary-gray border-gray-tertiary/50 fixed top-0 left-0 z-20 flex h-full w-full flex-col items-start justify-center gap-8 border-r px-4 capitalize md:w-[30%] md:px-10",
          { hidden: !isOpen },
        )}
      >
        <ul className={cn("flex h-2/3 flex-col justify-center gap-4")}>
          {menuItems.map((item, index) => (
            <motion.li key={index}>
              <ButtonFlip className="md:text-6xl text-5xl" href={item.href}>
                {item.text}
              </ButtonFlip>
            </motion.li>
          ))}
        </ul>

        <div className="flex items-start justify-center gap-4">
          {socialLinks.map(({ href, label, Icon: IconComp }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="focus-visible:border-leon-yellow border-b-2 border-transparent px-1 pt-0 pb-1.5 text-current focus:outline-none focus-visible:border-b-2"
            >
              <IconComp
                size={20}
                className="text-[#d9d7cb]"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </motion.aside>

      <div className="relative w-24 col-start-6 col-span-2">
        <Image
          src={logo_dark_stripes}
          alt="A5"
          className="object-contain"
          priority
        />
      </div>

      <p className="text-xs uppercase col-start-9 col-span-4 text-[#131313] font-general-sans">
        music publishing
      </p>
    </nav>
  );
}
