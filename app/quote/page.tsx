import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteWizard from "@/components/QuoteWizard";
import { InteriorHero } from "@/components/Interior";
import { otmaImages } from "@/lib/site";

export default function QuotePage() {
  return (
    <>
      <Header />
      <main className="quotePageV4">
        <InteriorHero
          eyebrow="Request a detailed quote"
          title="Tell us what the move actually involves."
          intro="Share the route, items, packing needs, access details, preferred date and optional photos. OTMA can review the full brief before preparing your quotation."
          image={otmaImages.fleet}
        />
        <section className="quotePageV4Body sectionV4">
          <div className="shell">
            <div className="quotePageV4Header">
              <p className="premiumLabel">Your move brief</p>
              <h1>One place for the details that shape moving day.</h1>
              <p>Complete the brief once, then choose WhatsApp or email for the final handoff to the team.</p>
            </div>
            <QuoteWizard />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
