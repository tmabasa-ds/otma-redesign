import { services, company, otmaImages } from "@/lib/site";
import { ArrowRightIcon, CheckIcon, PhoneIcon } from "./Icons";

export function Services() {
  return (
    <section className="sectionV4 servicesIndexV4" id="services">
      <div className="shell servicesIndexV4Grid">
        <div className="servicesIndexV4Lead">
          <p className="premiumLabel">Moving services</p>
          <h2>One team for the move and the practical pieces around it.</h2>
          <p>Choose the support you need, then build a move brief around the actual route, load and access.</p>
        </div>
        <div className="servicesIndexV4List">
          {services.map((service, index) => (
            <a href="/quote" key={service.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{service.title}</h3><p>{service.description}</p></div>
              <ArrowRightIcon />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatsBand() {
  return <section className="serviceBandV4"><div className="shell"><span><CheckIcon />Alberton based</span><span><CheckIcon />National moving</span><span><CheckIcon />Boxes &amp; crates</span><span><CheckIcon />Storage support</span></div></section>;
}

export function WhyUs() {
  return <section className="sectionV4 editorialSplitV4"><div className="shell editorialSplitV4Grid"><div className="editorialSplitV4Image"><img src={otmaImages.team} alt="On The Move Again team beside a moving truck" /></div><div className="editorialSplitV4Copy"><p className="premiumLabel">The OTMA approach</p><h2>Prepared people make moving day easier.</h2><p>Customers repeatedly point to communication, professionalism, efficiency and a team that gets involved when a move needs extra attention.</p><a className="textLinkV4" href="/quote">Plan your move <ArrowRightIcon /></a></div></div></section>;
}

export function Process() {
  return <section className="sectionV4 processV4"><div className="shell"><p className="premiumLabel">How it works</p><div className="processV4Grid"><div><span>01</span><h3>Route</h3><p>Pickup, destination and preferred date.</p></div><div><span>02</span><h3>Inventory</h3><p>Rooms, bulky items and anything unusual.</p></div><div><span>03</span><h3>Access</h3><p>Stairs, lifts, estates and truck restrictions.</p></div><div><span>04</span><h3>Send</h3><p>WhatsApp or email the completed brief.</p></div></div></div></section>;
}

export function Coverage() {
  return <section className="coverageV4"><div className="shell"><p className="premiumLabel premiumLabel--light">Local base · national reach</p><h2>From Alberton to wherever the move takes you.</h2></div></section>;
}

export function CTA() {
  return <section className="finalImageCtaV4"><img src={otmaImages.singleTruck} alt=""/><div className="finalImageCtaV4Shade"/><div className="shell finalImageCtaV4Inner"><p className="premiumLabel premiumLabel--light">Ready when you are</p><h2>Where are we moving you?</h2><div><a className="btn btnHeroLight" href="/quote">Request a quote <ArrowRightIcon /></a><a href={`tel:+${company.phoneRaw}`}><PhoneIcon />{company.phoneDisplay}</a></div></div></section>;
}
