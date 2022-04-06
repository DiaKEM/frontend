/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../redux/types';

interface GraphQlState {
  loading?: boolean;
  error?: any;
  data?: any;
}

// Define the initial state using that type
const initialState: GraphQlState = {
  loading: false,
  error: null,
  data: null,
};

export const graphQlSlice = createSlice({
  name: 'graphQl',
  initialState,
  reducers: {
    loading: state => {
      state = { ...state, loading: true, error: false, data: null };
    },
    error: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
    data: (state, action: PayloadAction<any>) => {
      state = { ...state, loading: false, error: false, data: action.payload };
    },
  },
});

export const { loading, error, data } = graphQlSlice.actions;

export const base$ = (state: RootState) => state.graphql;
export const error$ = (state: RootState) => base$(state).error;
export const loading$ = (state: RootState) => base$(state).loading;
export const data$ = (state: RootState) => base$(state).data;
