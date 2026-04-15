/*
 * FlywheelSection — LobClaw $LOBCLAW Buyback & Burn Flywheel
 * Design: Midnight Deep Space Minimal
 */
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { Flame, TrendingUp, DollarSign, Zap, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// ─── Mock live data ──────────────────────────────────────────────────────────
const INITIAL_BURNED = 42860000;
const INITIAL_DEFLATION = 3.47;
const INITIAL_FIAT_SAVED = 1284600;

const BURN_RATE_PER_SEC = 12.4;
const DEFLATION_RATE_PER_SEC = 0.0003;
const FIAT_RATE_PER_SEC = 3.8;

function useCountUp(initial: number, ratePerSec: number) {
  const [value, setValue] = useState(initial);
  const lastTime = useRef(performance.now());

  useAnimationFrame((time) => {
    const delta = (time - lastTime.current) / 1000;
    lastTime.current = time;
    setValue((v) => v + ratePerSec * delta);
  });

  return value;
}

function formatBurned(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(3)}M`;
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function formatFiat(n: number) {
  return `$${(n / 1000).toFixed(1)}K`;
}

function Particle({
  delay,
  color,
  path,
}: {
  delay: number;
  color: string;
  path: 'A' | 'B';
}) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      initial={
        path === 'A' ? { left: '0%', top: '50%' } : { left: '0%', top: '50%' }
      }
      animate={
        path === 'A'
          ? { left: ['0%', '45%', '50%'], top: ['0%', '20%', '50%'] }
          : { left: ['0%', '45%', '50%'], top: ['100%', '80%', '50%'] }
      }
      transition={{
        duration: 2.4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

export default function FlywheelSection() {
  const { t } = useTranslation();
  const burned = useCountUp(INITIAL_BURNED, BURN_RATE_PER_SEC);
  const deflation = useCountUp(INITIAL_DEFLATION, DEFLATION_RATE_PER_SEC);
  const fiatSaved = useCountUp(INITIAL_FIAT_SAVED, FIAT_RATE_PER_SEC);

  const [holePulse, setHolePulse] = useState(1);
  useEffect(() => {
    const id = setInterval(() => {
      setHolePulse((p) => (p === 1 ? 1.08 : 1));
    }, 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="flywheel" className="py-24 relative overflow-hidden bg-[oklch(0.11_0.02_280)]">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-['Space_Mono'] text-[oklch(0.65_0.22_25)] border border-[oklch(0.65_0.22_25/40%)] mb-4 bg-[oklch(0.65_0.22_25/8%)] uppercase tracking-widest">
            {t('代币经济引擎')}
          </span>
          <h2 className="font-['Syne'] font-800 text-4xl lg:text-5xl text-white mb-4">
            <span className="gradient-text-fire">$LOBCLAW {t('飞轮效应')}</span>
          </h2>
          <p className="font-['Outfit'] text-[oklch(0.70_0.06_290)] text-lg max-w-xl mx-auto">
            {t('每一次购买，每一笔交易，都在喂养同一个黑洞。')}
            <br />
            {t('因设计而通缩，由数学定义价值。')}
          </p>
        </div>

        {/* Live stats bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="glass-card p-5 rounded-2xl border border-[oklch(0.65_0.22_25/25%)] bg-[oklch(0.65_0.22_25/5%)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[oklch(0.65_0.22_25/20%)] flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-[oklch(0.75_0.22_35)]" />
            </div>
            <div>
              <div className="font-['Space_Mono'] text-2xl font-bold text-[oklch(0.90_0.18_35)] tabular-nums">
                {formatBurned(burned)}
              </div>
              <div className="font-['Outfit'] text-xs text-[oklch(0.55_0.05_290)] mt-0.5">
                {t('累计销毁 $LOBCLAW')}
              </div>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-[oklch(0.72_0.18_295/25%)] bg-[oklch(0.72_0.18_295/5%)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[oklch(0.72_0.18_295/20%)] flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6 text-[oklch(0.85_0.10_295)]" />
            </div>
            <div>
              <div className="font-['Space_Mono'] text-2xl font-bold text-[oklch(0.85_0.10_295)] tabular-nums">
                {deflation.toFixed(4)}%
              </div>
              <div className="font-['Outfit'] text-xs text-[oklch(0.55_0.05_290)] mt-0.5">
                {t('通缩率 (持续增长)')}
              </div>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-[oklch(0.65_0.22_145/25%)] bg-[oklch(0.65_0.22_145/5%)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[oklch(0.65_0.22_145/20%)] flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6 text-[oklch(0.75_0.22_145)]" />
            </div>
            <div>
              <div className="font-['Space_Mono'] text-2xl font-bold text-[oklch(0.75_0.22_145)] tabular-nums">
                {formatFiat(fiatSaved)}
              </div>
              <div className="font-['Outfit'] text-xs text-[oklch(0.55_0.05_290)] mt-0.5">
                {t('为用户节省的总金额')}
              </div>
            </div>
          </div>
        </div>

        {/* Flywheel diagram */}
        <div className="glass-card rounded-3xl border border-white/8 p-8 lg:p-12 relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
            {/* Pipeline A */}
            <div className="flex-1 flex flex-col items-center lg:items-end gap-4 text-center lg:text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.72_0.18_295/12%)] border border-[oklch(0.72_0.18_295/30%)] mb-3">
                <Zap className="w-3.5 h-3.5 text-[oklch(0.85_0.10_295)]" />
                <span className="font-['Space_Mono'] text-[10px] text-[oklch(0.85_0.10_295)]">PIPELINE A</span>
              </div>
              <h3 className="font-['Syne'] font-700 text-xl text-white mb-2">{t('实用性销毁')}</h3>
              <p className="font-['Outfit'] text-sm text-[oklch(0.55_0.05_290)] max-w-xs">
                {t('用户销毁 $LOBCLAW 获得 AI 算力额度。')}
                <br />
                <strong className="text-white">100%</strong> {t('直接进入黑洞地址。')}
              </p>
            </div>

            {/* Center: Black Hole */}
            <div className="relative flex items-center justify-center mx-8 lg:mx-16 shrink-0">
              <motion.div
                animate={{ scale: holePulse }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="relative w-24 h-24 rounded-full bg-black border-2 border-[oklch(0.65_0.22_25/50%)] flex flex-col items-center justify-center shadow-[0_0_50px_oklch(0.65_0.22_25/40%)]"
              >
                <Flame className="w-8 h-8 text-[oklch(0.75_0.22_35)]" />
                <span className="font-['Space_Mono'] text-[8px] text-[oklch(0.65_0.22_25)] mt-0.5">BURN</span>
              </motion.div>
            </div>

            {/* Pipeline B */}
            <div className="flex-1 flex flex-col items-center lg:items-start gap-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[oklch(0.65_0.22_25/12%)] border border-[oklch(0.65_0.22_25/30%)] mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-[oklch(0.75_0.22_35)]" />
                <span className="font-['Space_Mono'] text-[10px] text-[oklch(0.75_0.22_35)]">PIPELINE B</span>
              </div>
              <h3 className="font-['Syne'] font-700 text-xl text-white mb-2">{t('回购引擎')}</h3>
              <p className="font-['Outfit'] text-sm text-[oklch(0.55_0.05_290)] max-w-xs">
                {t('链上交易税触发')}
                <br />
                <strong className="text-white">{t('自动回购')}</strong> → {t('市场购买')} → {t('销毁')}。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
