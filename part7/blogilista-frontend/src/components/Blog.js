import { useState } from "react";
import { useDispatch } from "react-redux";
import { like, remove } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import PropTypes from "prop-types";

const Blog = ({ blog }) => {
  const [showFullInfo, setShowFullInfo] = useState(false);
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = (blog) => {
    dispatch(like(blog));
  };

  const handleRemove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      dispatch(remove(blog.id));
      dispatch(
        setNotification({ text: `removed '${blog.title}'`, type: "success" }, 5)
      );
    }
  };

  const showAllBlogInfo = () => {
    return (
      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes
          <button className="like" onClick={() => handleLike(blog)}>
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={() => handleRemove(blog)}>remove</button>
      </div>
    );
  };

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={() => setShowFullInfo(!showFullInfo)}>
        {showFullInfo ? "hide" : "view"}
      </button>
      {showFullInfo ? showAllBlogInfo() : []}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
