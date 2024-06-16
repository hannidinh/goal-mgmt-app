import { gql } from '@apollo/client';

const ADD_FRIEND = gql`
    mutation addFriend($name: String!, $email: String!, $phone: String!) {
        addFriend(name: $name, email: $email, phone: $phone) {
            id
            name
            email
            phone
        }
    }
`

const DELETE_FRIEND = gql `
    mutation deleteFriend($id: ID!) {
        deleteFriend(id: $id) {
            id
            name
            email
            phone
        }
    }
`

export { ADD_FRIEND, DELETE_FRIEND }