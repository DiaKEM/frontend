import { styled } from '@mui/material/styles';
import React, { ReactNode } from 'react';
import { TechnicalProblem } from './TechnicalProblem';
import Logo from '../../components/Logo';
import { error$ } from '../../core/apollo-client/graphql.slice';
import { useAppSelector } from '../../core/redux/hook';

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

const BACKEND_NOT_AVAILABLE = 'Failed to fetch';
export const HealthCheck = ({ children }: { children: ReactNode }) => {
  const error = useAppSelector(error$);

  if (error?.message === BACKEND_NOT_AVAILABLE) {
    return (
      <>
        <HeaderStyle>
          <Logo />
        </HeaderStyle>
        <TechnicalProblem />
      </>
    );
  }

  return <>children</>;
};
