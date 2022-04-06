import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { authSlice } from '../../page/Auth/auth.slice';
// eslint-disable-next-line import/no-cycle
import { graphQlSlice } from '../apollo-client/graphql.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    graphql: graphQlSlice.reducer,
  },
});
