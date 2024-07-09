import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery } from "@apollo/client";
import Navigation from "./components/Navigation/Navigation";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Navigation />
      </div>
    </ApolloProvider>
  );
}

export default App;
