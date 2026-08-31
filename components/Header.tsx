"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { ClipboardIcon, CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "./Icons";
import { company } from "@/lib/site";

const links = [
  ["Services", "/services"],
  ["About", "/about"],
  ["National Moves", "/long-distance"],
  ["Storage", "/storage"],
  ["Contact", "/contact"],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <>
      <header className="otmaHeaderV5">
        <div className="shellV5 otmaHeaderV5Inner">
          <Logo />
          <nav className="otmaNavV5" aria-label="Main navigation">
            {links.map(([label, href]) => <a key={label} className={isActive(href) ? "active" : undefined} aria-current={isActive(href) ? "page" : undefined} href={href}>{label}</a>)}
          </nav>
          <div className="otmaHeaderV5Actions">
            <a className="otmaHeaderPhoneV5" href={`tel:+${company.phoneRaw}`}>{company.phoneDisplay}</a>
            <a className="otmaHeaderQuoteV5" href="/quote">Request a quote</a>
          </div>
          <button className="otmaMenuV5" aria-label="Toggle navigation" onClick={() => setOpen(v => !v)}>{open ? <CloseIcon /> : <MenuIcon />}</button>
        </div>
        {open && (
          <nav className="otmaMobileNavV5" aria-label="Mobile navigation">
            {links.map(([label, href]) => <a key={label} className={isActive(href) ? "active" : undefined} aria-current={isActive(href) ? "page" : undefined} onClick={() => setOpen(false)} href={href}>{label}</a>)}
            <a href={`tel:+${company.phoneRaw}`}>{company.phoneDisplay}</a>
            <a className="otmaHeaderQuoteV5" href="/quote" onClick={() => setOpen(false)}>Request a quote</a>
          </nav>
        )}
      </header>
      <nav className="otmaMobileBottomV5" aria-label="Quick actions">
        <a href={`tel:+${company.phoneRaw}`}><PhoneIcon /><span>Call</span></a>
        <a href={`https://wa.me/${company.phoneRaw}`} target="_blank" rel="noreferrer"><WhatsAppIcon /><span>WhatsApp</span></a>
        <a href="/quote"><ClipboardIcon /><span>Quote</span></a>
      </nav>
    </>
  );
}
