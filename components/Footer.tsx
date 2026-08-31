import Logo from "./Logo";
import { company } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="otmaFooterV5">
      <div className="shellV5 otmaFooterV5Top">
        <div className="otmaFooterBrandV5">
          <div className="otmaFooterLogoV5"><Logo footer /></div>
          <p>Home removals, office relocations, national transport and practical moving support from Alberton, Gauteng.</p>
        </div>
        <div><span className="otmaFooterLabelV5">Contact</span><a href={`tel:+${company.phoneRaw}`}>{company.phoneDisplay}</a><a href={`mailto:${company.email}`}>{company.email}</a><span>{company.location}</span></div>
        <div><span className="otmaFooterLabelV5">Services</span><a href="/services">Household moves</a><a href="/services">Office moves</a><a href="/long-distance">National moving</a><a href="/storage">Storage support</a></div>
        <div><span className="otmaFooterLabelV5">Your move</span><p>Send the route, inventory, access details and optional photos in one move brief.</p><a className="otmaFooterCtaV5" href="/quote">Start a move brief</a></div>
      </div>
      <div className="shellV5 otmaFooterV5Bottom"><span>© {new Date().getFullYear()} On The Move Again</span><span>Making your move a breeze.</span></div>
    </footer>
  );
}
