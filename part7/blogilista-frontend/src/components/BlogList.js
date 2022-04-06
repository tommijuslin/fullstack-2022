import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = () => {
  const items = useSelector((state) => state.blogs);

  const blogs = [...items];

  return blogs
    .sort((a, b) => {
      return b.likes - a.likes;
    })
    .map((blog) => <Blog key={blog.id} blog={blog} user={blog.user} />);
};

export default BlogList;
