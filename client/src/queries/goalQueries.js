import { gql } from '@apollo/client';

const GET_GOALS = gql`
    query getGoals {
        goals {
            id
            name
            status
        }
    }
`

const GET_GOAL = gql `
    query getGoal($id: ID!) {
        goal(id: $id) {
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

export { GET_GOALS, GET_GOAL }