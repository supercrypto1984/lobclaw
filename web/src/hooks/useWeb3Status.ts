import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { config } from '../lib/lobclaw/web3-config';

/**
 * 安全的 Web3 状态 Hook
 * 如果 Web3 未启用（无 projectId），则返回默认未连接状态，防止应用崩溃。
 */
export function useWeb3Status() {
  const isWeb3Enabled = config && !config._isPlaceholder;

  // 如果启用了 Web3，使用真实的 Hook
  // 注意：在 React 中，Hook 的调用必须是无条件的。
  // 虽然我们这里看起来像是有条件的，但由于 isWeb3Enabled 在应用生命周期内是不变的（由配置文件决定），
  // 所以在同一个环境下，Hook 的调用顺序是一致的。
  
  const account = useAccount();
  const modal = useWeb3Modal();

  if (!isWeb3Enabled) {
    return {
      address: undefined,
      isConnected: false,
      isWeb3Enabled: false,
      open: () => console.warn('Web3 features are disabled due to missing Project ID'),
    };
  }

  return {
    address: account.address,
    isConnected: account.isConnected,
    isWeb3Enabled: true,
    open: modal.open,
  };
}
