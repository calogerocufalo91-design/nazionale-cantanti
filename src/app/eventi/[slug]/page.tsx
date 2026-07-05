import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { DonationCTA } from "@/components/content/DonationCTA";
import { nextEvent, type EventItem } from "@/data/events";

// Solo gli eventi correnti hanno una pagina dettaglio; lo storico vive
// nell'Archivio Partite (dati forniti dal cliente).
const allEvents: EventItem[] = [nextEvent];

export function generateStaticParams() {
  return allEvents.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = allEvents.find((e) => e.slug === slug);
  if (!event) return { title: "Eventi" };
  return { title: event.title, description: event.summary };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = allEvents.find((e) => e.slug === slug);
  if (!event) notFound();

  const isNext = event.status === "prossimo";

  return (
    <>
      <section className="relative overflow-hidden bg-notte pb-14 pt-36 text-white sm:pt-44">
        <div className="hero-glow opacity-50" aria-hidden />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-notte via-notte/85 to-notte/60"
        />
        <Container className="relative">
          <Breadcrumbs
            items={[
              { label: "Eventi", href: "/eventi" },
              { label: event.title },
            ]}
          />
          <span
            className={
              "mt-8 inline-block rounded-full px-3 py-1 text-xs font-medium " +
              (isNext ? "bg-oro text-oro-scuro" : "bg-white/15 text-white")
            }
          >
            {isNext ? "Prossimo evento" : "Archivio storico"}
          </span>
          <h1 className="mt-4 max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-5xl">
            {event.title}
          </h1>
        </Container>
      </section>

      <section className="bg-carta py-16 sm:py-20">
        <Container className="max-w-3xl">
          {event.image && (
            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={event.image}
                alt={event.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}

          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 rounded-2xl border border-notte/10 bg-white p-6 text-sm">
            <div>
              <dt className="text-notte/50">Data</dt>
              <dd className="mt-1 font-medium text-notte">
                {event.date}
                {event.time ? ` · ${event.time}` : ""}
              </dd>
            </div>
            <div>
              <dt className="text-notte/50">Luogo</dt>
              <dd className="mt-1 font-medium text-notte">
                {event.stadium}, {event.city}
              </dd>
            </div>
            {event.broadcast && (
              <div>
                <dt className="text-notte/50">In diretta</dt>
                <dd className="mt-1 font-medium text-notte">
                  {event.broadcast}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-notte/50">A favore di</dt>
              <dd className="mt-1 font-medium text-notte">{event.cause}</dd>
            </div>
          </dl>

          <p className="mt-8 text-lg leading-relaxed text-notte/80">
            {event.summary}
          </p>

          {isNext && (
            <div className="mt-10">
              <DonationCTA />
            </div>
          )}

          <div className="mt-10">
            <Link
              href="/eventi"
              className="text-sm font-medium text-azzurro underline-offset-4 hover:underline"
            >
              ← Torna agli eventi
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
