import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteWizard from "@/components/QuoteWizard";
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { company, otmaImages } from "@/lib/site";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="contactHeroV4">
          <div className="contactHeroV4Grid">
            <div className="contactHeroV4Copy">
              <p className="premiumLabel">Contact On The Move Again</p>
              <h1>Tell us where you are moving.</h1>
              <p>Use the detailed move brief or contact the team directly. OTMA is based in Alberton and supports local and national moving requests.</p>
              <div className="contactListV4">
                <a href={`tel:+${company.phoneRaw}`}><PhoneIcon /><span><small>Call</small><strong>{company.phoneDisplay}</strong></span></a>
                <a href={`https://wa.me/${company.phoneRaw}`} target="_blank" rel="noreferrer"><WhatsAppIcon /><span><small>WhatsApp</small><strong>Chat with the team</strong></span></a>
                <a href={`mailto:${company.email}`}><MailIcon /><span><small>Email</small><strong>{company.email}</strong></span></a>
                <div><MapPinIcon /><span><small>Base</small><strong>{company.location}</strong></span></div>
              </div>
            </div>
            <div className="contactHeroV4Media"><img src={otmaImages.team} alt="On The Move Again team members beside a moving truck" /></div>
          </div>
        </section>
        <section className="contactQuoteV4">
          <div className="shell">
            <div className="contactQuoteV4Intro">
              <p className="premiumLabel">Ready for a quote?</p>
              <h2>Build the move brief once.</h2>
              <p>Route, inventory, access, packing needs and optional photos can all be sent together before the team responds.</p>
            </div>
            <QuoteWizard />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
