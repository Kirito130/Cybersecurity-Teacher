export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/** Auth + service-role writes required for cloud progress APIs. */
export function isServiceRoleConfigured() {
  return (
    isSupabaseConfigured() && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)
  );
}
