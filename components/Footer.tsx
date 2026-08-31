import Logo from "./Logo";
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "./Icons";
import { company } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer otmaFooter">
      <div className="shell footerGrid">
        <div>
          <div className="otmaFooterLogoPlate"><Logo footer /></div>
          <p>Household moves, office relocations, national transport, boxes, crate rental, storage and cleaning support from Alberton.</p>
        </div>
        <div><h3>Contact</h3><a href={`tel:+${company.phoneRaw}`}><PhoneIcon />{company.phoneDisplay}</a><a href={`https://wa.me/${company.phoneRaw}`} target="_blank" rel="noreferrer"><WhatsAppIcon />WhatsApp us</a><a href={`mailto:${company.email}`}><MailIcon />{company.email}</a><span><MapPinIcon />{company.location}</span></div>
        <div><h3>Services</h3><a href="/services">Household moves</a><a href="/services">Office &amp; business moves</a><a href="/long-distance">National transport</a><a href="/services">Boxes &amp; crate rental</a><a href="/storage">Storage support</a></div>
        <div><h3>Plan your move</h3><p>Build a detailed move brief with the route, inventory, access details and optional photos.</p><a className="btn btnLight" href="/quote">Request a quote</a></div>
      </div>
      <div className="shell footerBottom"><span>© {new Date().getFullYear()} On The Move Again. All rights reserved.</span><span>Making your move a breeze.</span></div>
    </footer>
  );
}
