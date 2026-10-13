import type { Metadata } from "next";
import { HelpView } from "@/views/help-view";
import { isServiceRoleConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Help",
  description: "Contact the CyberXP team or report an issue.",
};

function publishedSupportEmail(): string | null {
  const raw = process.env.SUPPORT_EMAIL?.trim() ?? "";
  if (!raw || raw.length > 254) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) return null;
  return raw;
}

export default function HelpPage() {
  return (
    <HelpView
      supportEmail={publishedSupportEmail()}
      inboxReady={isServiceRoleConfigured()}
    />
  );
}
