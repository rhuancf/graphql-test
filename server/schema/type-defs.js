const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String
    username: String
    age: Int
    nationality: String
    gender: Gender!
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
    movie(input:SearchMovieInput): Movie
  }

  input createUserInput {
    name: String
    username: String
    age: Int = 18
    nationality: String
    gender: Gender!
  }

  input SearchMovieInput {
    id: ID
    name: String
  }

  type Mutation {
    createUser(input: createUserInput!): User!
    updateUser(id: ID!, input: createUserInput!): User
    deleteUser(id: ID!): String
  }

  enum Gender {
    MALE
    FEMALE
    OTHER
  }
`;

module.exports = { typeDefs };
