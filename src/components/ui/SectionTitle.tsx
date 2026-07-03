import { cn } from "@/lib/utils";
import { Kicker } from "./Kicker";

export function SectionTitle({
  kicker,
  title,
  className,
  as: Tag = "h2",
  light,
}: {
  kicker?: string;
  title: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {kicker && (
        <Kicker className={light ? "text-azzurro-chiaro" : undefined}>
          {kicker}
        </Kicker>
      )}
      <Tag
        className={cn(
          "mt-3 font-serif text-3xl font-semibold leading-[1.1] sm:text-4xl md:text-5xl",
          light ? "text-white" : "text-notte",
        )}
      >
        {title}
      </Tag>
    </div>
  );
}
