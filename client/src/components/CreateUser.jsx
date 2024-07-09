import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const CREATE_USER = gql`
  mutation ($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      username
      age
      nationality
      gender
    }
  }
`;

function CreateUser() {
  const [createUser, { loading, error, data }] = useMutation(CREATE_USER);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    age: "",
    nationality: "",
    gender: "MALE",
  });

  console.log(userData);

  return (
    <div>
      <input type="text" placeholder="Name" onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
      <input type="text" placeholder="Username" onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
      <input type="number" placeholder="Age"  onChange={(e) => setUserData({ ...userData, age: parseInt(e.target.value) })}/>
      <input type="text" placeholder="Nationality"  onChange={(e) => setUserData({ ...userData, nationality: e.target.value })}/>
      <select name="gender" onChange={(e) => setUserData({ ...userData, gender: e.target.value })}>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
        <option value="OTHER">Other</option>
      </select>
      <button onClick={() => createUser({ variables: { input: userData } })}>Create</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error : {error.message}</p>}
      {data && data.createUser && <p>Usurário {data.createUser.name} criado com sucesso!</p>}
    </div>
  );
}

export default CreateUser;
