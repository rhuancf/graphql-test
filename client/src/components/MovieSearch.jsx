import React, { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";

const GET_MOVIE_BY_NAME = gql`
  query ($movieInput: SearchMovieInput) {
    movie(input: $movieInput) {
      id
      isInTheaters
      name
      yearOfPublication
    }
  }
`;

function MovieSearch() {
  const [movieSearched, setMovieSearched] = useState("");
  const [searchMovie, { data: searchData, loading: searchLoading, error: searchError }] = useLazyQuery(GET_MOVIE_BY_NAME);

  const searchMovieHandler = () => {
    searchMovie({ variables: { movieInput: { name: movieSearched } } });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Interstellar"
        onChange={(e) => setMovieSearched(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && searchMovieHandler()}
      />
      <button onClick={searchMovieHandler}>Search Movie</button>

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

export default MovieSearch;
