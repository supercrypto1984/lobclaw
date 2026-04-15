/*
 * FeaturesSection — LobClaw Midnight Deep Space Minimal
 * 3 glassmorphism feature cards with lavender glow icons
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Brain, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FEATURE_ICON =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663540987453/axALi9pmhWDLy2fqQERaq7/qs-writing-feature-P2cnfqoZ7k9BZukFWd67Pk.webp';

const getFeatures = (t: any) => [
  {
    icon: Brain,
    title: t('Gemini Pro 智慧'),
    description: t(
      '利用 Google 最强大的 AI 模型。LobClaw 调用 Gemini Pro 理解上下文、语调和细微差别。',
    ),
    tag: t('AI 核心'),
    gradient: 'from-[oklch(0.72_0.18_295/15%)] to-[oklch(0.48_0.24_295/5%)]',
    border: 'border-[oklch(0.72_0.18_295/25%)]',
    iconBg: 'bg-[oklch(0.72_0.18_295/20%)]',
    iconColor: 'text-[oklch(0.85_0.10_295)]',
  },
  {
    icon: Feather,
    title: t('流畅的写作体验'),
    description: t(
      '一个与你共同思考的沉浸式编辑器。实时建议、语调调整和智能补全，绝不中断你的创作流。',
    ),
    tag: t('编辑器'),
    gradient: 'from-[oklch(0.94_0.04_85/8%)] to-[oklch(0.72_0.18_295/5%)]',
    border: 'border-[oklch(0.94_0.04_85/15%)]',
    iconBg: 'bg-[oklch(0.94_0.04_85/15%)]',
    iconColor: 'text-[oklch(0.94_0.04_85)]',
    image: FEATURE_ICON,
  },
  {
    icon: Shield,
    title: t('链上价值，零中间商'),
    description: t(
      '你的 $LOBCLAW 代币在 BSC 链上直接用于支付算力。没有繁琐的订阅，只有纯粹的加密访问证明。',
    ),
    tag: t('Web3'),
    gradient: 'from-[oklch(0.65_0.22_145/10%)] to-[oklch(0.72_0.18_295/5%)]',
    border: 'border-[oklch(0.65_0.22_145/20%)]',
    iconBg: 'bg-[oklch(0.65_0.22_145/20%)]',
    iconColor: 'text-[oklch(0.75_0.18_145)]',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FeaturesSection() {
  const { t } = useTranslation();
  const features = getFeatures(t);

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[oklch(0.72_0.18_295/40%)]" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-['Space_Mono'] text-[oklch(0.72_0.18_295)] border border-[oklch(0.72_0.18_295/30%)] mb-4 uppercase tracking-widest">
            {t('核心功能')}
          </span>
          <h2 className="font-['Syne'] font-700 text-4xl lg:text-5xl text-[oklch(0.94_0.04_85)] mb-4">
            {t('与众不同，')}{' '}
            <span className="gradient-text-lavender">{t('天生极客。')}</span>
          </h2>
          <p className="font-['Outfit'] text-[oklch(0.60_0.06_290)] text-lg max-w-xl mx-auto">
            {t('LobClaw 是唯一值得你投入代币的 AI 生产力工具。')}
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${feature.gradient} border ${feature.border} backdrop-blur-sm group cursor-default overflow-hidden`}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[oklch(0.72_0.18_295/4%)]" />

                {/* Tag */}
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-['Space_Mono'] text-[oklch(0.72_0.18_295)] bg-[oklch(0.72_0.18_295/10%)] mb-4">
                  {feature.tag}
                </span>

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="font-['Syne'] font-600 text-[oklch(0.94_0.04_85)] text-xl mb-3">
                  {feature.title}
                </h3>
                <p className="font-['Outfit'] text-[oklch(0.60_0.06_290)] text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.72_0.18_295/30%)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
