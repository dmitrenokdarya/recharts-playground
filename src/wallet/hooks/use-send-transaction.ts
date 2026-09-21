import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, type Address } from 'viem';

export const useSendTx = () => {
  const {
    data: hash,
    sendTransaction,
    isPending,
    error,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const send = (to: Address, amountEth: string) => {
    sendTransaction({
      to,
      value: parseEther(amountEth),
    });
  };

  return {
    send,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
};