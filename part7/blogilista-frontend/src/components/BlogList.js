import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { StyledLink } from "./Styles";

const BlogList = ({ className }) => {
  const items = useSelector((state) => state.blogs);

  const blogs = [...items];

  return blogs
    .sort((a, b) => {
      return b.likes - a.likes;
    })
    .map((blog) => (
      <div key={blog.id} className={className}>
        <StyledLink to={`/blogs/${blog.id}`}>
          {blog.title} by {blog.author}
        </StyledLink>
      </div>
    ));
};

export default BlogList;
