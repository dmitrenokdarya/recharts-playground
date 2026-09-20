import { ChangeEvent, ChangeEventHandler, useCallback } from 'react';

type Props = {
  onlyDecimal?: boolean,
  decimals?: number,
  onChange: ChangeEventHandler<HTMLInputElement> | undefined
}

export const useInput = ({ onChange, onlyDecimal, decimals = 0 }: Props) => {
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onlyDecimal) {
      const regex = decimals === 0
        ? /^\d*$/
        : new RegExp(`^\\d+(\\.\\d{0,${decimals}})?$`);
      if (newValue === '' || regex.test(newValue)) {
        onChange?.(e);
      }
    } else {
      onChange?.(e);
    }
  }, [decimals, onChange, onlyDecimal]);

  return {
    handleChange,
  };
};
