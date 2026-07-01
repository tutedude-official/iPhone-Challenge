"use client";

import { useEffect } from "react";
import { detectSource } from "@/lib/tracking";

/**
 * Fires once on app mount to capture the attribution source
 * (from ?utm_source= or existing localStorage) and persist it to
 * localStorage. Runs for BOTH logged-in and logged-out users so the
 * source survives navigation to /login, /register etc. — long before
 * any authenticated tracking happens.
 */
export default function SourceCapture() {
  useEffect(() => {
    detectSource();
  }, []);

  return null;
}
