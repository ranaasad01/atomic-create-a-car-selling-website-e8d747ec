"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Search, ChevronDown, Star, Shield, Zap, Award, Phone, Mail, MapPin, ArrowRight, Check, Fuel, Settings, Users, Activity } from 'lucide-react';
import { brand, cars, testimonials, stats } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline section data ───────────────────────────────────────────────────

const whyUsItems = [
  {
    icon: Shield,
    title: "Verified Listings",
    description:
      "Every vehicle passes a 150-point inspection by certified mechanics before it appears on our platform. No surprises, no hidden damage.",
  },
  {
    icon: Zap,
    title: "Instant Financing",
    description:
      "Get pre-approved in under 60 seconds with our network of 40+ lenders. Competitive rates starting at 3.9% APR for qualified buyers.",
  },
  {
    icon: Award,
    title: "Price Guarantee",
    description:
      "We benchmark every listing against live market data. If you find the same car cheaper within 7 days, we match it, no questions asked.",
  },
  {
    icon: Users,
    title: "Dedicated Concierge",
    description:
      "A personal advisor guides you from first search to keys in hand. Real humans, available 7 days a week, no bots, no call centers.",
  },
];

const featuredCars = [
  {
    id: "f1",
    make: "Porsche",
    model: "911 Carrera S",
    year: 2023,
    price: 142000,
    mileage: 4200,
    fuelType: "Petrol",
    transmission: "Automatic",
    horsepower: 443,
    seats: 4,
    image: "https://www.stuttcars.com/wp-content/uploads/2022/11/Porsche-911-Carrera-S-Coupe-992-2023-%E2%80%93-Specifications-Performance.png",
    badge: "Featured",
    color: "GT Silver Metallic",
    location: "Los Angeles, CA",
  },
  {
    id: "f2",
    make: "BMW",
    model: "M5 Competition",
    year: 2023,
    price: 118500,
    mileage: 8100,
    fuelType: "Petrol",
    transmission: "Automatic",
    horsepower: 617,
    seats: 5,
    image: "https://listingcontent.exoticcartrader.com/1654026444927x985478891031656100/front-quarter-passenger",
    badge: "Hot Deal",
    color: "Frozen Dark Silver",
    location: "Beverly Hills, CA",
  },
  {
    id: "f3",
    make: "Mercedes-Benz",
    model: "AMG GT 63 S",
    year: 2022,
    price: 165000,
    mileage: 12300,
    fuelType: "Petrol",
    transmission: "Automatic",
    horsepower: 630,
    seats: 4,
    image: "https://hips.hearstapps.com/mtg-prod/65a02a3927182c0008e41344/2022-mercedes-amg-gt63-004-1.jpg",
    badge: "Featured",
    color: "Obsidian Black",
    location: "Santa Monica, CA",
  },
  {
    id: "f4",
    make: "Tesla",
    model: "Model S Plaid",
    year: 2023,
    price: 108990,
    mileage: 2100,
    fuelType: "Electric",
    transmission: "Automatic",
    horsepower: 1020,
    seats: 5,
    image: "https://topelectricsuv.com/wp-content/uploads/2024/10/Tesla-Model-S-in-Lunar-Silver-front-three-quarters.jpg",
    badge: "New Arrival",
    color: "Midnight Silver",
    location: "San Francisco, CA",
  },
  {
    id: "f5",
    make: "Lamborghini",
    model: "Huracán EVO",
    year: 2022,
    price: 248000,
    mileage: 3800,
    fuelType: "Petrol",
    transmission: "Automatic",
    horsepower: 631,
    seats: 2,
    image: "http://www.lunaluxuryrentals.com.au/cdn/shop/files/56F49A0D-67C6-4BD8-B34D-E43555A1CA18.jpg?v=1741607720",
    badge: "Featured",
    color: "Giallo Belenus",
    location: "Scottsdale, AZ",
  },
  {
    id: "f6",
    make: "Audi",
    model: "RS e-tron GT",
    year: 2023,
    price: 139900,
    mileage: 5600,
    fuelType: "Electric",
    transmission: "Automatic",
    horsepower: 637,
    seats: 4,
    image: "https://kwucoyotes.com/images/2025/8/14/marcus_delgado_25_fb.jpg",
    badge: "New Arrival",
    color: "Kemora Gray",
    location: "Miami, FL",
  },
];

const inventoryFilters = ["All", "Petrol", "Electric", "Hybrid", "Diesel"];

const localTestimonials = [
  {
    id: "t1",
    name: "Marcus Delgado",
    location: "Los Angeles, CA",
    rating: 5,
    text: "Found my dream Porsche in under a week. The concierge team handled everything, from inspection to financing. Absolutely seamless experience.",
    car: "2023 Porsche 911 Carrera S",
    avatar: "https://kwucoyotes.com/images/2025/8/14/marcus_delgado_25_fb.jpg",
  },
  {
    id: "t2",
    name: "Priya Sharma",
    location: "San Francisco, CA",
    rating: 5,
    text: "As a first-time luxury car buyer I was nervous, but AutoDrive made it feel effortless. The price guarantee saved me $4,200 compared to the dealership.",
    car: "2023 Tesla Model S Plaid",
    avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/d/de/Priya_Sharma_%28fictional_character%29.jpg/250px-Priya_Sharma_%28fictional_character%29.jpg",
  },
  {
    id: "t3",
    name: "James Whitfield",
    location: "Miami, FL",
    rating: 5,
    text: "Three cars purchased through AutoDrive over two years. The verified listings mean I never worry about hidden issues. Unmatched trust in this space.",
    car: "2022 Mercedes-Benz AMG GT 63 S",
    avatar: "https://www.nga.org/wp-content/uploads/2018/12/James_whitfield_Gov.jpg",
  },
];

const localStats = [
  { value: "12,400+", label: "Vehicles Sold" },
  { value: "98%", label: "Buyer Satisfaction" },
  { value: "40+", label: "Lending Partners" },
  { value: "$2.1B", label: "In Transactions" },
];

const bodyTypes = [
  { label: "Sedan", icon: "🚗", count: 284 },
  { label: "SUV", icon: "🚙", count: 412 },
  { label: "Coupe", icon: "🏎️", count: 156 },
  { label: "Convertible", icon: "🚘", count: 89 },
  { label: "Truck", icon: "🛻", count: 203 },
  { label: "Electric", icon: "⚡", count: 178 },
];

const badgeColors: Record<string, string> = {
  Featured: "bg-[#e63946]/20 text-[#e63946] border border-[#e63946]/30",
  "Hot Deal": "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  "New Arrival": "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
};

// ─── Sub-components ────────────────────────────────────────────────────────

function CarCard({
  car,
  index,
}: {
  car: (typeof featuredCars)[0];
  index: number;
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={shouldReduce ? {} : { y: -6, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative bg-white/5 border border-white/8 rounded-2xl overflow-hidden hover:border-white/20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-white/5">
        <img
          src={car.image}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "https://hips.hearstapps.com/mtg-prod/65a02a3927182c0008e41344/2022-mercedes-amg-gt63-004-1.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {car.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${badgeColors[car.badge] ?? ""}`}
          >
            {car.badge}
          </span>
        )}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-2.5 py-1 text-white text-xs font-medium">
          {car.location}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-0.5">
              {car.year} · {car.color}
            </p>
            <h3 className="text-white font-bold text-lg leading-tight">
              {car.make} {car.model}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-[#e63946] font-bold text-xl">
              ${(car.price ?? 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-4 mb-4 text-white/50 text-xs">
          <span className="flex items-center gap-1">
            <Fuel size={12} className="text-white/30" />
            {car.fuelType}
          </span>
          <span className="flex items-center gap-1">
            <Settings size={12} className="text-white/30" />
            {car.transmission}
          </span>
          <span className="flex items-center gap-1">
            <Activity size={12} className="text-white/30" />
            {(car.horsepower ?? 0).toLocaleString()} hp
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} className="text-white/30" />
            {car.seats} seats
          </span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-white/40 text-xs">
            {(car.mileage ?? 0).toLocaleString()} mi
          </p>
          <motion.button
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-1.5 text-[#e63946] text-sm font-semibold hover:text-[#ff4d5a] transition-colors duration-200"
          >
            View Details <ArrowRight size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "text-amber-400 fill-amber-400" : "text-white/20"}
        />
      ))}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduce = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    interest: "Buy a Car",
  });

  const filteredCars =
    activeFilter === "All"
      ? featuredCars
      : featuredCars.filter((c) => c.fuelType === activeFilter);

  const handleContactChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setContactForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="bg-[#0d0d1a] text-white overflow-x-hidden">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#e63946]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-900/20 rounded-full blur-[100px]" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 bg-[#e63946]/10 border border-[#e63946]/25 text-[#e63946] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e63946] animate-pulse" />
                  Premium Auto Marketplace
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95] text-balance mb-6"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                Drive the Car
                <br />
                <span className="text-[#e63946]">You Deserve.</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-white/60 text-lg leading-relaxed max-w-md mb-8 text-pretty"
              >
                AutoDrive connects you with thousands of verified premium
                vehicles. Transparent pricing, instant financing, and a
                concierge team that makes buying effortless.
              </motion.p>

              {/* Search bar */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-3 mb-8"
              >
                <div className="relative flex-1">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                  />
                  <input
                    type="text"
                    placeholder="Search make, model, or keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/8 border border-white/12 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#e63946]/50 focus:bg-white/10 transition-all duration-200"
                  />
                </div>
                <motion.a
                  href="#inventory"
                  whileHover={shouldReduce ? {} : { scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 bg-[#e63946] hover:bg-[#ff4d5a] text-white font-bold px-6 py-3.5 rounded-xl transition-colors duration-200 shadow-[0_0_24px_rgba(230,57,70,0.4)] hover:shadow-[0_0_32px_rgba(230,57,70,0.6)] text-sm whitespace-nowrap"
                >
                  Search Cars <ArrowRight size={16} />
                </motion.a>
              </motion.div>

              {/* Quick stats */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-6"
              >
                {localStats.map((s) => (
                  <div key={s.label}>
                    <p className="text-white font-black text-2xl tracking-tight">
                      {s.value}
                    </p>
                    <p className="text-white/40 text-xs">{s.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Hero car image */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Glow behind image */}
                <div className="absolute inset-0 bg-[#e63946]/15 rounded-3xl blur-3xl scale-90 translate-y-8" />
                <img
                  src="https://www.stuttcars.com/wp-content/uploads/2022/11/Porsche-911-Carrera-S-Coupe-992-2023-%E2%80%93-Specifications-Performance.png"
                  alt="2023 Porsche 911 Carrera S"
                  className="relative w-full rounded-3xl object-cover aspect-[4/3] shadow-[0_24px_80px_rgba(0,0,0,0.7)] border border-white/10"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://hips.hearstapps.com/mtg-prod/65a02a3927182c0008e41344/2022-mercedes-amg-gt63-004-1.jpg";
                  }}
                />
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -bottom-5 -left-5 bg-[#0d0d1a]/90 backdrop-blur-xl border border-white/12 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                >
                  <p className="text-white/50 text-xs mb-0.5">Starting from</p>
                  <p className="text-white font-black text-2xl">$24,900</p>
                  <p className="text-[#e63946] text-xs font-semibold">
                    3.9% APR available
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="absolute -top-4 -right-4 bg-[#e63946] rounded-2xl p-3 shadow-[0_8px_24px_rgba(230,57,70,0.5)]"
                >
                  <Shield size={22} className="text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Body type quick-browse */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-20 grid grid-cols-3 sm:grid-cols-6 gap-3"
          >
            {bodyTypes.map((bt) => (
              <motion.a
                key={bt.label}
                href="#inventory"
                variants={scaleIn}
                whileHover={shouldReduce ? {} : { y: -4, scale: 1.04 }}
                className="flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/8 hover:border-white/20 rounded-xl py-4 px-2 transition-all duration-200 cursor-pointer group"
              >
                <span className="text-2xl">{bt.icon}</span>
                <span className="text-white/70 group-hover:text-white text-xs font-medium transition-colors">
                  {bt.label}
                </span>
                <span className="text-white/30 text-xs">{bt.count}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED INVENTORY ───────────────────────────────────────────── */}
      <section id="inventory" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <motion.p
                variants={fadeInUp}
                className="text-[#e63946] text-xs font-bold uppercase tracking-widest mb-2"
              >
                Browse Inventory
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-black tracking-tight text-balance"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                Hand-Picked
                <br />
                <span className="text-white/40">Premium Vehicles</span>
              </motion.h2>
            </div>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
              {inventoryFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeFilter === f
                      ? "bg-[#e63946] text-white shadow-[0_0_16px_rgba(230,57,70,0.4)]"
                      : "bg-white/8 text-white/60 hover:bg-white/12 hover:text-white border border-white/8"
                  }`}
                >
                  {f}
                </button>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCars.map((car, i) => (
              <CarCard key={car.id} car={car} index={i} />
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.a
              href="#inventory"
              whileHover={shouldReduce ? {} : { scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 border border-white/20 hover:border-[#e63946]/60 text-white/70 hover:text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 text-sm"
            >
              View All 1,200+ Listings <ArrowRight size={16} />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED SPOTLIGHT ───────────────────────────────────────────── */}
      <section id="featured" className="py-24 md:py-32 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-[#e63946]/8 rounded-3xl blur-2xl" />
              <img
                src="https://hips.hearstapps.com/mtg-prod/65a02a3927182c0008e41344/2022-mercedes-amg-gt63-004-1.jpg"
                alt="2022 Mercedes-Benz AMG GT 63 S"
                className="relative w-full rounded-2xl object-cover aspect-[4/3] border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://hips.hearstapps.com/mtg-prod/65a02a3927182c0008e41344/2022-mercedes-amg-gt63-004-1.jpg";
                }}
              />
              {/* Spec chips */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 flex-wrap">
                {["630 hp", "3.1s 0-60", "196 mph top speed"].map((spec) => (
                  <span
                    key={spec}
                    className="bg-black/70 backdrop-blur-sm border border-white/10 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Copy side */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.span
                variants={fadeInUp}
                className="inline-block text-[#e63946] text-xs font-bold uppercase tracking-widest mb-4"
              >
                Car of the Month
              </motion.span>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-balance"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                2022 Mercedes-Benz
                <br />
                <span className="text-[#e63946]">AMG GT 63 S</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-white/60 leading-relaxed mb-8 text-pretty"
              >
                The AMG GT 63 S 4-Door Coupe is the rare machine that delivers
                supercar performance without sacrificing real-world usability.
                Obsidian Black paint, AMG Night Package, and a hand-built 4.0L
                Biturbo V8 producing 630 horsepower. This is what driving
                excellence looks like.
              </motion.p>

              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                {[
                  { label: "Engine", value: "4.0L Biturbo V8" },
                  { label: "Power", value: "630 hp" },
                  { label: "Torque", value: "664 lb-ft" },
                  { label: "Mileage", value: "12,300 mi" },
                ].map((spec) => (
                  <motion.div
                    key={spec.label}
                    variants={fadeInUp}
                    className="bg-white/5 border border-white/8 rounded-xl p-4"
                  >
                    <p className="text-white/40 text-xs mb-1">{spec.label}</p>
                    <p className="text-white font-bold">{spec.value}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center gap-4">
                <motion.a
                  href="#contact"
                  whileHover={shouldReduce ? {} : { scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 bg-[#e63946] hover:bg-[#ff4d5a] text-white font-bold px-6 py-3.5 rounded-xl transition-colors duration-200 shadow-[0_0_24px_rgba(230,57,70,0.35)] text-sm"
                >
                  Inquire Now <ArrowRight size={16} />
                </motion.a>
                <p className="text-white font-black text-2xl">
                  $165,000
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────────── */}
      <section id="why-us" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              className="text-[#e63946] text-xs font-bold uppercase tracking-widest mb-3"
            >
              Why AutoDrive
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-black tracking-tight text-balance"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              Buying a Car Should Feel
              <br />
              <span className="text-white/40">This Good.</span>
            </motion.h2>
          </motion.div>

          {/* Asymmetric bento layout */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {whyUsItems.map((item, i) => {
              const Icon = item.icon;
              const isLarge = i === 0 || i === 3;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  whileHover={shouldReduce ? {} : { y: -5 }}
                  className={`relative bg-white/5 border border-white/8 rounded-2xl p-7 hover:border-[#e63946]/30 hover:bg-white/8 transition-all duration-300 group ${
                    isLarge ? "lg:col-span-2" : "lg:col-span-1"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#e63946]/15 border border-[#e63946]/20 flex items-center justify-center mb-5 group-hover:bg-[#e63946]/25 transition-colors duration-300">
                    <Icon size={22} className="text-[#e63946]" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  {/* Subtle corner accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#e63946]/5 rounded-bl-3xl rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Trust bar */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 py-8 border-t border-b border-white/8"
          >
            {[
              "150-Point Inspection",
              "7-Day Price Match",
              "Instant Pre-Approval",
              "No Hidden Fees",
              "Free Carfax Report",
            ].map((trust) => (
              <div key={trust} className="flex items-center gap-2 text-white/50 text-sm">
                <Check size={15} className="text-[#e63946]" />
                {trust}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section
        id="testimonials"
        className="py-24 md:py-32 bg-white/[0.02] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e63946]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <motion.p
              variants={fadeInUp}
              className="text-[#e63946] text-xs font-bold uppercase tracking-widest mb-3"
            >
              Real Buyers, Real Stories
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-black tracking-tight text-balance"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              Thousands of Happy
              <br />
              <span className="text-white/40">Drivers Nationwide</span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {localTestimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={shouldReduce ? {} : { y: -5 }}
                className={`bg-white/5 border border-white/8 rounded-2xl p-7 hover:border-white/16 transition-all duration-300 ${
                  i === 1 ? "md:mt-8" : ""
                }`}
              >
                <StarRating rating={t.rating} />
                <p className="text-white/70 text-sm leading-relaxed mt-4 mb-6 text-pretty">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/8">
                  <div className="w-10 h-10 rounded-full bg-[#e63946]/20 border border-[#e63946]/30 flex items-center justify-center text-[#e63946] font-bold text-sm shrink-0">
                    {(t.name ?? "?").charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.location}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-white/30 text-xs leading-tight">{t.car}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {localStats.map((s) => (
              <motion.div
                key={s.label}
                variants={scaleIn}
                className="text-center bg-white/5 border border-white/8 rounded-2xl py-8 px-4"
              >
                <p
                  className="text-4xl font-black text-white mb-1 tracking-tight"
                  style={{ fontFamily: "var(--font-barlow)" }}
                >
                  {s.value}
                </p>
                <p className="text-white/40 text-sm">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT / CTA ────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: CTA copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <motion.p
                variants={fadeInUp}
                className="text-[#e63946] text-xs font-bold uppercase tracking-widest mb-4"
              >
                Get in Touch
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-6 text-balance"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                Ready to Find
                <br />
                <span className="text-white/40">Your Next Car?</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-white/60 leading-relaxed mb-10 text-pretty"
              >
                Whether you're buying, selling, or just exploring, our team is
                here to help. Reach out and a dedicated advisor will respond
                within one business hour.
              </motion.p>

              <motion.div variants={staggerContainer} className="space-y-5">
                {[
                  { Icon: Phone, label: "Call Us", value: brand.phone, href: `tel:${brand.phone}` },
                  { Icon: Mail, label: "Email Us", value: brand.email, href: `mailto:${brand.email}` },
                  { Icon: MapPin, label: "Visit Us", value: brand.address, href: "#" },
                ].map(({ Icon, label, value, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    variants={fadeInUp}
                    whileHover={shouldReduce ? {} : { x: 4 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#e63946]/15 border border-[#e63946]/20 flex items-center justify-center shrink-0 group-hover:bg-[#e63946]/25 transition-colors duration-200">
                      <Icon size={18} className="text-[#e63946]" />
                    </div>
                    <div>
                      <p className="text-white/40 text-xs mb-0.5">{label}</p>
                      <p className="text-white/80 group-hover:text-white text-sm font-medium transition-colors duration-200">
                        {value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Contact form */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
            >
              <h3 className="text-white font-bold text-xl mb-6">
                Send a Message
              </h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 text-xs font-medium mb-1.5 block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      placeholder="John Smith"
                      className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#e63946]/50 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-medium mb-1.5 block">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleContactChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#e63946]/50 transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white/50 text-xs font-medium mb-1.5 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    placeholder="john@example.com"
                    className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#e63946]/50 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs font-medium mb-1.5 block">
                    I'm interested in
                  </label>
                  <select
                    name="interest"
                    value={contactForm.interest}
                    onChange={handleContactChange}
                    className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#e63946]/50 transition-all duration-200 appearance-none"
                  >
                    <option value="Buy a Car" className="bg-[#0d0d1a]">
                      Buy a Car
                    </option>
                    <option value="Sell My Car" className="bg-[#0d0d1a]">
                      Sell My Car
                    </option>
                    <option value="Financing" className="bg-[#0d0d1a]">
                      Financing Options
                    </option>
                    <option value="General Inquiry" className="bg-[#0d0d1a]">
                      General Inquiry
                    </option>
                  </select>
                </div>
                <div>
                  <label className="text-white/50 text-xs font-medium mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    placeholder="Tell us what you're looking for..."
                    rows={4}
                    className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#e63946]/50 transition-all duration-200 resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={shouldReduce ? {} : { scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-[#e63946] hover:bg-[#ff4d5a] text-white font-bold py-3.5 rounded-xl transition-colors duration-200 shadow-[0_0_24px_rgba(230,57,70,0.35)] hover:shadow-[0_0_32px_rgba(230,57,70,0.55)] text-sm"
                >
                  Send Message
                </motion.button>
                <p className="text-white/30 text-xs text-center">
                  We respond within 1 business hour. No spam, ever.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA BANNER ─────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#e63946]/10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#e63946]/20 via-transparent to-[#e63946]/20 pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-black tracking-tight text-balance mb-6"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              Your Dream Car is
              <br />
              <span className="text-[#e63946]">One Search Away.</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/60 text-lg mb-10 text-pretty"
            >
              Join over 12,000 satisfied buyers who found their perfect vehicle
              through AutoDrive. Start browsing today, no account required.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="#inventory"
                whileHover={shouldReduce ? {} : { scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-[#e63946] hover:bg-[#ff4d5a] text-white font-bold px-8 py-4 rounded-xl transition-colors duration-200 shadow-[0_0_32px_rgba(230,57,70,0.45)] text-base"
              >
                Browse All Cars <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={shouldReduce ? {} : { scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base"
              >
                Talk to an Advisor
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}