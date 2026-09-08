import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SportArt } from "@/components/ui/SportArt";

const sports = [
  {
    variant: "soccer" as const,
    name: "Soccer",
    body: "Leagues and cups worldwide. Form, lineups, match odds.",
  },
  {
    variant: "basketball" as const,
    name: "Basketball",
    body: "Pro and college. Pace, props, spreads and live lines.",
  },
  {
    variant: "boxing" as const,
    name: "Boxing",
    body: "Every card, every bout. Records, styles and the odds before the bell.",
  },
];

export function SportsGrid() {
  return (
    <section id="sports" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Built for the games you watch"
          heading="Pick your sport"
          className="mx-auto"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {sports.map((sport) => (
            <div
              key={sport.name}
              className="overflow-hidden rounded-2xl border border-border bg-background-elevated"
            >
              <SportArt
                variant={sport.variant}
                label={`${sport.name} on BolaChat`}
                className="aspect-[4/3] w-full"
              />
              <div className="p-5">
                <p className="font-semibold">{sport.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  {sport.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
