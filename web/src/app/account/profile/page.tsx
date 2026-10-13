import type { Metadata } from "next";
import { ProfileView } from "@/views/account-views";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return <ProfileView />;
}
