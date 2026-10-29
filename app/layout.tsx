import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Asanka | Modern Ghanaian Kitchen, Osu",
  description:
    "Asanka is a modern Ghanaian kitchen and bar in Osu, Accra. Coal-fired grills, slow pots, sobolo cocktails and Highlife Fridays.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable} antialiased`}>
      <body className="custom-cursor min-h-dvh overflow-x-hidden font-sans">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
