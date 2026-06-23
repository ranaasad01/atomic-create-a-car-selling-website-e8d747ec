import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AutoDrive — Find Your Perfect Car",
  description:
    "AutoDrive is your premier destination for luxury and performance vehicles. Browse thousands of verified listings and drive away in your dream car today.",
  keywords: ["cars", "auto", "luxury cars", "car dealership", "buy cars", "AutoDrive"],
  openGraph: {
    title: "AutoDrive — Find Your Perfect Car",
    description: "Browse thousands of verified luxury and performance vehicle listings.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body className="bg-[#0d0d1a] text-[#f1f1f1] antialiased font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}