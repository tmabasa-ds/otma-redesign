import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Services } from "@/components/Sections";
import { InteriorHero, QuoteSection, ServiceBand, SplitContent } from "@/components/Interior";
import { otmaImages } from "@/lib/site";

export default function ServicesPage() {
  return <><Header /><main><InteriorHero eyebrow="MOVING SERVICES" title="The practical support around the move matters too." intro="From household and office removals to boxes, crate rental, storage, cleaning and national transport, OTMA can build the job around what the move actually needs." image={otmaImages.van} /><ServiceBand /><Services /><SplitContent title="A useful quote starts with useful detail." body="The move brief gives OTMA a structured view of the route, load, access and optional services before the team prepares the quotation." bullets={["Pickup and destination", "Preferred moving date", "Room-by-room inventory", "Wrapping and packing needs", "Boxes, crate rental and storage requirements", "Access restrictions and optional photos"]} /><QuoteSection /></main><Footer /></>;
}
