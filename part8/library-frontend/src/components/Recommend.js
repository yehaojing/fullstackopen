import { useQuery } from "@apollo/client";
import { ME, ALL_BOOKS } from "../queries";

const Recommend = (props) => {
  const me = useQuery(ME);
  const books = useQuery(ALL_BOOKS);

  if (!props.show || !me.data || !books.data) {
    return null;
  }

  const favouriteGenre = me.data.me.favouriteGenre;

  const recommendedBooks = books.data.allBooks.filter((book) =>
    book.genres.includes(favouriteGenre)
  );

  return (
    <div>
      <h2>recommendations</h2>
      {recommendedBooks.length > 0 ? (
        <div>
          <div>
            books in your favourite genre <strong>{favouriteGenre}</strong>
          </div>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {recommendedBooks.map((book) => (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          No recommended books for <strong>{favouriteGenre}</strong>
        </div>
      )}
    </div>
  );
};

export default Recommend;
