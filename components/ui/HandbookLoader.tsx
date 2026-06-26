"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DURATION = 2600;

const STARS = [
  { x: "18%",  y: "22%", size: 14, delay: 0 },
  { x: "82%",  y: "18%", size: 10, delay: 0.4 },
  { x: "12%",  y: "70%", size: 12, delay: 0.8 },
  { x: "88%",  y: "65%", size: 8,  delay: 1.2 },
  { x: "50%",  y: "12%", size: 10, delay: 0.2 },
  { x: "72%",  y: "80%", size: 14, delay: 0.6 },
  { x: "28%",  y: "85%", size: 9,  delay: 1.0 },
  { x: "92%",  y: "40%", size: 11, delay: 1.4 },
];

export default function HandbookLoader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShow(false); return; }

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    // animate progress bar
    const start = Date.now();
    const raf = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / DURATION) * 100, 100));
    }, 16);

    const t = setTimeout(() => setShow(false), DURATION);
    return () => { clearTimeout(t); clearInterval(raf); };
  }, []);

  useEffect(() => {
    if (!show) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } }}
          className="loader-root"
          aria-hidden
        >
          {/* grid background */}
          <div className="loader-grid" />

          {/* glow blobs */}
          <div className="loader-blob loader-blob-a" />
          <div className="loader-blob loader-blob-b" />

          {/* twinkling stars */}
          {STARS.map((s, i) => (
            <motion.svg
              key={i}
              viewBox="0 0 24 24"
              style={{
                position: "absolute",
                left: s.x,
                top: s.y,
                width: s.size,
                height: s.size,
                transform: "translate(-50%, -50%)",
              }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5], rotate: [0, 180, 360] }}
              transition={{ repeat: Infinity, duration: 2.2, delay: s.delay, ease: "easeInOut" }}
            >
              <path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z" fill="#f8e3a6" />
            </motion.svg>
          ))}

          {/* centre branding */}
          <div className="loader-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="loader-brand"
            >
              Tutedude
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="loader-title"
            >
              iPhone Challenge
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="loader-sub"
            >
              Learn · Create · Share · Win
            </motion.p>

            {/* progress bar */}
            <div className="loader-bar-track">
              <motion.div
                className="loader-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <style jsx>{`
            .loader-root {
              position: fixed;
              inset: 0;
              z-index: 999;
              overflow: hidden;
              background-color: #2b0a30;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .loader-grid {
              position: absolute;
              inset: 0;
              background-image:
                linear-gradient(rgba(237,193,104,0.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(206,130,230,0.12) 1px, transparent 1px);
              background-size: 54px 54px;
              animation: grid-drift 24s linear infinite;
            }
            @keyframes grid-drift {
              to { background-position: 54px 54px; }
            }

            .loader-blob {
              position: absolute;
              border-radius: 999px;
              filter: blur(80px);
              pointer-events: none;
            }
            .loader-blob-a {
              width: 480px;
              height: 480px;
              top: -10%;
              right: -8%;
              background: radial-gradient(circle, rgba(206,46,160,0.35), transparent 70%);
            }
            .loader-blob-b {
              width: 420px;
              height: 420px;
              bottom: -10%;
              left: -8%;
              background: radial-gradient(circle, rgba(124,58,237,0.32), transparent 70%);
            }

            .loader-center {
              position: relative;
              z-index: 10;
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
              gap: 0;
            }

            .loader-brand {
              font-family: var(--font-display, system-ui), sans-serif;
              font-weight: 800;
              font-size: clamp(1.2rem, 3vw, 1.8rem);
              color: #fff;
              letter-spacing: -0.02em;
              line-height: 1;
            }

            .loader-title {
              font-family: var(--font-display, system-ui), sans-serif;
              font-weight: 900;
              font-size: clamp(2.6rem, 8vw, 6rem);
              line-height: 0.9;
              letter-spacing: -0.03em;
              margin-top: 0.2em;
              background: linear-gradient(135deg, #f8e3a6 0%, #edc168 45%, #d99a2b 100%);
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
            }

            .loader-sub {
              margin-top: 1rem;
              font-size: 0.72rem;
              letter-spacing: 0.28em;
              text-transform: uppercase;
              color: rgba(255,255,255,0.45);
            }

            .loader-bar-track {
              margin-top: 2rem;
              width: min(320px, 70vw);
              height: 3px;
              border-radius: 999px;
              background: rgba(255,255,255,0.08);
              overflow: hidden;
            }
            .loader-bar-fill {
              height: 100%;
              border-radius: 999px;
              background: linear-gradient(to right, #f8e3a6, #dca23a);
              transition: width 0.06s linear;
              box-shadow: 0 0 10px rgba(237,193,104,0.6);
            }

            @media (prefers-reduced-motion: reduce) {
              .loader-grid { animation: none; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
