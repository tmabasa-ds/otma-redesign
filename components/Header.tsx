"use client";

import { useState } from "react";
import Logo from "./Logo";
import { ArrowRightIcon, ClipboardIcon, CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "./Icons";
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
  return (
    <>
      <header className="siteHeader otmaHeaderV4">
        <div className="shell headerInnerV4">
          <Logo />
          <nav className="desktopNavV4" aria-label="Main navigation">
            {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
          </nav>
          <div className="headerActionsV4">
            <a className="headerPhoneV4" href={`tel:+${company.phoneRaw}`}>{company.phoneDisplay}</a>
            <a className="headerWhatsAppV4" href={`https://wa.me/${company.phoneRaw}`} target="_blank" rel="noreferrer"><WhatsAppIcon /><span>WhatsApp</span></a>
            <a className="btn btnPrimaryV4" href="/quote">Request a quote <ArrowRightIcon /></a>
          </div>
          <button className="mobileMenuButtonV4" aria-label="Toggle navigation" onClick={() => setOpen((v) => !v)}>{open ? <CloseIcon /> : <MenuIcon />}</button>
        </div>
        {open && <nav className="mobileNavV4" aria-label="Mobile navigation">
          {links.map(([label, href]) => <a key={label} onClick={() => setOpen(false)} href={href}>{label}</a>)}
          <a href={`tel:+${company.phoneRaw}`}>{company.phoneDisplay}</a>
          <a className="btn btnPrimaryV4" href="/quote" onClick={() => setOpen(false)}>Request a quote</a>
        </nav>}
      </header>
      <nav className="mobileBottomNav mobileBottomNavV4" aria-label="Quick actions">
        <a href={`tel:+${company.phoneRaw}`}><PhoneIcon /><span>Call</span></a>
        <a href={`https://wa.me/${company.phoneRaw}`} target="_blank" rel="noreferrer"><WhatsAppIcon /><span>WhatsApp</span></a>
        <a className="mobileBottomNav__quote" href="/quote"><ClipboardIcon /><span>Get Quote</span></a>
      </nav>
    </>
  );
}
