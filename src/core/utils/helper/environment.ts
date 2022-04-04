const ENV_DEV = 'development';
const ENV_PROD = 'production';

export const getEnvVar = <T>(variable: string): T =>
  process.env[variable] as unknown as T;

export const getEnvironment = (): string => getEnvVar<string>('NODE_ENV');

export const isDevelopment = (): boolean => getEnvironment() === ENV_DEV;
export const isProduction = (): boolean => getEnvironment() === ENV_PROD;

export const getReactEnvVar = <T>(variable: string): T =>
  getEnvVar(`REACT_APP_${variable.toUpperCase()}`);
