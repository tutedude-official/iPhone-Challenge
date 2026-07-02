import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In · Tutedude iPhone Contest",
  description: "Sign in to access your Tutedude iPhone Contest dashboard.",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
