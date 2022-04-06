import { useDispatch, useSelector } from "react-redux";
import { like } from "../reducers/blogReducer";
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
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {blog.likes} likes
      <button onClick={() => handleLike(blog)}>like</button>
      <br />
      added by {user.name}
    </div>
  );
};

export default Blog;
