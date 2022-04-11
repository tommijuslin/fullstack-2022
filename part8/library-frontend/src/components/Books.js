import { useState } from "react";
import Select from "react-select";

const Books = ({ show, books }) => {
  const [filter, setFilter] = useState({ value: "all", label: "all" });

  if (!show) {
    return null;
  }

  let genres = Array.from(
    new Set(
      books.reduce((acc, cur) => {
        return acc.concat(cur.genres);
      }, [])
    )
  );

  genres = genres
    .map((genre) => ({ value: genre, label: genre }))
    .concat({ value: "all", label: "all" });

  const booksToShow =
    filter.value === "all"
      ? books
      : books.filter((book) => book.genres.includes(filter.value));

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
          {booksToShow.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Select defaultValue={filter} onChange={setFilter} options={genres} />
    </div>
  );
};

export default Books;
