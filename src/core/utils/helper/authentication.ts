const TOKEN_KEY = 'jwt-token';
export const getTokenFromStorage = () => localStorage.getItem(TOKEN_KEY);
export const setTokenInStorage = (jwt: string) =>
  localStorage.setItem(TOKEN_KEY, jwt);
export const removeTokenFromStorage = () => localStorage.removeItem(TOKEN_KEY);
