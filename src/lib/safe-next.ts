const PUBLIC_EXACT = new Set(["/", "/roadmap", "/badges", "/help", "/privacy"]);

/** Pages and APIs that do not require a signed-in learner. APIs enforce their own checks. */
export function skipsAuthGate(pathname: string): boolean {
  const path =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  if (PUBLIC_EXACT.has(path)) return true;
  if (path === "/auth" || path.startsWith("/auth/")) return true;
  if (path === "/api" || path.startsWith("/api/")) return true;
  return false;
}

/** In-app path safe to use after sign-in. Rejects external and auth-loop targets. */
export function readSafeNext(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.length > 512) return null;
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return null;
  }
  if (value.includes("\\") || value.includes("://") || /\s/.test(value)) {
    return null;
  }
  if (value === "/auth" || value.startsWith("/auth/") || value.startsWith("/auth?")) {
    return null;
  }
  if (value === "/api" || value.startsWith("/api/") || value.startsWith("/api?")) {
    return null;
  }
  return value;
}

export function signInHref(nextPath: string): string {
  return `/auth/sign-in?next=${encodeURIComponent(nextPath)}`;
}
