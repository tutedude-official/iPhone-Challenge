"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { GOLD, GOLD_BTN } from "@/lib/tokens";
import { authLogin, authGoogleLogin, getCurrentUser } from "@/lib/auth";
import { useAuth } from "@/lib/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading: authLoading, hasCourses, setUser, setCourses } = useAuth();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [show,     setShow]     = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      if (hasCourses) {
        router.push("/dashboard");
      } else {
        router.push("/not-enrolled");
      }
    }
  }, [authLoading, user, hasCourses, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { user: loggedInUser, error: loginError } = await authLogin(email, password);

    if (loggedInUser) {
      setUser(loggedInUser);
      // Verify courses
      const { courses } = await getCurrentUser();
      setCourses(courses);
      if (courses.length > 0) {
        router.push("/dashboard");
      } else {
        router.push("/not-enrolled");
      }
    } else {
      setError(loginError || "Login failed");
    }
    setLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse: { credential?: string }) => {
    const credential = credentialResponse?.credential;
    if (!credential) return;

    setError("");
    setLoading(true);

    const { user: loggedInUser, error: loginError } = await authGoogleLogin(credential);

    if (loggedInUser) {
      setUser(loggedInUser);
      // Verify courses
      const { courses } = await getCurrentUser();
      setCourses(courses);
      if (courses.length > 0) {
        router.push("/dashboard");
      } else {
        router.push("/not-enrolled");
      }
    } else {
      setError(loginError || "Google login failed");
    }
    setLoading(false);
  };

  // Show loading while checking session
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#2B0A30]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#edc168] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#2B0A30] font-sans text-white">

      {/* ── MAIN ── */}
      <main className="relative flex min-h-screen items-center justify-center px-4 py-16 sm:px-8">

        {/* grid only near the card area */}
        <div className="section-grid" />

        {/* ambient glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(237,193,104,0.13)_0%,rgba(180,60,220,0.10)_45%,transparent_72%)] blur-3xl" />

        <div className="relative z-10 w-full max-w-md">

          {/* card */}
          <m.div
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0,  opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-white/[0.10] bg-[#3a1042] px-5 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:px-10 sm:py-10"
          >
            <div>

              {/* logo + headline */}
              <div className="mb-8 flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edc168]/10 shadow-[0_0_24px_rgba(237,193,104,0.2)]">
                  <Image src="/tutedudelogo.webp" alt="Tutedude" width={36} height={36} className="brightness-0 invert" />
                </div>
                <h1 className={`font-display text-2xl font-extrabold sm:text-3xl ${GOLD}`}>
                  Welcome Back
                </h1>
                <p className="mt-1.5 text-sm text-white/50">
                  Sign in to access your Contest Dashboard
                </p>
              </div>

              {/* form */}
              {/* error message */}
              {error && (
                <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-300">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* email */}
                <div className="group relative">
                  <label className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-widest text-white/40">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-[#edc168]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-white/[0.10] bg-white/[0.05] py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-[#edc168]/50 focus:ring-1 focus:ring-[#edc168]/25"
                    />
                  </div>
                </div>

                {/* password */}
                <div className="group relative">
                  <label className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-widest text-white/40">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-[#edc168]" />
                    <input
                      type={show ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-white/[0.10] bg-white/[0.05] py-3.5 pl-11 pr-12 text-sm text-white placeholder-white/25 outline-none transition-all focus:border-[#edc168]/50 focus:ring-1 focus:ring-[#edc168]/25"
                    />
                    <button
                      type="button"
                      onClick={() => setShow(!show)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors hover:text-white/70"
                      aria-label="Toggle password visibility"
                    >
                      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full py-3.5 text-base font-bold tracking-wide disabled:cursor-not-allowed disabled:opacity-60 ${GOLD_BTN}`}
                >
                  {loading ? (
                    <span className="flex items-center gap-2.5">
                      {/* three-dot pulse */}
                      <span className="flex items-center gap-1">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="h-2 w-2 rounded-full bg-[#3a0f33]"
                            style={{ animation: `bounce 1s ${i * 0.15}s ease-in-out infinite` }}
                          />
                        ))}
                      </span>
                      <span className="text-[#3a0f33]">Signing in…</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Sign In <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </button>
              </form>

              {/* divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/[0.08]" />
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-white/30">or</span>
                <div className="h-px flex-1 bg-white/[0.08]" />
              </div>

              {/* google */}
              <div className="flex w-full items-center justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError("Google login failed")}
                  theme="filled_black"
                  shape="pill"
                  width="100%"
                />
              </div>

              {/* sign up link */}
              <p className="mt-6 text-center text-xs text-white/35">
                New to the contest?{" "}
                <a href="https://www.tutedude.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#edc168] transition-opacity hover:opacity-75">
                  Register here
                </a>
              </p>

            </div>
          </m.div>

          {/* bottom note */}
          <p className="mt-5 text-center text-[0.65rem] text-white/25">
            By signing in you agree to Tutedude&rsquo;s{" "}
            <a href="#" className="underline underline-offset-2 hover:text-white/50">Terms</a>
            {" "}and{" "}
            <a href="#" className="underline underline-offset-2 hover:text-white/50">Privacy Policy</a>
          </p>
        </div>
      </main>
    </div>
  );
}
