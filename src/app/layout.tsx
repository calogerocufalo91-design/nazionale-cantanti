import type { Metadata } from "next";
import { Libre_Bodoni, Public_Sans, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const serif = Libre_Bodoni({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-libre",
  display: "swap",
});

const sans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-public",
  display: "swap",
});

const cond = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nazionalecantanti.it"),
  title: {
    default: "Nazionale Italiana Cantanti — dal 1981 in campo per la solidarietà",
    template: "%s · Nazionale Italiana Cantanti",
  },
  description:
    "Dal 1981 i cantanti italiani scendono in campo per la solidarietà. Storia, squadra, eventi e progetti della Nazionale Italiana Cantanti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${serif.variable} ${sans.variable} ${cond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-carta text-notte">
        {children}
      </body>
    </html>
  );
}
