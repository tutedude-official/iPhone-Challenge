import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://baby.tutedude.com";
const COOKIE_DOMAIN = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || ".tutedude.com";
const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV || "development";

const authApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// ── Cookie helpers ──

const COOKIE_KEYS = {
  name: "user_name",
  phone: "user_phone",
  id: "user_id",
  email: "user_email",
};

const getCookieOptions = (expires = 7): Cookies.CookieAttributes => {
  const opts: Cookies.CookieAttributes = { expires, path: "/" };
  if (NODE_ENV === "production" && COOKIE_DOMAIN) {
    return { ...opts, domain: COOKIE_DOMAIN };
  }
  return opts;
};

export const setUserCookies = (user: AuthUser | null) => {
  if (!user) return;
  const options = getCookieOptions(7);
  Cookies.set(COOKIE_KEYS.name, user.name ?? "", options);
  Cookies.set(COOKIE_KEYS.phone, user.phone ?? "", options);
  Cookies.set(COOKIE_KEYS.id, user.id ?? "", options);
  Cookies.set(COOKIE_KEYS.email, user.email ?? "", options);
};

export const clearUserCookies = () => {
  const options = getCookieOptions();
  Cookies.remove(COOKIE_KEYS.name, options);
  Cookies.remove(COOKIE_KEYS.phone, options);
  Cookies.remove(COOKIE_KEYS.id, options);
  Cookies.remove(COOKIE_KEYS.email, options);
};

export const getUserFromCookies = (): AuthUser | null => {
  const id = Cookies.get(COOKIE_KEYS.id);
  if (!id) return null;
  return {
    name: Cookies.get(COOKIE_KEYS.name) || null,
    phone: Cookies.get(COOKIE_KEYS.phone) || null,
    id,
    email: Cookies.get(COOKIE_KEYS.email) || null,
  };
};

// ── Types ──

export interface AuthUser {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  [key: string]: unknown;
}

// ── Internal helpers ──

const normalizeAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    return data?.message || data?.error?.message || error.message || "Something went wrong";
  }
  return "Something went wrong";
};

const toAuthUser = (apiBody: unknown): AuthUser | null => {
  const body = apiBody as Record<string, unknown> | null;
  const payload = body?.data as Record<string, unknown> | undefined;
  const user = payload?.user as Record<string, unknown> | undefined;
  if (!user) return null;
  return {
    ...user,
    id: String(user.id ?? user._id ?? ""),
    name: (user.name as string) ?? null,
    email: (user.email as string) ?? null,
    phone: (user.phone as string) ?? null,
    accessToken: (payload?.accessToken as string) ?? null,
    refreshToken: (payload?.refreshToken as string) ?? null,
  };
};

// ── API calls ──

export const authLogin = async (email: string, password: string): Promise<{ user: AuthUser | null; error: string | null }> => {
  try {
    const res = await authApi.post("/api/auth/login", { email, password });
    const user = toAuthUser(res.data);
    if (user) setUserCookies(user);
    return { user, error: null };
  } catch (error) {
    return { user: null, error: normalizeAxiosError(error) };
  }
};

export const authSignup = async (data: { name: string; email: string; password: string; phone: string }): Promise<{ user: AuthUser | null; error: string | null }> => {
  try {
    const res = await authApi.post("/api/auth/signup", data);
    const user = toAuthUser(res.data);
    if (user) {
      setUserCookies(user);
      return { user, error: null };
    }
    // If signup returns success but no user (email already exists, auto-login)
    if (res.data) {
      return authLogin(data.email, data.password);
    }
    return { user: null, error: "Signup failed" };
  } catch (error) {
    return { user: null, error: normalizeAxiosError(error) };
  }
};

export const authGoogleLogin = async (idToken: string): Promise<{ user: AuthUser | null; error: string | null }> => {
  try {
    const res = await authApi.post("/api/auth/google", { idToken });
    const user = toAuthUser(res.data);
    if (user) setUserCookies(user);
    return { user, error: null };
  } catch (error) {
    return { user: null, error: normalizeAxiosError(error) };
  }
};

export interface GetCurrentUserResult {
  user: AuthUser | null;
  courses: unknown[];
  error: string | null;
}

export const getCurrentUser = async (): Promise<GetCurrentUserResult> => {
  try {
    const res = await authApi.get("/api/users/me");
    const user = toAuthUser(res.data);
    const body = res.data as Record<string, unknown> | null;
    const payload = body?.data as Record<string, unknown> | undefined;
    const courses = (payload?.courses as unknown[]) || [];
    if (user) setUserCookies(user);
    return { user, courses, error: null };
  } catch (error) {
    return { user: null, courses: [], error: normalizeAxiosError(error) };
  }
};

export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    await authApi.post("/api/auth/refresh", {});
    return true;
  } catch {
    return false;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await authApi.post("/api/auth/logout", {});
  } catch {
    // ignore
  }
  clearUserCookies();
};
