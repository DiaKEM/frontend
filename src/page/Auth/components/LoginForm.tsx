import { MutationLoginArgs } from '@diakem/api-bindings/src/bindings/react-apollo';
import { AuthToken } from '@diakem/api-bindings/src/bindings/typescript';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, LoadingButton } from '@mui/lab';
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Fade,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Iconify } from '../../../components/Iconify';
import { useAsyncMutation } from '../../../core/apollo-client/hooks/useAsyncMutation';
import { useAppDispatch, useAppSelector } from '../../../core/redux/hook';
import { requiredMessage } from '../../../core/utils/helper/validationMessages';
import { useExtendedForm } from '../../../core/utils/hook/useExtendedForm';
import { useScopedTranslation } from '../../../core/utils/hook/useScopedTranslation';
import { useToggle } from '../../../core/utils/hook/useToggle';
import { LOGIN } from '../auth.graphql';
import { loggedOut$, loginAction } from '../auth.slice';

type FormData = {
  username: string;
  password: string;
  remember: boolean;
};

const delay = (ms: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

export const LoginForm = () => {
  const loggedOut = useAppSelector(loggedOut$);
  const dispatch = useAppDispatch();
  const { t } = useScopedTranslation('page.login.form');
  const [exec, { loading, error, data, reset }] = useAsyncMutation<
    MutationLoginArgs,
    { login: AuthToken }
  >(LOGIN);
  const navigate = useNavigate();
  const [showPassword, togglePassword] = useToggle(false);
  const { register, hasError, getError, hasErrors, handleSubmit } =
    useExtendedForm<FormData>(
      useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
          username: '',
          password: '',
          remember: true,
        },
        resolver: yupResolver(
          yup
            .object({
              username: yup.string().required(requiredMessage(t('username'))),
              password: yup.string().required(requiredMessage(t('password'))),
              remember: yup.boolean(),
            })
            .required()
        ),
      })
    );

  const handleLogin = async (loginData: FormData) => {
    const response = await exec(loginData);
    if (!response?.data) {
      return;
    }

    dispatch(loginAction(response?.data.login));
    navigate('/');
  };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit(handleLogin)}>
      <Stack spacing={3}>
        <TextField
          fullWidth
          autoComplete="username"
          label={t('username')}
          {...register('username')}
          error={hasError('username')}
          helperText={getError('username')}
        />

        <TextField
          fullWidth
          autoComplete="current-password"
          type={showPassword ? 'text' : 'password'}
          label={t('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePassword} edge="end">
                  <Iconify
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register('password')}
          error={hasError('password')}
          helperText={getError('password')}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <FormControlLabel
          control={<Checkbox {...register('remember')} />}
          label={t('remember-me')}
        />

        <Link
          component={RouterLink}
          variant="subtitle2"
          to="#"
          underline="hover"
        >
          {t('forgot-password')}
        </Link>
      </Stack>

      {loggedOut && (
        <>
          <Fade in={loggedOut} timeout={1000}>
            <Alert severity="warning">{t('logged-out')}</Alert>
          </Fade>
          <br />
        </>
      )}

      {error && (
        <>
          <Fade in={error} timeout={1000}>
            <Alert severity="error">{t('error')}</Alert>
          </Fade>
          <br />
        </>
      )}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={loading}
        disabled={hasErrors()}
      >
        {t('login')}
      </LoadingButton>
    </form>
  );
};
