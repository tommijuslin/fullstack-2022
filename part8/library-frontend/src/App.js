import { useState, useEffect } from "react";
import { useApolloClient, useQuery } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";

import { ALL_AUTHORS, ALL_BOOKS, ME } from "./queries";

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState("authors");
  const [user, setUser] = useState(null);
  const client = useApolloClient();

  const authors = useQuery(ALL_AUTHORS);
  const books = useQuery(ALL_BOOKS);
  const loggedUser = useQuery(ME);

  useEffect(() => {
    if (loggedUser.data) {
      setUser(loggedUser.data.me);
    }
  }, [loggedUser.data]);

  if (authors.loading || books.loading) {
    return <div>loading...</div>;
  }

  let genres = Array.from(
    new Set(
      books.data.allBooks.reduce((acc, cur) => {
        return acc.concat(cur.genres);
      }, [])
    )
  );

  genres = genres
    .map((genre) => ({ value: genre, label: genre }))
    .concat({ value: null, label: "show all" });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
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
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={() => logout()}>logout</button>
      </div>
    );
  }

  return (
    <div>
      {navigation}
      <Authors show={page === "authors"} authors={authors.data.allAuthors} />
      <Books show={page === "books"} genres={genres} />
      <NewBook show={page === "add"} />
      <LoginForm show={page === "login"} setToken={setToken} />
      {user && token ? (
        <Recommend show={page === "recommend"} user={user} />
      ) : null}
    </div>
  );
};

export default App;
