import type { Metadata } from "next";
import { Big_Shoulders, Inter } from "next/font/google";
import "./globals.css";
import "./v5.css";

// Match the typography system used in the UG Logistics project exactly:
// Inter for body/UI copy and Big Shoulders 800 for display headings.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ug-sans",
  display: "swap",
});

const bigShoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-ug-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "On The Move Again | Furniture Removals & Moving Services",
  description: "On The Move Again provides home removals, office moves, national moving, boxes, crate rental, cleaning and storage support from Alberton, Gauteng.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${bigShoulders.variable}`}>
      <body>{children}</body>
    </html>
  );
}
