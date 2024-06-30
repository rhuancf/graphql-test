const { UserList, MovieList } = require("../FakeData.js");

const resolvers = {
  Query: {
    users() {
      return UserList;
    },
    user(_, { id }) {
      return UserList.find((user) => user.id == id);
    },
    movies() {
      return MovieList;
    }
  },
};

module.exports = { resolvers };
