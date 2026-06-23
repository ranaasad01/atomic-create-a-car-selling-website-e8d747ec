"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle as Twitter, Camera as Instagram, Globe as Facebook, Play as Youtube } from 'lucide-react';
import { navLinks, brand } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const footerSections = [
  {
    title: "Browse",
    links: [
      { label: "All Inventory", href: "#inventory" },
      { label: "Featured Cars", href: "#featured" },
      { label: "New Arrivals", href: "#inventory" },
      { label: "Hot Deals", href: "#inventory" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Why AutoDrive", href: "#why-us" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "How It Works", href: "#why-us" },
      { label: "Financing Guide", href: "#contact" },
      { label: "Sell Your Car", href: "#contact" },
      { label: "FAQ", href: "#contact" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getLinkHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : "/" + href;
    }
    return href;
  };

  return (
    <footer className="bg-[#080812] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12"
        >
          {/* Brand Column */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-[#e63946] flex items-center justify-center shadow-[0_0_16px_rgba(230,57,70,0.4)]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                >
                  <path
                    d="M5 17H3a1 1 0 01-1-1v-2a1 1 0 011-1h2M19 17h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              {brand.tagline}. Your trusted marketplace for premium and luxury vehicles, connecting buyers with verified dealers across the country.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={`mailto:${brand.email}`}
                className="flex items-center gap-3 text-white/50 hover:text-white/80 text-sm transition-colors duration-200 group"
              >
                <Mail size={15} className="text-[#e63946] shrink-0" />
                {brand.email}
              </a>
              <a
                href={`tel:${brand.phone}`}
                className="flex items-center gap-3 text-white/50 hover:text-white/80 text-sm transition-colors duration-200"
              >
                <Phone size={15} className="text-[#e63946] shrink-0" />
                {brand.phone}
              </a>
              <div className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin size={15} className="text-[#e63946] shrink-0 mt-0.5" />
                {brand.address}
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Twitter, href: brand.socials.twitter, label: "Twitter" },
                { icon: Instagram, href: brand.socials.instagram, label: "Instagram" },
                { icon: Facebook, href: brand.socials.facebook, label: "Facebook" },
                { icon: Youtube, href: brand.socials.youtube, label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/12 hover:border-white/20 transition-all duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={fadeInUp}>
              <h4
                className="text-white font-semibold text-sm mb-4 tracking-wide uppercase"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={getLinkHref(link.href)}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-white/50 hover:text-white/90 text-sm transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} AutoDrive. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}