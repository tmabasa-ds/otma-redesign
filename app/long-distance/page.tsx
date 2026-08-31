import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { InteriorHero, QuoteSection, SplitContent } from "@/components/Interior";
import { otmaImages } from "@/lib/site";

export default function LongDistancePage() {
  return <><Header /><main><InteriorHero eyebrow="NATIONAL MOVING" title="Long-distance moving without the loose ends." intro="OTMA supports customers from its Gauteng base and handles moves that extend beyond the local area. A better move brief helps the team understand the route, load and access before quoting." image={otmaImages.singleTruck} /><section className="section otmaProtection"><div className="shell otmaProtectionGrid"><div className="otmaProtectionMedia"><img src={otmaImages.singleTruck} alt="On The Move Again long-distance moving truck" /></div><div><p className="otmaSectionEyebrow">BEYOND GAUTENG</p><h2>Distance changes the planning, not the standard.</h2><p>Long-distance moves benefit from clear inventory, pickup and destination access notes, packing requirements and a realistic preferred date.</p></div></div></section><SplitContent title="Give the team a complete route brief." body="The form captures more than two addresses so the quote can be prepared around the real job." bullets={["Collection and destination captured clearly", "Move type and item quantities", "Furniture wrapping and packing needs", "Storage requirements where needed", "Estate, complex and truck restrictions", "Direct WhatsApp or email handoff"]} /><QuoteSection /></main><Footer /></>;
}
