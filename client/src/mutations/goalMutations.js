import { gql } from '@apollo/client';

const ADD_GOAL = gql`
    mutation AddGoal($name: String!, $description: String!, $status: GoalStatus!, $friendId: ID!) {
        addGoal(name: $name, description: $description, status: $status, friendId: $friendId) {
            id
            name
            description
            status
            friend {
                id
                name
                email
                phone
            }
        }
    }
`

const UPDATE_GOAL = gql`
    mutation UpdateGoal(
        $id: ID!
        $name: String!
        $description: String!
        $status: GoalStatusUpdate!) {
        updateGoal(
            id: $id
            name: $name
            description: $description
            status: $status
        ) {
            id
            name
            description
            status
            friend {
                id
                name
                email
                phone
            }
        }
    }
`

const DELETE_GOAL = gql`
    mutation DeleteGoal($id: ID!) {
        deleteGoal(id: $id) {
            id
            name
        }
    }
`

export { ADD_GOAL, DELETE_GOAL, UPDATE_GOAL };