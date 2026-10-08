"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ButtonFlip } from "./button-flip";
import { FaInstagram, FaSpotify, FaYoutube } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";
import Link from "next/link";
import { TextFlip } from "./text-flip";

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
  { text: "label", href: "/label" },
  { text: "roster", href: "/roster" },
  { text: "news", href: "/news" },
  { text: "archive", href: "/archive" },
  { text: "contact", href: "/contact" },
];

const socialLinks = [
  {
    href: "/",
    label: "Open Apple Music (opens in a new tab)",
    Icon: SiApplemusic,
  },
  {
    href: "/",
    label: "Open Instagram (opens in a new tab)",
    Icon: FaInstagram,
  },
  {
    href: "/",
    label: "Open Spotify (opens in a new tab)",

    Icon: FaSpotify,
  },
  {
    href: "/",
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
          "relative z-40 flex w-fit font-satoshi font-medium justify-self-start col-start-1 col-span-2 gap-4 text-[#3c3c3c] max-sm:block",
          {
            "text-[#F1EEE9]": isOpen,
          },
        )}
      >
        <motion.div
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          className="focus-visible:border-leon-yellow flex cursor-pointer items-center gap-2 focus:outline-none"
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          whileHover={isOpen ? undefined : "hover"}
        >
          <motion.div
            className={cn(
              "relative flex h-8 w-8 cursor-pointer items-center justify-center",
            )}
          >
            <motion.span
              className="absolute top-1/2 left-1/2 h-px w-6 -translate-x-1/2 bg-current"
              variants={{
                open: { rotate: 45, y: 0 },
                closed: { rotate: 0, y: -4 },
                hover: { rotate: 0, y: -5 },
              }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="absolute top-1/2 left-1/2 h-px w-6 -translate-x-1/2 bg-current"
              variants={{
                open: { rotate: -45, y: 0 },
                closed: { rotate: 0, y: 4 },
                hover: { rotate: 0, y: 5 },
              }}
              transition={{ duration: 0.15 }}
            />
          </motion.div>
          <p
            className={cn("uppercase text-sm", {
              "text-[#F1EEE9]": isOpen,
            })}
          >
            {isOpen ? "close" : "menu"}
          </p>
        </motion.div>
      </motion.div>

      <motion.aside
        role="presentation"
        onClick={(e) => e.stopPropagation()}
        animate={isOpen ? "open" : "closed"}
        variants={drawerVariants}
        initial="closed"
        className={cn(
          "bg-[#3c3c3c] text-secondary-gray fixed top-0 left-0 z-20 flex h-full w-full flex-col items-start justify-center gap-8 border-r-[#202020] px-4 capitalize md:w-[30%] md:px-10",
          { hidden: !isOpen },
        )}
      >
        <ul className={cn("flex flex-col justify-center gap-2")}>
          {menuItems.map((item, index) => (
            <motion.li key={index}>
              <Link
                href={item.href}
                className="border-b-2 border-transparent focus:outline-none focus-visible:border-b-2 focus-visible:border-leon-yellow"
              >
                <ButtonFlip className="md:text-7xl capitalize leading-none px-1 tracking-tighter font-satoshi font-medium text-4xl">
                  {item.text}
                </ButtonFlip>
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="flex items-start px-2 justify-center gap-4">
          {socialLinks.map(({ href, label, Icon: IconComp }) => (
            <a
              key={label}
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
      <Link href="/" className="relative w-24 col-start-7 md:col-start-6 col-span-2">
        <ButtonFlip className="font-bespoke text-xl uppercase text-[#3c3c3c] font-bold">
          {"afive"}
        </ButtonFlip>
      </Link>
    </nav>
  );
}
