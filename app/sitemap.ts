import { MetadataRoute } from "next";
import { calculators } from "../lib/calculators";

const SITE_URL = "https://calchub-blond.vercel.app";

const categorySlug = (category: string) =>
  category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = [...new Set(calculators.map((calculator) => calculator.category))];

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/about",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/contact",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/privacy",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/terms",
      lastModified: new Date(),
    },
    ...categories.map((category) => ({
      url: SITE_URL + "/category/" + categorySlug(category),
      lastModified: new Date(),
    })),
    ...calculators.map((calculator) => ({
      url: SITE_URL + "/calculator/" + calculator.slug,
      lastModified: new Date(),
    })),
  ];
}
