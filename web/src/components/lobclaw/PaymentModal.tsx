/**
 * PaymentModal - Dual-rail payment confirmation dialog (EVM/BSC Version)
 * Supports USDC (standard) and $LOBCLAW (20% discount)
 * Handles transaction building, signing, and confirmation via wagmi
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Zap,
  DollarSign,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ExternalLink,
  Copy,
  LayoutDashboard,
} from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useBalance,
} from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { parseUnits } from 'viem';
import { Link } from 'react-router-dom';
import {
  LOBCLAW_BSC_ADDRESS,
  USDC_BSC_ADDRESS,
  TREASURY_BSC_ADDRESS,
  ERC20_ABI,
} from '@/lib/lobclaw/web3-config';

export type PaymentCurrency = 'USDC' | 'LOBCLAW';

export interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  usdcAmount: number;
  lobclawAmount: number;
  onSuccess?: (hash: string, currency: PaymentCurrency) => void;
}

type TxStatus = 'idle' | 'awaiting_signature' | 'confirming' | 'success' | 'error';

export default function PaymentModal({
  open,
  onClose,
  title,
  description,
  usdcAmount,
  lobclawAmount,
  onSuccess,
}: PaymentModalProps) {
  const { t } = useTranslation();
  const { address, isConnected } = useAccount();
  const { open: openConnectModal } = useWeb3Modal();
  const [currency, setCurrency] = useState<PaymentCurrency>('USDC');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [redeemCode, setRedeemCode] = useState<string>('');

  const targetTokenAddress =
    currency === 'USDC' ? USDC_BSC_ADDRESS : LOBCLAW_BSC_ADDRESS;
  const targetAmount = currency === 'USDC' ? usdcAmount : lobclawAmount;

  // Fetch balances
  const { data: usdcBalance } = useBalance({
    address,
    token: USDC_BSC_ADDRESS as `0x${string}`,
  });
  const { data: lobclawBalance } = useBalance({
    address,
    token: LOBCLAW_BSC_ADDRESS as `0x${string}`,
  });

  const {
    data: hash,
    error: writeError,
    isPending: isAwaitingSignature,
    writeContract,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess && hash) {
      // TODO: Replace with real backend API call
      const mockCode = `LOB-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setRedeemCode(mockCode);
      toast.success(t('支付成功！您的兑换码已生成。'));
      onSuccess?.(hash, currency);
    }
  }, [isSuccess, hash, currency, onSuccess, t]);

  useEffect(() => {
    if (writeError) {
      setErrorMsg(writeError.message || t('支付失败，请重试。'));
    }
  }, [writeError, t]);

  const handlePay = async () => {
    if (!isConnected) {
      openConnectModal();
      return;
    }

    setErrorMsg('');

    try {
      const decimals = 18; // Default for many BSC tokens, adjust if needed
      const amountBI = parseUnits(targetAmount.toString(), decimals);

      writeContract({
        address: targetTokenAddress as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [TREASURY_BSC_ADDRESS as `0x${string}`, amountBI],
      });
    } catch (err: any) {
      setErrorMsg(err?.message || t('支付失败，请重试。'));
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(redeemCode);
    toast.success(t('兑换码已复制到剪切板'));
  };

  const getStatus = (): TxStatus => {
    if (isSuccess) return 'success';
    if (isConfirming) return 'confirming';
    if (isAwaitingSignature) return 'awaiting_signature';
    if (writeError) return 'error';
    return 'idle';
  };

  const txStatus = getStatus();

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={
              txStatus === 'idle' || txStatus === 'error' ? onClose : undefined
            }
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2 }}
            className="relative glass-card border border-border/60 w-full max-w-md shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border/50">
              <div>
                <h3 className="text-base font-bold text-foreground">
                  {t(title)}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t(description)}
                </p>
              </div>
              {(txStatus === 'idle' || txStatus === 'error') && (
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="p-5 space-y-4">
              {txStatus === 'success' ? (
                <div className="text-center py-4 space-y-4">
                  <CheckCircle2 size={48} className="text-green-400 mx-auto" />
                  <p className="text-base font-bold text-foreground">
                    {t('支付成功！')}
                  </p>
                  
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 border-dashed">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
                      {t('您的充值兑换码')}
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <code className="text-xl font-mono font-bold text-amber tracking-wider">
                        {redeemCode || '--------'}
                      </code>
                      <button 
                        onClick={handleCopyCode}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                      >
                        <Copy size={14} className="text-amber" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-[oklch(0.70_0.06_290)] leading-relaxed">
                    {t('请复制上方兑换码，进入控制台进行额度兑换。')}
                  </p>

                  <div className="flex flex-col gap-2 pt-2">
                    <Link
                      to="/console/topup"
                      onClick={onClose}
                      className="w-full py-3 rounded-xl bg-amber text-black font-bold text-sm hover:bg-amber-dim transition-all flex items-center justify-center gap-2"
                    >
                      <LayoutDashboard size={16} />
                      {t('前往控制台兑换')}
                    </Link>
                    
                    {hash && (
                      <a
                        href={`https://bscscan.com/tx/${hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground hover:underline"
                      >
                        {t('在 BscScan 上查看')} <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              ) : txStatus === 'awaiting_signature' ||
                txStatus === 'confirming' ? (
                <div className="text-center py-6 space-y-3">
                  <Loader2
                    size={40}
                    className="text-amber animate-spin mx-auto"
                  />
                  <p className="text-sm font-medium text-foreground">
                    {txStatus === 'awaiting_signature' &&
                      t('正在等待钱包签名...')}
                    {txStatus === 'confirming' && t('正在链上确认...')}
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 font-medium">
                      {t('选择支付方式')}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setCurrency('USDC')}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          currency === 'USDC'
                            ? 'border-green-400/50 bg-green-400/10'
                            : 'border-border/50 hover:border-border'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign size={14} className="text-green-400" />
                          <span className="text-xs font-bold text-foreground">
                            USDC
                          </span>
                        </div>
                        <p className="text-base font-mono font-bold text-green-400">
                          ${usdcAmount.toFixed(2)}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {t('余额')}: $
                          {usdcBalance
                            ? parseFloat(usdcBalance.formatted).toFixed(2)
                            : '0.00'}
                        </p>
                      </button>

                      <button
                        onClick={() => setCurrency('LOBCLAW')}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          currency === 'LOBCLAW'
                            ? 'border-amber/50 bg-amber/10'
                            : 'border-border/50 hover:border-border'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Zap size={14} className="text-amber" />
                          <span className="text-xs font-bold text-foreground">
                            $LOBCLAW
                          </span>
                          <span className="text-[10px] font-bold text-amber ml-auto">
                            -20%
                          </span>
                        </div>
                        <p className="text-base font-mono font-bold text-amber">
                          {lobclawAmount.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {t('余额')}:{' '}
                          {lobclawBalance
                            ? parseFloat(lobclawBalance.formatted).toFixed(0)
                            : '0'}
                        </p>
                      </button>
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <AlertCircle
                        size={14}
                        className="text-red-500 mt-0.5 shrink-0"
                      />
                      <p className="text-xs text-red-500">{errorMsg}</p>
                    </div>
                  )}

                  {!isConnected && (
                    <div className="p-3 rounded-lg bg-muted/30 border border-border/50 text-xs text-muted-foreground text-center">
                      {t('请先连接钱包以进行支付')}
                    </div>
                  )}

                  <button
                    onClick={handlePay}
                    className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                      !isConnected
                        ? 'bg-amber text-black hover:bg-amber-dim'
                        : currency === 'USDC'
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-amber text-black hover:bg-amber-dim'
                    }`}
                  >
                    {!isConnected
                      ? t('连接钱包并支付')
                      : `${t('立即支付')} ${currency === 'USDC' ? `$${usdcAmount.toFixed(2)} USDC` : `${lobclawAmount.toLocaleString()} $LOBCLAW`}`}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
