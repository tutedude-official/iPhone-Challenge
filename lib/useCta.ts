"use client";

import { useAuth } from "./useAuth";

/**
 * Returns the right destination for the primary "Register Now" CTA
 * based on auth state:
 *   - Not logged in     → /login   (label: "Register Now")
 *   - Logged in, no course → /not-enrolled (label: "Enter Contest")
 *   - Logged in + course   → /dashboard   (label: "Go to Dashboard")
 *
 * While auth is still resolving, we fall back to /login so the button
 * remains clickable and doesn't flicker.
 */
export function useCtaTarget(): {
  href: string;
  label: string;
  isLoggedIn: boolean;
} {
  const { user, hasCourses, loading } = useAuth();

  if (loading || !user) {
    return { href: "/login", label: "Register Now for Free!", isLoggedIn: false };
  }
  if (!hasCourses) {
    return { href: "/not-enrolled", label: "Enter Contest", isLoggedIn: true };
  }
  return { href: "/dashboard", label: "Go to Dashboard", isLoggedIn: true };
}
