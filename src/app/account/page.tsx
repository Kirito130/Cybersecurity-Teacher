import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountIndexPage() {
  redirect("/account/profile");
}
