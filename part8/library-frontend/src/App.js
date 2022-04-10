import { useState } from "react";
import { useApolloClient, useQuery } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";

import { ALL_AUTHORS, ALL_BOOKS } from "./queries";

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const client = useApolloClient();

  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);

  if (authors.loading || books.loading) {
    return <div>loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  let navigation;

  if (!token) {
    navigation = (
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("login")}>login</button>
      </div>
    );
  } else {
    navigation = (
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => logout()}>logout</button>
      </div>
    );
  }

  return (
    <div>
      {navigation}
      <Authors show={page === "authors"} authors={authors.data.allAuthors} />
      <Books show={page === "books"} books={books.data.allBooks} />
      <NewBook show={page === "add"} />
      <LoginForm show={page === "login"} setToken={setToken} />
    </div>
  );
};

export default App;
