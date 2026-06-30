import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Enrolled · Tutedude iPhone Challenge",
  description: "This challenge is exclusive to enrolled Tutedude students.",
  robots: { index: false, follow: false },
};

export default function NotEnrolledLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
