import { ApolloProvider } from '@apollo/client';
import React, { StrictMode } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import { createClient } from './core/apollo-client/client';
import { store } from './core/redux/store';
import { getReactEnvVar } from './core/utils/environment';
import { reportWebVitals } from './reportWebVitals';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ApolloProvider
        client={createClient(getReactEnvVar('DIAKEM_BACKEND_API'))}
      >
        <App />
      </ApolloProvider>
    </Provider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
