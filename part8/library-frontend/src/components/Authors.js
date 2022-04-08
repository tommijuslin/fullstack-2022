import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = ({ show, authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [changeBirthyear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!show) {
    return null;
  }

  const updateAuthor = async (event) => {
    event.preventDefault();

    changeBirthyear({ variables: { name, born } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
