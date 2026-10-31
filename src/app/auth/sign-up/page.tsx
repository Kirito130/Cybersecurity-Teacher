import type { Metadata } from "next";
import { SignUpPage } from "@/views/auth-views";

export const metadata: Metadata = {
  title: "Create account",
};

export default function Page() {
  return <SignUpPage />;
}
