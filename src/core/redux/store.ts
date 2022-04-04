import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { authSlice } from '../../page/Auth/auth.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
