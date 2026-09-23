import { MetadataRoute } from "next";
import { calculators } from "../lib/calculators";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://your-calchub-domain.vercel.app";
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/about`, lastModified: new Date() },
    { url: `${base}/privacy`, lastModified: new Date() },
    { url: `${base}/terms`, lastModified: new Date() },
    ...calculators.map(c => ({ url:`${base}/calculator/${c.slug}`, lastModified:new Date() }))
  ];
}