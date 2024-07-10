const { describe, expect, it } = require("@jest/globals");
const { resolvers, searchMovie } = require("../schema/resolvers.js");
const { UserList, MovieList, MoviePreferences } = require("../FakeData.js");

describe("Query Resolvers", () => {
  test("users should return all users", () => {
    expect(resolvers.Query.users()).toEqual(UserList);
  });

  test("user should return the correct user based on ID", () => {
    const user = UserList[0];
    expect(resolvers.Query.user(null, { id: user.id })).toEqual(user);
  });

  test("movies should return all movies", () => {
    expect(resolvers.Query.movies()).toEqual(MovieList);
  });

  test("movie should return the correct movie based on ID", () => {
    const movie = MovieList[0];
    const SearchMovieInput = { id: movie.id };
    expect(resolvers.Query.movie(null, { input: SearchMovieInput })).toEqual(
      movie
    );
  });

  test("movie should return the correct movie based on name", () => {
    const movie = MovieList[0];
    const SearchMovieInput = { name: movie.name };
    expect(
      resolvers.Query.movie(null, { input: SearchMovieInput })
    ).toEqual(movie);
  });
});

describe("User Resolvers", () => {
  it("should return the correct list of favorite movies for a given user", () => {
    const user = UserList[0];
    const favoriteMovieIds = MoviePreferences.filter(
      (preference) => preference.user_id === user.id
    ).map((preference) => preference.movie_id);

    const expectedMovies = MovieList.filter((movie) =>
      favoriteMovieIds.includes(movie.id)
    );

    expect(resolvers.User.favoriteMovies(user)).toEqual(expectedMovies);
  });
});

describe("Mutation Resolvers", () => {
  test("createUser should add a new user and return the created user", () => {
    const input = {
      name: "New User",
      username: "newuser",
      age: 25,
      nationality: "USA",
      gender: "M",
    };
    const newUser = { id: UserList[UserList.length - 1].id + 1, ...input };

    expect(resolvers.Mutation.createUser(null, { input })).toEqual(newUser);
    expect(UserList).toContainEqual(newUser);
  });

  test("updateUser should update an existing user and return the updated user", () => {
    const user = UserList[0];
    const input = { age: 30 };
    const updatedUser = { ...user, ...input };

    expect(resolvers.Mutation.updateUser(null, { id: user.id, input })).toEqual(
      updatedUser
    );
    expect(UserList[0]).toEqual(updatedUser);
  });

  test("deleteUser should delete a user and return 'User deleted'", () => {
    const user = UserList[0];
    const initialLength = UserList.length;

    expect(resolvers.Mutation.deleteUser(null, { id: user.id })).toBe(
      "User deleted"
    );
    expect(UserList.length).toBe(initialLength - 1);
    expect(UserList).not.toContainEqual(user);
  });

  test("deleteUser should return 'User not found' if the user does not exist", () => {
    const nonExistentId = 9999;
    expect(resolvers.Mutation.deleteUser(null, { id: nonExistentId })).toBe(
      "User not found"
    );
  });
});

describe("searchMovie", () => {
  it("should return a movie", () => {
    expect(searchMovie({ id: 1 })).toEqual({
      id: 1,
      name: "Avengers Endgame",
      yearOfPublication: 2019,
      isInTheaters: true,
    });
  });
});
