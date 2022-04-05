import { UseFormReturn } from 'react-hook-form';

export function useExtendedForm<T>(
  formReturn: UseFormReturn<T>
): UseFormReturn<T> & {
  hasError: (field: keyof T) => boolean;
  getError: (field: keyof T) => string;
  hasErrors: () => boolean;
} {
  return {
    ...formReturn,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    hasError: (field: keyof T) => Boolean(formReturn.formState.errors[field]),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getError: (field: keyof T) => formReturn.formState.errors[field]?.message,
    hasErrors: () => Object.keys(formReturn.formState.errors).length > 0,
  };
}
