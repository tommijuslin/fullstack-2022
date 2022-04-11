import { useState } from "react";
import Select from "react-select";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = ({ show, genres }) => {
  const [filter, setFilter] = useState({ value: null, label: "show all" });

  let filteredBooks = useQuery(ALL_BOOKS, {
    variables: { genre: filter.value },
  });

  if (filteredBooks.loading) {
    return <div>loading...</div>;
  }

  if (!show) {
    return null;
  }

  filteredBooks = filteredBooks.data.allBooks;

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
          {filteredBooks.map((book) => (
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
