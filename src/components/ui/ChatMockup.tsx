import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

interface ChatLine {
  from: "user" | "bot";
  text: string;
}

const demoLines: ChatLine[] = [
  { from: "user", text: "What are the odds for tonight's derby?" },
  {
    from: "bot",
    text: "Here's the read:\n1 - Home  5.8\nX - Draw  3.6\n2 - Away  1.7\n\nHome side unbeaten in their last 6 at home.",
  },
  { from: "user", text: "Put a play on the home win." },
  { from: "bot", text: "Got it - home win, odds 5.8. Confirm?" },
  { from: "user", text: "Yes, lock it in" },
];

/**
 * Illustrative-only conversation demo. Not live odds or a real market - see
 * MarketCopy.powerPlayExample in the market config for the labelled example
 * used elsewhere on the page.
 */
export function ChatMockup() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-background-elevated shadow-2xl shadow-black/40">
      <div className="flex items-center gap-3 border-b border-border bg-background-elevated-2 px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <WhatsAppIcon className="h-4.5 w-4.5" />
        </div>
        <div>
          <p className="text-sm font-semibold">BolaChat</p>
          <p className="text-xs text-accent">online</p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 px-3 py-4">
        {demoLines.map((line, i) => (
          <div
            key={i}
            className={
              line.from === "user" ? "flex justify-end" : "flex justify-start"
            }
          >
            <p
              className={
                "max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed " +
                (line.from === "user"
                  ? "rounded-br-sm bg-accent text-accent-foreground"
                  : "rounded-bl-sm bg-background-elevated-2 text-foreground")
              }
            >
              {line.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
