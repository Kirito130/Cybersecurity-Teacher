import type { Metadata } from "next";
import { SettingsView } from "@/views/account-views";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return <SettingsView />;
}
