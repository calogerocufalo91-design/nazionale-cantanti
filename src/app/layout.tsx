import type { Metadata, Viewport } from "next";
import { Libre_Bodoni, Public_Sans, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/layout/SkipLink";
import { ChromeGate } from "@/components/layout/ChromeGate";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { IntroTunnel } from "@/components/intro/IntroTunnel";
import { StructuredData } from "@/components/StructuredData";
import { NicChat } from "@/components/NicChat";

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
  // BOZZA: non indicizzabile dai motori di ricerca finché è un'anteprima privata.
  // TODO_LANCIO: rimuovere questa riga quando il sito va online ufficialmente.
  robots: { index: false, follow: false },
};

// Barra del browser mobile (Android/iOS) nel blu notte del brand.
// `viewportFit: cover` estende il contenuto sotto notch/barra gesti e abilita
// le variabili env(safe-area-inset-*) usate da header, menu e chat.
export const viewport: Viewport = {
  themeColor: "#0b1d2e",
  viewportFit: "cover",
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
        <StructuredData />
        <SmoothScroll />
        <ChromeGate>
          <IntroTunnel />
          <SkipLink />
          <ScrollProgress />
          <Header />
        </ChromeGate>
        <div id="contenuto" className="flex flex-1 flex-col">
          {children}
        </div>
        <ChromeGate>
          <Footer />
          <NicChat />
        </ChromeGate>
      </body>
    </html>
  );
}
