import type { Metadata } from "next";
import { Figtree, IBM_Plex_Mono, Syne } from "next/font/google";
import { AuthProvider } from "@/components/auth-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ProgressProvider } from "@/components/progress-provider";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CyberXP — Ethical hacking learning path",
    template: "%s · CyberXP",
  },
  description:
    "CyberXP is a game-style roadmap from zero tech background to advanced ethical hacking practice, with checkpoints, badges, and evidence-first learning.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="font-body antialiased">
        <AuthProvider>
          <ProgressProvider>
            <div className="flex min-h-screen min-w-0 flex-col overflow-x-clip">
              <a
                href="#main"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-phosphor focus:px-3 focus:py-2 focus:font-medium focus:text-ink focus:outline-none"
              >
                Skip to content
              </a>
              <SiteHeader />
              <main id="main" className="min-w-0 flex-1 overflow-x-clip">
                {children}
              </main>
              <SiteFooter />
            </div>
          </ProgressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
