import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { InteriorHero, QuoteSection, SplitContent } from "@/components/Interior";
import { otmaImages } from "@/lib/site";

export default function StoragePage() {
  return <><Header /><main><InteriorHero eyebrow="Storage support" title="When the dates do not line up, keep the move moving." intro="Storage can be included in the same move brief so the team can consider it together with collection, transport and final delivery." image={otmaImages.fleet} /><section className="imageTextV5"><div className="imageTextV5Media"><img src={otmaImages.van} alt="On The Move Again support vehicle" /></div><div className="imageTextV5Copy"><span className="eyebrowV5">Move + storage</span><h2>Keep the practical extras inside the same plan.</h2><p>Flagging storage early means the team can consider it together with the load, route, packing requirements and delivery timing instead of treating it as a separate last-minute problem.</p></div></section><SplitContent title="One move brief, fewer repeated explanations." body="Customers can indicate storage, packing and material needs before sending the request." bullets={["Storage requirement captured upfront", "Linked to the same customer move", "Packing and boxes noted together", "Optional photos for awkward items", "WhatsApp or email handoff to the team"]} /><QuoteSection /></main><Footer /></>;
}
