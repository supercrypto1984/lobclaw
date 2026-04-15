/*
 * HeroSection — LobClaw (EVM/BSC Version)
 * Messaging: "The First MEME Coin for AI Power"
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Sparkles, ArrowRight, Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden stars-bg">
      {/* Animated Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[oklch(0.72_0.18_295/15%)] blur-[120px] rounded-full animate-blob" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[oklch(0.85_0.10_295/10%)] blur-[120px] rounded-full animate-blob [animation-delay:2s]" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[oklch(0.72_0.18_295/30%)] bg-[oklch(0.72_0.18_295/5%)] mb-8">
            <Sparkles className="w-3.5 h-3.5 text-[oklch(0.85_0.10_295)]" />
            <span className="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-[oklch(0.85_0.10_295)]">
              {t('全球首创 · MEME 赋能算力')}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-800 font-['Syne'] leading-[1.1] mb-6 tracking-tight">
            <span className="text-white">{t('首款可购买')}</span>
            <br />
            <span className="gradient-text-lavender italic">
              {t('AI 算力的 MEME 币')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[oklch(0.70_0.06_290)] font-['Outfit'] max-w-2xl mx-auto mb-10 leading-relaxed">
            {t(
              '将你的 $LOBCLAW 代币直接兑换为高性能 AI API 额度。由 Gemini Pro 强力驱动。',
            )}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/console"
              className="group relative flex items-center gap-2 px-8 py-4 rounded-2xl bg-[oklch(0.72_0.18_295)] hover:bg-[oklch(0.85_0.10_295)] text-black font-700 transition-all shadow-[0_0_30px_oklch(0.72_0.18_295/40%)] overflow-hidden"
            >
              <Zap className="w-5 h-5 fill-current" />
              <span>{t('销毁即算力')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#pricing"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-600 transition-all backdrop-blur-md"
            >
              <Terminal className="w-5 h-5 text-[oklch(0.70_0.06_290)]" />
              <span>{t('查看模型广场')}</span>
            </a>
          </div>

          {/* Stats / Proof */}
          <div className="mt-20 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Network', value: 'BSC Mainnet' },
              { label: 'Token', value: '$LOBCLAW' },
              { label: 'Status', value: 'Live on FLAP' },
              { label: 'Models', value: '30+ Providers' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-[10px] font-['Space_Mono'] uppercase tracking-widest text-[oklch(0.50_0.05_290)] mb-1">
                  {t(stat.label)}
                </p>
                <p className="text-sm font-600 text-white font-['Outfit']">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[oklch(0.11_0.02_280)] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[oklch(0.11_0.02_280)] to-transparent" />
      </div>
    </section>
  );
}
