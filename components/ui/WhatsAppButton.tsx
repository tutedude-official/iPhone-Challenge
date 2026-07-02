"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "917999749959";
const WHATSAPP_MSG = "Hi, I have a query related to the iPhone Challenge.";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

export { WHATSAPP_HREF };

export default function WhatsAppButton({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-3 py-2 text-xs font-bold text-[#25D366] transition-colors hover:bg-[#25D366]/20 sm:px-4 sm:py-2.5 sm:text-sm"
    >
      <MessageCircle className="h-4 w-4" />
      {!compact && <span className="whitespace-nowrap">79997 49959</span>}
    </a>
  );
}
