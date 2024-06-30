const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        id: ID
        name: String
        username: String
        age: Int
        nationality: String
        friends: [User!]
    }

    type Movie {
        id: ID
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