'use client';

import { useAccount, useBalance, useChainId, useSwitchChain } from 'wagmi';
import { formatUnits } from 'viem';
import { sepolia } from 'wagmi/chains';

export const useWallet = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const { data: balanceData } = useBalance({
    address: address,
    query: { enabled: !!address },
  });

  const formattedBalance = balanceData
    ? `${Number(formatUnits(balanceData.value, balanceData.decimals)).toFixed(4)} ${balanceData.symbol}`
    : '0';

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  const switchToSepolia = () => {
    if (chainId !== sepolia.id) {
      switchChain({ chainId: sepolia.id });
    }
  };

  return {
    address,
    shortAddress,
    isConnected,
    chainId,
    balance: formattedBalance,
    switchToSepolia,
  };
};