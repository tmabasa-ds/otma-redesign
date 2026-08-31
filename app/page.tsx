import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteWizard from "@/components/QuoteWizard";
import { ArrowRightIcon, CheckIcon, MapPinIcon, PhoneIcon, TruckIcon, WhatsAppIcon } from "@/components/Icons";
import { company, otmaImages, services } from "@/lib/site";

const reviews = [
  {
    quote: "Exceptional pricing, exceptional communication, exceptional preparation and an exceptional moving team.",
    name: "Ken de Melo",
    meta: "Google review · January 2025",
  },
  {
    quote: "Friendly, efficient, precise and professional. The team went out of their way to make the move effortless.",
    name: "Local customer",
    meta: "Public customer review",
  },
  {
    quote: "Andre kept in contact throughout the day. The move was seamless and the crew were prompt and professional.",
    name: "Repeat referral customer",
    meta: "Public customer review",
  },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="otmaHeroV3">
          <div className="shell otmaHeroV3Grid">
            <div className="otmaHeroV3Copy">
              <p className="otmaKicker">ON THE MOVE AGAIN · ALBERTON</p>
              <h1>Your move.<br /><span>Properly planned.</span></h1>
              <p className="otmaHeroLead">Home, office and long-distance moving backed by a visible fleet, a hands-on team and a quote process built around the details that actually shape moving day.</p>
              <div className="otmaHeroActions">
                <a className="btn btnPrimary" href="/quote">Plan my move <ArrowRightIcon /></a>
                <a className="otmaTextAction" href={`https://wa.me/${company.phoneRaw}`} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp OTMA</a>
              </div>
              <div className="otmaHeroProof">
                <span><CheckIcon /> Household moves</span>
                <span><CheckIcon /> National transport</span>
                <span><CheckIcon /> Boxes, crates, storage</span>
              </div>
            </div>
            <div className="otmaHeroV3Visual">
              <img src={otmaImages.crew} alt="The On The Move Again moving crew standing in front of the company fleet" />
              <div className="otmaHeroImageCaption">
                <span>THE OTMA CREW</span>
                <strong>Real people. Real fleet.</strong>
                <small>Alberton, Gauteng</small>
              </div>
            </div>
          </div>
        </section>

        <section className="otmaSignalBar">
          <div className="shell">
            <div><span>01</span><strong>Tell us where</strong><small>Pickup + destination</small></div>
            <div><span>02</span><strong>Tell us what</strong><small>Rooms + large items</small></div>
            <div><span>03</span><strong>Tell us the access</strong><small>Stairs + estates + restrictions</small></div>
            <a href="/quote">Build the move brief <ArrowRightIcon /></a>
          </div>
        </section>

        <section className="section otmaStatement">
          <div className="shell otmaStatementGrid">
            <p className="otmaSectionEyebrow">MAKING YOUR MOVE A BREEZE</p>
            <div>
              <h2>Moving is personal. You should know who is showing up.</h2>
              <p>Meet the actual team, see the fleet and send the practical details before moving day. The more the crew knows upfront, the easier it is to prepare for the job in front of them.</p>
            </div>
          </div>
        </section>

        <section className="section otmaServicesV3" id="services">
          <div className="shell">
            <div className="otmaSectionHeader">
              <div><p className="otmaSectionEyebrow">WHAT OTMA HANDLES</p><h2>One move, with the practical pieces around it.</h2></div>
              <p>Household moves, business relocations, national transport and the practical support around them can all be scoped from one clear starting point.</p>
            </div>
            <div className="otmaServiceEditorial">
              {services.map((service, index) => (
                <a className="otmaServiceEditorialRow" href="/quote" key={service.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ArrowRightIcon />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="otmaFleetFeature">
          <div className="shell otmaFleetFeatureGrid">
            <div className="otmaFleetFeatureCopy">
              <p className="otmaSectionEyebrow">THE FLEET IS PART OF THE BRAND</p>
              <h2>A visible fleet. Ready for real moving work.</h2>
              <p>From smaller support vehicles to larger curtain-side trucks, OTMA can prepare the move around the load, the route and the access available at each property.</p>
              <a className="otmaInline" href="/about">Meet On The Move Again <ArrowRightIcon /></a>
            </div>
            <figure className="otmaFleetFeatureMain"><img src={otmaImages.fleet} alt="On The Move Again fleet of white and blue moving trucks" /></figure>
            <figure className="otmaFleetFeatureSide"><img src={otmaImages.singleTruck} alt="A large On The Move Again curtain-side moving truck" /></figure>
          </div>
        </section>

        <section className="section otmaPeopleSection">
          <div className="shell otmaPeopleGrid">
            <div className="otmaPeopleImage"><img src={otmaImages.team} alt="Two On The Move Again team members standing in front of a moving truck" /></div>
            <div className="otmaPeopleCopy">
              <p className="otmaSectionEyebrow">A COMPANY WITH FACES</p>
              <h2>You are trusting strangers with the contents of your home. They should not feel anonymous.</h2>
              <p>A good move is not just about the vehicle. It is about the people loading, carrying, communicating and keeping the job moving when the day gets complicated.</p>
              <div className="otmaPeopleFacts">
                <div><TruckIcon /><span><strong>Local + national moves</strong><small>From an Alberton base</small></span></div>
                <div><MapPinIcon /><span><strong>Access-aware planning</strong><small>Complexes, stairs and truck restrictions captured upfront</small></span></div>
                <div><PhoneIcon /><span><strong>Direct contact</strong><small>{company.phoneDisplay}</small></span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section otmaSupportSection">
          <div className="shell otmaSupportGrid">
            <div className="otmaSupportCopy">
              <p className="otmaSectionEyebrow">THE MOVE AROUND THE MOVE</p>
              <h2>Boxes. Crates. Storage. Cleaning. Transport.</h2>
              <p>The move often needs more than transport. Boxes, crate rentals, storage and cleaning can be added to the same conversation so fewer practical details are left until the last minute.</p>
              <a className="btn btnDark" href="/services">Explore services <ArrowRightIcon /></a>
            </div>
            <div className="otmaSupportMedia">
              <img src={otmaImages.van} alt="On The Move Again branded support vehicle" />
              <div className="otmaSupportTag">MAKING YOUR MOVE A BREEZE</div>
            </div>
          </div>
        </section>

        <section className="section otmaQuote" id="quote">
          <div className="shell otmaQuoteGrid">
            <div className="otmaQuoteIntro">
              <p className="otmaSectionEyebrow">A QUOTE FORM THAT ACTUALLY HELPS</p>
              <h2>Give OTMA the move, not just your phone number.</h2>
              <p>The route, inventory, access, packing needs and optional photos all affect the job. Capture them once so the team can review a more complete request before preparing the quotation.</p>
              <div className="otmaQuoteSteps">
                <div><span>01</span><strong>Route</strong><small>Pickup + destination</small></div>
                <div><span>02</span><strong>Inventory</strong><small>Rooms + large items</small></div>
                <div><span>03</span><strong>Access</strong><small>Stairs + restrictions</small></div>
                <div><span>04</span><strong>Handoff</strong><small>WhatsApp or email</small></div>
              </div>
            </div>
            <QuoteWizard />
          </div>
        </section>

        <section className="section otmaReviewsV3">
          <div className="shell">
            <div className="otmaReviewsV3Header">
              <p className="otmaSectionEyebrow">WHAT PEOPLE REMEMBER</p>
              <h2>Communication. Preparation. The crew.</h2>
            </div>
            <div className="otmaReviewsV3List">
              {reviews.map((review, index) => (
                <article key={review.quote}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <blockquote>“{review.quote}”</blockquote>
                  <div><strong>{review.name}</strong><small>{review.meta}</small></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="otmaFinalV3">
          <div className="otmaFinalV3Media"><img src={otmaImages.singleTruck} alt="On The Move Again truck" /></div>
          <div className="shell otmaFinalV3Inner">
            <p className="otmaSectionEyebrow">READY WHEN YOU ARE</p>
            <h2>Where are we moving you?</h2>
            <div>
              <a className="btn btnLight" href="/quote">Request a quote <ArrowRightIcon /></a>
              <a href={`tel:+${company.phoneRaw}`}><PhoneIcon /> {company.phoneDisplay}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
