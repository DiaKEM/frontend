import { useMutation } from '@apollo/client';
import { FetchResult } from '@apollo/client/link/core';
import { DocumentNode } from 'graphql';
import { useState } from 'react';

type AsyncMutationStatusType<V, R> = {
  executionTime: number;
  loading: boolean;
  data: FetchResult<R> | null;
  error: any | null;
};

type AsyncMutationType<V, R> = [
  executor: (input: V) => void,
  status: AsyncMutationStatusType<V, R>
];

export function useAsyncMutation<VARIABLES, RETURNTYPE = any | null>(
  mutation: DocumentNode
): AsyncMutationType<VARIABLES, RETURNTYPE> {
  // @todo convert to useReducer
  const [status, setStatus] = useState<
    AsyncMutationStatusType<VARIABLES, RETURNTYPE>
  >({
    executionTime: 0,
    loading: false,
    data: null,
    error: null,
  });

  const [mutationExecutor] = useMutation<RETURNTYPE, VARIABLES>(mutation);
  const exec = async (opts: VARIABLES) => {
    setStatus(prev => ({
      ...prev,
      executionTime: prev.executionTime + 1,
      loading: true,
      error: null,
    }));
    try {
      const data = await mutationExecutor({
        variables: opts,
      });

      setStatus(prev => ({
        ...prev,
        loading: false,
        data,
        error: null,
      }));
    } catch (e: any) {
      setStatus(prev => ({
        ...prev,
        loading: false,
        data: null,
        error: e,
      }));
    }
  };

  return [exec, status];
}
