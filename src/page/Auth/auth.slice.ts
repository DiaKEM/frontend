import { AuthToken } from '@diakem/api-bindings/src/bindings/typescript';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../core/redux/types';
import {
  removeTokenFromStorage,
  setTokenInStorage,
} from '../../core/utils/helper/authentication';

export interface AuthState {
  authenticated: boolean;
  loggedOut: boolean;
  user?: AuthToken | null;
}

const initialState: AuthState = {
  authenticated: false,
  user: null,
  loggedOut: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /* eslint-disable no-param-reassign */
    login: (state, action: PayloadAction<AuthToken>) => {
      state.authenticated = true;
      state.loggedOut = false;
      state.user = action.payload;

      if (action.payload.token) {
        setTokenInStorage(action.payload.token);
      }
    },
    logout: state => {
      state.authenticated = false;
      state.user = null;
      removeTokenFromStorage();
    },
    loggedOut: state => {
      state.authenticated = false;
      state.user = null;
      state.loggedOut = true;
      removeTokenFromStorage();
    },
    /* eslint-enable */
  },
});

export const {
  login: loginAction,
  logout: logoutAction,
  loggedOut: loggedOutAction,
} = authSlice.actions;
export const base$ = (state: RootState) => state.auth;
export const authenticated$ = (state: RootState) => state.auth.authenticated;
export const user$ = (state: RootState) => state.auth.user;
export const loggedOut$ = (state: RootState) => state.auth.loggedOut;
