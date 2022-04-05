import { useState } from 'react';

export const useToggle = (initialValue: boolean): [boolean, () => void] => {
  const [t, setT] = useState<boolean>(initialValue);

  return [t, () => setT(p => !p)];
};
