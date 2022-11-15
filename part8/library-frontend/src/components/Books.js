import { useQuery, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const initialBookResult = useQuery(ALL_BOOKS);
  const [getBooksByGenre, booksByGenreResult] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: "no-cache",
  });
  const [genre, setGenre] = useState("all");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (initialBookResult.data) {
      setBooks(initialBookResult.data.allBooks);
    }
  }, [initialBookResult.data]);

  useEffect(() => {
    if (booksByGenreResult.data) {
      setBooks(booksByGenreResult.data.allBooks);
    }
  }, [booksByGenreResult.data]);

  if (!props.show) {
    return null;
  }

  if (initialBookResult.loading || booksByGenreResult.loading) {
    return <div>loading...</div>;
  }

  const genres = [...new Set(initialBookResult.data.allBooks.flatMap((b) => b.genres))];

  const handlerGenreButton = (genre) => {
    setGenre(genre);
    getBooksByGenre({ variables: { genre: genre } });
  };

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a, idx) => (
            <tr key={idx}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map(genre => <button key={genre} onClick={() => handlerGenreButton(genre)}>{genre}</button>)}
        <button onClick={() => handlerGenreButton(null)}>All Genres</button>
      </div>
    </div>
  );
};

export default Books;