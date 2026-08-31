import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { InteriorHero, QuoteSection, ServiceBand, SplitContent } from "@/components/Interior";
import { otmaImages } from "@/lib/site";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <InteriorHero eyebrow="ABOUT ON THE MOVE AGAIN" title="A moving company should feel human before moving day." intro="Based in Alberton, OTMA supports local and national moves with transport, packing support, boxes, crate rental, cleaning and storage options." image={otmaImages.crew} />
        <ServiceBand />
        <section className="section otmaAboutStory">
          <div className="shell otmaFieldGrid">
            <div className="otmaFieldMedia"><img src={otmaImages.team} alt="On The Move Again team members standing next to a truck" /></div>
            <div className="otmaFieldCopy"><p className="otmaSectionEyebrow">THE REPUTATION</p><h2>Customers talk about the people as much as the trucks.</h2><p>Customers repeatedly mention friendly crews, hard work, communication and direct involvement from Andre. It is a people-first reputation built one move at a time.</p></div>
          </div>
        </section>
        <section className="section otmaGalleryBand">
          <div className="shell otmaProtectionGrid">
            <div className="otmaProtectionMedia"><img src={otmaImages.fleet} alt="A lineup of On The Move Again trucks" /></div>
            <div><p className="otmaSectionEyebrow">VISIBLE CAPABILITY</p><h2>Branding and fleet presence reinforce trust.</h2><p>Clear OTMA branding across vehicles and materials helps the business feel established, memorable and easier to trust at first glance.</p></div>
          </div>
        </section>
        <SplitContent title="Plan the move before moving day." body="The quote experience is designed to collect the details that usually get scattered across phone calls and WhatsApp messages." bullets={["Collection and delivery addresses", "Home, office or transport move type", "Room-by-room inventory and bulky items", "Packing, wrapping, boxes and storage needs", "Stairs, lifts and truck access constraints", "Optional item photos for better assessment"]} />
        <QuoteSection />
      </main>
      <Footer />
    </>
  );
}
