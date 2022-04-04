import { BaseSyntheticEvent, ChangeEvent, useState } from 'react';

type InputChangeReturn<T> = {
  initial: T | null;
  setValue: (value: T) => void;
  getValue: () => T | null;
  reset: () => void;
  module: {
    value: T | null;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  };
};

export function useInputChange<T>(defaultValue: T): InputChangeReturn<T> {
  const [initial] = useState(defaultValue);
  const [value, setValue] = useState<T | null>(defaultValue);

  return {
    initial,
    setValue,
    getValue: () => value,
    reset: () => setValue(() => null),
    module: {
      value,
      onChange: (e: BaseSyntheticEvent) => setValue(e.target.value),
    },
  };
}
