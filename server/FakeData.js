const UserList = [
    {
      id: 1,
      name: "John",
      username: "john",
      age: 20,
      nationality: "CANADA",
      gender: "MALE",
      friends: [
        {
          id: 2,
          name: "Pedro",
          username: "PedroTech",
          age: 20,
          nationality: "BRAZIL",
          gender: "MALE",
        },
        {
          id: 5,
          name: "Kelly",
          username: "kelly2019",
          age: 5,
          nationality: "CHILE",
          gender: "FEMALE",
        },
      ]
    },
    {
      id: 2,
      name: "Pedro",
      username: "PedroTech",
      age: 20,
      nationality: "BRAZIL",
      gender: "MALE",
    },
    {
      id: 3,
      name: "Sarah",
      username: "cameron",
      age: 25,
      nationality: "INDIA",
      gender: "FEMALE",
      friends: [
        {
          id: 2,
          name: "Pedro",
          username: "PedroTech",
          age: 20,
          nationality: "BRAZIL",
          gender: "MALE",
        },
      ],
    },
    {
      id: 4,
      name: "Rafe",
      username: "rafe123",
      age: 60,
      nationality: "GERMANY",
      gender: "MALE",
    },
    {
      id: 5,
      name: "Kelly",
      username: "kelly2019",
      age: 5,
      nationality: "CHILE",
      gender: "FEMALE",
    },
  ];
  
  const MovieList = [
    {
      id: 1,
      name: "Avengers Endgame",
      yearOfPublication: 2019,
      isInTheaters: true,
    },
    {
      id: 2,
      name: "Interstellar",
      yearOfPublication: 2007,
      isInTheaters: true,
    },
    {
      id: 3,
      name: "Superbad",
      yearOfPublication: 2009,
      isInTheaters: true,
    },
    {
      id: 4,
      name: "PedroTech The Movie",
      yearOfPublication: 2035,
      isInTheaters: false,
    },
  ];

  const MoviePreferences = [
    {
      id: 1,
      user_id: 1,
      movie_id: 1,
    },
    {
      id: 2,
      user_id: 1,
      movie_id: 2,
    },
    {
      id: 3,
      user_id: 1,
      movie_id: 3,
    },
    {
      id: 4,
      user_id: 2,
      movie_id: 1,
    },
    {
      id: 5,
      user_id: 4,
      movie_id: 3,
    },
  ];
  
  module.exports = { UserList, MovieList, MoviePreferences };