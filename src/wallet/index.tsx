'use client';

import { Web3Provider } from './providers/Web3Provider';
import { useSendTx } from './hooks/use-send-transaction';
import { useWallet } from './hooks/use-wallet';
import Button from '@/components/table/components/ui/Button';

const WalletDashboard = () => {
  const { shortAddress, isConnected, chainId, balance, switchToSepolia } =
    useWallet();

  const { send, isPending, isSuccess } = useSendTx();

  const handleSend = () => {
    send('0xd8da6bf26964af9d7eed9e03e53415d37aa96045' as const, '0.001');
  };

  return (
    <div className="p-5">
      <appkit-button />

      {isConnected && (
        <div className="mt-5">
          <p>
            <strong>Address:</strong> {shortAddress}
          </p>
          <p>
            <strong>Balance:</strong> {balance}
          </p>
          <p>
            <strong>Chain ID:</strong> {chainId}
          </p>

          <div className='flex w-fit gap-2 mt-4'>
            <Button className="py-2 px-4" onClick={switchToSepolia} variant='secondary'>
              Switch to Sepolia
            </Button>

            <Button
              className="py-2 px-4"
              onClick={handleSend}
              disabled={isPending}
            >
              {isPending ? 'Sending...' : 'Send 0.001 ETH'}
            </Button>
          </div>

          {isSuccess && <p className='mt-3'>Successfully send :)</p>}
        </div>
      )}
    </div>
  );
};

const Wallet = () => {
  return (
    <Web3Provider>
      <WalletDashboard />
    </Web3Provider>
  );
};

export default Wallet;
