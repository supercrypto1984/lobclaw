/*
 * PricingSection — LobClaw (EVM/BSC Version)
 * Messaging: "Burn $LOBCLAW for AI Credits"
 * Support for USDC and $LOBCLAW with 20% Bonus
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Zap,
  Flame,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PaymentModal from './PaymentModal';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    usdPrice: 10,
    lobclawAmount: 50000,
    credits: '100,000 Credits',
    bonus: '0%',
    features: ['Gemini Pro Access', 'Standard Speed', 'Email Support'],
  },
  {
    id: 'pro',
    name: 'Professional',
    usdPrice: 50,
    lobclawAmount: 200000,
    credits: '600,000 Credits',
    bonus: '20% Bonus',
    recommended: true,
    features: [
      'Gemini Pro Access',
      'Priority Speed',
      '24/7 Support',
      'Advanced Tools',
    ],
  },
  {
    id: 'whale',
    name: 'Enterprise',
    usdPrice: 200,
    lobclawAmount: 750000,
    credits: '3,000,000 Credits',
    bonus: '50% Bonus',
    features: ['All Models Access', 'Ultra Speed', 'Dedicated Manager'],
  },
];

export default function PricingSection() {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectPlan = (plan: any) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-800 font-['Syne'] text-white mb-4">
            {t('获取算力额度')}
          </h2>
          <p className="text-[oklch(0.70_0.06_290)] font-['Outfit'] max-w-xl mx-auto">
            {t('选择最适合你的方案。使用 $LOBCLAW 支付可享受额外额度奖励。')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl p-8 flex flex-col h-full border ${
                plan.recommended
                  ? 'bg-[oklch(0.72_0.18_295/10%)] border-[oklch(0.72_0.18_295/40%)]'
                  : 'bg-white/5 border-white/10'
              } backdrop-blur-xl`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[oklch(0.72_0.18_295)] text-black text-[10px] font-700 uppercase tracking-widest">
                  {t('推荐方案')}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-700 text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-800 text-white">
                    ${plan.usdPrice}
                  </span>
                  <span className="text-sm text-[oklch(0.70_0.06_290)]">
                    / {t('单次')}
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-[oklch(0.72_0.18_295/15%)] border border-[oklch(0.72_0.18_295/30%)] flex items-center justify-between">
                  <span className="text-xs font-600 text-[oklch(0.85_0.10_295)]">
                    {plan.credits}
                  </span>
                  <span className="text-[10px] font-700 text-green-400">
                    +{plan.bonus}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[oklch(0.72_0.18_295)] shrink-0" />
                    <span className="text-sm text-[oklch(0.70_0.06_290)]">
                      {t(feature)}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full py-4 rounded-2xl font-700 transition-all ${
                  plan.recommended
                    ? 'bg-[oklch(0.72_0.18_295)] text-black hover:bg-[oklch(0.85_0.10_295)]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {t('立即充值')}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Value Prop */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: Flame,
              title: '销毁驱动',
              desc: '支付的 $LOBCLAW 将直接销毁，减少流通量。',
            },
            {
              icon: ShieldCheck,
              title: '链上结算',
              desc: '所有充值均在 BSC 链上透明可见。',
            },
            {
              icon: TrendingUp,
              title: '首款算力 Meme',
              desc: '让 Meme 币不再只是空气，而是真正的生产力。',
            },
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
                <item.icon className="w-6 h-6 text-[oklch(0.72_0.18_295)]" />
              </div>
              <h4 className="text-white font-700 mb-2">{t(item.title)}</h4>
              <p className="text-xs text-[oklch(0.70_0.06_290)] leading-relaxed">
                {t(item.desc)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedPlan && (
        <PaymentModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title={selectedPlan.name}
          description={`${t('充值')} ${selectedPlan.credits}`}
          usdcAmount={selectedPlan.usdPrice}
          lobclawAmount={selectedPlan.lobclawAmount}
          onSuccess={(hash) => {
            console.log('Payment Success:', hash);
            setModalOpen(false);
          }}
        />
      )}
    </section>
  );
}
