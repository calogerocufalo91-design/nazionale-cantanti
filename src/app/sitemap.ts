import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { newsArticles } from "@/data/news";
import { nextEvent, archivedEvents } from "@/data/events";

const STATIC_ROUTES = [
  "",
  "/la-storia",
  "/la-squadra",
  "/eventi",
  "/news",
  "/progetti",
  "/impatto",
  "/partner",
  "/gallery",
  "/stampa",
  "/contatti",
  "/dona-ora",
  "/5x1000",
  "/contributi-pubblici",
  "/privacy-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
  }));

  const eventEntries = [nextEvent, ...archivedEvents].map((e) => ({
    url: `${base}/eventi/${e.slug}`,
    lastModified: now,
  }));

  const newsEntries = newsArticles.map((a) => ({
    url: `${base}/news/${a.slug}`,
    lastModified: now,
  }));

  return [...staticEntries, ...eventEntries, ...newsEntries];
}
