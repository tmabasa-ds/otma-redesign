import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { InteriorHero, QuoteSection, SplitContent } from "@/components/Interior";
import { ArrowRightIcon } from "@/components/Icons";
import { otmaImages } from "@/lib/site";

export default function StoragePage() {
  return (
    <>
      <Header />
      <main>
        <InteriorHero
          eyebrow="Storage support"
          title="When the dates do not line up, keep the move moving."
          intro="Need a gap between collection and final delivery? Add storage to the same move brief so it can be considered together with the rest of the job."
          image={otmaImages.van}
        />
        <section className="sectionV4 editorialSplitV4">
          <div className="shell editorialSplitV4Grid">
            <div className="editorialSplitV4Image"><img src={otmaImages.flyer} alt="On The Move Again service material showing storage and moving support" /></div>
            <div className="editorialSplitV4Copy">
              <p className="premiumLabel">Move + storage</p>
              <h2>Keep storage inside the same plan.</h2>
              <p>Flagging storage early means the team can consider it together with the load, route, packing requirements and delivery timing instead of treating it as a separate last-minute problem.</p>
              <a className="textLinkV4" href="/quote">Add storage to your move <ArrowRightIcon /></a>
            </div>
          </div>
        </section>
        <SplitContent
          title="One move brief, fewer repeated explanations."
          body="Customers can indicate storage, packing and material needs before sending the request."
          bullets={["Storage requirement captured upfront", "Linked to the same customer move", "Packing and boxes noted together", "Optional photos for awkward items", "WhatsApp or email handoff to the team"]}
        />
        <QuoteSection />
      </main>
      <Footer />
    </>
  );
}
