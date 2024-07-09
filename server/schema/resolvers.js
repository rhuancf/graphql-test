const { UserList, MovieList, MoviePreferences } = require("../FakeData.js");

const resolvers = {
  Query: {
    // Users
    users() {
      return UserList;
    },
    user(_, { id }) {
      return UserList.find((user) => user.id === Number(id));
    },

    // Movies
    movies() {
      return MovieList;
    },
    movie(_, { input }) {
      return searchMovie(input);
    },
  },

  User: {
    favoriteMovies({ id }) {
      favoriteMovies = MoviePreferences.filter(
        (preference) => preference.user_id === Number(id)
      ).map((preference) => preference.movie_id);

      return MovieList.filter((movie) => favoriteMovies.includes(movie.id));
    },
  },

  Mutation: {
    // Users
    createUser(_, { input }) {
      const newUser = { id: UserList[UserList.length - 1].id + 1, ...input };
      UserList.push(newUser);
      return UserList.find((user) => user.id === Number(newUser.id));
    },

    updateUser(_, { id, input }) {
      let index = UserList.findIndex((user) => user.id === Number(id));
      UserList[index] = { ...UserList[index], ...input };
      return UserList[index];
    },

    deleteUser(_, { id }) {
      let index = UserList.findIndex((user) => user.id === Number(id));
      if (index === -1) return "User not found";
      UserList.splice(index, 1);
      return "User deleted";
    },
  },
};

function searchMovie({ id, name }) {
  return id
    ? MovieList.find((movie) => movie.id === Number(id))
    : MovieList.find((movie) => movie.name.toLowerCase() === name.toLowerCase());
}

module.exports = { resolvers };
