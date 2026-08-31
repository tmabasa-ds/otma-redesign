import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteWizard from "@/components/QuoteWizard";
import { otmaImages } from "@/lib/site";

export default function QuotePage() {
  return <><Header /><main><section className="quoteHeroV5"><img src={otmaImages.fleet} alt="On The Move Again moving fleet"/><div className="quoteHeroV5Overlay"/><div className="shellV5 quoteHeroV5Inner"><span className="eyebrowV5 eyebrowV5Light">Request a detailed quote</span><h1>Give us the move before moving day.</h1><p>Share the route, inventory, access details, packing needs, preferred date and optional photos in one move brief.</p></div></section><section className="quotePageBodyV5"><div className="shellV5 quotePageGridV5"><aside><span className="eyebrowV5">Your move brief</span><h2>One place for the details that shape moving day.</h2><p>Complete the brief once, then choose WhatsApp or email for the final handoff to the OTMA team.</p><div className="quotePageChecklistV5"><span>Route</span><span>Inventory</span><span>Access</span><span>Packing & materials</span><span>Date & contact</span><span>Optional photos</span></div></aside><div className="quoteWizardV5"><QuoteWizard/></div></div></section></main><Footer /></>;
}
