"use client";

import { useState } from "react";
import Logo from "./Logo";
import { ArrowRightIcon, ClipboardIcon, CloseIcon, MailIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "./Icons";
import { company } from "@/lib/site";

const links = [
  ["Home", "/"],
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
      <div className="otmaUtilityBar" role="region" aria-label="OTMA contact details">
        <div className="shell">
          <span>Making your move a breeze</span>
          <div>
            <a href={`tel:+${company.phoneRaw}`}><PhoneIcon />{company.phoneDisplay}</a>
            <a href={`mailto:${company.email}`}><MailIcon />{company.email}</a>
          </div>
        </div>
      </div>
      <header className="siteHeader otmaHeader">
        <div className="shell headerInner">
          <Logo />
          <nav className="desktopNav" aria-label="Main navigation">
            {links.map(([label, href], i) => <a key={label} className={i === 0 ? "active" : ""} href={href}>{label}</a>)}
          </nav>
          <div className="headerActions">
            <a className="otmaHeaderWhatsApp" href={`https://wa.me/${company.phoneRaw}`} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp</a>
            <a className="btn btnPrimary btnSmall" href="/quote">Get a quote <ArrowRightIcon /></a>
          </div>
          <button className="mobileMenuButton" aria-label="Toggle navigation" onClick={() => setOpen((v) => !v)}>{open ? <CloseIcon /> : <MenuIcon />}</button>
        </div>
        {open && <nav className="mobileNav" aria-label="Mobile navigation">
          {links.map(([label, href]) => <a key={label} onClick={() => setOpen(false)} href={href}>{label}</a>)}
          <a href={`tel:+${company.phoneRaw}`}>{company.phoneDisplay}</a>
          <a className="btn btnPrimary" href="/quote" onClick={() => setOpen(false)}>Get a quote</a>
        </nav>}
      </header>
      <nav className="mobileBottomNav" aria-label="Quick actions">
        <a href={`tel:+${company.phoneRaw}`}><PhoneIcon /><span>Call</span></a>
        <a href={`https://wa.me/${company.phoneRaw}`} target="_blank" rel="noreferrer"><WhatsAppIcon /><span>WhatsApp</span></a>
        <a className="mobileBottomNav__quote" href="/quote"><ClipboardIcon /><span>Get Quote</span></a>
      </nav>
    </>
  );
}
