import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { InteriorHero, QuoteSection, SplitContent } from "@/components/Interior";
import { ArrowRightIcon } from "@/components/Icons";
import { otmaImages } from "@/lib/site";

export default function LongDistancePage() {
  return (
    <>
      <Header />
      <main>
        <InteriorHero
          eyebrow="National moving"
          title="Long-distance moving needs a better plan."
          intro="OTMA supports moves beyond the local area from its Gauteng base. Route, load, access and timing all matter more when the distance grows."
          image={otmaImages.singleTruck}
        />
        <section className="sectionV4 editorialSplitV4">
          <div className="shell editorialSplitV4Grid">
            <div className="editorialSplitV4Image"><img src={otmaImages.fleet} alt="On The Move Again fleet prepared for moving work" /></div>
            <div className="editorialSplitV4Copy">
              <p className="premiumLabel">Beyond Gauteng</p>
              <h2>Distance changes the planning, not the standard.</h2>
              <p>Long-distance moves benefit from a clear inventory, pickup and destination access notes, packing requirements and a realistic preferred date before the quotation is prepared.</p>
              <a className="textLinkV4" href="/quote">Build the route brief <ArrowRightIcon /></a>
            </div>
          </div>
        </section>
        <SplitContent
          title="Give the team a complete route brief."
          body="The form captures more than two addresses so the quote can be prepared around the real job."
          bullets={["Collection and destination captured clearly", "Move type and item quantities", "Furniture protection and packing needs", "Storage requirements where needed", "Estate, complex and truck restrictions", "Direct WhatsApp or email handoff"]}
        />
        <QuoteSection />
      </main>
      <Footer />
    </>
  );
}
