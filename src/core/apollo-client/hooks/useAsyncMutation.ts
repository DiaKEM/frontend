import { useMutation } from '@apollo/client';
import { FetchResult } from '@apollo/client/link/core';
import { DocumentNode } from 'graphql';
import { useState } from 'react';
import { useAppDispatch } from '../../redux/hook';
import {
  loading,
  data as dataAction,
  error as errorAction,
} from '../graphql.slice';

type AsyncMutationStatusType<V, R> = {
  executionTime: number;
  loading: boolean;
  data: FetchResult<R | null> | null;
  error: any | null;
};

type AsyncMutationType<V, R> = [
  executor: (input: V) => Promise<FetchResult<R> | null>,
  status: AsyncMutationStatusType<V, R> & {
    reset: () => void;
  }
];

export function useAsyncMutation<VARIABLES, RETURNTYPE = any | null>(
  mutation: DocumentNode
): AsyncMutationType<VARIABLES, RETURNTYPE> {
  // @todo convert to useReducer
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<
    AsyncMutationStatusType<VARIABLES, RETURNTYPE>
  >({
    executionTime: 0,
    loading: false,
    data: null,
    error: null,
  });

  const [mutationExecutor] = useMutation<RETURNTYPE, VARIABLES>(mutation);
  const exec = async (
    opts: VARIABLES
  ): Promise<FetchResult<RETURNTYPE> | null> => {
    setStatus(prev => ({
      ...prev,
      executionTime: prev.executionTime + 1,
      loading: true,
      error: null,
    }));
    try {
      dispatch(loading());
      const data = await mutationExecutor({
        variables: opts,
      });

      setStatus(prev => ({
        ...prev,
        loading: false,
        data,
        error: null,
      }));
      dispatch(dataAction(data));
      return data;
    } catch (e: any) {
      dispatch(errorAction(JSON.parse(JSON.stringify(e))));
      setStatus(prev => ({
        ...prev,
        loading: false,
        data: null,
        error: e,
      }));

      return null;
    }
  };

  return [
    exec,
    {
      ...status,
      reset: () =>
        setStatus({
          executionTime: 0,
          loading: false,
          data: null,
          error: null,
        }),
    },
  ];
}
