import { gql } from '@apollo/client';

const GET_FRIENDS = gql` 
    query getFriends {
        friends {
            id
            name
            email
            phone
        }
    }
`;

export { GET_FRIENDS }