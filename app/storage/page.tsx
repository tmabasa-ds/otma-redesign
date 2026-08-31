import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { InteriorHero, QuoteSection, SplitContent } from "@/components/Interior";
import { otmaImages } from "@/lib/site";

export default function StoragePage() {
  return <><Header /><main><InteriorHero eyebrow="STORAGE SUPPORT" title="When the dates do not line up, keep the move moving." intro="Need a gap between collection and final delivery? Add storage to the same quote request so it can be considered together with the rest of the move." image={otmaImages.van} /><section className="section otmaProtection"><div className="shell otmaProtectionGrid"><div className="otmaProtectionMedia otmaProtectionMedia--poster"><img src={otmaImages.flyer} alt="On The Move Again services flyer listing storage among the service options" /></div><div><p className="otmaSectionEyebrow">MOVE + STORAGE</p><h2>Keep storage inside the same plan.</h2><p>Flagging storage early means the team can consider it together with the load, route, wrapping and delivery timing.</p></div></div></section><SplitContent title="One move brief, fewer repeated explanations." body="Customers can indicate storage, packing and wrapping needs before sending the request." bullets={["Storage requirement captured upfront", "Linked to the same customer move", "Packing and wrapping noted together", "Optional photos for awkward items", "WhatsApp or email handoff to the team"]} /><QuoteSection /></main><Footer /></>;
}
