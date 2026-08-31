import { ArrowRightIcon, CheckIcon } from "./Icons";
import QuoteWizard from "./QuoteWizard";
import { otmaImages } from "@/lib/site";

export function InteriorHero({ eyebrow, title, intro, image = otmaImages.fleet }: { eyebrow: string; title: string; intro: string; image?: string }) {
  return (
    <section className="interiorHeroV5">
      <img src={image} alt="" />
      <div className="interiorHeroV5Overlay" />
      <div className="shellV5 interiorHeroV5Inner">
        <div className="interiorHeroV5Copy">
          <span className="eyebrowV5 eyebrowV5Light">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
          <a className="buttonV5 buttonV5Light" href="/quote">Request a quote <ArrowRightIcon /></a>
        </div>
      </div>
    </section>
  );
}

export function SplitContent({ title, body, bullets }: { title: string; body: string; bullets: string[] }) {
  return (
    <section className="sectionV5 splitV5">
      <div className="shellV5 splitV5Grid">
        <div className="splitV5Copy">
          <span className="eyebrowV5">What to expect</span>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
        <div className="splitV5List">
          {bullets.map((bullet) => <div key={bullet}><CheckIcon /><span>{bullet}</span></div>)}
        </div>
      </div>
    </section>
  );
}

export function ServiceBand() {
  return null;
}

export function QuoteSection() {
  return (
    <section className="quoteSectionV5">
      <div className="shellV5 quoteSectionV5Grid">
        <aside className="quoteAsideV5">
          <span className="eyebrowV5">Plan the move</span>
          <h2>Give the team the details that shape moving day.</h2>
          <p>The full OTMA move brief captures the route, inventory, access, packing requirements, date, contact details and optional item photos in one place.</p>
          <div className="quoteAsideStepsV5"><span>Route</span><span>Inventory</span><span>Access</span><span>Date & contact</span></div>
        </aside>
        <div className="quoteWizardV5"><QuoteWizard /></div>
      </div>
    </section>
  );
}
