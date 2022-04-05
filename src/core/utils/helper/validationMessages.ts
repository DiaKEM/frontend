import { i18n } from '../../i18n/i18n';

export const requiredMessage = (field: string) =>
  i18n.t('general.validation.required', { field });
