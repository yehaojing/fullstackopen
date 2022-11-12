import { useQuery, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { BOOKS_BY_GENRE, ALL_GENRES } from "../queries";

const Books = (props) => {
  const [genreFilt, setGenreFilt] = useState(null)
  const [getBooksByGenre, booksResult] = useLazyQuery(BOOKS_BY_GENRE, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    getBooksByGenre({ variables: { genre: genreFilt }})
  }, [])

  const handlerGenreButton = (genre) => {
    setGenreFilt(genre)
    console.log(genreFilt)
    getBooksByGenre({ variables: { genre: genre }})
  }

  const genres = useQuery(ALL_GENRES).data?.allBooks?.map((book) => book.genres).flat(1)
  const setGenres = [...new Set(genres)]

  if (!props.show) {
    return null;
  }

  if (booksResult.loading) {
    return <div>loading...</div>;
  }

  const books = booksResult.data.allBooks;

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
        {setGenres.map(genre => <button key={genre} onClick={() => handlerGenreButton(genre)}>{genre}</button>)}
        <button onClick={() => handlerGenreButton(null)}>All Genres</button>
      </div>
    </div>
  );
};

export default Books;
