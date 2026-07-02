"use client";

import {
  GraduationCap,
  Video,
  Briefcase,
  ArrowRightLeft,
  Wrench,
  Bot,
  Lightbulb,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { GOLD, CARD } from "@/lib/tokens";

interface WhoCard {
  title: string;
  description: string;
  Icon: LucideIcon;
}

const cards: WhoCard[] = [
  {
    title: "Students",
    description:
      "Build your confidence, portfolio, and creator profile while you learn.",
    Icon: GraduationCap,
  },
  {
    title: "Content Creators",
    description:
      "Turn your learning into engaging content and grow your audience.",
    Icon: Video,
  },
  {
    title: "Working Professionals",
    description: "Showcase your skills, projects, and career journey.",
    Icon: Briefcase,
  },
  {
    title: "Career Switchers",
    description:
      "Document your transition into a new field and inspire others.",
    Icon: ArrowRightLeft,
  },
  {
    title: "Builders & Project Makers",
    description:
      "Share what you're creating, from AI tools to websites and everything in between.",
    Icon: Wrench,
  },
  {
    title: "AI Enthusiasts",
    description:
      "Experiment with AI-generated content, automations, and creative workflows.",
    Icon: Bot,
  },
  {
    title: "Curious Learners",
    description:
      "If you're learning something new at TuteDude, you're already eligible. No experience. No fancy equipment. Just your learning journey and your creativity.",
    Icon: Lightbulb,
  },
];

export default function SectionWhoCanJoin() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-6 sm:px-8 sm:py-16">
      <div className="section-grid" />
      <Reveal direction="up">
        <h2 className="text-center font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight">
          Who Is This{" "}
          <span className={GOLD}>Contest For?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-white/60">
          Whether you&apos;re just starting your learning journey or already building amazing
          projects, this contest is open to every enrolled TuteDude learner and free to join.
        </p>
      </Reveal>

      {/* Row 1 — 4 cards */}
      <RevealGroup
        className="mt-7 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4"
        stagger={0.07}
      >
        {cards.slice(0, 4).map(({ title, description, Icon }) => (
          <RevealItem key={title} className="h-full">
            <div className={`${CARD} group h-full p-4 sm:p-6 hover:-translate-y-1.5 hover:border-[#edc168]/30 hover:shadow-[0_0_28px_rgba(237,193,104,0.1)]`}>
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#edc168]/25 bg-[#edc168]/10 text-[#edc168] transition-transform duration-300 group-hover:scale-110 sm:mb-4 sm:h-12 sm:w-12 sm:rounded-2xl">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{description}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Row 2 — 3 cards centered */}
      <RevealGroup
        className="mx-auto mt-3 grid grid-cols-2 gap-3 sm:mt-5 sm:gap-5 lg:w-3/4 lg:grid-cols-3"
        stagger={0.07}
      >
        {cards.slice(4).map(({ title, description, Icon }, idx) => (
          <RevealItem key={title} className={`h-full${idx === 2 ? " col-span-2 lg:col-span-1" : ""}`}>
            <div className={`${CARD} group h-full p-4 sm:p-6 hover:-translate-y-1.5 hover:border-[#edc168]/30 hover:shadow-[0_0_28px_rgba(237,193,104,0.1)]`}>
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-[#edc168]/25 bg-[#edc168]/10 text-[#edc168] transition-transform duration-300 group-hover:scale-110 sm:mb-4 sm:h-12 sm:w-12 sm:rounded-2xl">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{description}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
