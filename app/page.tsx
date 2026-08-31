import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteWizard from "@/components/QuoteWizard";
import { ArrowRightIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { company, otmaImages, services } from "@/lib/site";

const reviews = [
  { quote: "Exceptional pricing, exceptional communication, exceptional preparation and an exceptional moving team.", name: "Ken de Melo", meta: "Google review · 2025" },
  { quote: "Friendly, efficient, precise and professional. The team went out of their way to make the move effortless.", name: "Customer feedback", meta: "Public review" },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="heroV5">
          <img src={otmaImages.crew} alt="The On The Move Again moving team standing in front of the fleet" />
          <div className="heroV5Overlay" />
          <div className="shellV5 heroV5Inner">
            <div className="heroV5Copy">
              <span className="eyebrowV5 eyebrowV5Light">On The Move Again · Alberton, Gauteng</span>
              <h1>Making your move a breeze.</h1>
              <p>Home and office removals, long-distance moves, boxes, crates and storage support from Alberton.</p>
              <div className="heroV5Actions">
                <a className="buttonV5 buttonV5Light" href="/quote">Plan your move <ArrowRightIcon /></a>
                <a className="heroLinkV5" href={`https://wa.me/${company.phoneRaw}`} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp the team</a>
              </div>
            </div>
            <div className="heroV5ServiceLine" role="group" aria-label="Services offered" tabIndex={0}><span>Household moves</span><span>Office relocations</span><span>National moving</span><span>Boxes · crates · storage</span></div>
          </div>
        </section>

        <section className="introV5 sectionV5">
          <div className="shellV5 introV5Grid">
            <div><h2>Moving starts before moving day.</h2></div>
            <div><p>OTMA starts with the details that actually affect the job: where you are moving from and to, what is going, how both properties can be accessed, what support is needed and when the move needs to happen.</p><a className="textLinkV5" href="/quote">Start the move brief <ArrowRightIcon /></a></div>
          </div>
        </section>

        <section className="storyMosaicV5">
          <div className="storyMosaicV5Main"><img src={otmaImages.fleet} alt="On The Move Again moving fleet" /><div className="storyMosaicV5Caption"><span>Fleet</span><strong>Vehicles for different sizes and kinds of moves.</strong></div></div>
          <div className="storyMosaicV5Side">
            <figure><img src={otmaImages.team} alt="On The Move Again team members beside a truck" /><figcaption><span>People</span><strong>The crew matters as much as the vehicle.</strong></figcaption></figure>
            <figure><img src={otmaImages.van} alt="On The Move Again branded support vehicle" /><figcaption><span>Support</span><strong>Practical help around the move itself.</strong></figcaption></figure>
          </div>
        </section>

        <section className="servicesV5">
          <div className="shellV5 servicesV5Grid">
            <div className="servicesV5Lead"><span className="eyebrowV5 eyebrowV5Light">What OTMA does</span><h2>Moving services, organised around the job.</h2><p>From household and office moves to national transport, boxes, crates and storage support.</p></div>
            <div className="servicesV5List">
              {services.map(service => <a href="/quote" key={service.title}><div><h3>{service.title}</h3><p>{service.description}</p></div><ArrowRightIcon /></a>)}
            </div>
          </div>
        </section>

        <section className="operationV5">
          <div className="operationV5Media"><img src={otmaImages.singleTruck} alt="On The Move Again truck ready for a moving job" /></div>
          <div className="operationV5Copy">
            <span className="eyebrowV5 eyebrowV5Light">Before moving day</span>
            <h2>The planning should be as professional as the transport.</h2>
            <p>A detailed move brief gives the team a better view of the load, route and access before a quotation is prepared.</p>
            <div className="operationStepsV5"><div><span>01</span><strong>Route</strong></div><div><span>02</span><strong>Inventory</strong></div><div><span>03</span><strong>Access</strong></div><div><span>04</span><strong>Date & handoff</strong></div></div>
          </div>
        </section>

        <section className="quoteSectionV5 homeQuoteV5" id="quote">
          <div className="shellV5 quoteSectionV5Grid">
            <aside className="quoteAsideV5">
              <span className="eyebrowV5">Request a detailed quote</span>
              <h2>Tell us what the move actually involves.</h2>
              <p>The OTMA move brief captures pickup and destination, room-by-room inventory, access, packing requirements, preferred date, contact details and optional photos.</p>
              <p className="quoteAsideNoteV5">The quotation is reviewed by the team against the details you submit.</p>
            </aside>
            <div className="quoteWizardV5"><QuoteWizard /></div>
          </div>
        </section>

        <section className="reviewsV5">
          <div className="shellV5 reviewsV5Inner">
            <span className="eyebrowV5 eyebrowV5Light">Customer feedback</span>
            <blockquote><p>“{reviews[0].quote}”</p><footer><strong>{reviews[0].name}</strong><span>{reviews[0].meta}</span></footer></blockquote>
            <div className="reviewSecondaryV5"><p>“{reviews[1].quote}”</p><span>{reviews[1].name} · {reviews[1].meta}</span></div>
          </div>
        </section>

        <section className="finalCtaV5">
          <img src={otmaImages.singleTruck} alt="On The Move Again moving truck" />
          <div className="finalCtaV5Overlay" />
          <div className="shellV5 finalCtaV5Inner"><span className="eyebrowV5 eyebrowV5Light">Ready when you are</span><h2>Where are we moving you?</h2><div><a className="buttonV5 buttonV5Light" href="/quote">Request a quote <ArrowRightIcon /></a><a className="heroLinkV5" href={`tel:+${company.phoneRaw}`}><PhoneIcon /> {company.phoneDisplay}</a></div></div>
        </section>
      </main>
      <Footer />
    </>
  );
}
