import Button from '@/components/table/components/ui/Button';
import { memo } from 'react';

type Props = {
  status: string;
  isConnected: boolean;
  onToggleConnect: () => void;
};

const WikiChangesControlPanel = ({ status, isConnected, onToggleConnect }: Props) => {
  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'bg-green-500';
      case 'connecting':
        return 'bg-yellow-500';
      default:
        return 'bg-red-500';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-default border border-stroke mb-4">
      <div className="flex items-center gap-3">
        <span className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
        <h2 className="text-body-mono-m uppercase font-bold text-primary">
          Wikipedia Live Edits
        </h2>
        <span className="text-body-mono-xs text-secondary tracking-wide uppercase">
          (Status: {status})
        </span>
      </div>

      <Button
        variant={isConnected ? 'secondary' : 'primary'}
        size="m"
        onClick={onToggleConnect}
      >
        {isConnected ? 'Disconnect' : 'Connect'}
      </Button>
    </div>
  );
};

export default memo(WikiChangesControlPanel);