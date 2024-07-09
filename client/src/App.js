import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery } from "@apollo/client";
import UserList from "./components/UserList";
import MovieSearch from "./components/MovieSearch";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <MovieSearch />
      </div>
    </ApolloProvider>
  );
}

export default App;
