import { User } from '@diakem/api-bindings/src/bindings/react-apollo';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LOGIN } from './auth.graphql';
import { client } from '../../core/apollo-client/client';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../core/redux/types';

export interface AuthState {
  authenticated: boolean;
  user?: User | null;
}

const initialState: AuthState = {
  authenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /* eslint-disable no-param-reassign */
    login: (state, action: PayloadAction<User>) => {
      state.authenticated = true;
      state.user = action.payload;
    },
    logout: state => {
      state = initialState;
    },
    /* eslint-enable */
  },
});

export const base$ = (state: RootState) => state.auth;
export const authenticated$ = (state: RootState) => state.auth.authenticated;
export const user$ = (state: RootState) => state.auth.user;
