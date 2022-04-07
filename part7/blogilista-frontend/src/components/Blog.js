import { useDispatch, useSelector } from "react-redux";
import { like } from "../reducers/blogReducer";
import Comment from "./Comment";
import { Button, SmallTitle, StyledText } from "./Styles";
// import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog }) => {
  const user = useSelector((state) => state.loggedUser);
  const dispatch = useDispatch();

  const handleLike = (blog) => {
    dispatch(like(blog));
  };

  /*   const handleRemove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      dispatch(remove(blog.id));
      dispatch(
        setNotification({ text: `removed '${blog.title}'`, type: "success" }, 5)
      );
    }
  }; */

  if (!blog) {
    return null;
  }

  return (
    <div>
      <SmallTitle>{blog.title}</SmallTitle>
      <a href={blog.url}>{blog.url}</a>
      <br />
      <StyledText>{blog.likes} likes</StyledText>
      <Button onClick={() => handleLike(blog)}>like</Button>
      <br />
      <StyledText>added by {user.name}</StyledText>
      <Comment blog={blog} />
    </div>
  );
};

export default Blog;
