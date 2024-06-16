//Mongoose models
const Goal = require('../models/Goal');
const Friend = require('../models/Friend');

const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLList, 
    GraphQLNonNull,
    GraphQLEnumType,
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
                return Friend.findById(parent.friendId);
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
        phone: { type: GraphQLString},
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

//Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //add friend
        addFriend: {
            type: FriendType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const friend = new Friend({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return friend.save();
            },
        },
        // delete a friend
        deleteFriend: {
            type: FriendType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Friend.findByIdAndDelete(args.id);
            },
        },
        // Add a goal
        addGoal: {
            type: GoalType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType( {
                        name: 'GoalStatus',
                        values: {
                            'new' : { value: 'Not Started' },
                            'progress' : { value: 'In Progress' },
                            'completed' : { value: 'Completed' },
                        }
                    }),
                    defaultValue: 'Not Started',
                },
                friendId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                const goal = new Goal({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    friendId: args.friendId,
                });
                return goal.save();
            },
        },
        // Delete a goal
        deleteGoal: {
            type: GoalType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Goal.findByIdAndDelete(args.id);
            },
        },
        // Update a goal
        updateGoal: {
            type: GoalType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType( {
                        name: 'GoalStatusUpdate',
                        values: {
                            'new' : { value: 'Not Started' },
                            'progress' : { value: 'In Progress' },
                            'completed' : { value: 'Completed' },
                        },
                    }),
                },
            },
            resolve(parent, args) {
                return Goal.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        },
                    },
                    { new: true }
                );
            }
        }
    },
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
})