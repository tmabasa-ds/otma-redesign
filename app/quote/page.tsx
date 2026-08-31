import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteWizard from "@/components/QuoteWizard";
import { InteriorHero } from "@/components/Interior";
import { otmaImages } from "@/lib/site";

export default function QuotePage() {
  return (
    <>
      <Header />
      <main className="quotePage">
        <InteriorHero
          eyebrow="REQUEST A DETAILED QUOTE"
          title="Give us the move before moving day."
          intro="Share the route, items, packing needs, access details and optional photos. OTMA can review the full brief before preparing your quote."
          image={otmaImages.fleet}
        />
        <section className="section quotePageSection">
          <div className="shell quotePageGrid">
            <div className="quotePageCopy">
              <p className="otmaSectionEyebrow">HOW IT WORKS</p>
              <h2>A cleaner brief makes for a cleaner quote.</h2>
              <p>Capture the key details once, then choose WhatsApp or email for the final handoff to the team.</p>
              <div className="quoteAside"><strong>No instant-price gimmicks.</strong><span>The team reviews the full request and prepares the quotation around the actual move.</span></div>
            </div>
            <QuoteWizard />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
