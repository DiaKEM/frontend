import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { error$ } from '../../core/apollo-client/graphql.slice';
import { getTokenFromStorage } from '../../core/utils/helper/authentication';
import { authenticated$ } from '../Auth/auth.slice';

export const AuthCheck = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const authed = useSelector(authenticated$);

  useEffect(() => {
    if ((!getTokenFromStorage() && location.pathname !== '/login') || !authed) {
      navigate('/login');
    }
  }, [location.pathname, authed, getTokenFromStorage()]);

  return <>children</>;
};
