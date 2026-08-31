import { ArrowRightIcon, BoxIcon, BuildingIcon, CheckIcon, MapPinIcon, ShieldIcon, TruckIcon } from "./Icons";
import QuoteWizard from "./QuoteWizard";
import { otmaImages } from "@/lib/site";

export function InteriorHero({ eyebrow, title, intro, image = otmaImages.fleet }: { eyebrow: string; title: string; intro: string; image?: string }) {
  return (
    <section className="otmaInteriorHeroV3">
      <div className="shell otmaInteriorHeroV3Grid">
        <div>
          <p className="otmaSectionEyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
          <a className="btn btnPrimary" href="/quote">Build my move brief <ArrowRightIcon /></a>
        </div>
        <div className="otmaInteriorHeroV3Media"><img src={image} alt="" /></div>
      </div>
    </section>
  );
}

export function SplitContent({ title, body, bullets }: { title: string; body: string; bullets: string[] }) {
  return <section className="section otmaSplit"><div className="shell otmaSplitGrid"><div><p className="otmaSectionEyebrow">WHAT TO EXPECT</p><h2>{title}</h2><p>{body}</p></div><div className="otmaBulletPanel">{bullets.map((b)=><div key={b}><CheckIcon /><p>{b}</p></div>)}</div></div></section>;
}

export function ServiceBand() {
  const items = [[TruckIcon,"Home removals"],[BuildingIcon,"Office moves"],[TruckIcon,"National moving"],[BoxIcon,"Boxes & crate rental"],[ShieldIcon,"Storage support"],[MapPinIcon,"Alberton based"]] as const;
  return <section className="otmaProofRail"><div className="shell">{items.map(([Icon,text])=><span key={text}><Icon />{text}</span>)}</div></section>;
}

export function QuoteSection() {
  return <section className="otmaQuote section"><div className="shell otmaQuoteGrid"><div className="otmaQuoteIntro"><p className="otmaSectionEyebrow">REQUEST A QUOTE</p><h2>Give the team the full picture.</h2><p>Add the route, inventory, access details, packing needs and optional photos. The team can then review a much cleaner brief before sending the quote.</p><div className="otmaQuoteSteps"><div><span>01</span><strong>Route</strong><small>Pickup + destination</small></div><div><span>02</span><strong>Inventory</strong><small>Rooms + items</small></div><div><span>03</span><strong>Access</strong><small>Stairs + restrictions</small></div><div><span>04</span><strong>Send</strong><small>WhatsApp or email</small></div></div></div><QuoteWizard /></div></section>;
}
