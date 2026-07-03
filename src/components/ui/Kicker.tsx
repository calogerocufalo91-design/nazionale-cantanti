import { cn } from "@/lib/utils";

export function Kicker({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-cond text-sm font-medium uppercase tracking-[0.28em] text-azzurro",
        className,
      )}
    >
      {children}
    </p>
  );
}
