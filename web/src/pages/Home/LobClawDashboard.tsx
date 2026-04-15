import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Flame,
  TrendingUp,
  Wallet,
  ExternalLink,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  DollarSign,
  Shield,
  Zap,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { useTranslation } from 'react-i18next';
import PaymentModal from '../../components/lobclaw/PaymentModal';

const HERO_BG =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663283838978/4CgAMC3pPERR2az5YX7DmV/hero-bg-EG3UBGG8GimRVogkaK38U2.webp';
const LOGO_URL =
  'https://d2xsxph8kpxj0f.cloudfront.net/310519663283838978/4CgAMC3pPERR2az5YX7DmV/lobclaw-logo-NdKUrPh92voWSZk9zADLQn.webp';

const weeklyData = [
  { week: 'W1', sales: 42000, spending: 12000 },
  { week: 'W2', sales: 58000, spending: 15000 },
  { week: 'W3', sales: 51000, spending: 18000 },
  { week: 'W4', sales: 73000, spending: 14000 },
  { week: 'W5', sales: 68000, spending: 22000 },
  { week: 'W6', sales: 89000, spending: 19000 },
  { week: 'W7', sales: 95000, spending: 25000 },
  { week: 'W8', sales: 112000, spending: 21000 },
];

const priceData = [
  { time: '00:00', price: 0.00038 },
  { time: '04:00', price: 0.00041 },
  { time: '08:00', price: 0.00039 },
  { time: '12:00', price: 0.00044 },
  { time: '16:00', price: 0.00043 },
  { time: '20:00', price: 0.00042 },
  { time: 'Now', price: 0.00042 },
];

const recentTxs = [
  {
    hash: '0x8f3a...b2c1',
    type: 'API Cost',
    amount: '$1,200',
    time: '2 min ago',
  },
  {
    hash: '0x4e1d...9f3a',
    type: 'Burn',
    amount: '500K $LOBCLAW',
    time: '15 min ago',
  },
  {
    hash: '0xa7c2...3e8b',
    type: 'Treasury',
    amount: '$3,500',
    time: '1 hr ago',
  },
  {
    hash: '0x2b9f...c4d7',
    type: 'LP Inject',
    amount: '$2,000',
    time: '3 hr ago',
  },
  {
    hash: '0x6d4e...a1f2',
    type: 'Dividend',
    amount: '$8,200',
    time: '6 hr ago',
  },
];

const treasuryAssets = [
  { name: 'BTC', pct: 35, color: '#F7931A' },
  { name: 'ETH', pct: 25, color: '#627EEA' },
  { name: 'BSC', pct: 20, color: '#F3BA2F' },
  { name: 'USDT', pct: 20, color: '#26A17B' },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

export default function LobClawDashboard() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl"
        style={{ minHeight: '240px' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="relative z-10 flex items-center justify-between p-6 lg:p-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber/10 border border-amber/30 mb-4">
              <Zap className="w-3 h-3 text-amber fill-current" />
              <span className="text-[10px] font-bold text-amber uppercase tracking-wider">
                {t('首款算力 MEME')}
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              {t('首款可购买')} <span className="text-amber text-glow-amber">{t('AI 算力的 MEME 币')}</span>
            </h1>
            <p className="text-sm lg:text-base text-gray-300 mb-6 leading-relaxed">
              {t('将你的 $LOBCLAW 代币直接兑换为高性能 AI API 额度。由 Gemini Pro 强力驱动。')}
            </p>
            <button 
              onClick={() => setModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-amber text-black font-bold text-sm hover:bg-amber-dim transition-all shadow-[0_0_24px_oklch(0.82_0.17_75/35%)] flex items-center gap-2"
            >
              <Flame size={18} />
              {t('立即充值')} $LOBCLAW
            </button>
          </div>
          <img
            src={LOGO_URL}
            alt="lobclaw mascot"
            className="hidden lg:block w-48 h-48 object-contain animate-float drop-shadow-[0_0_40px_oklch(0.82_0.17_75/40%)]"
          />
        </div>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t('代币价格'), value: '$0.00042', change: '+12.5%', up: true, icon: <TrendingUp size={18} /> },
          { label: t('累计销毁'), value: '24.8M', change: '2.1% supply', up: true, icon: <Flame size={18} /> },
          { label: t('金库价值'), value: '$1.24M', change: '+$42K this week', up: true, icon: <Wallet size={18} /> },
          { label: t('持有者'), value: '2,412', change: '+86 this week', up: true, icon: <Shield size={18} /> },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="glass-card glass-card-hover p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
              <span className="text-amber/60">{stat.icon}</span>
            </div>
            <p className="text-xl lg:text-2xl font-bold font-mono text-foreground">{stat.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {stat.up ? (
                <ArrowUpRight size={12} className="text-green-400" />
              ) : (
                <ArrowDownRight size={12} className="text-red-400" />
              )}
              <span className={`text-xs font-medium ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Treasury composition bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="glass-card p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">{t('金库资产构成')}</h3>
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1 text-xs text-amber hover:underline">
            {t('在浏览器查看')} <ExternalLink size={10} />
          </a>
        </div>
        <div className="flex rounded-lg overflow-hidden h-4 mb-3">
          {treasuryAssets.map((asset) => (
            <div
              key={asset.name}
              style={{ width: `${asset.pct}%`, backgroundColor: asset.color }}
              className="transition-all duration-500"
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          {treasuryAssets.map((asset) => (
            <div key={asset.name} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: asset.color }} />
              <span className="text-xs text-muted-foreground">{asset.name}</span>
              <span className="text-xs font-mono font-bold text-foreground">{asset.pct}%</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Price chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="glass-card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">$LOBCLAW {t('价格')}</h3>
              <p className="text-xs text-muted-foreground">24h chart</p>
            </div>
            <div className="flex items-center gap-1 text-green-400">
              <ArrowUpRight size={14} />
              <span className="text-sm font-mono font-bold">+12.5%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={priceData}>
              <defs>
                <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" tick={{ fill: '#666', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#666', fontSize: 11 }} axisLine={false} tickLine={false} domain={['dataMin - 0.00002', 'dataMax + 0.00002']} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                formatter={(value: number) => [`$${value.toFixed(5)}`, t('价格')]}
              />
              <Area type="monotone" dataKey="price" stroke="#d97706" strokeWidth={2} fill="url(#priceGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Sales vs Spending dual chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="glass-card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">{t('API 销售 vs 社区支出')}</h3>
              <p className="text-xs text-muted-foreground">Dual curve trend</p>
            </div>
            <BarChart3 size={18} className="text-muted-foreground" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="week" tick={{ fill: '#666', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#666', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
              <Legend wrapperStyle={{ fontSize: '11px', color: '#888' }} />
              <Bar dataKey="sales" name={t('销售')} fill="#d97706" radius={[4, 4, 0, 0]} />
              <Bar dataKey="spending" name={t('支出')} fill="#38bdf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Expenditure disclosure */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="glass-card p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <DollarSign size={16} className="text-amber" />
            {t('链上支出明细')}
          </h3>
          <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-1 text-xs text-amber hover:underline">
            {t('查看全部')} <ExternalLink size={10} />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t('交易哈希')}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t('类型')}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t('金额')}</th>
                <th className="text-left py-2.5 px-3 text-xs text-muted-foreground font-medium">{t('时间')}</th>
                <th className="text-right py-2.5 px-3 text-xs text-muted-foreground font-medium">{t('区块浏览器')}</th>
              </tr>
            </thead>
            <tbody>
              {recentTxs.map((tx, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-xs text-ice">{tx.hash}</td>
                  <td className="py-2.5 px-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      tx.type === 'Burn' ? 'bg-burn/15 text-burn' :
                      tx.type === 'Dividend' ? 'bg-amber/15 text-amber' :
                      'bg-ice/15 text-ice'
                    }`}>
                      {t(tx.type)}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-xs text-foreground">{tx.amount}</td>
                  <td className="py-2.5 px-3 text-xs text-muted-foreground">{tx.time}</td>
                  <td className="py-2.5 px-3 text-right">
                    <a href="#" onClick={(e) => e.preventDefault()} className="text-amber hover:text-amber-dim">
                      <ExternalLink size={13} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Payment Modal */}
      <PaymentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Professional Plan"
        description={t('充值 600,000 Credits')}
        usdcAmount={50}
        lobclawAmount={200000}
        onSuccess={(hash) => {
          console.log('Payment Success:', hash);
          setModalOpen(false);
        }}
      />
    </div>
  );
}
