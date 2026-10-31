/**
 * Creates or updates the admin and developer sign-in accounts.
 * Reads .env.local. Prints passwords only when an account is created.
 * Does not print the service-role key.
 *
 * Run from repo root: node --env-file=.env.local --import tsx scripts/create-staff-accounts.ts
 */
import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";

const ACCOUNTS = [
  {
    email: "admin@cyberxp.local",
    displayName: "Admin",
    role: "admin",
  },
  {
    email: "dev@cyberxp.local",
    displayName: "Dev",
    role: "developer",
  },
] as const;

function password() {
  return randomBytes(18).toString("base64url");
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local",
    );
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const listed = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });
  if (listed.error) throw listed.error;

  for (const account of ACCOUNTS) {
    const existing = listed.data.users.find(
      (user) => user.email?.toLowerCase() === account.email,
    );
    let userId = existing?.id;
    let createdPassword: string | null = null;

    if (!userId) {
      createdPassword = password();
      const created = await supabase.auth.admin.createUser({
        email: account.email,
        password: createdPassword,
        email_confirm: true,
        user_metadata: { display_name: account.displayName },
      });
      if (created.error || !created.data.user) {
        throw created.error ?? new Error(`Could not create ${account.email}`);
      }
      userId = created.data.user.id;
    } else {
      const updated = await supabase.auth.admin.updateUserById(userId, {
        email_confirm: true,
        user_metadata: { display_name: account.displayName },
      });
      if (updated.error) throw updated.error;
    }

    let role = account.role;
    let saved = await supabase
      .from("profiles")
      .upsert(
        { id: userId, display_name: account.displayName, role },
        { onConflict: "id" },
      );
    if (saved.error && role === "developer") {
      role = "admin";
      saved = await supabase
        .from("profiles")
        .upsert(
          { id: userId, display_name: account.displayName, role },
          { onConflict: "id" },
        );
    }
    if (saved.error) throw saved.error;

    console.log(`${account.displayName} account`);
    console.log(`Email: ${account.email}`);
    console.log(`Role: ${role}`);
    console.log(
      createdPassword
        ? `Password: ${createdPassword}`
        : "Password: unchanged (account already existed)",
    );
    console.log("");
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Staff account setup failed";
  console.error(message);
  process.exit(1);
});
