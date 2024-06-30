const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID
    name: String
    username: String
    age: Int
    nationality: String
    friends: [User!]
    favoriteMovies: [Movie!]
  }

  type Movie {
    id: ID
    name: String
    yearOfPublication: Int
    isInTheaters: Boolean
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    movies: [Movie!]!
    movie(id: ID!): Movie
  }
`;

module.exports = { typeDefs };
