import { Link } from "react-router-dom";

const Menu = ({ loggedUser, handleLogout }) => {
  const padding = {
    paddingRight: 5,
  };

  return (
    <div>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      {loggedUser.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Menu;
