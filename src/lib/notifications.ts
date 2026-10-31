import { createAdminClient } from "@/lib/supabase/admin";

export async function notifyUser(input: {
  userId: string;
  type: string;
  title: string;
  body?: string;
  href?: string;
}) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("notifications")
    .insert({
      user_id: input.userId,
      type: input.type,
      title: input.title,
      body: input.body ?? null,
      href: input.href ?? null,
    })
    .select("id")
    .single();
  if (error) throw error;
  return data.id as string;
}
