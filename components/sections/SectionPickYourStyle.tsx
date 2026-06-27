"use client";

import { Mic, Monitor, AudioLines, Sparkles, Smartphone, VenetianMask } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { howToShoot } from "@/lib/content";
import { GOLD, CARD } from "@/lib/tokens";

const shootIcons: Record<string, LucideIcon> = {
  mic: Mic,
  monitor: Monitor,
  "audio-lines": AudioLines,
  sparkles: Sparkles,
  smartphone: Smartphone,
  "venetian-mask": VenetianMask,
};

export default function SectionPickYourStyle() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-16">
      <div className="section-grid" />
      <Reveal direction="up">
        <h2 className="text-center font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight">
          {howToShoot.titleLead}{" "}
          <span className={GOLD}>{howToShoot.titleAccent}</span>
        </h2>
        <p className="mt-3 text-center text-base text-white/60">
          {howToShoot.subtitle}
        </p>
      </Reveal>

      <RevealGroup className="mt-7 grid gap-3 sm:mt-12 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {howToShoot.styles.map((style) => {
          const Icon = shootIcons[style.icon] ?? Mic;
          return (
            <RevealItem key={style.title}>
              <div
                className={`${CARD} group h-full p-4 sm:p-7 hover:-translate-y-1.5 hover:border-[#edc168]/30 hover:shadow-[0_0_28px_rgba(237,193,104,0.1)]`}
              >
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-[#edc168]/25 bg-[#edc168]/10 text-[#edc168] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 sm:mb-5 sm:h-14 sm:w-14 sm:rounded-2xl">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="text-xl font-bold">{style.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {style.description}
                </p>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>

      <Reveal direction="up" className="mt-6 text-center">
        <p className="text-sm font-medium text-[#edc168]">
          {howToShoot.banner.title} {howToShoot.banner.subtitle}
        </p>
      </Reveal>
    </section>
  );
}
