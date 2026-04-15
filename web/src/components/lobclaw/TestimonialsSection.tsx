/*
 * TestimonialsSection — LobClaw Midnight Deep Space Minimal
 * Auto-cycling carousel with 3 testimonials, large quote marks, glassmorphism cards
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "LobClaw completely changed how I write. The Gemini Pro integration is insane — it understands my voice better than I do. Burning $MEME to unlock it felt like the most Web3-native thing I've ever done.",
    author: "Alex Chen",
    role: "Indie Hacker & Content Creator",
    avatar: "https://i.pravatar.cc/64?img=11",
    tag: "@alexchen_builds",
  },
  {
    quote:
      "I was skeptical about AI writing tools until LobClaw. The quality is genuinely different — it's not just autocomplete, it actually thinks. The on-chain payment model is elegant. No subscription anxiety, just pure value.",
    author: "Sarah Kim",
    role: "Technical Writer at Web3 Startup",
    avatar: "https://i.pravatar.cc/64?img=5",
    tag: "@sarahkim_writes",
  },
  {
    quote:
      "As a DeFi researcher, I write a lot of complex analysis. LobClaw handles technical jargon, maintains consistency, and makes my reports 3x faster to produce. The $MEME burn mechanism is genius tokenomics.",
    author: "Marcus Rivera",
    role: "DeFi Research Analyst",
    avatar: "https://i.pravatar.cc/64?img=15",
    tag: "@marcusdefi",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const go = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -40 }),
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.18_295/20%)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.18_295/20%)] to-transparent" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-['Space_Mono'] text-[oklch(0.72_0.18_295)] border border-[oklch(0.72_0.18_295/30%)] mb-4">
            TESTIMONIALS
          </span>
          <h2 className="font-['Syne'] font-700 text-4xl lg:text-5xl text-[oklch(0.94_0.04_85)] mb-4">
            Loved by{" "}
            <span className="gradient-text-lavender">Early Builders</span>
          </h2>
          <p className="font-['Outfit'] text-[oklch(0.60_0.06_290)] text-lg max-w-lg mx-auto">
            Real feedback from our beta community — writers, researchers, and Web3 natives.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          {/* Large quote decoration */}
          <Quote className="absolute -top-4 -left-4 w-16 h-16 text-[oklch(0.72_0.18_295/15%)] rotate-180" />

          <div className="relative overflow-hidden min-h-[280px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <div className="glass-card-lavender p-8 rounded-2xl">
                  {/* Quote text */}
                  <p className="font-['Outfit'] text-[oklch(0.85_0.10_295)] text-lg leading-relaxed mb-8 italic">
                    "{testimonials[current].quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonials[current].avatar}
                      alt={testimonials[current].author}
                      className="w-12 h-12 rounded-full border-2 border-[oklch(0.72_0.18_295/40%)]"
                    />
                    <div>
                      <div className="font-['Syne'] font-600 text-[oklch(0.94_0.04_85)]">
                        {testimonials[current].author}
                      </div>
                      <div className="font-['Outfit'] text-sm text-[oklch(0.60_0.06_290)]">
                        {testimonials[current].role}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <span className="text-xs font-['Space_Mono'] text-[oklch(0.72_0.18_295)]">
                        {testimonials[current].tag}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[oklch(0.72_0.18_295)] hover:bg-[oklch(0.72_0.18_295/10%)] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 h-2 bg-[oklch(0.72_0.18_295)]"
                      : "w-2 h-2 bg-[oklch(0.72_0.18_295/30%)] hover:bg-[oklch(0.72_0.18_295/60%)]"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-[oklch(0.72_0.18_295)] hover:bg-[oklch(0.72_0.18_295/10%)] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
