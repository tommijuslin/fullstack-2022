import { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../reducers/blogReducer";

const Comment = ({ blog }) => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const addComment = (event) => {
    event.preventDefault();
    const newComment = {
      text: comment,
    };
    dispatch(createComment(blog.id, newComment));
    setComment("");
  };

  return (
    <div>
      <h2>comments</h2>
      <form onSubmit={addComment}>
        <input
          type="text"
          value={comment}
          name="title"
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comment;
