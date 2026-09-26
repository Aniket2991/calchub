import { MetadataRoute } from "next";
import { calculators } from "../lib/calculators";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://calchub-blond.vercel.app";

  return [
    {
      url: base,
      lastModified: new Date(),
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
    },
    {
      url: `${base}/contact`,
      lastModified: new Date(),
    },
    {
      url: `${base}/privacy`,
      lastModified: new Date(),
    },
    {
      url: `${base}/terms`,
      lastModified: new Date(),
    },
    ...calculators.map((calculator) => ({
      url: `${base}/calculator/${calculator.slug}`,
      lastModified: new Date(),
    })),
  ];
}