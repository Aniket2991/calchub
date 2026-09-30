import type { Metadata } from "next";
import Link from "next/link";
import { calculators } from "../../../lib/calculators";

type Props = {
  params: Promise<{ category: string }>;
};

const SITE_URL = "https://calchub-blond.vercel.app";

const categorySlug = (category: string) =>
  category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function generateStaticParams() {
  return [...new Set(calculators.map((calculator) => calculator.category))].map(
    (category) => ({
      category: categorySlug(category),
    })
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const calculatorsInCategory = calculators.filter(
    (calculator) => categorySlug(calculator.category) === category
  );

  if (!calculatorsInCategory.length) {
    return {
      title: "Calculator Category | CalcHub",
      robots: { index: false, follow: false },
    };
  }

  const name = calculatorsInCategory[0].category;

  return {
    title: name + " Calculators — Free Online Calculators",
    description:
      "Free " +
      name.toLowerCase() +
      " calculators on CalcHub. Use simple online tools for quick, clear calculations.",
    alternates: {
      canonical: SITE_URL + "/category/" + category,
    },
    openGraph: {
      title: name + " Calculators — CalcHub",
      description:
        "Free " + name.toLowerCase() + " calculators for quick online calculations.",
      url: SITE_URL + "/category/" + category,
      siteName: "CalcHub",
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categoryCalculators = calculators.filter(
    (calculator) => categorySlug(calculator.category) === category
  );

  if (!categoryCalculators.length) {
    return (
      <main className="container" style={{ padding: "80px 20px" }}>
        <h1>Category not found</h1>
        <p>We couldn't find that calculator category.</p>
        <Link href="/">Back to CalcHub</Link>
      </main>
    );
  }

  const categoryName = categoryCalculators[0].category;
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: categoryName + " Calculators",
    numberOfItems: categoryCalculators.length,
    itemListElement: categoryCalculators.map((calculator, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: calculator.name,
      url: SITE_URL + "/calculator/" + calculator.slug,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />

      <header className="header">
        <div className="container nav">
          <Link className="logo" href="/">
            <span className="logoMark">+</span>CalcHub
          </Link>
          <nav className="navLinks" aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/#categories">Categories</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="section">
          <div className="container">
            <div className="sectionHead">
              <div>
                <div className="eyebrow">{categoryName.toUpperCase()}</div>
                <h1>{categoryName} Calculators</h1>
                <p>
                  Free online {categoryName.toLowerCase()} calculators for
                  quick, simple and easy-to-understand results.
                </p>
              </div>
            </div>

            <div className="grid">
              {categoryCalculators.map((calculator) => (
                <Link
                  className="card"
                  href={"/calculator/" + calculator.slug}
                  key={calculator.slug}
                >
                  <div className="icon">{calculator.icon}</div>
                  <h2>{calculator.name}</h2>
                  <p>{calculator.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footerGrid">
          <div>
            <div className="logo">
              <span className="logoMark">+</span>CalcHub
            </div>
            <p style={{ color: "#777", fontSize: 13 }}>
              Useful calculations, made simple.
            </p>
          </div>

          <div className="footerLinks">
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
