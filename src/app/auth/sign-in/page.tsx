import type { Metadata } from "next";
import { SignInPage } from "@/views/auth-views";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function Page() {
  return <SignInPage />;
}
