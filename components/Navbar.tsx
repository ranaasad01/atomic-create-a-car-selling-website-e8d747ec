"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from 'lucide-react';
import { navLinks, navCTA, brand } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0d0d1a]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-[#e63946] flex items-center justify-center shadow-[0_0_16px_rgba(230,57,70,0.5)] group-hover:shadow-[0_0_24px_rgba(230,57,70,0.7)] transition-all duration-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                >
                  <path
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 17H3a1 1 0 01-1-1v-2a1 1 0 011-1h2M19 17h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span
                className="font-display text-xl font-800 tracking-tight text-white"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                AUTO<span className="text-[#e63946]">DRIVE</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getLinkHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-white hover:bg-white/8 ${
                    pathname === link.href && !link.href.startsWith("#")
                      ? "text-white bg-white/10"
                      : "text-white/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <motion.a
                href={getLinkHref(navCTA.href)}
                onClick={(e) =>
                  handleAnchorClick(
                    e as React.MouseEvent<HTMLAnchorElement>,
                    navCTA.href
                  )
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 rounded-xl bg-[#e63946] text-white text-sm font-semibold shadow-[0_0_20px_rgba(230,57,70,0.35)] hover:shadow-[0_0_28px_rgba(230,57,70,0.55)] hover:bg-[#d62f3c] transition-all duration-300 cursor-pointer"
              >
                {navCTA.label}
              </motion.a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 z-40 md:hidden bg-[#0d0d1a]/98 backdrop-blur-xl border-b border-white/10"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                >
                  <Link
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="block px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/8 font-medium transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.25 }}
                className="mt-2 pt-2 border-t border-white/10"
              >
                <a
                  href={getLinkHref(navCTA.href)}
                  onClick={(e) =>
                    handleAnchorClick(
                      e as React.MouseEvent<HTMLAnchorElement>,
                      navCTA.href
                    )
                  }
                  className="block px-4 py-3 rounded-xl bg-[#e63946] text-white font-semibold text-center hover:bg-[#d62f3c] transition-all duration-200"
                >
                  {navCTA.label}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}