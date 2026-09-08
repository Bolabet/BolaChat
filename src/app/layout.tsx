import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bolachat.io"),
  title: {
    default: "BolaChat - Sports stats, answers & plays, right inside WhatsApp",
    template: "%s",
  },
  description:
    "Ask BolaChat about your teams and matches, get live odds and stats, and place your play - all inside WhatsApp. No app, no logins.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
