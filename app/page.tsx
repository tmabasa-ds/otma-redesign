import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteWizard from "@/components/QuoteWizard";
import { ArrowRightIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { company, otmaImages, services } from "@/lib/site";

const reviews = [
  { quote: "Exceptional pricing, exceptional communication, exceptional preparation and an exceptional moving team.", name: "Ken de Melo", meta: "Google review · January 2025" },
  { quote: "Friendly, efficient, precise and professional. The team went out of their way to make the move effortless.", name: "Local customer", meta: "Public customer review" },
  { quote: "Andre kept in contact throughout the day. The move was seamless and the crew were prompt and professional.", name: "Repeat referral customer", meta: "Public customer review" },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="homeHeroV4">
          <img className="homeHeroV4Media" src={otmaImages.crew} alt="The On The Move Again crew standing in front of the company moving fleet" />
          <div className="homeHeroV4Shade" />
          <div className="shell homeHeroV4Inner">
            <div className="homeHeroV4Copy">
              <p className="premiumLabel premiumLabel--light">On The Move Again · Alberton, Gauteng</p>
              <h1>Making your move a breeze.</h1>
              <p>Home, office and long-distance moving with a real crew, a visible fleet and a quote process built around the details that matter on moving day.</p>
              <div className="homeHeroV4Actions">
                <a className="btn btnHeroLight" href="/quote">Request a quote <ArrowRightIcon /></a>
                <a className="heroWhatsAppV4" href={`https://wa.me/${company.phoneRaw}`} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp the team</a>
              </div>
            </div>
            <div className="homeHeroV4Footer" role="group" aria-label="Services offered" tabIndex={0}>
              <span>Household moves</span><span>Office relocations</span><span>National transport</span><span>Boxes · crates · storage</span>
            </div>
          </div>
        </section>

        <section className="sectionV4 introV4">
          <div className="shell introV4Grid">
            <p className="premiumLabel">A better moving experience</p>
            <div>
              <h2>Moving should feel organised before the truck arrives.</h2>
              <p>The best moving days are not improvised. OTMA starts with the route, what is moving, how the property can be accessed and what support the job needs. That gives the team a clearer picture before moving day begins.</p>
              <a className="textLinkV4" href="/quote">Build your move brief <ArrowRightIcon /></a>
            </div>
          </div>
        </section>

        <section className="homeServiceStoryV4">
          <div className="homeServiceStoryV4Image"><img src={otmaImages.team} alt="On The Move Again team members beside a blue and white moving truck" /></div>
          <div className="homeServiceStoryV4Copy">
            <p className="premiumLabel">Home & office moves</p>
            <h2>The people who arrive matter as much as the vehicle.</h2>
            <p>You are trusting a moving team with the contents of your home or workplace. The people, the communication and the preparation matter just as much as the vehicle.</p>
            <a className="textLinkV4" href="/about">Meet On The Move Again <ArrowRightIcon /></a>
          </div>
        </section>

        <section className="sectionV4 servicesMenuV4">
          <div className="shell servicesMenuV4Grid">
            <div className="servicesMenuV4Intro">
              <p className="premiumLabel">Services</p>
              <h2>Moving services and practical support in one place.</h2>
              <p>Household removals, office relocations, national transport and practical support such as boxes, crate rental, cleaning and storage.</p>
            </div>
            <div className="servicesMenuV4List">
              {services.map((service, index) => (
                <a href="/quote" key={service.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{service.title}</h3>
                  <ArrowRightIcon />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="fleetPanoramaV4">
          <img src={otmaImages.fleet} alt="A lineup of On The Move Again moving trucks" />
          <div className="fleetPanoramaV4Shade" />
          <div className="shell fleetPanoramaV4Inner">
            <p className="premiumLabel premiumLabel--light">The OTMA fleet</p>
            <h2>A visible fleet, prepared for different kinds of moves.</h2>
            <p>From support vehicles to larger curtain-side trucks, the fleet is part of how OTMA prepares for different loads, routes and access conditions.</p>
          </div>
        </section>

        <section className="sectionV4 supportV4">
          <div className="shell supportV4Grid">
            <div className="supportV4Copy">
              <p className="premiumLabel">The move around the move</p>
              <h2>Practical support beyond transport.</h2>
              <p>Sometimes the practical extras become the stressful part. OTMA can include them in the same move conversation so fewer details are left until the last minute.</p>
              <a className="btn btnInkV4" href="/services">Explore services <ArrowRightIcon /></a>
            </div>
            <figure className="supportV4Image"><img src={otmaImages.van} alt="On The Move Again branded support vehicle" /></figure>
          </div>
        </section>

        <section className="sectionV4 quoteExperienceV4" id="quote">
          <div className="shell">
            <div className="quoteExperienceV4Intro">
              <p className="premiumLabel">Request a detailed quote</p>
              <h2>A detailed move brief gives the team a better starting point.</h2>
              <p>Pickup and destination, room-by-room inventory, access, packing requirements, preferred date and optional photos are captured in one clear move brief before the team prepares the quotation.</p>
            </div>
            <div className="quoteWizardFrameV4"><QuoteWizard /></div>
          </div>
        </section>

        <section className="sectionV4 reviewsV4">
          <div className="shell reviewsV4Grid">
            <div className="reviewsV4Lead"><p className="premiumLabel">Customer feedback</p><h2>What people remember is how the move felt.</h2></div>
            <div className="reviewsV4List">
              {reviews.map((review) => <blockquote key={review.quote}><p>“{review.quote}”</p><footer><strong>{review.name}</strong><span>{review.meta}</span></footer></blockquote>)}
            </div>
          </div>
        </section>

        <section className="finalImageCtaV4">
          <img src={otmaImages.singleTruck} alt="On The Move Again moving truck" />
          <div className="finalImageCtaV4Shade" />
          <div className="shell finalImageCtaV4Inner">
            <p className="premiumLabel premiumLabel--light">Ready when you are</p>
            <h2>Where are we moving you?</h2>
            <div><a className="btn btnHeroLight" href="/quote">Request a quote <ArrowRightIcon /></a><a href={`tel:+${company.phoneRaw}`}><PhoneIcon /> {company.phoneDisplay}</a></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
