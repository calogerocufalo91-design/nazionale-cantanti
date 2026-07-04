import { Hero } from "@/components/home/Hero";
import { TickerBand } from "@/components/home/TickerBand";
import { Manifesto } from "@/components/home/Manifesto";
import { StatsBand } from "@/components/home/StatsBand";
import { HistoryPreview } from "@/components/home/HistoryPreview";
import { SquadPreview } from "@/components/home/SquadPreview";
import { NextEvent } from "@/components/home/NextEvent";
import { SocialFeed } from "@/components/home/SocialFeed";
import { PartnersStrip } from "@/components/home/PartnersStrip";
import { DonateClimax } from "@/components/home/DonateClimax";

export default function Home() {
  return (
    <>
      <Hero />
      <TickerBand />
      <Manifesto />
      <StatsBand />
      <HistoryPreview />
      <NextEvent />
      <SocialFeed />
      <SquadPreview />
      <PartnersStrip />
      <DonateClimax />
    </>
  );
}
