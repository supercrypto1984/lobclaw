/*
 * PreviewSection — LobClaw Midnight Deep Space Minimal
 * Product screenshot with glassmorphism frame and lavender glow
 */
import { motion } from "framer-motion";
import { Play, Monitor } from "lucide-react";

const PRODUCT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663540987453/axALi9pmhWDLy2fqQERaq7/qs-product-preview-9vCa4ir6nJCS4pUuJrdvpe.webp";

export default function PreviewSection() {
  return (
    <section id="preview" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[oklch(0.48_0.24_295/8%)] blur-3xl pointer-events-none" />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-['Space_Mono'] text-[oklch(0.72_0.18_295)] border border-[oklch(0.72_0.18_295/30%)] mb-4">
            PRODUCT PREVIEW
          </span>
          <h2 className="font-['Syne'] font-700 text-4xl lg:text-5xl text-[oklch(0.94_0.04_85)] mb-4">
            See It in{" "}
            <span className="gradient-text-lavender">Action</span>
          </h2>
          <p className="font-['Outfit'] text-[oklch(0.60_0.06_290)] text-lg max-w-lg mx-auto">
            A clean, focused writing environment powered by Gemini Pro — right in your browser.
          </p>
        </motion.div>

        {/* Preview frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Outer glow ring */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[oklch(0.72_0.18_295/30%)] via-[oklch(0.48_0.24_295/20%)] to-[oklch(0.72_0.18_295/30%)] blur-sm" />

          {/* Window chrome */}
          <div className="relative glass-card rounded-2xl overflow-hidden border border-[oklch(0.72_0.18_295/20%)]">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-[oklch(1_0_0/3%)]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[oklch(0.60_0.22_25)]" />
                <div className="w-3 h-3 rounded-full bg-[oklch(0.75_0.18_85)]" />
                <div className="w-3 h-3 rounded-full bg-[oklch(0.65_0.22_145)]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[oklch(1_0_0/5%)] border border-white/8">
                  <Monitor className="w-3 h-3 text-[oklch(0.55_0.05_290)]" />
                  <span className="text-xs font-['Space_Mono'] text-[oklch(0.55_0.05_290)]">app.LobClaw.ai</span>
                </div>
              </div>
            </div>

            {/* Screenshot */}
            <div className="relative">
              <img
                src={PRODUCT_IMG}
                alt="LobClaw AI Writing Interface"
                className="w-full h-auto block"
              />
              {/* Play overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-[oklch(0.11_0.02_280/30%)] opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-[oklch(0.72_0.18_295/80%)] flex items-center justify-center glow-lavender-strong group-hover:scale-110 transition-transform duration-200">
                  <Play className="w-6 h-6 text-[oklch(0.11_0.02_280)] ml-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating stats */}
          <div className="absolute -bottom-4 left-8 glass-card-lavender px-4 py-2 rounded-xl flex items-center gap-2">
            <div className="pulse-dot" />
            <span className="text-xs font-['Space_Mono'] text-[oklch(0.85_0.10_295)]">Live AI Suggestions</span>
          </div>
          <div className="absolute -bottom-4 right-8 glass-card px-4 py-2 rounded-xl">
            <span className="text-xs font-['Space_Mono'] text-[oklch(0.60_0.06_290)]">
              <span className="text-[oklch(0.85_0.10_295)]">Gemini Pro</span> · Connected
            </span>
          </div>
        </motion.div>

        {/* Feature callouts below preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {[
            { label: "Real-time Suggestions", value: "< 200ms" },
            { label: "Languages Supported", value: "50+" },
            { label: "Writing Modes", value: "12" },
            { label: "Avg. Quality Boost", value: "87%" },
          ].map((item) => (
            <div key={item.label} className="glass-card p-4 rounded-xl text-center">
              <div className="font-['Syne'] font-700 text-2xl gradient-text-lavender mb-1">{item.value}</div>
              <div className="font-['Outfit'] text-xs text-[oklch(0.55_0.05_290)]">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
