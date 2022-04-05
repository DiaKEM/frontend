import { ApolloProvider } from '@apollo/client';
import React, { StrictMode } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { client } from './core/apollo-client/client';
import { store } from './core/redux/store';
import { reportWebVitals } from './reportWebVitals';
import 'simplebar/src/simplebar.css';
import './core/i18n/i18n';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <HelmetProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </HelmetProvider>
      </ApolloProvider>
    </Provider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
