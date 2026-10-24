import "server-only";
import { readCars } from "@/server/db";

export const getAllCars = async () => readCars();
export const getCars = async () => (await getAllCars()).filter((c) => c.status === "available");
export const getCarBySlug = async (slug: string) => (await getAllCars()).find((c) => c.slug === slug);
export const getRelatedCars = async (slug: string, n = 3) => {
  const c = await getCarBySlug(slug);
  const available = await getCars();
  return available.filter((x) => x.slug !== slug && x.category === c?.category).slice(0, n);
};
export const getFeaturedCars = async (n = 6) => {
  const available = await getCars();
  const featured = available.filter((c) => c.featured);
  return (featured.length ? featured : available).slice(0, n);
};
