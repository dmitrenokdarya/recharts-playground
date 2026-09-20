import {
  memo, ReactNode, MouseEvent, Dispatch, SetStateAction,
} from 'react';
import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';

type Props = {
  content: ReactNode;
  children: ReactNode;
  sideOffset?: number;
  side?: 'left' | 'top' | 'right' | 'bottom';
  align?: 'start' | 'end' | 'center';
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>> | ((open: boolean) => void);
  contentClassName?: string;
};

const CustomPopover = ({
  content,
  children,
  sideOffset = 4,
  align = 'center',
  side = 'bottom',
  disabled,
  open,
  onOpenChange,
  contentClassName,
}: Props) => (
  <Popover.Root open={open} onOpenChange={onOpenChange}>
    <Popover.Trigger disabled={disabled} asChild onClick={(e: MouseEvent) => e.stopPropagation()}>
      <div className={`${disabled ? 'pointer-events-none opacity-75' : 'cursor-pointer'}`}>{children}</div>
    </Popover.Trigger>

    <Popover.Portal>
      <Popover.Content
        sideOffset={sideOffset}
        onOpenAutoFocus={(e) => e.preventDefault()}
        side={side}
        align={align}
        className={clsx('z-100', contentClassName)}
      >
        {content}
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default memo(CustomPopover);
