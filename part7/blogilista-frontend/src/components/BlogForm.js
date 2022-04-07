import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";
import { ButtonNoMargin, StyledText, Input, SmallTitle } from "./Styles";

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();

  const addBlog = async (event) => {
    event.preventDefault();
    blogFormRef.current.toggleVisibility();
    const newBlog = {
      title,
      author,
      url,
    };
    dispatch(createBlog(newBlog));
    dispatch(
      setNotification(
        { text: `a new blog ${title} by ${author} added`, type: "success" },
        5
      )
    );
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div className="blogForm">
      <SmallTitle>create new</SmallTitle>
      <form onSubmit={addBlog}>
        <div>
          <StyledText>title</StyledText>
          <Input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="title"
          />
        </div>
        <div>
          <StyledText>author</StyledText>
          <Input
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="author"
          />
        </div>
        <div>
          <StyledText>url</StyledText>
          <Input
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="url"
          />
        </div>
        <ButtonNoMargin id="create-button" type="submit">
          create
        </ButtonNoMargin>
      </form>
    </div>
  );
};

export default BlogForm;
