import { useQuery } from "@apollo/client";
import { useState } from "react";
import { BOOKS_BY_GENRE, ALL_GENRES } from "../queries";

const Books = (props) => {
  const [genreFilt, setGenreFilt] = useState(null)
  const result = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: genreFilt }
  });

  const genres = useQuery(ALL_GENRES).data?.allBooks?.map((book) => book.genres).flat(1)
  const setGenres = [...new Set(genres)]

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

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
        {setGenres.map(genre => <button key={genre} onClick={() => setGenreFilt(genre)}>{genre}</button>)}
        <button onClick={() => setGenreFilt(null)}>All Genres</button>
      </div>
    </div>
  );
};

export default Books;
