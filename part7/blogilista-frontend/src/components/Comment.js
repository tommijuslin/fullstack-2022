import { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "../reducers/blogReducer";
import { SmallTitle, Input, ButtonNoMargin, ListItem } from "./Styles";

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
      <SmallTitle>comments</SmallTitle>
      <form onSubmit={addComment}>
        <Input
          type="text"
          value={comment}
          name="title"
          onChange={({ target }) => setComment(target.value)}
        />
        <ButtonNoMargin type="submit">add comment</ButtonNoMargin>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <ListItem key={comment}>{comment}</ListItem>
        ))}
      </ul>
    </div>
  );
};

export default Comment;
