import { services, company, otmaImages } from "@/lib/site";
import { ArrowRightIcon, BoxIcon, BuildingIcon, CalendarIcon, CheckIcon, ClipboardIcon, HomeIcon, MapPinIcon, PhoneIcon, ShieldIcon, TruckIcon, WhatsAppIcon } from "./Icons";

const serviceIcons = [HomeIcon, BuildingIcon, TruckIcon, ShieldIcon, BoxIcon, ShieldIcon] as const;

export function Services() {
  return (
    <section className="otmaServicesV3 section" id="services">
      <div className="shell">
        <div className="otmaSectionHeader"><div><p className="otmaSectionEyebrow">MOVING SERVICES</p><h2>Built around the actual move.</h2></div><p>Choose the support you need, then use the move brief to send the team the route, inventory and access details in one go.</p></div>
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
  );
}

export function StatsBand() {
  return <section className="otmaProofRail"><div className="shell"><span><CheckIcon />Alberton based</span><span><CheckIcon />National moving</span><span><CheckIcon />Boxes &amp; crates</span><span><CheckIcon />Storage support</span></div></section>;
}

export function WhyUs() {
  return <section className="otmaFieldStory section"><div className="shell otmaFieldGrid"><div className="otmaFieldMedia"><img src={otmaImages.team} alt="On The Move Again truck and moving team" /></div><div className="otmaFieldCopy"><p className="otmaSectionEyebrow">THE OTMA APPROACH</p><h2>Prepare properly. Move carefully. Communicate clearly.</h2><p>Customers repeatedly point to communication, professionalism, efficiency and a team that gets involved when a move needs extra attention.</p><div className="otmaMiniGrid"><div><ClipboardIcon /><strong>Better briefs</strong><span>Capture the important details before quoting.</span></div><div><TruckIcon /><strong>Practical execution</strong><span>Fleet and crew built around real moving work.</span></div><div><WhatsAppIcon /><strong>Direct contact</strong><span>Phone, email and WhatsApp remain close at hand.</span></div><div><MapPinIcon /><strong>National support</strong><span>Local base with long-distance moving capability.</span></div></div></div></div></section>;
}

export function Process() {
  const steps = [["01", "Route", "Pickup, destination and preferred date."],["02", "Inventory", "Rooms, bulky items, fragile pieces and extras."],["03", "Access", "Stairs, lifts, estates and truck restrictions."],["04", "Send", "WhatsApp or email the completed brief."]] as const;
  return <section className="otmaProcess section"><div className="shell"><div className="otmaSectionHeader"><div><p className="otmaSectionEyebrow">HOW IT WORKS</p><h2>A cleaner path to a useful quote.</h2></div></div><div className="otmaProcessGrid">{steps.map(([n,t,d])=><div key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>;
}

export function Coverage() {
  return <section className="otmaCoverage"><div className="shell"><div><p className="otmaSectionEyebrow">LOCAL BASE · NATIONAL REACH</p><h2>From Alberton to wherever the move takes you.</h2></div><div className="otmaCoveragePlaces"><span>Johannesburg</span><span>Pretoria</span><span>Durban</span><span>Cape Town</span><span>National routes</span></div></div></section>;
}

export function CTA() {
  return <section className="otmaFinalCta"><div className="shell otmaFinalGrid"><div><p className="otmaSectionEyebrow">READY WHEN YOU ARE</p><h2>Where are we moving you?</h2></div><div className="otmaFinalActions"><a className="btn btnLight" href="/quote">Request a quote <ArrowRightIcon /></a><a href={`tel:+${company.phoneRaw}`}><PhoneIcon />{company.phoneDisplay}</a></div></div></section>;
}

