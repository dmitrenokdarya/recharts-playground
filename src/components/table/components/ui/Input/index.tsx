import clsx from 'clsx';
import { InputHTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { useInput } from './use-input.hook';
import CurrencySelect, { OptionsProps } from '../CurrencySelect';

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  PropsWithChildren & {
    label?: string | ReactNode;
    info?: string | ReactNode;
    placeholder?: string;
    options?: OptionsProps[];
    optionValue?: OptionsProps;
    optionOnChange?: (value: OptionsProps) => void;
    errorText?: string;
    onlyDecimal?: boolean;
    decimals?: number;
    selectDisabled?: boolean;
    isInfoTop?: boolean;
    leftContent?: ReactNode;
    rightContent?: ReactNode;
    inputClassName?: string;
  };

const cn = (...inputs: unknown[]) => twMerge(clsx(inputs));

const Input = ({
  label,
  info,
  placeholder,
  options,
  optionValue,
  className,
  inputClassName,
  optionOnChange,
  errorText,
  onlyDecimal,
  decimals,
  onChange,
  selectDisabled,
  isInfoTop,
  leftContent,
  rightContent,
  ...props
}: InputProps) => {
  const { handleChange } = useInput({ onChange, onlyDecimal, decimals });

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between items-baseline">
        {label && (
          <div className={clsx(
            'text-body-mono-m-reg uppercase text-primary w-full',
            props.disabled && 'text-secondary opacity-60',
          )}
          >
            {label}
          </div>
        )}
        {isInfoTop && info && <div>{info}</div>}
      </div>
      <div
        className={cn(
          'flex items-center py-[7px] px-2 gap-1 border border-stroke min-w-0',
          'focus-within:border-[var(--text-secondary)] text-body-mono-m',
          errorText && 'border-error',
          props.disabled && 'bg-primary',
          className,
        )}
      >
        {leftContent && (
          <div className="flex items-center shrink-0 select-none">
            {leftContent}
          </div>
        )}
        <input
          placeholder={placeholder}
          {...props}
          className={clsx('flex-1 text-secondary h-full outline-none focus-visible:text-[var(--text-primary)]', inputClassName)}
          onChange={handleChange}
        />
        {rightContent && (
          <div className="flex items-center gap-2 shrink-0 select-none ml-auto">
            {rightContent}
          </div>
        )}
        {options && optionValue && optionOnChange && (
          <CurrencySelect
            options={options}
            optionValue={optionValue}
            optionOnChange={optionOnChange}
            disabled={selectDisabled}
          />
        )}
      </div>
      {errorText ? (
        <p
          className={`text-body-mono-xs ${errorText ? 'text-[var(--error)]' : 'text-secondary'}`}
        >
          {errorText}
        </p>
      ) : (
        info && !isInfoTop && <p className="text-body-mono-xs text-secondary">{info}</p>
      )}
    </div>
  );
};

export default Input;
