"use client";

import { usePathname } from "next/navigation";

/**
 * Nasconde il "chrome" di produzione (header, footer, intro, chat…) sulle
 * route /preview/*: le bozze estetiche devono presentarsi al presidente come
 * siti autonomi, ognuna col proprio header/footer. Fuori da /preview non
 * cambia nulla: i figli vengono resi esattamente come prima.
 */
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/preview" || pathname.startsWith("/preview/")) return null;
  return <>{children}</>;
}
