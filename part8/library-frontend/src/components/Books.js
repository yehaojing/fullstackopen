import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [genreFilt, setGenreFilt] = useState(null)

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;
  const genres = books.map((book) => book.genres).flat(1);
  const setGenres = [...new Set(genres)]

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
          {books.filter(b => genreFilt ? b.genres.includes(genreFilt) : true).map((a) => (
            <tr key={a.id}>
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
