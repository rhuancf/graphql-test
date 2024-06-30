const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        id: Int
        name: String
        username: String
        age: Int
        nationality: String
        friends: [User!]
    }

    type Movie {
        id: Int
        name: String
        yearOfPublication: Int
        isInTheaters: Boolean
    }

    type Query {
        users: [User!]!
        user(id: Int!): User
        movies: [Movie!]!
    }
`;

module.exports = { typeDefs };