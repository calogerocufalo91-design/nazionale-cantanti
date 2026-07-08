import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { NextEvent } from "@/components/home/NextEvent";
import { StoriaSection } from "@/components/home/StoriaSection";
import { MappaCuoreSection } from "@/components/home/MappaCuoreSection";
import { StatsBand } from "@/components/home/StatsBand";
import { SquadPreview } from "@/components/home/SquadPreview";
import { SocialFeed } from "@/components/home/SocialFeed";
import { PartnersStrip } from "@/components/home/PartnersStrip";
import { DonateClimax } from "@/components/home/DonateClimax";

export default function Home() {
  return (
    <>
      {/* Hero / Intro principale */}
      <Hero />
      <Manifesto />

      {/* Prossimo Evento */}
      <NextEvent />

      {/* Storia — breve ponte verso la Mappa */}
      <StoriaSection />

      {/* La Mappa del Cuore */}
      <MappaCuoreSection />

      {/* Altre sezioni */}
      <StatsBand />
      <SocialFeed />
      <SquadPreview />
      <PartnersStrip />
      <DonateClimax />
    </>
  );
}
