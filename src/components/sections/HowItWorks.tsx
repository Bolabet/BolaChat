import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChatMockup } from "@/components/ui/ChatMockup";

const steps = [
  {
    number: "01",
    title: "Ask anything",
    body: "From previous match scores to injuries. Plain language, any sport you follow.",
    quote: "\u201CHow did these two last play out, any injuries?\u201D",
  },
  {
    number: "02",
    title: "Get the real numbers",
    body: "BolaChat replies with live stats, current odds and the context behind them. No fluff.",
    quote: "\u201C1 Home 5.8, X Draw: 3.6, 2 Away: 1.7\u201D",
  },
  {
    number: "03",
    title: "Place your play",
    body: "Confirm right there in the chat. Fast, simple, and exactly where you already are.",
    quote: "\u201CLock it in\u201D",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Three messages, that's it"
            heading="From question to play in seconds"
            body="No menus, no logins, no learning curve. You type like you'd text a friend who happens to know every stat."
          />

          <ol className="mt-8 space-y-6">
            {steps.map((step) => (
              <li key={step.number} className="flex gap-4">
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-heading text-sm not-italic text-accent">
                  {step.number}
                </span>
                <div>
                  <p className="font-semibold">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {step.body}
                  </p>
                  <p className="mt-2 text-sm italic text-foreground/80">
                    {step.quote}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex justify-center lg:justify-end">
          <ChatMockup />
        </div>
      </Container>
    </section>
  );
}
