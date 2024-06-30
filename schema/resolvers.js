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
    movie(_, { id }) {
      return MovieList.find((movie) => movie.id === Number(id));
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
};

module.exports = { resolvers };
