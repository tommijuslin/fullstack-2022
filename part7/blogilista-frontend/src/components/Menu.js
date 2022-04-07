import { Button, StyledLink, StyledText, Navigation } from "./Styles";

const Menu = ({ loggedUser, handleLogout }) => {
  const padding = {
    paddingRight: 5,
  };

  return (
    <Navigation>
      <StyledLink style={padding} to="/">
        blogs
      </StyledLink>
      <StyledLink style={padding} to="/users">
        users
      </StyledLink>
      <StyledText>{loggedUser.name} logged in</StyledText>
      <Button onClick={handleLogout}>logout</Button>
    </Navigation>
  );
};

export default Menu;
