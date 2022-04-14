import {
  ApolloClient,
  ApolloLink,
  from,
  HttpLink,
  InMemoryCache,
  ServerError,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { loggedOutAction } from '../../page/Auth/auth.slice';
import { store } from '../redux/store';
import { getTokenFromStorage } from '../utils/helper/authentication';
import { getReactEnvVar, isDevelopment } from '../utils/helper/environment';

const httpLink = new HttpLink({ uri: getReactEnvVar('DIAKEM_BACKEND_API') });

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (networkError) {
    if ((networkError as ServerError).statusCode === 401) {
      store.dispatch(loggedOutAction());
    }
  }

  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: { headers: Record<string, string> }) => ({
    headers: {
      Authorization: `Bearer ${getTokenFromStorage()}`, // however you get your token
      ...headers,
    },
  }));
  return forward(operation);
});

export const client = new ApolloClient({
  name: 'DiaKEM Backend Client',
  connectToDevTools: isDevelopment(),
  link: from([authLink, errorLink, httpLink]),
  cache: new InMemoryCache(),
});
