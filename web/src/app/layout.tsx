import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Colophon, Mast } from "@/kit/chrome";
import { PixelCursor } from "@/kit/pixel-cursor";
import { AuthProvider } from "@/state/auth-provider";
import { ProgressProvider } from "@/state/progress-provider";
import "./globals.css";

/** Pixel monospace display face — Departure Mono (SIL OFL), via Free Faces. */
const departure = localFont({
  src: [{ path: "./fonts/DepartureMono-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-departure",
  display: "swap",
  fallback: ["ui-monospace", "Cascadia Mono", "monospace"],
});

const hyperlegible = localFont({
  src: [
    { path: "./fonts/HyperlegibleSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/HyperlegibleSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-hyperlegible",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "CyberXP — Ethical hacking learning path",
    template: "%s · CyberXP",
  },
  description:
    "CyberXP teaches ethical hacking through chapters, topics, subtopics, and tasks, with badges and evidence-first learning.",
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbe4d6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${departure.variable} ${hyperlegible.variable}`}>
      <body className="sheet-paper min-w-0">
        <AuthProvider>
          <ProgressProvider>
            <a href="#main" className="skip">
              Skip to content
            </a>
            <div className="flex min-h-svh flex-col overflow-x-clip">
              <Mast />
              <main id="main" tabIndex={-1} className="min-w-0 flex-1 outline-none">
                {children}
              </main>
              <Colophon />
            </div>
            <PixelCursor />
          </ProgressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
