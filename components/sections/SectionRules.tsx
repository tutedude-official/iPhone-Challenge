"use client";

import { Check, X } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { GOLD, CARD } from "@/lib/tokens";

const doItems = [
  "Create original content.",
  "Share authentic experiences. Don't force promotional content.",
  "Keep it respectful and positive.",
  "Tag @tutedudeofficial and use hashtag #TutedudeiPhoneChallenge in every reel.",
  "Post only between 1 July and 31 July.",
  "Have fun and be creative.",
];

const dontItems = [
  "No copied or stolen content.",
  "No fake testimonials or misleading claims.",
  "Only share genuine learning experiences.",
  "No artificial engagement.",
  "No offensive, hateful, or inappropriate content.",
  "Do not target or degrade others.",
];

export default function SectionRules() {
  return (
    <>
      {/* ---- Do & Don't ---- */}
      <section className="relative mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-16">
        <div className="section-grid" />
        <Reveal direction="up">
          <h2 className="text-center font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold tracking-tight">
            Play it{" "}
            <span className={GOLD}>right.</span>
          </h2>
        </Reveal>

        <div className="mt-7 grid gap-4 sm:mt-12 sm:gap-6 md:grid-cols-2">
          {[
            { title: "DO", items: doItems, isDo: true },
            { title: "DON'T", items: dontItems, isDo: false },
          ].map(({ title, items, isDo }) => (
            <Reveal key={title} direction={isDo ? "left" : "right"}>
              <div
                className={`${CARD} h-full p-4 sm:p-6 ${
                  isDo ? "ring-1 ring-emerald-400/20" : "ring-1 ring-rose-400/20"
                }`}
              >
                <div className="mb-3 flex items-center gap-3 sm:mb-5">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white ${
                      isDo ? "bg-emerald-700" : "bg-rose-700"
                    }`}
                  >
                    {isDo ? <Check className="h-6 w-6" /> : <X className="h-6 w-6" />}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold">{title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                          isDo
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-rose-500/20 text-rose-300"
                        }`}
                      >
                        {isDo ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <X className="h-3 w-3" />
                        )}
                      </span>
                      <span className="text-sm text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" className="mt-8 text-center">
          <p className="text-sm italic text-white/50">
            *Breaking these rules may result in immediate disqualification.
          </p>
        </Reveal>
      </section>

    </>
  );
}
