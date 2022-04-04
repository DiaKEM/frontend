import { ApolloClient, InMemoryCache } from '@apollo/client';
import { getReactEnvVar, isDevelopment } from '../utils/helper/environment';

// export const createClient = (uri: string) =>
//   new ApolloClient({
//     name: 'DiaKEM Backend Client',
//     connectToDevTools: isDevelopment(),
//     uri,
//     cache: new InMemoryCache(),
//   });

export const client = new ApolloClient({
  name: 'DiaKEM Backend Client',
  connectToDevTools: isDevelopment(),
  uri: getReactEnvVar('DIAKEM_BACKEND_API'),
  cache: new InMemoryCache(),
});
