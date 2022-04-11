import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Recommend = ({ show, user }) => {
  let books = useQuery(ALL_BOOKS, {
    variables: { genre: user.favoriteGenre },
  });

  if (books.loading) {
    return <div>loading...</div>;
  }

  books = books.data.allBooks;

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favourite genre <b>{user.favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
