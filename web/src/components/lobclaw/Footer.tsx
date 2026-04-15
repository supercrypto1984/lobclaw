/*
 * Footer — LobClaw Midnight Deep Space Minimal
 * Minimal footer with social links and brand
 */
import React from 'react';
import { Feather, Twitter, Github, Send, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const getSocialLinks = () => [
  {
    icon: Twitter,
    label: 'Twitter / X',
    href: 'https://twitter.com/LobClaw_ai',
  },
  { icon: Send, label: 'Telegram', href: 'https://t.me/LobClaw' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/LobClaw' },
  { icon: Globe, label: 'Website', href: '#' },
];

const getFooterLinks = (t: any) => [
  { label: t('功能'), href: '#features' },
  { label: t('价格'), href: '#pricing' },
  { label: t('文档'), href: '#' },
  { label: t('隐私政策'), href: '#' },
  { label: t('服务条款'), href: '#' },
];

export default function Footer() {
  const { t } = useTranslation();
  const socialLinks = getSocialLinks();
  const footerLinks = getFooterLinks(t);

  return (
    <footer className="relative pt-16 pb-8 overflow-hidden bg-[oklch(0.11_0.02_280)]">
      {/* Top divider */}
      <div className="section-divider mb-12" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full bg-[oklch(0.48_0.24_295/6%)] blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[oklch(0.72_0.18_295/20%)] border border-[oklch(0.72_0.18_295/40%)] flex items-center justify-center">
                <Feather className="w-4 h-4 text-[oklch(0.85_0.10_295)]" />
              </div>
              <span className="font-['Syne'] font-700 text-lg gradient-text-lavender">
                LobClaw
              </span>
            </div>
            <p className="font-['Outfit'] text-sm text-[oklch(0.55_0.05_290)] leading-relaxed max-w-xs">
              {t(
                '将你的 $LOBCLAW 代币直接兑换为高性能 AI API 额度。由 Gemini Pro 强力驱动。',
              )}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-['Syne'] font-600 text-[oklch(0.85_0.10_295)] text-sm uppercase tracking-widest mb-4">
              {t('导航')}
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-['Outfit'] text-sm text-[oklch(0.55_0.05_290)] hover:text-[oklch(0.85_0.10_295)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-['Syne'] font-600 text-[oklch(0.85_0.10_295)] text-sm uppercase tracking-widest mb-4">
              {t('社区')}
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-[oklch(0.60_0.06_290)] hover:text-[oklch(0.85_0.10_295)] hover:border-[oklch(0.72_0.18_295/40%)] transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="font-['Outfit'] text-xs text-[oklch(0.45_0.04_290)] mt-4">
              {t('加入我们的 Telegram 获取最新动态和抢先体验码。')}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="section-divider mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-['Outfit'] text-xs text-[oklch(0.45_0.04_290)]">
            © 2025 LobClaw. {t('基于 BSC 构建。')}{' '}
            {t('由 Gemini Pro 强力驱动。')}
          </p>
          <div className="flex items-center gap-2">
            <div className="pulse-dot" />
            <span className="font-['Space_Mono'] text-xs text-[oklch(0.55_0.05_290)]">
              BSC Mainnet · Live
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
