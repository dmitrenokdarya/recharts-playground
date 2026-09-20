import { memo, ReactNode } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import clsx from 'clsx';

type Props = {
  content: ReactNode;
  children: ReactNode;
  className?: string;
  delayDuration?: number;
  side?: 'left' | 'top' | 'right' | 'bottom';
  align?: 'start' | 'end' | 'center';
};

const CustomTooltip = ({
  content,
  children,
  className,
  delayDuration = 200,
  align = 'end',
  side = 'top',
}: Props) => (
  <Tooltip.Provider delayDuration={delayDuration}>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <span className="">{children}</span>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side={side}
          align={align}
          className={clsx(
            'border border-stroke bg-default text-body-mono-s text-primary py-2 px-3 max-w-[293px]',
            'shadow-[0px_3.2px_7.2px_0px_#00000021,0px_0.6px_1.8px_0px_#0000001A]',
            className,
          )}
          sideOffset={4}
        >
          {content}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
);

export default memo(CustomTooltip);
