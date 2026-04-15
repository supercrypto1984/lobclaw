import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Coins,
  FileText,
  History,
  ExternalLink,
  Menu,
  X,
  Globe,
  Settings,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { UserContext } from '../../context/User';

const LOGO_URL =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663283838978/4CgAMC3pPERR2az5YX7DmV/lobclaw-logo-NdKUrPh92voWSZk9zADLQn.webp';

export default function CyberLayout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [userState] = useContext(UserContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('zh') ? 'en' : 'zh-CN';
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  const mainNav = [
    { label: t('首页'), path: '/', icon: <LayoutDashboard size={20} /> },
    { label: t('充值额度'), path: '/console/topup', icon: <Coins size={20} />, badge: 'BSC' },
    { label: t('令牌管理'), path: '/console/token', icon: <ShieldCheck size={20} /> },
    { label: t('使用日志'), path: '/console/log', icon: <History size={20} /> },
    { label: t('系统设置'), path: '/console/setting', icon: <Settings size={20} />, hidden: userState?.user?.role !== 100 },
  ];

  const externalLinks = [
    { label: t('文档'), url: 'https://docs.newapi.pro' },
    { label: 'Telegram', url: 'https://t.me/lobclaw' },
    { label: 'Twitter/X', url: 'https://x.com/lobclaw' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground font-sans">
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-[260px] flex flex-col
          bg-sidebar border-r border-sidebar-border
          transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo area */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
          <img src={LOGO_URL} alt="lobclaw" className="w-9 h-9 rounded-lg" />
          <div className="flex flex-col">
            <span className="text-base font-bold text-foreground tracking-wide font-['Syne']">LobClaw</span>
            <span className="text-[10px] text-muted-foreground font-mono tracking-widest uppercase">AI-Gateway</span>
          </div>
          <button
            className="ml-auto lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <p className="px-3 mb-2 text-[11px] font-semibold text-muted-foreground tracking-widest uppercase">{t('菜单')}</p>
          <ul className="space-y-0.5">
            {mainNav.filter(item => !item.hidden).map((item) => {
              const active = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                      ${active
                        ? "bg-sidebar-accent text-sidebar-primary border-l-2 border-sidebar-primary"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-foreground border-l-2 border-transparent"
                      }
                    `}
                  >
                    <span className={active ? "text-sidebar-primary" : "text-muted-foreground"}>{item.icon}</span>
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber/15 text-amber">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* External links */}
        <div className="px-3 py-4 border-t border-sidebar-border">
          <p className="px-3 mb-2 text-[11px] font-semibold text-muted-foreground tracking-widest uppercase">{t('资源')}</p>
          <ul className="space-y-0.5">
            {externalLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/30 transition-all"
                >
                  <span>{link.label}</span>
                  <ExternalLink size={12} className="ml-auto opacity-50" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-4 lg:px-6 py-3 border-b border-border bg-background/80 backdrop-blur-md">
          <button
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-3 ml-auto">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg border border-border hover:bg-muted/50 transition-all text-muted-foreground"
              title="Switch Language"
            >
              <Globe className="w-4 h-4" />
            </button>

            {/* User status */}
            {userState?.user ? (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs font-medium text-muted-foreground">{userState.user.username}</span>
                <span className="w-px h-3 bg-border" />
                <span className="text-xs font-bold text-amber">${(userState.user.quota / 500000).toFixed(2)}</span>
              </div>
            ) : (
              <Link to="/login" className="text-xs font-bold text-amber hover:underline">{t('请登录')}</Link>
            )}

            {/* EVM Wallet Button */}
            <button
              onClick={() => open()}
              className="px-4 py-1.5 rounded-lg bg-amber hover:bg-amber-dim text-black font-['Outfit'] text-xs font-bold transition-all shadow-[0_0_15px_oklch(0.82_0.17_75/20%)]"
            >
              {isConnected
                ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
                : t('连接钱包')}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
