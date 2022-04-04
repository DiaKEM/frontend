import { gql, useQuery } from '@apollo/client';
import { Button } from '@mui/material';
import React from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './core/redux/hook';
import {
  getEnvironment,
  getReactEnvVar,
} from './core/utils/helper/environment';
import { authSlice, base$ } from './page/Auth/auth.slice';
import { LoginPage } from './page/Auth/LoginPage';

const GET_USER_BY_ID = gql`
  query GetUser($id: MongoID!) {
    userById(_id: $id) {
      name
      username
    }
  }
`;

const Test = () => {
  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: '620be585970c2ca0a3be1a2e' },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( {JSON.stringify(error)}</p>;

  return <pre>{JSON.stringify(data)}</pre>;
};
const useAuthentication = () => useAppSelector(base$);
export const App = () => {
  // const isAuthenticated = useAppSelector(state => state.auth.authenticated);
  const { authenticated: isAuthenticated } = useAuthentication();
  const isInstalled = getReactEnvVar('DIAKEM_BACKEND_API');
  const dispatch = useAppDispatch();
  if (!isInstalled) {
    return <div>NOT INSTALLED</div>;
  }

  return (
    <div>
      <h1>Environment Mode: {getEnvironment()}</h1>
      <h1>API-URL: {isInstalled}</h1>
      {!isAuthenticated && <LoginPage />}
      <Test />
      {/* <Button */}
      {/*  onClick={() => */}
      {/*    dispatch( */}
      {/*      authSlice.actions.login({ */}
      {/*        name: 'asd', */}
      {/*        email: 'asd', */}
      {/*        password: 'asd', */}
      {/*        _id: 'asdasd', */}
      {/*        lastLogin: 'asd', */}
      {/*        username: 'asd', */}
      {/*      }) */}
      {/*    ) */}
      {/*  } */}
      {/* > */}
      {/*  Login */}
      {/* </Button> */}
    </div>
  );
};
