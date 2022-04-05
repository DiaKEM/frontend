import { useTranslation } from 'react-i18next';

export const useScopedTranslation = (keyPrefix: string) =>
  useTranslation(undefined, {
    keyPrefix,
  });
