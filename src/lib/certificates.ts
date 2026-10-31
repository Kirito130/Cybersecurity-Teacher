import { createAdminClient } from "@/lib/supabase/admin";

export async function issueCertificate(input: {
  userId: string;
  title: string;
  pathId?: string | null;
  blockId?: string | null;
  enrollmentId?: string | null;
  metadata?: Record<string, unknown>;
}) {
  if (!input.pathId && !input.blockId) {
    throw new Error("Certificate requires pathId or blockId");
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("certificates")
    .insert({
      user_id: input.userId,
      title: input.title,
      path_id: input.pathId ?? null,
      block_id: input.blockId ?? null,
      enrollment_id: input.enrollmentId ?? null,
      metadata: input.metadata ?? {},
    })
    .select("id, verification_code, issued_at")
    .single();
  if (error) throw error;
  return data;
}

export async function revokeCertificate(certificateId: string) {
  const admin = createAdminClient();
  const { error } = await admin
    .from("certificates")
    .update({ revoked_at: new Date().toISOString() })
    .eq("id", certificateId)
    .is("revoked_at", null);
  if (error) throw error;
}
