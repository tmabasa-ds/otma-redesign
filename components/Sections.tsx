import { services, otmaImages } from "@/lib/site";
import { ArrowRightIcon } from "./Icons";

export function Services() {
  return (
    <section className="servicesV5" id="services">
      <div className="shellV5 servicesV5Grid">
        <div className="servicesV5Lead">
          <span className="eyebrowV5 eyebrowV5Light">Moving services</span>
          <h2>Moving services, organised around the job.</h2>
          <p>Choose what the job needs, then send OTMA a detailed move brief for a proper quotation.</p>
        </div>
        <div className="servicesV5List">
          {services.map((service) => (
            <a href="/quote" key={service.title}>
              <div><h3>{service.title}</h3><p>{service.description}</p></div>
              <ArrowRightIcon />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatsBand() { return null; }

export function WhyUs() {
  return (
    <section className="imageTextV5">
      <div className="imageTextV5Media"><img src={otmaImages.team} alt="On The Move Again team beside a moving truck" /></div>
      <div className="imageTextV5Copy"><span className="eyebrowV5">The OTMA approach</span><h2>Prepared people make moving day easier.</h2><p>Customers repeatedly point to communication, professionalism, efficiency and a team that gets involved when a move needs extra attention.</p><a className="textLinkV5" href="/quote">Plan your move <ArrowRightIcon /></a></div>
    </section>
  );
}

export function Process() {
  const steps = [["01","Route","Pickup, destination and preferred date."],["02","Inventory","Rooms, bulky items and anything unusual."],["03","Access","Stairs, lifts, estates and truck restrictions."],["04","Send","WhatsApp or email the completed brief."]] as const;
  return <section className="processV5"><div className="shellV5 processV5Grid">{steps.map(([n,t,d])=><div key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>;
}

export function Coverage() { return null; }
export function CTA() { return null; }
