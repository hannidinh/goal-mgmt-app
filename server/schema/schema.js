//Mongoose models
const Goal = require('../models/Goal');
const Friend = require('../models/Friend');

const { 
    GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList
} = require('graphql');

//Goal Type
const GoalType = new GraphQLObjectType({
    name: 'Goal',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        description: { type: GraphQLString},
        status: { type: GraphQLString},
        friend: {
            type: FriendType,
            resolve(parent, args) {
                return friends.findById(parent.friendId);
            } 
        }
    })
})

//Friend Type
const FriendType = new GraphQLObjectType({
    name: 'Friend',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        email: { type: GraphQLString},
        phone: { type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        goals: {
            type: new GraphQLList(GoalType),
            resolve(parent, args) {
                return Goal.find();
            }
        },
        goal: {
            type: GoalType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return Goal.findById(args.id);
            }
        },
        friends: {
            type: new GraphQLList(FriendType),
            resolve(parent, args) {
                return Friend.find();
            }
        },
        friend: {
            type: FriendType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return Friend.findById(args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
})