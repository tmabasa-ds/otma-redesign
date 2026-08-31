import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteWizard from "@/components/QuoteWizard";
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { company, otmaImages } from "@/lib/site";

export default function ContactPage() {
  return <><Header /><main><section className="contactHeroV5"><img src={otmaImages.team} alt="On The Move Again team beside a moving truck"/><div className="contactHeroV5Overlay"/><div className="shellV5 contactHeroV5Inner"><div><span className="eyebrowV5 eyebrowV5Light">Contact On The Move Again</span><h1>Tell us where you are moving.</h1><p>Use the detailed move brief or contact the team directly. OTMA is based in Alberton and supports local and national moving requests.</p></div><div className="contactDetailsV5"><a href={`tel:+${company.phoneRaw}`}><PhoneIcon/><span>Call</span><strong>{company.phoneDisplay}</strong></a><a href={`https://wa.me/${company.phoneRaw}`} target="_blank" rel="noreferrer"><WhatsAppIcon/><span>WhatsApp</span><strong>Chat with the team</strong></a><a href={`mailto:${company.email}`}><MailIcon/><span>Email</span><strong>{company.email}</strong></a><div><MapPinIcon/><span>Base</span><strong>{company.location}</strong></div></div></div></section><section className="quoteSectionV5"><div className="shellV5 quoteSectionV5Grid"><aside className="quoteAsideV5"><span className="eyebrowV5">Ready for a quotation?</span><h2>Build the move brief once.</h2><p>Route, inventory, access, packing needs, date, contact details and optional photos can all be sent together.</p></aside><div className="quoteWizardV5"><QuoteWizard/></div></div></section></main><Footer /></>;
}
