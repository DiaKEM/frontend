import {
  MutationLoginArgs,
  User,
} from '@diakem/api-bindings/src/bindings/react-apollo';
import { AuthToken } from '@diakem/api-bindings/src/bindings/typescript';
import { Button, TextField } from '@mui/material';
import React from 'react';
import { LOGIN } from './auth.graphql';
import { useAsyncMutation } from '../../core/apollo-client/hooks/useAsyncMutation';
import { useInputChange } from '../../core/utils/hook/useInputChange';

export const LoginPage = () => {
  const userName = useInputChange('testuser1');
  const password = useInputChange('testuser1');
  const [exec, { loading, error, data, executionTime }] = useAsyncMutation<
    MutationLoginArgs,
    { login: AuthToken }
  >(LOGIN);

  return (
    <>
      <pre>ERROR:{JSON.stringify(error)}</pre>
      <pre>LOADING:{JSON.stringify(loading)}</pre>
      <pre>DATA:{JSON.stringify(data?.data?.login.token)}</pre>
      <pre>exectime:{JSON.stringify(executionTime)}</pre>
      <TextField
        {...userName.module}
        placeholder="Username"
        variant="outlined"
        label="Username"
      />
      <TextField
        type="password"
        {...password.module}
        placeholder="Password"
        variant="outlined"
        label="Password"
      />
      <Button
        onClick={async () =>
          exec({
            username: userName.getValue() || '',
            password: password.getValue() || '',
          })
        }
        variant="contained"
      >
        Login
      </Button>
    </>
  );
};
