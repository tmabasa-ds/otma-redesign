import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Services } from "@/components/Sections";
import { InteriorHero, QuoteSection, SplitContent } from "@/components/Interior";
import { otmaImages } from "@/lib/site";

export default function ServicesPage() {
  return <><Header /><main><InteriorHero eyebrow="Moving services" title="The move, and the practical support around it." intro="Household moves, office relocations, national transport, boxes, crate rental, cleaning and storage support from one moving team." image={otmaImages.van} /><Services /><section className="wideImageV5"><img src={otmaImages.fleet} alt="On The Move Again fleet" /></section><SplitContent title="A useful quotation starts with useful detail." body="The move brief gives OTMA a structured view of the route, load, access and optional services before the team prepares the quotation." bullets={["Pickup and destination", "Preferred moving date", "Room-by-room inventory", "Packing and material needs", "Boxes, crate rental and storage requirements", "Access restrictions and optional photos"]} /><QuoteSection /></main><Footer /></>;
}
