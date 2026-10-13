import type { Metadata } from "next";
import { BadgesView } from "@/views/badges-view";

export const metadata: Metadata = {
  title: "Badges",
};

export default function BadgesPage() {
  return <BadgesView />;
}
