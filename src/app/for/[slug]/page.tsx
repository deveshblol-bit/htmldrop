import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SEO_PAGES, getPageBySlug } from "@/lib/seo-pages";

export function generateStaticParams() {
  return SEO_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    openGraph: { title: page.metaTitle, description: page.metaDescription },
  };
}

export default async function SeoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  if (!page) notFound();

  const relatedPages = page.related
    .map((s) => getPageBySlug(s))
    .filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="relative z-10 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav className="border-b border-border bg-surface/80 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            <span className="text-accent">HTML</span><span className="text-white/90">Drop</span>
          </Link>
          <Link
            href="/"
            className="px-5 py-2 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent-hover transition-all duration-200 shadow-[0_0_20px_rgba(167,139,250,0.15)]"
          >
            Open Editor →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16">
        <p className="text-accent text-sm font-semibold tracking-wide uppercase mb-4">{page.title}</p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white/95 leading-[1.15] mb-4">
          {page.heading}
        </h1>
        <p className="text-lg text-white/40 mb-8 leading-relaxed">{page.subheading}</p>
        <p className="text-white/55 leading-relaxed text-[15px]">{page.intro}</p>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 gap-4">
          {page.features.map((f, i) => (
            <div key={i} className="p-5 rounded-2xl border border-border bg-surface-raised/50 hover:border-border-accent transition-colors duration-300">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="text-white/90 font-semibold text-sm mb-1.5">{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-white/90 mb-8">How it works</h2>
        <div className="space-y-4">
          {page.steps.map((step, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/15 border border-border-accent flex items-center justify-center text-accent text-sm font-semibold">
                {i + 1}
              </div>
              <p className="text-white/55 text-[15px] leading-relaxed pt-1">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-white/90 mb-8">FAQ</h2>
        <div className="space-y-6">
          {page.faq.map((f, i) => (
            <div key={i}>
              <h3 className="text-white/80 font-semibold text-[15px] mb-2">{f.q}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-6 pb-20 text-center">
        <div className="p-10 rounded-2xl border border-border-accent bg-accent/[0.04]">
          <p className="text-xl font-bold text-white/90 mb-4">{page.cta}</p>
          <Link
            href="/"
            className="inline-flex px-8 py-3 bg-accent text-white rounded-xl font-semibold hover:bg-accent-hover transition-all duration-200 shadow-[0_0_30px_rgba(167,139,250,0.2)]"
          >
            Open HTMLDrop
          </Link>
        </div>
      </section>

      {/* Related */}
      {relatedPages.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <h2 className="text-lg font-semibold text-white/60 mb-6">Related</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {relatedPages.map((rp) => rp && (
              <Link
                key={rp.slug}
                href={`/for/${rp.slug}`}
                className="p-4 rounded-xl border border-border bg-surface-raised/30 hover:border-border-accent hover:bg-surface-raised/60 transition-all duration-200"
              >
                <p className="text-white/80 text-sm font-medium">{rp.title}</p>
                <p className="text-white/30 text-xs mt-1 line-clamp-2">{rp.subheading}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-xs text-white/20">
          <span>© HTMLDrop</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-white/40 transition-colors">Home</Link>
            <a href="https://github.com/deveshblol-bit/htmldrop" target="_blank" className="hover:text-white/40 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
