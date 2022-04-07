import { SmallTitle, StyledLink, StyledText } from "./Styles";

const UserList = ({ users }) => {
  return (
    <div>
      <SmallTitle>Users</SmallTitle>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>
              <StyledText>blogs created</StyledText>
            </td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <StyledLink to={`/users/${user.id}`}>{user.name}</StyledLink>
              </td>
              <td>
                <StyledText>{user.blogs.length}</StyledText>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
