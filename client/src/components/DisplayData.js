import { useState } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query {
    users {
      id
      name
      username
      age
      nationality
      gender
      friends {
        name
      }
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query ($name: String!) {
    movie(name: $name) {
      id
      isInTheaters
      name
      yearOfPublication
    }
  }
`;

function DisplayData() {
  const [movieSearched, setMovieSearched] = useState("");
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);

  const [
    searchMovie,
    { data: searchData, loading: searchLoading, error: searchError },
  ] = useLazyQuery(GET_MOVIE_BY_NAME);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>List of users</h1>
      {data &&
        data.users.map((user) => (
          <div key={user.id}>
            <h3>Name: {user.name}</h3>
            <p>Username: {user.username}</p>
            <p>Age: {user.age}</p>
            <p>Nationality: {user.nationality}</p>
            <p>Gender: {user.gender}</p>
            <p>
              Friends:{" "}
              {user.friends &&
                user.friends.map((friend) => friend.name).join(", ")}
            </p>
          </div>
        ))}

      <div>
        <input
          type="text"
          placeholder="Interstellar"
          onChange={(e) => setMovieSearched(e.target.value)}
        ></input>
        <button
          onClick={() => searchMovie({ variables: { name: movieSearched } })}
        >
          Search Movie
        </button>
      </div>
      <div>
        {searchLoading && <p>Loading...</p>}

        {searchData &&
          (searchData.movie ? (
            <div>
              <h3>Name: {searchData.movie.name}</h3>
              <p>Year of Publication: {searchData.movie.yearOfPublication}</p>
              <p>In Theaters: {searchData.movie.isInTheaters ? "Yes" : "No"}</p>
            </div>
          ) : (
            <p>Movie not found</p>
          ))}

        {searchError && <p>{searchError.message}</p>}
      </div>
    </div>
  );
}

export default DisplayData;
