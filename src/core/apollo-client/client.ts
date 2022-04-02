import { ApolloClient, InMemoryCache } from '@apollo/client';
import { isDevelopment } from '../utils/environment';

export const createClient = (uri: string) =>
  new ApolloClient({
    name: 'DiaKEM Backend Client',
    connectToDevTools: isDevelopment(),
    uri,
    cache: new InMemoryCache(),
  });
