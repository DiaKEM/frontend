import { useLazyQuery } from '@apollo/client';
import { AuthToken } from '@diakem/api-bindings/src/bindings/typescript';
import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ME } from './authCheck.graphql';
import { useAppDispatch } from '../../core/redux/hook';
import { getTokenFromStorage } from '../../core/utils/helper/authentication';
import { authenticated$, loginAction } from '../Auth/auth.slice';

const ALLOWED_URIS = ['/login', '/register'];
export const AuthCheck = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const authed = useSelector(authenticated$);
  const [getMe] = useLazyQuery<{ me: AuthToken }>(ME);

  useEffect(() => {
    (async function () {
      if (authed && location.pathname === '/login') {
        navigate('/');
        return;
      }

      if (authed) return;

      if (getTokenFromStorage() && !authed) {
        const { data, error } = await getMe();

        if (!error && data?.me) {
          dispatch(loginAction(data.me));
          return;
        }
      }

      if (
        (!getTokenFromStorage() || !authed) &&
        !ALLOWED_URIS.includes(location.pathname)
      ) {
        navigate('/login');
      }
    })();
  }, [location.pathname, authed, getTokenFromStorage()]);
  return <>{children}</>;
};
