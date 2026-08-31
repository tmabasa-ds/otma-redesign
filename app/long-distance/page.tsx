import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { InteriorHero, QuoteSection, SplitContent } from "@/components/Interior";
import { otmaImages } from "@/lib/site";

export default function LongDistancePage() {
  return <><Header /><main><InteriorHero eyebrow="National moving" title="Long-distance moves need a better plan." intro="Route, load, timing and access matter more when the distance grows. OTMA supports moves beyond the local area from its Gauteng base." image={otmaImages.singleTruck} /><section className="imageTextV5 imageTextV5Reverse"><div className="imageTextV5Media"><img src={otmaImages.fleet} alt="On The Move Again moving fleet" /></div><div className="imageTextV5Copy"><span className="eyebrowV5">Beyond Gauteng</span><h2>Distance changes the planning, not the standard.</h2><p>A clear inventory, pickup and destination access notes, packing requirements and a realistic preferred date all help the team prepare a useful quotation.</p></div></section><SplitContent title="Give the team a complete route brief." body="The form captures the moving details in one structured request so the quote can be prepared around the actual job." bullets={["Collection and destination captured clearly", "Move type and item quantities", "Packing and protection needs", "Storage requirements where needed", "Estate, complex and truck restrictions", "Direct WhatsApp or email handoff"]} /><QuoteSection /></main><Footer /></>;
}
