import { SmallTitle, ListItem } from "./Styles";

const User = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div>
      <SmallTitle>{user.name}</SmallTitle>
      <SmallTitle>added blogs</SmallTitle>
      <ul>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>{blog.title}</ListItem>
        ))}
      </ul>
    </div>
  );
};

export default User;
