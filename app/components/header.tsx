"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ButtonFlip } from "./button-flip";
import { FaInstagram, FaSpotify, FaYoutube } from "react-icons/fa";
import { SiApplemusic } from "react-icons/si";
import Link from "next/link";

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

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

// ============================================================================
// MENU DATA
// ============================================================================

const menuItems = [
  { text: "label", href: "/label" },
  { text: "roster", href: "/roster" },
  { text: "news", href: "/news" },
  { text: "archive", href: "/archive" },
  { text: "contact", href: "/contact" },
];

// Social media links
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

// ============================================================================
// HEADER COMPONENT
// ============================================================================

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when menu is open (body overflow + touch events)
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Prevent touch scroll on mobile
      const preventScroll = (e: TouchEvent) => {
        e.preventDefault();
      };

      document.body.addEventListener('touchmove', preventScroll, { passive: false });

      return () => {
        document.body.style.overflow = '';
        document.body.removeEventListener('touchmove', preventScroll);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    <nav className="px-6 md:px-12 py-6 grid grid-cols-12 items-center justify-items-center w-full z-20">
      {/* ============================================================ */}
      {/* MENU TOGGLE BUTTON (visible on all screens, positioned in header) */}
      {/* ============================================================ */}
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
              "text-offwhite": isOpen,
            })}
          >
            {isOpen ? "close" : "menu"}
          </p>
        </motion.div>
      </motion.div>

      {/* ============================================================ */}
      {/* SIDE MENU (full screen on mobile, 30% width on desktop) */}
      {/* ============================================================ */}
      <motion.aside
        role="presentation"
        onClick={(e) => e.stopPropagation()}
        animate={isOpen ? "open" : "closed"}
        variants={drawerVariants}
        initial="closed"
        className={cn(
          "bg-[#3c3c3c] text-offwhite fixed top-0 left-0 z-20 flex h-dvh w-screen flex-col justify-center py-6 px-4 capitalize overflow-y-auto md:h-screen md:w-[30%] md:px-10 md:overflow-hidden",
          { hidden: !isOpen },
        )}
      >
        {/* Menu items + Social icons grouped (centered vertically) */}
        <div className="flex flex-col gap-6 my-auto">
          {/* Menu items (main navigation links) */}
          <ul className={cn("flex flex-col justify-center gap-1")}>
            {menuItems.map((item, index) => (
              <motion.li key={index}>
                <Link
                  href={item.href}
                  className="border-b-2 border-transparent focus:outline-none focus-visible:border-b-2 focus-visible:border-leon-yellow"
                >
                  <ButtonFlip className="text-5xl md:text-6xl capitalize leading-none px-1 tracking-tighter font-satoshi font-medium">
                    {item.text}
                  </ButtonFlip>
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Social media icons */}
          <div className="flex items-start px-2 justify-start gap-4">
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
        </div>
      </motion.aside>

      {/* ============================================================ */}
      {/* LOGO (centered in header) */}
      {/* ============================================================ */}
      <Link href="/" className="relative col-start-5 col-span-4 md:col-start-6 md:col-span-2">
        <ButtonFlip className="font-bespoke text-xl uppercase text-[#3c3c3c] font-bold">
          {"afive"}
        </ButtonFlip>
      </Link>
    </nav>
  );
}
