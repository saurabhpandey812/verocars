import type { Car } from "@/types/car";

// DEMO DATA: prices, deposits and specs are placeholders. Swap this module for a Prisma query later.
type Seed = Omit<Car, "id" | "slug" | "images" | "description" | "features" | "status"> & { features?: string[] };
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const base = ["Air conditioning", "Bluetooth audio", "Dual airbags", "ABS", "Rear parking sensors"];

const seeds: Seed[] = [
  { brand: "Mahindra", model: "Scorpio", category: "SUV", year: 2023, seats: 7, transmission: "Manual", fuel: "Diesel", pricePerDay: 4500, securityDeposit: 12000 },
  { brand: "Maruti Suzuki", model: "Swift Dzire", category: "Sedan", year: 2023, seats: 5, transmission: "Manual", fuel: "Petrol", pricePerDay: 2000, securityDeposit: 6000 },
  { brand: "Toyota", model: "Victoris", category: "SUV", year: 2024, seats: 5, transmission: "Automatic", fuel: "Petrol", pricePerDay: 3600, securityDeposit: 10000 },
  { brand: "Maruti Suzuki", model: "Ertiga", category: "Premium", year: 2023, seats: 7, transmission: "Manual", fuel: "CNG", pricePerDay: 3200, securityDeposit: 9000 },
  { brand: "Maruti Suzuki", model: "Swift", category: "Hatchback", year: 2023, seats: 5, transmission: "Manual", fuel: "Petrol", pricePerDay: 1800, securityDeposit: 5000 },
  { brand: "Maruti Suzuki", model: "Baleno", category: "Hatchback", year: 2023, seats: 5, transmission: "Automatic", fuel: "Petrol", pricePerDay: 2200, securityDeposit: 6000 },
  { brand: "Hyundai", model: "i20", category: "Hatchback", year: 2023, seats: 5, transmission: "Manual", fuel: "Petrol", pricePerDay: 2200, securityDeposit: 6000 },
  { brand: "Hyundai", model: "Verna", category: "Sedan", year: 2023, seats: 5, transmission: "Automatic", fuel: "Petrol", pricePerDay: 3200, securityDeposit: 8000 },
  { brand: "Honda", model: "City", category: "Sedan", year: 2022, seats: 5, transmission: "Automatic", fuel: "Petrol", pricePerDay: 3200, securityDeposit: 8000 },
  { brand: "Maruti Suzuki", model: "Brezza", category: "SUV", year: 2023, seats: 5, transmission: "Manual", fuel: "CNG", pricePerDay: 2800, securityDeposit: 8000 },
  { brand: "Hyundai", model: "Creta", category: "SUV", year: 2023, seats: 5, transmission: "Automatic", fuel: "Diesel", pricePerDay: 3800, securityDeposit: 10000 },
  { brand: "Kia", model: "Seltos", category: "SUV", year: 2023, seats: 5, transmission: "Automatic", fuel: "Petrol", pricePerDay: 3800, securityDeposit: 10000 },
  { brand: "Toyota", model: "Innova Crysta", category: "Premium", year: 2022, seats: 7, transmission: "Manual", fuel: "Diesel", pricePerDay: 5500, securityDeposit: 15000 },
  { brand: "Mahindra", model: "XUV700", category: "Premium", year: 2023, seats: 7, transmission: "Automatic", fuel: "Diesel", pricePerDay: 5800, securityDeposit: 15000 },
];

export const cars: Car[] = seeds.map((s, i) => {
  const slug = slugify(`${s.brand.split(" ")[0]} ${s.model}`);
  const name = `${s.brand} ${s.model}`;
  return {
    ...s,
    id: `car_${String(i + 1).padStart(3, "0")}`,
    slug,
    description: `The ${name} is a ${s.category.toLowerCase()} that suits city drives, business travel and weekend trips from Lucknow. [Owner: replace with your own description.]`,
    features: [...base, s.transmission === "Automatic" ? "Automatic transmission" : "Smooth manual gearbox"],
    images: [{ src: `/images/cars/${slug}-1.jpg`, alt: `${name} self-drive rental car` }],
    status: "available",
  };
});

export const getCars = () => cars;
export const getCarBySlug = (slug: string) => cars.find((c) => c.slug === slug);
export const getRelatedCars = (slug: string, n = 3) => {
  const c = getCarBySlug(slug);
  return cars.filter((x) => x.slug !== slug && x.category === c?.category).slice(0, n);
};
