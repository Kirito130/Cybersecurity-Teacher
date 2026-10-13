import type { Metadata } from "next";
import { PasswordView } from "@/views/account-views";

export const metadata: Metadata = {
  title: "Change password",
};

export default function PasswordPage() {
  return <PasswordView />;
}
