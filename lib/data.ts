export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "#inventory" },
  { label: "Featured", href: "#featured" },
  { label: "Why Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const navCTA = {
  label: "Browse All Cars",
  href: "#inventory",
};

export const brand = {
  name: "AutoDrive",
  tagline: "Find Your Perfect Drive",
  email: "hello@autodrive.com",
  phone: "+1 (800) 555-0192",
  address: "4200 Motor Mile Blvd, Los Angeles, CA 90001",
  socials: {
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
};

export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid";
  transmission: "Automatic" | "Manual";
  bodyType: string;
  color: string;
  image: string;
  badge?: "Featured" | "New Arrival" | "Hot Deal";
  specs: {
    engine: string;
    horsepower: number;
    torque: string;
    acceleration: string;
    topSpeed: string;
    seats: number;
  };
  description: string;
  dealer: string;
  location: string;
};

export const cars: Car[] = [
  {
    id: "1",
    make: "Porsche",
    model: "911 Carrera S",
    year: 2023,
    price: 142000,
    mileage: 4200,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Coupe",
    color: "GT Silver Metallic",
    image: "https://www.stuttcars.com/wp-content/uploads/2022/11/Porsche-911-Carrera-S-Coupe-992-2023-%E2%80%93-Specifications-Performance.png",
    badge: "Featured",
    specs: {
      engine: "3.0L Twin-Turbo Flat-6",
      horsepower: 443,
      torque: "390 lb-ft",
      acceleration: "3.5s 0-60 mph",
      topSpeed: "191 mph",
      seats: 4,
    },
    description:
      "The iconic 911 Carrera S delivers breathtaking performance wrapped in timeless design. This near-new example has been meticulously maintained and comes with full Porsche service history.",
    dealer: "Prestige Motors LA",
    location: "Los Angeles, CA",
  },
  {
    id: "2",
    make: "BMW",
    model: "M5 Competition",
    year: 2023,
    price: 118500,
    mileage: 8100,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "Frozen Dark Silver",
    image: "https://listingcontent.exoticcartrader.com/1654026444927x985478891031656100/front-quarter-passenger",
    badge: "Hot Deal",
    specs: {
      engine: "4.4L Twin-Turbo V8",
      horsepower: 617,
      torque: "553 lb-ft",
      acceleration: "3.1s 0-60 mph",
      topSpeed: "190 mph",
      seats: 5,
    },
    description:
      "The M5 Competition is the ultimate expression of BMW performance. Featuring the legendary S63 engine and M xDrive all-wheel drive, this is a supercar in sedan clothing.",
    dealer: "Bavaria Auto Group",
    location: "Beverly Hills, CA",
  },
  {
    id: "3",
    make: "Mercedes-Benz",
    model: "AMG GT 63 S",
    year: 2022,
    price: 165000,
    mileage: 12300,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Gran Coupe",
    color: "Obsidian Black",
    image: "https://hips.hearstapps.com/mtg-prod/65a02a3927182c0008e41344/2022-mercedes-amg-gt63-004-1.jpg",
    badge: "Featured",
    specs: {
      engine: "4.0L Biturbo V8",
      horsepower: 630,
      torque: "664 lb-ft",
      acceleration: "3.1s 0-60 mph",
      topSpeed: "196 mph",
      seats: 4,
    },
    description:
      "The AMG GT 63 S 4-Door Coupe combines the soul of a sports car with the practicality of a four-door. Stunning in Obsidian Black with AMG Night Package.",
    dealer: "Star Auto Collection",
    location: "Santa Monica, CA",
  },
  {
    id: "4",
    make: "Tesla",
    model: "Model S Plaid",
    year: 2023,
    price: 108990,
    mileage: 2100,
    fuelType: "Electric",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "Midnight Silver",
    image: "https://topelectricsuv.com/wp-content/uploads/2024/10/Tesla-Model-S-in-Lunar-Silver-front-three-quarters.jpg",
    badge: "New Arrival",
    specs: {
      engine: "Tri-Motor Electric",
      horsepower: 1020,
      torque: "1050 lb-ft",
      acceleration: "1.99s 0-60 mph",
      topSpeed: "200 mph",
      seats: 5,
    },
    description:
      "The quickest production car ever made. The Model S Plaid redefines what an electric vehicle can be, with over 1,000 horsepower and a 396-mile range.",
    dealer: "EV Prestige Motors",
    location: "Culver City, CA",
  },
  {
    id: "5",
    make: "Lamborghini",
    model: "Urus S",
    year: 2023,
    price: 238000,
    mileage: 1800,
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "Arancio Borealis",
    image: "https://prestigeluxuryrentals.com/wp-content/uploads/2021/01/Orange-Urus-Front-1.png",
    badge: "Featured",
    specs: {
      engine: "4.0L Twin-Turbo V8",
      horsepower: 657,
      torque: "627 lb-ft",
      acceleration: "3.5s 0-60 mph",
      topSpeed: "190 mph",
      seats: 5,
    },
    description:
      "The Urus S is the world's first Super Sport Utility Vehicle. Striking Arancio Borealis orange with carbon fiber accents and full Lamborghini Ad Personam specification.",
    dealer: "Exotic Auto Gallery",
    location: "Malibu, CA",
  },
  {
    id: "6",
    make: "Audi",
    model: "RS e-tron GT",
    year: 2023,
    price: 142400,
    mileage: 5600,
    fuelType: "Electric",
    transmission: "Automatic",
    bodyType: "Gran Turismo",
    color: "Tactical Green",
    image: "https://www.topgear.com/sites/default/files/2024/06/A242565_large.jpg",
    badge: "New Arrival",
    specs: {
      engine: "Dual-Motor Electric",
      horsepower: 637,
      torque: "612 lb-ft",
      acceleration: "3.1s 0-60 mph",
      topSpeed: "155 mph",
      seats: 4,
    },
    description:
      "The RS e-tron GT is Audi's electric masterpiece. Sharing its platform with the Porsche Taycan, it delivers supercar performance with zero emissions and stunning Gran Turismo styling.",
    dealer: "Quattro Prestige",
    location: "Pasadena, CA",
  },
];

export const testimonials = [
  {
    id: "t1",
    name: "Marcus Chen",
    role: "Entrepreneur",
    avatar: "https://podcastle.org/wp-content/uploads/2024/09/photo_2024-06-24_16-15-54-660x989.jpg",
    rating: 5,
    text: "AutoDrive made finding my Porsche 911 effortless. The listings are accurate, the photos are real, and the dealer was exactly as described. Closed the deal in two days.",
  },
  {
    id: "t2",
    name: "Sophia Reyes",
    role: "Creative Director",
    avatar: "https://s3-us-west-1.amazonaws.com/peermusic-web-content/images/Lg/cc3c9d6c-cab4-4c47-b046-a54e5fa70d8a.jpg",
    rating: 5,
    text: "I was skeptical about buying a luxury car online, but AutoDrive changed my mind completely. The comparison tool helped me decide between three models and I could not be happier.",
  },
  {
    id: "t3",
    name: "James Whitfield",
    role: "Investment Banker",
    avatar: "https://www.nga.org/wp-content/uploads/2018/12/James_whitfield_Gov.jpg",
    rating: 5,
    text: "Third car I have purchased through AutoDrive. The platform keeps getting better. Saved cars feature is a game-changer when you are deciding between multiple options.",
  },
];

export const stats = [
  { label: "Verified Listings", value: "12,400+" },
  { label: "Happy Buyers", value: "8,200+" },
  { label: "Trusted Dealers", value: "340+" },
  { label: "Cities Covered", value: "85+" },
];