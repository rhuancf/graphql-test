import React from "react";
import { gql, useQuery } from "@apollo/client";

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

function UserList() {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);

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
              {user.friends && user.friends.map((friend) => friend.name).join(", ")}
            </p>
          </div>
        ))}
    </div>
  );
}

export default UserList;