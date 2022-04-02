import { gql, useQuery } from '@apollo/client';
import React from 'react';
import './App.css';
import { getEnvironment, getReactEnvVar } from './core/utils/environment';

const GET_ALL_USER = gql`
  query GetUser {
    userMany {
      name
    }
  }
`;
const Test = () => {
  const { loading, error, data } = useQuery(GET_ALL_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <pre>{JSON.stringify(data)}</pre>;
};

export const App = () => {
  const isInstalled = getReactEnvVar('DIAKEM_BACKEND_API');

  if (!isInstalled) {
    return <div>NOT INSTALLED</div>;
  }

  return (
    <div>
      <h1>Environment Mode: {getEnvironment()}</h1>
      <h1>API-URL: {isInstalled}</h1>
    </div>
  );
};
