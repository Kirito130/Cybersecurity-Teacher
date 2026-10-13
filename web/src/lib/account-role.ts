export type AccountRole = "learner" | "admin" | "developer";

export function parseAccountRole(value: unknown): AccountRole {
  if (value === "admin" || value === "developer") return value;
  return "learner";
}

/** Admin and developer accounts can open every block, topic, and checkpoint. */
export function hasFullAccess(role: AccountRole | null): boolean {
  return role === "admin" || role === "developer";
}
