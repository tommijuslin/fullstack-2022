import PropTypes from "prop-types";
import { Input, ButtonNoMargin, Title, StyledText } from "./Styles";

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <div>
      <Title>log in to application</Title>
      <form onSubmit={handleLogin}>
        <div>
          <StyledText>username</StyledText>
          <Input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <StyledText>password</StyledText>
          <Input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <ButtonNoMargin type="submit">login</ButtonNoMargin>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default LoginForm;
