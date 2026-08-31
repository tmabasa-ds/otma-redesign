import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { InteriorHero, QuoteSection, ServiceBand, SplitContent } from "@/components/Interior";
import { ArrowRightIcon } from "@/components/Icons";
import { otmaImages } from "@/lib/site";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <InteriorHero
          eyebrow="About On The Move Again"
          title="A moving company should feel human before moving day."
          intro="Based in Alberton, OTMA supports local and national moves with transport, packing support, boxes, crate rental, cleaning and storage options."
          image={otmaImages.crew}
        />
        <ServiceBand />
        <section className="sectionV4 editorialSplitV4">
          <div className="shell editorialSplitV4Grid">
            <div className="editorialSplitV4Image"><img src={otmaImages.team} alt="On The Move Again team members standing beside a moving truck" /></div>
            <div className="editorialSplitV4Copy">
              <p className="premiumLabel">The people behind the move</p>
              <h2>Customers talk about the people as much as the trucks.</h2>
              <p>Customers repeatedly mention friendly crews, hard work, communication and direct involvement from Andre. It is a people-first reputation built one move at a time.</p>
              <a className="textLinkV4" href="/quote">Plan your move <ArrowRightIcon /></a>
            </div>
          </div>
        </section>
        <section className="fleetPanoramaV4">
          <img src={otmaImages.fleet} alt="On The Move Again fleet of blue and white moving trucks" />
          <div className="fleetPanoramaV4Shade" />
          <div className="shell fleetPanoramaV4Inner">
            <p className="premiumLabel premiumLabel--light">Visible capability</p>
            <h2>A real fleet gives the brand weight before the first box is lifted.</h2>
            <p>OTMA vehicles are visibly branded and built around moving work, from smaller support vehicles to larger curtain-side trucks.</p>
          </div>
        </section>
        <SplitContent
          title="Plan the move before moving day."
          body="The quote experience collects the details that usually get scattered across phone calls and WhatsApp messages."
          bullets={["Collection and delivery addresses", "Home, office or transport move type", "Room-by-room inventory and bulky items", "Packing, boxes and storage needs", "Stairs, lifts and truck access constraints", "Optional item photos for better assessment"]}
        />
        <QuoteSection />
      </main>
      <Footer />
    </>
  );
}
