import { gql } from '@apollo/client';

export const ME = gql`
  query Me {
    me {
      _id
      name
      password
      roles
      username
      email
    }
  }
`;
