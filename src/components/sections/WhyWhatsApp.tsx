import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  "Live stats and odds, explained in plain words",
  "Place and confirm plays without leaving the chat",
  "Answers in seconds, any time of day",
];

export function WhyWhatsApp() {
  return (
    <section className="border-y border-border bg-background-elevated py-16 sm:py-20">
      <Container>
        <SectionHeading
          align="center"
          eyebrow="Where you already are"
          heading="It feels like texting a mate"
          body="BolaChat lives inside the app you open a hundred times a day. No download, no new password, no clunky betting site."
          className="mx-auto"
        />

        <ul className="mx-auto mt-10 flex max-w-3xl flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
          {points.map((point) => (
            <li
              key={point}
              className="flex flex-1 items-start gap-3 rounded-md border border-border bg-background p-5"
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 flex-none text-accent"
              >
                <path
                  fillRule="evenodd"
                  d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4L8 11.6l6.8-6.8a1 1 0 0 1 1.4 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm leading-relaxed text-foreground">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
