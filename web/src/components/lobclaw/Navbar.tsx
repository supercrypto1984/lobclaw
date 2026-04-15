/*
 * Navbar — LobClaw Midnight Deep Space Minimal (EVM/BSC Version)
 * Right side: [i18n Switch] + [Dashboard Link] + [Web3Modal Button]
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Feather, Globe, LayoutDashboard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('zh') ? 'en' : 'zh-CN';
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  const NAV_LINKS = [
    { label: t('首页'), href: '#' },
    { label: t('模型广场'), href: '#pricing' },
    { label: t('关于'), href: '#features' },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-card border-b border-white/8 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[oklch(0.72_0.18_295/20%)] border border-[oklch(0.72_0.18_295/40%)] flex items-center justify-center glow-lavender group-hover:glow-lavender-strong transition-all duration-300">
            <Feather className="w-4 h-4 text-[oklch(0.85_0.10_295)]" />
          </div>
          <span className="font-['Syne'] font-700 text-lg gradient-text-lavender">
            LobClaw
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[oklch(0.70_0.06_290)] hover:text-[oklch(0.85_0.10_295)] transition-colors duration-200 font-['Outfit']"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side: i18n + Console + Wallet */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-full border border-white/10 hover:bg-white/5 transition-all text-[oklch(0.70_0.06_290)]"
            title="Switch Language"
          >
            <Globe className="w-4 h-4" />
          </button>

          {/* Console Button */}
          <Link
            to="/console"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.72_0.18_295/40%)] bg-[oklch(0.72_0.18_295/8%)] hover:bg-[oklch(0.72_0.18_295/15%)] transition-all duration-200"
          >
            <LayoutDashboard className="w-4 h-4 text-[oklch(0.85_0.10_295)]" />
            <span className="font-['Outfit'] text-xs font-500 text-[oklch(0.85_0.10_295)]">
              {t('进入控制台')}
            </span>
          </Link>

          {/* Wallet Button */}
          <button
            onClick={() => open()}
            className="px-4 py-1.5 rounded-full bg-[oklch(0.72_0.18_295)] hover:bg-[oklch(0.85_0.10_295)] text-black font-['Outfit'] text-xs font-600 transition-all shadow-[0_0_15px_oklch(0.72_0.18_295/30%)]"
          >
            {isConnected
              ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
              : t('连接钱包')}
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-[oklch(0.85_0.10_295)]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card mx-4 mt-2 rounded-xl overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-[oklch(0.70_0.06_290)] hover:text-[oklch(0.85_0.10_295)] transition-colors py-2 border-b border-white/5 last:border-0"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-[oklch(0.70_0.06_290)]"
                >
                  <Globe className="w-4 h-4" />
                  {i18n.language.startsWith('zh') ? 'English' : '中文'}
                </button>
                <Link
                  to="/console"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-[oklch(0.72_0.18_295/40%)] text-[oklch(0.85_0.10_295)]"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {t('进入控制台')}
                </Link>
                <button
                  onClick={() => open()}
                  className="px-4 py-2 rounded-xl bg-[oklch(0.72_0.18_295)] text-black font-600"
                >
                  {isConnected ? address?.slice(0, 10) + '...' : t('连接钱包')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
