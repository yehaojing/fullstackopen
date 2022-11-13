import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import Login from "./components/Login";
import NewBook from "./components/NewBook";
import SetBirthyear from "./components/SetBirthyear";
import { useSubscription, useApolloClient } from "@apollo/client";
import Recommend from "./components/Recommend";
import { BOOK_ADDED } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage("authors");
  };

  useEffect(() => {
    const userFromStorage = localStorage.getItem("library-user-token");
    if (userFromStorage) {
      setToken(userFromStorage);
    }
  }, [page]);

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      window.alert(`Book added: ${data.data.bookAdded.title} by ${data.data.bookAdded.author.name} in ${data.data.bookAdded.published}`)
    }
  })


  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>
      <Recommend show={page === "recommend"}/>
      <Authors show={page === "authors"} />
      <SetBirthyear show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Login show={page === "login"} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;
