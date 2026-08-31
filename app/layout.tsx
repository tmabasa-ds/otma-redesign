import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "On The Move Again | Furniture Removals & Moving Services",
  description: "On The Move Again provides home removals, office moves, national moving, wrapping, boxes, crate rental and storage support from Alberton, Gauteng.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
