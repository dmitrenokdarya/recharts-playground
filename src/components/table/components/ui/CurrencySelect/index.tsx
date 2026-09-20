import {
  PropsWithChildren,
  ReactElement,
  SelectHTMLAttributes,
  useMemo,
} from 'react';
import { ChevronDown } from 'lucide-react';
import Popover from '../CustomPopover';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> &
  PropsWithChildren & {
    options: OptionsProps[];
    optionValue: OptionsProps;
    optionOnChange: (value: OptionsProps) => void;
    className?: string;
  };

export type OptionsProps = {
  icon?: ReactElement;
  currency: string;
};

const CurrencySelect = ({
  options,
  optionValue,
  optionOnChange,
  className,
  ...props
}: SelectProps) => {
  const selected = optionValue || options?.[0];

  const content = useMemo(
    () => (
      <div className="bg-primary rounded-lg shadow-lg">
        {options.map((opt) => (
          <button
            key={opt.currency}
            onClick={() => {
              optionOnChange?.(opt);
            }}
            className="flex items-center gap-2 w-full px-3 py-2 cursor-pointer"
          >
            {opt.icon}
            <span className="text-body-mono-m text-secondary">
              {opt.currency}
            </span>
          </button>
        ))}
      </div>
    ),
    [optionOnChange, options],
  );

  return (
    <Popover
      content={content}
      side="bottom"
      align="end"
      disabled={props.disabled}
    >
      <button className={`flex items-center gap-1 px-1.5 py-1 ${className}`}>
        {selected.icon}
        <span className="text-body-mono-m text-secondary">
          {selected.currency}
        </span>
        <ChevronDown size={12} color="var(--text-secondary)" />
      </button>
    </Popover>
  );
};

export default CurrencySelect;
