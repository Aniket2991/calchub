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
    {
      url: SITE_URL + "/guides",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/emi-calculator-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/gst-calculator-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/percentage-calculator-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/bmi-calculator-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/loan-calculator-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/discount-calculator-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/simple-interest-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/compound-interest-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/age-calculator-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/average-calculator-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/sip-calculator-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/date-difference-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/length-converter-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/weight-converter-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/temperature-converter-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/salary-calculator-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/income-tax-calculator-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/profit-loss-calculator-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/percentage-change-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/ratio-calculator-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/fraction-calculator-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/time-calculator-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/hours-calculator-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/age-difference-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/area-calculator-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/volume-calculator-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/speed-calculator-guide",
      lastModified: new Date(),
    },
    {
      url: SITE_URL + "/guides/fuel-cost-guide",
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
