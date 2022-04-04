const TOKEN_KEY = 'jwt-token';
export const getTokenFromStorage = () => localStorage.getItem(TOKEN_KEY);
