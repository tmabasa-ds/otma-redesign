import { ArrowRightIcon, BoxIcon, BuildingIcon, CheckIcon, MapPinIcon, ShieldIcon, TruckIcon } from "./Icons";
import QuoteWizard from "./QuoteWizard";
import { otmaImages } from "@/lib/site";

export function InteriorHero({ eyebrow, title, intro, image = otmaImages.fleet }: { eyebrow: string; title: string; intro: string; image?: string }) {
  return (
    <section className="interiorHeroV4">
      <img className="interiorHeroV4Media" src={image} alt="" />
      <div className="interiorHeroV4Shade" />
      <div className="shell interiorHeroV4Inner">
        <div className="interiorHeroV4Copy">
          <p className="premiumLabel premiumLabel--light">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
          <a className="btn btnHeroLight" href="/quote">Request a quote <ArrowRightIcon /></a>
        </div>
      </div>
    </section>
  );
}

export function SplitContent({ title, body, bullets }: { title: string; body: string; bullets: string[] }) {
  return (
    <section className="sectionV4 splitV4">
      <div className="shell splitV4Grid">
        <div>
          <p className="premiumLabel">What to expect</p>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
        <div className="bulletListV4">
          {bullets.map((b) => <div key={b}><CheckIcon /><span>{b}</span></div>)}
        </div>
      </div>
    </section>
  );
}

export function ServiceBand() {
  const items = [[TruckIcon,"Home removals"],[BuildingIcon,"Office moves"],[TruckIcon,"National moving"],[BoxIcon,"Boxes & crate rental"],[ShieldIcon,"Storage support"],[MapPinIcon,"Alberton based"]] as const;
  return <section className="serviceBandV4"><div className="shell">{items.map(([Icon,text])=><span key={text}><Icon />{text}</span>)}</div></section>;
}

export function QuoteSection() {
  return (
    <section className="sectionV4 quoteSectionV4">
      <div className="shell">
        <div className="quoteSectionV4Intro">
          <p className="premiumLabel">Request a detailed quote</p>
          <h2>Give us the details once. We’ll take it from there.</h2>
          <p>Route, inventory, access, packing needs, preferred date and optional photos are all captured in one move brief.</p>
        </div>
        <div className="quoteWizardFrameV4"><QuoteWizard /></div>
      </div>
    </section>
  );
}
