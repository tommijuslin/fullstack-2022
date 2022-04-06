import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Blog from "./Blog";

const BlogList = () => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const items = useSelector((state) => state.blogs);

  const blogs = [...items];

  return blogs
    .sort((a, b) => {
      return b.likes - a.likes;
    })
    .map((blog) => (
      <div key={blog.id} className="blog" style={blogStyle}>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} by {blog.author}
        </Link>
      </div>
    ));
};

export default BlogList;
