import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";

const sports = [
  {
    image: "/images/sports/soccer.jpg",
    name: "Soccer",
    body: "Leagues and cups worldwide. Form, lineups, match odds.",
  },
  {
    image: "/images/sports/cricket.jpg",
    name: "Cricket",
    body: "Tests, ODIs and T20s. Pitch reports, form and every ball's odds.",
  },
  {
    image: "/images/sports/rugby.jpg",
    name: "Rugby",
    body: "Internationals and club rugby. Squads, stats and the lines before kick-off.",
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
              className="overflow-hidden rounded-md border border-border bg-background-elevated"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={sport.image}
                  alt={`${sport.name} on BolaChat`}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <p className="font-heading text-base normal-case">{sport.name}</p>
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
