import { createAdminClient } from "@/lib/supabase/admin";

export async function createOrganization(input: {
  name: string;
  slug: string;
  ownerUserId: string;
}) {
  const admin = createAdminClient();
  const { data: org, error } = await admin
    .from("organizations")
    .insert({ name: input.name, slug: input.slug })
    .select("id")
    .single();
  if (error) throw error;

  const { error: memberError } = await admin.from("org_memberships").insert({
    org_id: org.id,
    user_id: input.ownerUserId,
    role: "owner",
    status: "active",
  });
  if (memberError) throw memberError;
  return org.id as string;
}

export async function createCohort(input: {
  orgId: string;
  name: string;
  pathId?: string | null;
  startsAt?: string | null;
  endsAt?: string | null;
  capacity?: number | null;
}) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("cohorts")
    .insert({
      org_id: input.orgId,
      name: input.name,
      path_id: input.pathId ?? null,
      starts_at: input.startsAt ?? null,
      ends_at: input.endsAt ?? null,
      capacity: input.capacity ?? null,
    })
    .select("id")
    .single();
  if (error) throw error;
  return data.id as string;
}

export async function enrollUser(input: {
  cohortId: string;
  userId: string;
}) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("enrollments")
    .upsert(
      {
        cohort_id: input.cohortId,
        user_id: input.userId,
        status: "active",
      },
      { onConflict: "cohort_id,user_id" },
    )
    .select("id")
    .single();
  if (error) throw error;
  return data.id as string;
}
