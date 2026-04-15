import { http, createConfig } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

// 1. Get projectId at https://cloud.walletconnect.com
export const projectId = '88888888888888888888888888888888'; // 请替换为你的真实 ID

// 2. Create wagmiConfig
const metadata = {
  name: 'LobClaw',
  description: 'The First MEME Coin for AI Power',
  url: window.location.origin,
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const chains = [bsc, bscTestnet] as const;
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
});

// 合约配置
export const LOBCLAW_BSC_ADDRESS = '0x0000000000000000000000000000000000000000'; // LobClaw Token BSC Address
export const USDC_BSC_ADDRESS = '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'; // USDC BSC Address
export const TREASURY_BSC_ADDRESS = '0x0000000000000000000000000000000000000000'; // 收款钱包地址

export const ERC20_ABI = [
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function',
  },
] as const;
